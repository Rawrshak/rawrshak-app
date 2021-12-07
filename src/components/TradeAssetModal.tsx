import Modal from "./Modal";
import BuyAsset from "./BuyAsset";
import SellAsset from "./SellAsset";
import Button from "./Button";
import OrderBook from "./OrderBook";
import { AssetWithOrders } from "../data/data";
import { useState, useEffect } from "react";
import { useData } from '../data';
import { ethers, BigNumber } from "ethers";
import { useWeb3 } from '../web3';
import { Content, Content__factory } from '../assets/typechain';

function SupportedTokenBalance() {
  const { supportedToken, supportedTokenBalance } = useData();

  if (supportedToken === undefined || supportedTokenBalance === undefined) {
    return (null);
  } else {
    return (
      <div className="flex text-offWhite mx-4 mt-1">
        {`${ethers.utils.formatUnits(supportedTokenBalance.toString(), supportedToken?.decimals)} ${supportedToken?.symbol}`}
      </div>
    );
  }
}

function TradeAssetModal({
  show,
  setShow,
  assetWithOrders
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  assetWithOrders: AssetWithOrders | undefined
}) {
  const web3 = useWeb3();
  const [buyMode, setBuyMode] = useState(true);

  const [contentContract, setContentContract] = useState<Content>();
  useEffect(() => {
    if (assetWithOrders === undefined || web3.signerOrProvider === undefined) return;

    setContentContract(Content__factory.connect(assetWithOrders.parentContract, web3.signerOrProvider));
  }, [assetWithOrders, web3.signerOrProvider]);

  const [assetBalance, setAssetBalance] = useState<BigNumber>();
  useEffect(() => {
    if (contentContract === undefined) return;

    const updateAssetBalance = () => {
      if (contentContract === undefined || web3.account === undefined || assetWithOrders === undefined) return;

      contentContract.balanceOf(web3.account, assetWithOrders.tokenId)
        .then((balance) => {
          setAssetBalance(balance);
        })
        .catch((error) => console.error(error));
    }

    if (assetBalance === undefined) {
      updateAssetBalance();
    }

    const filter = contentContract.filters.TransferSingle();

    contentContract.on(filter, updateAssetBalance);
  }, [contentContract, assetWithOrders, web3.account, assetBalance]);

  if (assetWithOrders === undefined) {
    return (
      <Modal isOpen={show} setIsOpen={setShow}>
        <div className="flex flex-col bg-gray">
          <div className="text-offWhite text-xl">
            Asset not found
          </div>
        </div>
      </Modal >
    );
  } else {
    return (
      <Modal isOpen={show} setIsOpen={setShow}>
        <div className="flex flex-col bg-gray">
          <div className="flex mb-4 justify-center">
            <img src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="self-center" />
          </div>
          <SupportedTokenBalance />
          <div className="text-offWhite text-xl ml-4">
            {assetWithOrders.name}
          </div>
          <div className="text-offWhite text-xl ml-4">
            Qty {assetBalance?.toString()}
          </div>
          <div className="flex bg-black450 my-1 mx-4 p-1 rounded-lg">
            <Button
              label="BUY"
              onClick={() => setBuyMode(true)}
              enabled={!buyMode}
              show={true}
              enabledClassName="flex flex-grow justify-center text-chartreuse500 text-sm bg-black450 m-2 py-2 rounded-lg"
              disabledClassName="flex flex-grow justify-center text-chartreuse500 text-sm bg-black500 m-2 py-2 rounded-lg"
            />
            <Button
              label="SELL"
              onClick={() => setBuyMode(false)}
              enabled={buyMode}
              show={true}
              enabledClassName="flex flex-grow justify-center text-chartreuse500 text-sm bg-black450 m-2 py-2 rounded-lg"
              disabledClassName="flex flex-grow justify-center text-chartreuse500 text-sm bg-black500 m-2 py-2 rounded-lg"
            />
          </div>
          <BuyAsset show={buyMode} assetWithOrders={assetWithOrders} />
          <SellAsset show={!buyMode} assetWithOrders={assetWithOrders} />
          <OrderBook assetWithOrders={assetWithOrders} showInTheMarketplace={true} showBuyAndSellButtons={true} tradeAsset={undefined} />
        </div>
      </Modal >
    );
  }
}

export default TradeAssetModal;