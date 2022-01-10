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
      <div className="flex text-black200 ml-4 text-sm mt-1">
        {`${ethers.utils.formatUnits(supportedTokenBalance.toString(), supportedToken?.decimals)} ${supportedToken?.symbol}`}
      </div>
    );
  }
}

function TradeAssetModal({
  show,
  setShow,
  initialBuyMode,
  assetWithOrders
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  initialBuyMode: boolean,
  assetWithOrders: AssetWithOrders | undefined
}) {
  const web3 = useWeb3();

  const [buyMode, setBuyMode] = useState(true);
  useEffect(() => {
    setBuyMode(initialBuyMode);
  }, [initialBuyMode]);

  const [contentContract, setContentContract] = useState<Content>();
  useEffect(() => {
    if (assetWithOrders === undefined || web3.signerOrProvider === undefined) return;

    setContentContract(Content__factory.connect(assetWithOrders.parentContract, web3.signerOrProvider));
  }, [assetWithOrders, web3.signerOrProvider]);

  const [assetBalance, setAssetBalance] = useState<BigNumber>();

  const updateAssetBalance = () => {
    if (contentContract === undefined || web3.account === undefined || assetWithOrders === undefined) return;

    contentContract.balanceOf(web3.account, assetWithOrders.tokenId)
      .then((balance) => {
        if (balance !== undefined) {
          setAssetBalance(balance);
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (contentContract === undefined || web3.account === undefined || assetWithOrders === undefined) return;

    contentContract.balanceOf(web3.account, assetWithOrders.tokenId)
      .then((balance) => {
        if (balance !== undefined) {
          setAssetBalance(balance);
        }
      })
      .catch((error) => console.error(error));
  }, [contentContract, assetWithOrders, web3.account]);

  if (assetWithOrders === undefined) {
    return (
      <Modal isOpen={show} setIsOpen={setShow} forceOpen={false}>
        <div className="flex flex-col bg-gray">
          <div className="text-offWhite text-xl">
            Asset not found
          </div>
        </div>
      </Modal >
    );
  } else {
    return (
      <Modal isOpen={show} setIsOpen={setShow} forceOpen={false}>
        <div className="flex flex-col bg-gray">
          <div className="flex flex-grow mb-4 justify-center">
            <img src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="w-1/2" />
          </div>
          <div className="text-offWhite text-xl ml-4 mt-4">
            {assetWithOrders.name}
          </div>
          {assetBalance ? <div className="text-black200 text-sm ml-4">
            Qty {assetBalance?.toString()}
          </div> : null}
          {assetWithOrders.currentSupply ? <div className="text-black200 text-sm ml-4">
            Ecosystem Supply: {Number(assetWithOrders.currentSupply)}
          </div> : null}
          <SupportedTokenBalance />
          <div className="flex bg-black my-1 mx-4 rounded-lg">
            <Button
              label="BUY"
              onClick={() => setBuyMode(true)}
              enabled={!buyMode}
              show={true}
              enabledClassName="flex flex-grow justify-center text-semanticGreen text-sm bg-black m-2 py-2 rounded-lg"
              disabledClassName="flex flex-grow justify-center text-black text-sm bg-semanticGreen m-2 py-2 rounded-lg"
            />
            <Button
              label="SELL"
              onClick={() => setBuyMode(false)}
              enabled={buyMode}
              show={true}
              enabledClassName="flex flex-grow justify-center text-semanticRed text-sm bg-black m-2 py-2 rounded-lg"
              disabledClassName="flex flex-grow justify-center text-black text-sm bg-semanticRed m-2 py-2 rounded-lg"
            />
          </div>
          <BuyAsset show={buyMode} assetWithOrders={assetWithOrders} updateAssetBalanceCallback={updateAssetBalance} />
          <SellAsset show={!buyMode} assetWithOrders={assetWithOrders} updateAssetBalanceCallback={updateAssetBalance} />
          <OrderBook assetWithOrders={assetWithOrders} showInTheMarketplace={true} showBuyAndSellButtons={true} tradeAsset={undefined} />
        </div>
      </Modal >
    );
  }
}

export default TradeAssetModal;