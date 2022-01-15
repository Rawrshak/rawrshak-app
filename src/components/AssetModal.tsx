import { useState, useEffect } from "react";
import { AssetWithOrders } from "../data/data"
import OrderBook from "./OrderBook";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import X from '../assets/icons/X';
import Image from "./Image";
import { Content, Content__factory } from '../assets/typechain';
import { useWeb3 } from '../web3';
import { BigNumber, ethers } from "ethers";

function AssetModal({
  show,
  setShow,
  assetWithOrders,
  tradeAsset
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  assetWithOrders: AssetWithOrders | undefined,
  tradeAsset: (buyMode: boolean) => void
}) {
  const web3 = useWeb3();
  const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';
  const [assetUri, setAssetUri] = useState<string>();
  const [contentContract, setContentContract] = useState<Content>();
  const [description, setDescription] = useState<string | undefined>();
  const [nsfw, setNsfw] = useState<boolean | undefined>();
  const [assetBalance, setAssetBalance] = useState<BigNumber>();

  useEffect(() => {
    if (assetWithOrders === undefined || web3.signerOrProvider === undefined || show === false) return;

    setContentContract(Content__factory.connect(assetWithOrders.parentContract, web3.signerOrProvider));
  }, [assetWithOrders, web3.signerOrProvider, show]);

  useEffect(() => {
    if (contentContract === undefined || assetWithOrders === undefined || assetUri !== undefined) return;

    contentContract["uri(uint256)"](assetWithOrders.tokenId)
      .then(uri => {
        setAssetUri(uri);
      })
      .catch((error) => console.error(error));
  }, [assetUri, assetWithOrders, contentContract]);

  useEffect(() => {
    if (assetUri === undefined) return;
    
    // Todo: if assetUri is empty, query the blockchain for the asset uri instead.
    fetch(urlPrefix + assetUri)
      .then(response => response.json())
      .then(data => {
        setDescription(data.description);
        setNsfw(data.nsfw);
      })
      .catch(error => console.error(error));
  }, [assetUri]);


  useEffect(() => {
    if (contentContract === undefined || web3.account === undefined || assetWithOrders === undefined) return;

    contentContract.balanceOf(web3.account, assetWithOrders.tokenId)
      .then((balance) => {
        setAssetBalance(balance);
      })
      .catch((error) => console.error(error));
  }, [contentContract, assetWithOrders, web3.account]);

  const calculateMax = (maxSupply: string) => {
    if (maxSupply === ethers.constants.MaxUint256.toString()) {
      return "MAX"
    } else {
      return Number(maxSupply);
    }
  }

  if (assetWithOrders === undefined) {
    return (null);
  } else {
    return (
      <SlidingPane
        className="flex bg-gray"
        overlayClassName="sliding-pane"
        isOpen={show}
        onRequestClose={() => { setShow(false) }}
        width="40%"
        hideHeader={true}
      >
        <div className="flex flex-grow flex-col">
          <div className="flex justify-start mb-4">
            <button className="focus:outline-none p-1" onClick={() => setShow(false)}>
              <X />
            </button>
          </div>
          <div className="flex mb-12 justify-center">
            <Image src={assetWithOrders.imageUri} className="flex w-1/3 cursor-pointer" type="content" />
          </div>
          <div className="flex flex-grow flex-col bg-black450 mx-4 my-2 px-4 py-2 rounded-lg">
            <div className="text-offWhite text-lg mb-2 ml-1">
              {assetWithOrders.name}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Description: {description}
            </div>
            {assetBalance !== undefined ? <div className="text-black200 text-sm ml-1">
              Qty {(assetBalance).toString()}
            </div> : null}
            <div className="flex text-black200 text-sm ml-1">
              Supply: {Number(assetWithOrders.currentSupply)}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Max Supply: {calculateMax(assetWithOrders.maxSupply)}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Collection: {assetWithOrders.game}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Contract Address: {assetWithOrders.parentContract}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Token ID: {assetWithOrders.tokenId}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Type: {assetWithOrders.type}
            </div>
            <div className="flex text-black200 text-sm ml-1">
              Subtype: {assetWithOrders.subtype}
            </div>
            {nsfw !== undefined ? <div className="flex text-black200 text-sm ml-1">
              NSFW: {nsfw ? "TRUE" : "FALSE"}
            </div> : null}
            {assetUri !== undefined ? <div className="flex flex-grow flex-wrap break-all text-black200 text-sm ml-1">
              URI: {assetUri}
            </div> : null}
            <div className="flex flex-wrap my-1">
              {assetWithOrders.tags.map(tag => (
                <div key={tag} className="flex flex-shrink text-offWhite text-sm bg-gray rounded-xl m-1 px-2 py-1 border-2 border-neutral600">
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <OrderBook assetWithOrders={assetWithOrders} showInTheMarketplace={true} showBuyAndSellButtons={true} tradeAsset={tradeAsset} />
        </div>
      </SlidingPane >
    );
  }
}

export default AssetModal;