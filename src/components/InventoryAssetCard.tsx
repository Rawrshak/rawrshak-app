import { useState } from "react";
import { AssetWithOrders } from "../data/data";
import TradeAssetModal from "./TradeAssetModal";
import AssetModal from "./AssetModal";

function AssetCard({
  assetWithOrders
}: {
  assetWithOrders: AssetWithOrders,
}) {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [initialBuyMode, setInitialBuyMode] = useState(true);

  const openAssetModal = () => {
    setShowAssetModal(true);
    setShowTradeAssetModal(false);
  }

  const openTradeAssetModal = (buyMode: boolean) => {
    setShowAssetModal(false);
    setShowTradeAssetModal(true);
    setInitialBuyMode(buyMode);
  }

  return (
    <>
      <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} initialBuyMode={initialBuyMode} assetWithOrders={assetWithOrders} />
      <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={assetWithOrders} tradeAsset={openTradeAssetModal} />
      <div className="flex flex-col h-44 w-64 m-3 bg-black400 rounded-xl cursor-pointer" onClick={() => openAssetModal()}>

        <div className="flex h-6 text-offWhite text-sm mx-4 mt-2">
          {assetWithOrders.name}
        </div>
        <div className="flex justify-center h-24 text-offWhite text-xxl mt-2 mx-4 rounded-xl">
          <img src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="flex object-scale-down" />
        </div>
        <div className="box-content h-8 text-offWhite text-sm mx-4 mt-2">
          Qty x{assetWithOrders.balance}
        </div>
      </div>
    </>
  );
}

export default AssetCard;

