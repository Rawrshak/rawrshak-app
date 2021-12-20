import { useEffect, useState } from "react";
import { useData } from '../data';
import { AssetWithOrders, Order } from "../data/data"
import { ethers, BigNumber } from "ethers";
import { useTransaction } from "../web3/transactions";
import { useWeb3 } from '../web3';
import Button from "./Button";
import { InputNumber, InputAmount } from "./Input";
import Loader from "./Loader";

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

function BuyAsset({
  show,
  assetWithOrders
}: {
  show: boolean,
  assetWithOrders: AssetWithOrders | undefined
}) {
  const [transaction] = useTransaction();
  const web3 = useWeb3();

  const {
    systemContracts: { exchange, erc20Escrow },
    supportedToken,
    supportedTokenBalance,
    supportedTokenAllowance,
  } = useData();

  const [buyNowOrderIdsToFill, setBuyNowOrderIdsToFill] = useState<BigNumber[]>();
  const [buyNowAssetAmount, setBuyNowAssetAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [buyNowAssetAmountString, setBuyNowAssetAmountString] = useState<string>("0");
  const [buyNowUnfilledAssetAmount, setBuyNowUnfilledAssetAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [buyNowTokenAmount, setBuyNowTokenAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [buyNowPending, setBuyNowPending] = useState<boolean>(false);
  const [placeOrderPrice, setPlaceOrderPrice] = useState<BigNumber>(BigNumber.from("0"));
  const [placeOrderPriceString, setPlaceOrderPriceString] = useState<string>("0");
  const [placeOrderAssetAmount, setPlaceOrderAssetAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [placeOrderAssetAmountString, setPlaceOrderAssetAmountString] = useState<string>("0");
  const [placeOrderTokenAmount, setPlaceOrderTokenAmount] = useState<BigNumber>(BigNumber.from("0"));
  const [placeOrderPending, setPlaceOrderPending] = useState<boolean>(false);
  const [sellOrders, setSellOrders] = useState<Order[] | undefined>();
  const [showBuyNowButton, setShowBuyNowButton] = useState<boolean>(false);
  const [enableBuyNowButton, setEnableBuyNowButton] = useState<boolean>(false);
  const [showBuyNowApproveButton, setShowBuyNowApproveButton] = useState<boolean>(false);
  const [enableBuyNowApproveButton, setEnableBuyNowApproveButton] = useState<boolean>(false);
  const [showBuyNowLoader, setShowBuyNowLoader] = useState<boolean>(false);
  const [showBuyNowStatus, setShowBuyNowStatus] = useState<boolean>(false);
  const [buyNowStatus, setBuyNowStatus] = useState<string>("");
  const [showPlaceOrderButton, setShowPlaceOrderButton] = useState<boolean>(true);
  const [enablePlaceOrderButton, setEnablePlaceOrderButton] = useState<boolean>(false);
  const [showPlaceOrderApproveButton, setShowPlaceOrderApproveButton] = useState<boolean>(false);
  const [enablePlaceOrderApproveButton, setEnablePlaceOrderApproveButton] = useState<boolean>(false);
  const [showPlaceOrderStatus, setShowPlaceOrderStatus] = useState<boolean>(false);
  const [placeOrderStatus, setPlaceOrderStatus] = useState<string>("");
  const [showPlaceOrderLoader, setShowPlaceOrderLoader] = useState<boolean>(false);

  useEffect(() => {
    if (buyNowAssetAmountString === "") {
      setBuyNowAssetAmount(BigNumber.from("0"));
    } else {
      setBuyNowAssetAmount(BigNumber.from(buyNowAssetAmountString));
    }
  }, [buyNowAssetAmountString]);

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

    setSellOrders((assetWithOrders.orders
      .filter(order => order.type === "Sell" && order.cancelledAtTimestamp.toString() === "0" && order.filledAtTimestamp.toString() === "0"))
      .sort((firstOrder, secondOrder) => {
        if ((firstOrder.price).gt(secondOrder.price)) {
          return 0;
        } else if ((firstOrder.price).lt(secondOrder.price)) {
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

  useEffect(() => {
    if (buyNowTokenAmount === undefined || supportedTokenAllowance === undefined || supportedTokenBalance === undefined) return;

    if (!buyNowPending) {
      if (buyNowAssetAmount.gt(BigNumber.from("0"))) {
        if (supportedTokenBalance.gte(buyNowTokenAmount)) {
          if (buyNowAssetAmount.gt(buyNowUnfilledAssetAmount)) {
            // Unfillable with buy now
            setEnableBuyNowButton(false);
            setEnableBuyNowApproveButton(false);
            setShowBuyNowApproveButton(false);
            setEnableBuyNowApproveButton(false);
            setShowBuyNowLoader(false);
            setShowBuyNowStatus(true);
            setBuyNowStatus("Quantity cannot be filled");
          } else {
            // Fillable with buy now
            if (buyNowTokenAmount.gt(supportedTokenAllowance)) {
              // Need to approve
              setShowBuyNowButton(false);
              setEnableBuyNowButton(false);
              setShowBuyNowApproveButton(true);
              setEnableBuyNowApproveButton(true);
              setShowBuyNowLoader(false);
              setShowBuyNowStatus(false);
              setBuyNowStatus("");
            } else {
              // All good to Buy Now
              setShowBuyNowButton(true);
              setEnableBuyNowButton(true);
              setShowBuyNowApproveButton(false);
              setEnableBuyNowApproveButton(false);
              setShowBuyNowLoader(false);
              setShowBuyNowStatus(false);
              setBuyNowStatus("");
            }
          }
        } else {
          // User doesn't have enough tokens to buy
          setShowBuyNowButton(true);
          setEnableBuyNowButton(false);
          setShowBuyNowApproveButton(false);
          setEnableBuyNowApproveButton(false);
          setShowBuyNowLoader(false);
          setShowBuyNowStatus(true);
          setBuyNowStatus("Not enough tokens");
        }
      } else {
        setShowBuyNowButton(true);
        setEnableBuyNowButton(false);
        setShowBuyNowApproveButton(false);
        setEnableBuyNowApproveButton(false);
        setShowBuyNowLoader(false);
        setShowBuyNowStatus(false);
        setBuyNowStatus("");
      }
    } else {
      setShowBuyNowButton(false);
      setEnableBuyNowButton(false);
      setShowBuyNowApproveButton(false);
      setEnableBuyNowApproveButton(false);
      setShowBuyNowLoader(true);
      setShowBuyNowStatus(false);
      setBuyNowStatus("");
    }
  }, [buyNowTokenAmount, supportedTokenAllowance, supportedTokenBalance, buyNowUnfilledAssetAmount, buyNowAssetAmount, buyNowPending]);

  useEffect(() => {
    if (supportedTokenBalance === undefined || supportedTokenAllowance === undefined) return;

    if (!placeOrderPending) {
      if (placeOrderTokenAmount.gt(BigNumber.from("0"))) {
        if (supportedTokenBalance.gte(placeOrderTokenAmount)) {
          if (placeOrderTokenAmount.gt(supportedTokenAllowance)) {
            // Need to approve token transfer
            setShowPlaceOrderButton(false);
            setEnablePlaceOrderButton(false);
            setShowPlaceOrderApproveButton(true);
            setEnablePlaceOrderApproveButton(true);
            setShowPlaceOrderLoader(false);
            setShowPlaceOrderStatus(false);
            setPlaceOrderStatus("");
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
          setPlaceOrderStatus("Not enough tokens");
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
  }, [placeOrderTokenAmount, supportedTokenAllowance, supportedTokenBalance, placeOrderPending]);

  useEffect(() => {
    if (sellOrders === undefined) return;

    let index = 0;
    let _assetUnfilledAmount = BigNumber.from("0");
    let tokenAmountToSpend = BigNumber.from("0");
    let newOrderIdsToFill = [];

    while (_assetUnfilledAmount.lt(buyNowAssetAmount) && index < sellOrders.length) {
      const orderUnfilledAmount = sellOrders[index].amountOrdered.sub(sellOrders[index].amountFilled);

      let amountToFillFromOrder: BigNumber;
      if (orderUnfilledAmount.lte(buyNowAssetAmount.sub(_assetUnfilledAmount))) {
        // Fill the entire order
        amountToFillFromOrder = orderUnfilledAmount;
      } else {
        // Partially fill the order
        amountToFillFromOrder = buyNowAssetAmount.sub(_assetUnfilledAmount);
      }

      newOrderIdsToFill.push(sellOrders[index].id);
      tokenAmountToSpend = tokenAmountToSpend.add(BigNumber.from(amountToFillFromOrder).mul(BigNumber.from(sellOrders[index].price)));
      _assetUnfilledAmount = _assetUnfilledAmount.add(amountToFillFromOrder);
      index++;
    }

    if (_assetUnfilledAmount.lt(buyNowAssetAmount)) {
      setBuyNowTokenAmount(BigNumber.from("0"));
      setBuyNowUnfilledAssetAmount(_assetUnfilledAmount);
      setBuyNowOrderIdsToFill(undefined);
    } else {
      setBuyNowTokenAmount(tokenAmountToSpend);
      setBuyNowUnfilledAssetAmount(_assetUnfilledAmount);
      setBuyNowOrderIdsToFill(newOrderIdsToFill);
    }
  }, [buyNowAssetAmount, sellOrders]);

  useEffect(() => {
    if (placeOrderAssetAmount.gt(BigNumber.from("0")) && Number(ethers.utils.formatEther(placeOrderPrice)) > 0) {
      setEnablePlaceOrderButton(true);
    } else {
      setEnablePlaceOrderButton(false);
    }
  }, [placeOrderAssetAmount, placeOrderPrice]);

  const buyNow = () => {
    if (exchange === undefined || buyNowOrderIdsToFill === undefined) return;

    setBuyNowPending(true);

    transaction(() => exchange.fillSellOrder(buyNowOrderIdsToFill, buyNowAssetAmount, buyNowTokenAmount), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, () => resetValues(), () => setBuyNowPending(false));
  };

  const buyNowApprove = (approveAmountBn: BigNumber | undefined) => {
    if (supportedToken === undefined || exchange === undefined || erc20Escrow === undefined || approveAmountBn === undefined) return;

    setBuyNowPending(true);

    transaction(() => supportedToken.contract.approve(erc20Escrow.address, approveAmountBn), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, () => setBuyNowPending(false));
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
        isBuyOrder: true
      }), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, () => resetValues(), () => setPlaceOrderPending(false));
    }
  }

  const placeOrderApprove = (approveAmountBn: BigNumber | undefined) => {
    if (supportedToken === undefined || exchange === undefined || erc20Escrow === undefined || approveAmountBn === undefined) return;

    setPlaceOrderPending(true);

    transaction(() => supportedToken.contract.approve(erc20Escrow.address, approveAmountBn), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, () => setPlaceOrderPending(false));
  }

  const resetValues = () => {
    setBuyNowAssetAmountString("0");
    setPlaceOrderAssetAmountString("0");
    setPlaceOrderPriceString("0");
  }

  if (show) {
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-2 bg-black450 my-1 mx-4 p-4 rounded-lg">
          <div className="flex mx-2 text-lg">
            Instant Buy
          </div>
          <div />
          <div className="flex mt-3 mx-2 text-xsm text-black200 justify-center">
            Amount
          </div>
          <div>
            <InputNumber
              value={buyNowAssetAmountString}
              disabled={false}
              onChange={e => setBuyNowAssetAmountString(e)}
              className="bg-black500 text-black200 m-2 p-2 rounded-lg w-48"
            />
          </div>
          <div className="flex justify-center mx-2 mt-8 text-black200">
            {`Total: ${ethers.utils.formatUnits(buyNowTokenAmount.toString(), supportedToken?.decimals)} ${supportedToken ? supportedToken.symbol : 'DAI'}`}
          </div>
          <div className="flex flex-col flex-grow">
            <TradeAssetStatus show={showBuyNowStatus} status={buyNowStatus} />
            <div className="flex flex-grow justify-center">
              <Button
                label="APPROVE"
                onClick={() => buyNowApprove(buyNowTokenAmount)}
                enabled={enableBuyNowApproveButton}
                show={showBuyNowApproveButton}
                enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 m-2 py-1 rounded-lg w-48"
                disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 m-2 py-1 rounded-lg w-48"
              />
              <Button
                label="BUY NOW"
                onClick={buyNow}
                enabled={enableBuyNowButton}
                show={showBuyNowButton}
                enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 m-2 py-1 rounded-lg w-48"
                disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 m-2 py-1 rounded-lg w-48"
              />
              <Loader show={showBuyNowLoader} />
            </div>
          </div>
        </div>
        <div className="bg-black450 my-1 mx-4 p-4 rounded-lg">
          <div className="grid grid-cols-2">
            <div className="flex mx-2 text-lg">
              Buy Order
            </div>
            <div />
            <div className="flex mt-3 mx-2 text-xsm text-black200 justify-center">
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
            <div className="flex mt-3 mx-2 text-xsm text-black200 justify-center">
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
              <div className="flex text-xsm ml-2 text-black200">
                {`Total: ${ethers.utils.formatUnits(placeOrderTokenAmount.toString(), supportedToken?.decimals)} ${supportedToken ? supportedToken.symbol : 'DAI'}`}
              </div>
            </div>
          </div>
          <TradeAssetStatus show={showPlaceOrderStatus} status={placeOrderStatus} />
          <div className="flex justify-center">
            <Button
              label="CONFIRM BUY ORDER"
              onClick={placeOrder}
              enabled={enablePlaceOrderButton}
              show={showPlaceOrderButton}
              enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 py-1 m-2 rounded-lg w-48"
              disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 py-1 m-2 rounded-lg w-48"
            />
            <Button
              label="APPROVE"
              onClick={() => placeOrderApprove(placeOrderTokenAmount)}
              enabled={enablePlaceOrderApproveButton}
              show={showPlaceOrderApproveButton}
              enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 m-2 w-48 py-1 rounded-lg"
              disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 m-2 py-1 w-48 rounded-lg"
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

export default BuyAsset;