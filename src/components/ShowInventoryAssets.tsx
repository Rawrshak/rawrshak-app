import { useEffect, useState } from 'react';
import Button from "./Button";
import { AssetWithOrders } from "../data/data"
import InventoryAssetCard from './InventoryAssetCard';

export function ShowInventoryAssets({
  assets
}:{
  assets: AssetWithOrders[] | undefined
}) {

  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  const [filteredAndSlicedAssets, setFilteredAndSlicedAssets] = useState<AssetWithOrders[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(8);
  
  // Todo: Put back Search by tags

  useEffect(() => {
    if (assets === undefined) return;
    setFilteredAssets(assets);
  }, [assets]);

  useEffect(() => {
    if (filteredAssets === undefined) return;

    setFilteredAndSlicedAssets(filteredAssets.slice(0, assetShowCount));
  }, [filteredAssets, assetShowCount])

  if (!assets) {
    return (
      <div>No assets found</div>
    );
  }

  if (filteredAndSlicedAssets === undefined || filteredAssets === undefined || filteredAndSlicedAssets.length === 0) {
    return null;
  } else {
    return (
      <div className=''>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSlicedAssets.map((inventoryAssetWithOrders) => (
            <InventoryAssetCard
              key={inventoryAssetWithOrders.id}
              assetWithOrders={inventoryAssetWithOrders}
            />
          ))}
        </div>
        <Button
          label="Show More Assets"
          onClick={() => setAssetShowCount(assetShowCount + 8)}
          enabled={true}
          show={assets.length > assetShowCount}
          enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
          disabledClassName=""
        />
      </div>
    );
  }

  
}

export default ShowInventoryAssets;