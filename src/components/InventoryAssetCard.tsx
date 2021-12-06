import { AssetWithOrders } from "../data/data";

function AssetCard({
  assetWithOrders,
  tradeAsset,
  openAsset
}: {
  assetWithOrders: AssetWithOrders,
  tradeAsset: (assetWithOrders: AssetWithOrders) => void,
  openAsset: (assetWithOrders: AssetWithOrders) => void
}) {
  return (
    <div className="flex flex-col h-44 w-64 m-3 bg-black400 rounded-xl cursor-pointer" onClick={() => openAsset(assetWithOrders)}>

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
  );
}

export default AssetCard;