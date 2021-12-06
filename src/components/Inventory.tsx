import { useEffect, useState } from 'react';
import { useData } from '../data';
import { AssetWithOrders } from "../data/data";
import InventoryAssetCard from "./InventoryAssetCard";
import AssetModal from "./AssetModal";
import TradeAssetModal from "./TradeAssetModal";

function Inventory() {
  const { inventoryAssetsWithOrders } = useData();

  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [openedAsset, setOpenedAsset] = useState<AssetWithOrders>();
  const [tradedAsset, setTradedAsset] = useState<AssetWithOrders>();

  useEffect(() => {
  }, [inventoryAssetsWithOrders]);

  const openAsset = (assetWithOrders: AssetWithOrders) => {
    setShowAssetModal(true);
    setOpenedAsset(assetWithOrders);
    setShowTradeAssetModal(false);
  }

  const tradeAsset = (assetWithOrders: AssetWithOrders) => {
    setShowTradeAssetModal(true);
    setTradedAsset(assetWithOrders);
    setShowAssetModal(false);
  }

  if (inventoryAssetsWithOrders === undefined) {
    return (
      <div className="container flex justify-center mt-6">
        <div className="container mx-lg">
          <div className="text-offWhite text-xxxl">
            My Inventory
          </div>
          <div className="text-offWhite text-xl">
            No items found
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container flex justify-center mt-6">
        <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} assetWithOrders={tradedAsset} />
        <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={openedAsset} tradeAsset={tradeAsset} />
        <div className="container mx-lg">
          <div className="text-offWhite text-xxxl">
            My Inventory
          </div>
          <div className="flex flex-wrap mt-6">
            {inventoryAssetsWithOrders.map((inventoryAssetWithOrders) => (
              <InventoryAssetCard
                key={inventoryAssetWithOrders.id}
                assetWithOrders={inventoryAssetWithOrders}
                tradeAsset={tradeAsset}
                openAsset={openAsset}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;