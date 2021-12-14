import { useState, useEffect } from "react";
import { AssetWithOrders } from "../data/data"
import { BigNumber } from "ethers";
import OrderBook from "./OrderBook";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import X from '../assets/icons/X';
import Image from "./Image";
import { Content, Content__factory } from '../assets/typechain';
import { useWeb3 } from '../web3';

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
    fetch(urlPrefix + assetUri)
      .then(response => response.json())
      .then(data => {
        setDescription(data.description);
      })
      .catch(error => console.error(error));
  }, [assetUri]);

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
            <Image src={assetWithOrders.imageUri} className="flex cursor-pointer" type="content" />
          </div>
          <div className="flex flex-grow flex-col bg-black450 mx-4 my-2 px-4 py-2 rounded-lg">
            <div className="text-offWhite text-lg mb-2 ml-1">
              {assetWithOrders.name}
            </div>
            <AssetQuantity balance={assetWithOrders.balance} />
            <div className="flex text-offWhite text-sm ml-1">
              Description: {description}
            </div>
            <div className="flex text-offWhite text-sm ml-1">
              Type: {assetWithOrders.type}
            </div>
            <div className="flex text-offWhite text-sm ml-1">
              Subtype: {assetWithOrders.subtype}
            </div>
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
      </SlidingPane>
    );
  }
}

function AssetQuantity({
  balance
}: {
  balance: BigNumber | undefined
}) {
  if (balance === undefined) {
    return (null);
  } else {
    return (
      <div className="text-offWhite text-lg">
        Qty {balance.toString()}
      </div>
    );
  }
}

export default AssetModal;