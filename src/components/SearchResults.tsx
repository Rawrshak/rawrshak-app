import { useEffect, useState } from 'react';
import { useData } from '../data';
import AssetCard from "./AssetCard";
import Button from "./Button";
import { AssetWithOrders } from "../data/data"

function SearchResults({
  filterWords
}: {
  filterWords: string | undefined
}) {
  const { assetsWithOrders } = useData();

  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  const [filteredAndSlicedAssets, setFilteredAndSlicedAssets] = useState<AssetWithOrders[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(8);
  
  // Todo: Put back Search by tags

  useEffect(() => {
    if (filterWords === undefined || assetsWithOrders === undefined) return;

    const newFilteredAssets = assetsWithOrders.filter(assetWithOrders => {
      // if there is no filter, return all assets
      if (filterWords === "") return true;

      if (filterWords && assetWithOrders.name && assetWithOrders.name.toLowerCase().includes(filterWords)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredAssets(newFilteredAssets);

  }, [assetsWithOrders, filterWords]);

  useEffect(() => {
    if (filteredAssets === undefined) return;

    setFilteredAndSlicedAssets(filteredAssets.slice(0, assetShowCount));
  }, [filteredAssets, assetShowCount])

  if (!assetsWithOrders) {
    return (
      <div>No Assets found</div>
    );
  }

  if (filteredAndSlicedAssets === undefined || filteredAssets === undefined || filteredAndSlicedAssets.length === 0) {
    return <div className='flex text-offWhite text-xxxl my-2 mx-4'>No Assets Found</div>;
  } else {
    return (
      <>
        <div className="w-full flex flex-row place-content-center">
          <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
            Collections
          </button>
          <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
            Assets
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSlicedAssets.map(assetWithOrders => (
            <AssetCard key={assetWithOrders.id} assetWithOrders={assetWithOrders} />
          ))}
        </div>
        <Button
          label="Show More Assets"
          onClick={() => setAssetShowCount(assetShowCount + 8)}
          enabled={true}
          show={filteredAssets.length > assetShowCount}
          enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
          disabledClassName=""
        />
      </>
    );
  }
}

export default SearchResults;