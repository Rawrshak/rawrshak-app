// import FeaturedAsset from "./FeaturedAsset";
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
    setActiveTradeAsset(assetWithOrders);
  }

  const openAsset = (assetWithOrders: AssetWithOrders) => {
    setShowAssetModal(true);
    setActiveAsset(assetWithOrders);
  }

  if (featuredAssetsWithOrders === undefined) {
    return (null);
  } else {
    return (
      <div className="flex flex-grow flex-col m-4">
        <div className="flex text-offWhite text-xxxl m-2">
          Featured Assets
        </div>
        <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} assetWithOrders={activeTradeAsset} />
        <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={activeAsset} tradeAsset={buyNow} />
        <div className="flex flex-wrap">
          {featuredAssetsWithOrders.map(featuredAsset => (
            <AssetCard key={featuredAsset.id} assetWithOrders={featuredAsset} buyNow={buyNow} openAsset={openAsset} />
          ))}
        </div>
      </div>
    )
  }
}

export default FeaturedAssets;