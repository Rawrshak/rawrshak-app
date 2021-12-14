import { useData } from '../data';
import InventoryAssetCard from "./InventoryAssetCard";

function Inventory() {
  const { inventoryAssetsWithOrders } = useData();

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
        <div className="container mx-lg">
          <div className="text-offWhite text-xxxl">
            My Inventory
          </div>
          <div className="flex flex-wrap mt-6">
            {inventoryAssetsWithOrders.map((inventoryAssetWithOrders) => (
              <InventoryAssetCard
                key={inventoryAssetWithOrders.id}
                assetWithOrders={inventoryAssetWithOrders}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;