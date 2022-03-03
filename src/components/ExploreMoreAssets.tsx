import { useEffect, useState } from 'react';
import { useData } from '../data';
import AssetCard from "./AssetCard";
import Button from "./Button";
import { AssetWithOrders } from "../data/data"

function SelectedAssets({
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
      <div>No assets found</div>
    );
  }

  if (filteredAndSlicedAssets === undefined || filteredAssets === undefined || filteredAndSlicedAssets.length === 0) {
    return null;
  } else {
    return (
      <>
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

function ExploreMoreAssets({
  show
}: {
  show: boolean
}) {
  const [activeTradeAsset, setActiveTradeAsset] = useState<AssetWithOrders>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { assetsWithOrders } = useData();

  useEffect(() => {
    if (assetsWithOrders === undefined || activeTradeAsset === undefined) return;
    setActiveTradeAsset(assetsWithOrders.find(assetWithOrder => assetWithOrder.id === activeTradeAsset.id));
  }, [assetsWithOrders, activeTradeAsset])

  if (show) {
    return (
      <div className="flex flex-col m-4">
        <div className="flex justify-start flex-wrap">
          <div className="flex text-offWhite text-xxxl my-2 ml-4">
            Top Volume
          </div>
          <div className="inline-flex">
            <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
              Collections
            </button>
            <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
              Assets
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-grow text-offWhite mb-2 ml-1 py-2 pl-3 pr-2 rounded-lg">
            <div className="flex text-offWhite text-sm mt-1 mr-2">
              Search For Asset
            </div>
            <div className="flex">
              <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} type="text" className="flex text-offWhite bg-black450 focus:outline-none rounded py-1 px-2 w-96" />
            </div>
          </div>
        </div>
        <SelectedAssets
          filterWords={searchTerm}
        />
      </div>
    );
  } else {
    return (null);
  }
}


export default ExploreMoreAssets;