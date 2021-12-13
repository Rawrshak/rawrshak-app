import AssetCard from "./AssetCard";
import TradeAssetModal from "./TradeAssetModal";
import AssetModal from "./AssetModal";
import { useData } from '../data';
import { useState } from 'react';
import { AssetWithOrders } from "../data/data"

function FeaturedAssets() {
  const { featuredAssetsWithOrders } = useData();

  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [activeTradeAsset, setActiveTradeAsset] = useState<AssetWithOrders>();
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [activeAsset, setActiveAsset] = useState<AssetWithOrders>();

  const buyNow = (assetWithOrders: AssetWithOrders) => {
    setShowTradeAssetModal(true);
    setShowAssetModal(false);
    setActiveTradeAsset(assetWithOrders);
  }

  const openAsset = (assetWithOrders: AssetWithOrders) => {
    setShowAssetModal(true);
    setShowTradeAssetModal(false);
    setActiveAsset(assetWithOrders);
  }

  if (featuredAssetsWithOrders === undefined) {
    return (null);
  } else {
    return (
      <div className="flex flex-grow flex-col m-4">
        <div className="flex text-offWhite text-xxxl my-2 ml-4">
          Featured Assets
        </div>
        <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} assetWithOrders={activeTradeAsset} />
        <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={activeAsset} tradeAsset={buyNow} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featuredAssetsWithOrders.map(featuredAsset => (
            <AssetCard key={featuredAsset.id} assetWithOrders={featuredAsset} buyNow={buyNow} openAsset={openAsset} />
          ))}
        </div>
      </div>
    )
  }
}

export default FeaturedAssets;