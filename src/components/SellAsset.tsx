import { useEffect, useState } from "react";
import { useData } from '../data';
import { AssetWithOrders, Order } from "../data/data"
import { ethers, BigNumber } from "ethers";
import { useTransaction } from "../web3/transactions";
import { useWeb3 } from '../web3';
import Button from "./Button";
import { InputNumber, InputAmount } from "./Input";
import Loader from "./Loader";
import { Content, Content__factory } from '../assets/typechain';

function TradeAssetStatus({
  show,
  status
}: {
  show: boolean,
  status: string
}) {
  if (show) {
    return (
      <div className="flex justify-center mx-3 h-6 text-black200">
        {status}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center mx-3 h-6 text-black200" />
    );
  }
}

function SellAsset({
  show,
  assetWithOrders
}: {
  show: boolean,
  assetWithOrders: AssetWithOrders | undefined
}) {
  const [transaction] = useTransaction();
  const web3 = useWeb3();

  const {
    systemContracts: { exchange, nftEscrow },
    supportedToken,
  } = useData();

  const [sellNowOrderIdsToFill, setSellNowOrderIdsToFill] = useState<BigNumber[]>();
  const [sellNowAssetAmount, setSellNowAssetAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [sellNowAssetAmountString, setSellNowAssetAmountString] = useState<string>("0");
  const [sellNowUnfilledAssetAmount, setSellNowUnfilledAssetAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [sellNowTokenAmount, setSellNowTokenAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [sellNowPending, setSellNowPending] = useState<boolean>(false);

  const [placeOrderPrice, setPlaceOrderPrice] = useState<BigNumber>(BigNumber.from("0"));
  const [placeOrderPriceString, setPlaceOrderPriceString] = useState<string>("0");
  const [placeOrderAssetAmount, setPlaceOrderAssetAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [placeOrderAssetAmountString, setPlaceOrderAssetAmountString] = useState<string>("0");
  const [placeOrderTokenAmount, setPlaceOrderTokenAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [placeOrderPending, setPlaceOrderPending] = useState<boolean>(false);

  const [contentContract, setContentContract] = useState<Content>();

  const [buyOrders, setBuyOrders] = useState<Order[] | undefined>();

  useEffect(() => {
    if (assetWithOrders === undefined || web3.signerOrProvider === undefined) return;

    setContentContract(Content__factory.connect(assetWithOrders.parentContract, web3.signerOrProvider));
  }, [assetWithOrders, web3.signerOrProvider]);

  const [assetApproved, setAssetApproved] = useState<boolean>();
  useEffect(() => {
    if (
      assetApproved ||
      contentContract === undefined ||
      web3.account === undefined ||
      nftEscrow === undefined
    ) return;

    contentContract.isApprovedForAll(web3.account, nftEscrow.address)
      .then((approved) => {
        setAssetApproved(approved);
      })
      .catch((error) => console.error(error));
  }, [assetApproved, contentContract, web3.account, nftEscrow]);

  const [assetBalance, setAssetBalance] = useState<BigNumber>(BigNumber.from("0"));
  useEffect(() => {
    if (
      contentContract === undefined ||
      assetWithOrders === undefined ||
      web3.signerOrProvider === undefined ||
      web3.account === undefined
    ) return;

    contentContract.balanceOf(web3.account, assetWithOrders.tokenId)
      .then((balance) => {
        setAssetBalance(balance);
      })
      .catch((error) => console.error(error));
  }, [contentContract, assetWithOrders, web3.signerOrProvider, web3.account, sellNowPending, placeOrderPending]);

  useEffect(() => {
    if (sellNowAssetAmountString === "") {
      setSellNowAssetAmount(BigNumber.from("0"));
    } else {
      setSellNowAssetAmount(BigNumber.from(sellNowAssetAmountString));
    }
  }, [sellNowAssetAmountString]);

  useEffect(() => {
    if (placeOrderAssetAmountString === "") {
      setPlaceOrderAssetAmount(BigNumber.from("0"));
    } else {
      setPlaceOrderAssetAmount(BigNumber.from(placeOrderAssetAmountString));
    }
  }, [placeOrderAssetAmountString]);

  useEffect(() => {
    if (supportedToken === undefined) return;

    if (placeOrderPriceString === "") {
      setPlaceOrderPrice(BigNumber.from("0"));
    } else {
      setPlaceOrderPrice(ethers.utils.parseUnits(placeOrderPriceString, supportedToken.decimals))
    }
  }, [placeOrderPriceString, supportedToken]);

  useEffect(() => {
    if (assetWithOrders === undefined) return;

    setBuyOrders((assetWithOrders.orders
      .filter(order => order.type === "Buy" && order.cancelledAtTimestamp.toString() === "0" && order.filledAtTimestamp.toString() === "0"))
      .sort((firstOrder, secondOrder) => {
        if ((firstOrder.price).lt(secondOrder.price)) {
          return 0;
        } else if ((firstOrder.price).gt(secondOrder.price)) {
          return -1;
        } else {
          if ((firstOrder.id).lt(secondOrder.id)) {
            return -1;
          } else {
            return 0;
          }
        }
      }));

  }, [assetWithOrders]);

  useEffect(() => {
    setPlaceOrderTokenAmount(placeOrderPrice.mul(BigNumber.from(placeOrderAssetAmount.toString())));
  }, [placeOrderPrice, placeOrderAssetAmount]);

  const [showSellNowButton, setShowSellNowButton] = useState<boolean>(false);
  const [enableSellNowButton, setEnableSellNowButton] = useState<boolean>(false);
  const [showSellNowApproveButton, setShowSellNowApproveButton] = useState<boolean>(false);
  const [enableSellNowApproveButton, setEnableSellNowApproveButton] = useState<boolean>(false);
  const [showSellNowLoader, setShowSellNowLoader] = useState<boolean>(false);
  const [showSellNowStatus, setShowSellNowStatus] = useState<boolean>(false);
  const [sellNowStatus, setSellNowStatus] = useState<string>("");

  useEffect(() => {
    if (sellNowTokenAmount === undefined || assetApproved === undefined || assetBalance === undefined) return;

    if (!sellNowPending) {
      if (sellNowAssetAmount.gt(BigNumber.from("0"))) {
        if (assetBalance.gte(sellNowAssetAmount)) {
          if (sellNowAssetAmount.gt(sellNowUnfilledAssetAmount)) {
            // Unfillable with sell now
            setEnableSellNowButton(false);
            setEnableSellNowApproveButton(false);
            setShowSellNowApproveButton(false);
            setEnableSellNowApproveButton(false);
            setShowSellNowLoader(false);
            setShowSellNowStatus(true);
            setSellNowStatus("Quantity cannot be filled");
          } else {
            // Fillable with buy now
            if (!assetApproved) {
              // Need to approve
              setShowSellNowButton(false);
              setEnableSellNowButton(false);
              setShowSellNowApproveButton(true);
              setEnableSellNowApproveButton(true);
              setShowSellNowLoader(false);
              setShowSellNowStatus(true);
              setSellNowStatus("NFT transfer must be approved");
            } else {
              // All good to Buy Now
              setShowSellNowButton(true);
              setEnableSellNowButton(true);
              setShowSellNowApproveButton(false);
              setEnableSellNowApproveButton(false);
              setShowSellNowLoader(false);
              setShowSellNowStatus(false);
              setSellNowStatus("");
            }
          }
        } else {
          // User doesn't have enough NFTs
          setShowSellNowButton(true);
          setEnableSellNowButton(false);
          setShowSellNowApproveButton(false);
          setEnableSellNowApproveButton(false);
          setShowSellNowLoader(false);
          setShowSellNowStatus(true);
          setSellNowStatus("Not enough NFTs");
        }
      } else {
        setShowSellNowButton(true);
        setEnableSellNowButton(false);
        setShowSellNowApproveButton(false);
        setEnableSellNowApproveButton(false);
        setShowSellNowLoader(false);
        setShowSellNowStatus(false);
        setSellNowStatus("");
      }
    } else {
      setShowSellNowButton(false);
      setEnableSellNowButton(false);
      setShowSellNowApproveButton(false);
      setEnableSellNowApproveButton(false);
      setShowSellNowLoader(true);
      setShowSellNowStatus(false);
      setSellNowStatus("");
    }
  }, [sellNowTokenAmount, assetApproved, assetBalance, sellNowUnfilledAssetAmount, sellNowAssetAmount, sellNowPending]);

  const [showPlaceOrderButton, setShowPlaceOrderButton] = useState<boolean>(true);
  const [enablePlaceOrderButton, setEnablePlaceOrderButton] = useState<boolean>(false);
  const [showPlaceOrderApproveButton, setShowPlaceOrderApproveButton] = useState<boolean>(false);
  const [enablePlaceOrderApproveButton, setEnablePlaceOrderApproveButton] = useState<boolean>(false);
  const [showPlaceOrderStatus, setShowPlaceOrderStatus] = useState<boolean>(false);
  const [placeOrderStatus, setPlaceOrderStatus] = useState<string>("");
  const [showPlaceOrderLoader, setShowPlaceOrderLoader] = useState<boolean>(false);
  useEffect(() => {
    if (assetBalance === undefined || assetApproved === undefined) return;

    if (!placeOrderPending) {
      if (placeOrderTokenAmount.gt(BigNumber.from("0"))) {
        if (assetBalance.gte(placeOrderAssetAmount)) {
          if (!assetApproved) {
            // Need to approve token transfer
            setShowPlaceOrderButton(false);
            setEnablePlaceOrderButton(false);
            setShowPlaceOrderApproveButton(true);
            setEnablePlaceOrderApproveButton(true);
            setShowPlaceOrderLoader(false);
            setShowPlaceOrderStatus(true);
            setPlaceOrderStatus("NFT transfer must be approved");
          } else {
            // Can place order
            setShowPlaceOrderButton(true);
            setEnablePlaceOrderButton(true);
            setShowPlaceOrderApproveButton(false);
            setEnablePlaceOrderApproveButton(false);
            setShowPlaceOrderLoader(false);
            setShowPlaceOrderStatus(false);
            setPlaceOrderStatus("");
          }
        } else {
          // Not enough tokens
          setShowPlaceOrderButton(true);
          setEnablePlaceOrderButton(false);
          setShowPlaceOrderApproveButton(false);
          setEnablePlaceOrderApproveButton(false);
          setShowPlaceOrderLoader(false);
          setShowPlaceOrderStatus(true);
          setPlaceOrderStatus("Not enough NFTs");
        }
      } else {
        // Order amount is zero
        setShowPlaceOrderButton(true);
        setEnablePlaceOrderButton(false);
        setShowPlaceOrderApproveButton(false);
        setEnablePlaceOrderApproveButton(false);
        setShowPlaceOrderLoader(false);
        setShowPlaceOrderStatus(false);
        setPlaceOrderStatus("");
      }
    } else {
      // Order is pending
      setShowPlaceOrderButton(false);
      setEnablePlaceOrderButton(false);
      setShowPlaceOrderApproveButton(false);
      setEnablePlaceOrderApproveButton(false);
      setShowPlaceOrderLoader(true);
      setShowPlaceOrderStatus(false);
      setPlaceOrderStatus("");
    }
  }, [placeOrderTokenAmount, assetApproved, assetBalance, placeOrderPending, placeOrderAssetAmount]);

  useEffect(() => {
    if (buyOrders === undefined) return;

    let index = 0;
    let _assetUnfilledAmount = BigNumber.from("0");
    let tokenAmountToSpend = BigNumber.from("0");
    let newOrderIdsToFill = [];

    while (_assetUnfilledAmount.lt(sellNowAssetAmount) && index < buyOrders.length) {
      const orderUnfilledAmount = buyOrders[index].amountOrdered.sub(buyOrders[index].amountFilled);

      let amountToFillFromOrder: BigNumber;
      if (orderUnfilledAmount.lte(sellNowAssetAmount.sub(_assetUnfilledAmount))) {
        // Fill the entire order
        amountToFillFromOrder = orderUnfilledAmount;
      } else {
        // Partially fill the order
        amountToFillFromOrder = sellNowAssetAmount.sub(_assetUnfilledAmount);
      }

      newOrderIdsToFill.push(buyOrders[index].id);
      tokenAmountToSpend = tokenAmountToSpend.add(BigNumber.from(amountToFillFromOrder).mul(BigNumber.from(buyOrders[index].price)));
      _assetUnfilledAmount = _assetUnfilledAmount.add(amountToFillFromOrder);
      index++;
    }

    if (_assetUnfilledAmount.lt(sellNowAssetAmount)) {
      setSellNowTokenAmount(BigNumber.from("0"));
      setSellNowUnfilledAssetAmount(_assetUnfilledAmount);
      setSellNowOrderIdsToFill(undefined);
    } else {
      setSellNowTokenAmount(tokenAmountToSpend);
      setSellNowUnfilledAssetAmount(_assetUnfilledAmount);
      setSellNowOrderIdsToFill(newOrderIdsToFill);
    }
  }, [sellNowAssetAmount, buyOrders]);

  useEffect(() => {
    if (placeOrderAssetAmount.gt(BigNumber.from("0")) && Number(ethers.utils.formatEther(placeOrderPrice)) > 0) {
      setEnablePlaceOrderButton(true);
    } else {
      setEnablePlaceOrderButton(false);
    }
  }, [placeOrderAssetAmount, placeOrderPrice]);

  const sellNow = () => {
    if (exchange === undefined || sellNowOrderIdsToFill === undefined) return;

    setSellNowPending(true);

    transaction(() => exchange.fillBuyOrder(sellNowOrderIdsToFill, sellNowAssetAmount, sellNowTokenAmount), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, () => resetValues(), () => setSellNowPending(false));
  };

  const sellNowApprove = () => {
    if (
      contentContract === undefined ||
      exchange === undefined ||
      nftEscrow === undefined
    ) return;

    setSellNowPending(true);

    transaction(() => contentContract.setApprovalForAll(nftEscrow.address, true), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, () => setAssetApproved(true), () => setSellNowPending(false));
  }

  const placeOrder = () => {
    if (exchange === undefined || assetWithOrders === undefined || web3.account === undefined || supportedToken === undefined) return;
    const account: string = web3.account;

    setPlaceOrderPending(true);

    if (web3.account !== undefined) {
      transaction(() => exchange.placeOrder({
        asset: {
          contentAddress: assetWithOrders.parentContract,
          tokenId: assetWithOrders.tokenId
        },
        owner: account,
        token: supportedToken.address,
        price: placeOrderPrice,
        amount: placeOrderAssetAmount,
        isBuyOrder: false
      }), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, () => resetValues(), () => setPlaceOrderPending(false));
    }
  }

  const placeOrderApprove = () => {
    if (
      contentContract === undefined ||
      exchange === undefined ||
      nftEscrow === undefined
    ) return;

    setPlaceOrderPending(true);

    transaction(() => contentContract.setApprovalForAll(nftEscrow.address, true), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, () => setAssetApproved(true), () => setPlaceOrderPending(false));
  }

  const resetValues = () => {
    setSellNowAssetAmountString("0");
    setPlaceOrderAssetAmountString("0");
    setPlaceOrderPriceString("0");
  }

  if (show) {
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-2 bg-black450 my-1 mx-4 p-4 rounded-lg">
          <div className="flex mx-2 text-lg">
            Instant Sell
          </div>
          <div />
          <div className="flex mt-3 mx-2 text-xsm justify-center text-black200">
            Amount
          </div>
          <div>
            <InputNumber
              value={sellNowAssetAmountString}
              disabled={false}
              onChange={e => setSellNowAssetAmountString(e)}
              className="bg-black500 text-black200 m-2 p-2 rounded-lg w-48"
            />
          </div>
          <div className="flex justify-center mx-2 mt-8 text-black200">
            {`Total: ${ethers.utils.formatUnits(sellNowTokenAmount.toString(), supportedToken?.decimals)} ${supportedToken ? supportedToken.symbol : 'DAI'}`}
          </div>
          <div className="flex flex-col flex-grow">
            <TradeAssetStatus show={showSellNowStatus} status={sellNowStatus} />
            <div className="flex flex-grow justify-center">
              <Button
                label="APPROVE"
                onClick={() => sellNowApprove()}
                enabled={enableSellNowApproveButton}
                show={showSellNowApproveButton}
                enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 m-2 py-1 rounded-lg w-48"
                disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 m-2 py-1 rounded-lg w-48"
              />
              <Button
                label="SELL NOW"
                onClick={sellNow}
                enabled={enableSellNowButton}
                show={showSellNowButton}
                enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 m-2 py-1 rounded-lg w-48"
                disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 m-2 py-1 rounded-lg w-48"
              />
              <Loader show={showSellNowLoader} />
            </div>
          </div>
        </div>
        <div className="bg-black450 my-1 mx-4 p-4 rounded-lg">
          <div className="grid grid-cols-2">
            <div className="flex mx-2 text-lg">
              Sell Order
            </div>
            <div />
            <div className="flex mt-3 mx-2 text-xsm justify-center text-black200">
              Amount
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <InputNumber
                  value={placeOrderAssetAmountString}
                  disabled={false}
                  onChange={e => setPlaceOrderAssetAmountString(e)}
                  className="bg-black500 text-black200 m-2 p-2 rounded-lg w-48"
                />
              </div>
            </div>
            <div className="flex mt-3 mx-2 text-xsm justify-center text-black200">
              Price
            </div>
            <div className="flex flex-col">
              <InputAmount
                value={placeOrderPriceString}
                decimals={6}
                disabled={false}
                onChange={e => setPlaceOrderPriceString(e)}
                className="bg-black500 text-black200 m-2 p-2 rounded-lg w-48"
              />
              <div className="flex text-xsm text-black200 ml-2">
                {`Total: ${ethers.utils.formatUnits(placeOrderTokenAmount.toString(), supportedToken?.decimals)} ${supportedToken ? supportedToken.symbol : 'DAI'}`}
              </div>
            </div>
          </div>
          <TradeAssetStatus show={showPlaceOrderStatus} status={placeOrderStatus} />
          <div className="flex justify-center">
            <Button
              label="CONFIRM SELL ORDER"
              onClick={placeOrder}
              enabled={enablePlaceOrderButton}
              show={showPlaceOrderButton}
              enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 py-1 m-2 rounded-lg w-48"
              disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 py-1 m-2 rounded-lg w-48"
            />
            <Button
              label="APPROVE"
              onClick={() => placeOrderApprove()}
              enabled={enablePlaceOrderApproveButton}
              show={showPlaceOrderApproveButton}
              enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 m-2 py-1 rounded-lg w-48"
              disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 m-2 py-1 rounded-lg w-48"
            />
            <Loader show={showPlaceOrderLoader} />
          </div>
        </div>
      </div>
    );
  } else {
    return (null);
  }
}

export default SellAsset;