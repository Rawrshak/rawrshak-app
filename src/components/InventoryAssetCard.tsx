import { useEffect, useState } from "react";
import { AssetWithOrders } from "../data/data";
import TradeAssetModal from "./TradeAssetModal";
import audioIcon from '../assets/icons/audioIcon.png';
import contentIcon from '../assets/icons/contentIcon.png';
import imageIcon from '../assets/icons/imageIcon.png';
import static3dObjectIcon from '../assets/icons/static3dObjectIcon.png';
import textIcon from '../assets/icons/textIcon.png';
import { Content, Content__factory } from '../assets/typechain';
import { useWeb3 } from '../web3';
import { useHistory } from "react-router-dom";

function InventoryAssetCard({
  assetWithOrders
}: {
  assetWithOrders: AssetWithOrders,
}) {
  const web3 = useWeb3();
  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [initialBuyMode] = useState(true);
  const [typeIcon, setTypeIcon] = useState<any>();
  const [contentContract, setContentContract] = useState<Content>();
  const [collectionName, setCollectionName] = useState(true);
  const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';
  const history = useHistory();

  // Todo: these are stop-gap measures. Currently, if the graph doesn't pick up the IPFS metadata, 
  // some information will be empty. In order to combat that, we're querying for the parent contract 
  // metadata name here. We'll remove this once Arweave is supported on TheGraph

  const openNewAssetPage = (id:string) => {
    history.push('/inventory/asset/'.concat(id));
  }
  
  useEffect(() => {
    if (assetWithOrders === undefined || web3.signerOrProvider === undefined || assetWithOrders.game !== null) return;

    setContentContract(Content__factory.connect(assetWithOrders.parentContract, web3.signerOrProvider));
  }, [assetWithOrders, web3.signerOrProvider]);

  useEffect(() => {
    if (contentContract === undefined || assetWithOrders === undefined || assetWithOrders.game !== null) return;

    contentContract.contractUri()
      .then(uri => {
        fetch(urlPrefix + uri)
          .then(response => response.json())
          .then(data => {
            setCollectionName(data.name);
          });
      })
      .catch((error) => console.error(error));
  }, [assetWithOrders, contentContract]);

  useEffect(() => {
    if (assetWithOrders.type === "audio") {
      setTypeIcon(audioIcon);
    } else if (assetWithOrders.type === "image") {
      setTypeIcon(imageIcon);
    } else if (assetWithOrders.type === "static3dobject") {
      setTypeIcon(static3dObjectIcon);
    } else if (assetWithOrders.type === "text") {
      setTypeIcon(textIcon);
    } else {
      setTypeIcon(contentIcon);
    }
  }, [assetWithOrders]);

  return (
    <>
      <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} initialBuyMode={initialBuyMode} assetWithOrders={assetWithOrders} />
      <div className="flex flex-col flex-grow h-44 m-3 bg-black400 rounded-xl cursor-pointer" onClick={() => openNewAssetPage(assetWithOrders.id)}>
        <div className="grid grid-cols-5">
          <div className="col-span-4 h-6 text-offWhite text-sm ml-4 mt-1 truncate ...">
            {assetWithOrders.name}
          </div>
          <div className="flex col-span-1 justify-end">
            <img
              src={typeIcon}
              alt=" "
              className={"h-5 mt-2 mr-3"}
            />
          </div>
        </div>
        <div className="flex justify-center h-24 text-offWhite text-xxl mt-1 mx-4 rounded-xl">
          <img src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="flex object-scale-down" />
        </div>
        <div className="h-5 text-offWhite text-sm mx-4">
          {'Qty: ' + assetWithOrders.balance}
        </div>
        <div className="h-5 text-offWhite text-sm mx-4 truncate ...">
          {assetWithOrders.game === null ? collectionName : assetWithOrders.game}
        </div>
      </div>
    </>
  );
}

export default InventoryAssetCard;

