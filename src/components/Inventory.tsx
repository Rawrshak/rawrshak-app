import { useData } from '../data';
import InventoryAssetCard from "./InventoryAssetCard";

function Inventory() {
  const { inventoryAssetsWithOrders } = useData();

  if (inventoryAssetsWithOrders === undefined) {
    return (
      <div className="flex mt-6">
        <div className="flex">
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
      <div className="flex flex-col">
        <div className="text-offWhite text-xxxl ml-4">
          My Inventory
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {inventoryAssetsWithOrders.map((inventoryAssetWithOrders) => (
            <InventoryAssetCard
              key={inventoryAssetWithOrders.id}
              assetWithOrders={inventoryAssetWithOrders}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Inventory;