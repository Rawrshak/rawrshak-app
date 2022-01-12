import { useEffect, useState } from "react";
import { AssetWithOrders } from "../data/data";
import TradeAssetModal from "./TradeAssetModal";
import AssetModal from "./AssetModal";
import audioIcon from '../assets/icons/audioIcon.png';
import contentIcon from '../assets/icons/contentIcon.png';
import imageIcon from '../assets/icons/imageIcon.png';
import static3dObjectIcon from '../assets/icons/static3dObjectIcon.png';
import textIcon from '../assets/icons/textIcon.png';

function InventoryAssetCard({
  assetWithOrders
}: {
  assetWithOrders: AssetWithOrders,
}) {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [initialBuyMode, setInitialBuyMode] = useState(true);
  const [typeIcon, setTypeIcon] = useState<any>();

  const openAssetModal = () => {
    setShowAssetModal(true);
    setShowTradeAssetModal(false);
  }

  const openTradeAssetModal = (buyMode: boolean) => {
    setShowAssetModal(false);
    setShowTradeAssetModal(true);
    setInitialBuyMode(buyMode);
  }

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
      <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={assetWithOrders} tradeAsset={openTradeAssetModal} />
      <div className="flex flex-col flex-grow h-44 m-3 bg-black400 rounded-xl cursor-pointer" onClick={() => openAssetModal()}>
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
          Qty x{assetWithOrders.balance}
        </div>
        <div className="h-5 text-offWhite text-sm mx-4 truncate ...">
          {assetWithOrders.game}
        </div>
      </div>
    </>
  );
}

export default InventoryAssetCard;

