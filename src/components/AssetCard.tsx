import { AssetWithOrders } from "../data/data";
import Ellipsis from '../assets/images/ellipsis.png'
import BuyNow from "./BuyNow";

function AssetCard({
  assetWithOrders,
  buyNow,
  openAsset
}: {
  assetWithOrders: AssetWithOrders,
  buyNow: (assetWithOrders: AssetWithOrders) => void,
  openAsset: (assetWithOrders: AssetWithOrders) => void
}) {
  return (
    <div className="box-content w-96 h-120 m-3 assetCardBackground rounded-xl">
      <div className="flex h-4 justify-end">
        <img onClick={() => openAsset(assetWithOrders)} className="self-end cursor-pointer pr-6" src={Ellipsis} alt="Ellipsis" />
      </div>
      <div className="flex h-2" />
      <div className="flex flex-wrap h-20 justify-start ml-2">
        {assetWithOrders.tags.map(tag => (
          <div key={tag} className="flex h-8 text-offWhite text-sm bg-gray rounded-xl m-1 px-2 py-1 border-2 border-neutral800">
            {tag}
          </div>
        ))}
      </div>
      <div className="flex box-content h-48 text-offWhite text-xxl mt-2 mx-4 rounded-xl justify-center">
        <img onClick={() => openAsset(assetWithOrders)} src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="flex cursor-pointer" />
      </div>
      <div className="box-content h-12 text-offWhite text-xxl ml-8 mt-2">
        {assetWithOrders.name}
      </div>
      <BuyNow assetWithOrders={assetWithOrders} buyNow={() => buyNow(assetWithOrders)} />
    </div>
  );
}

export default AssetCard;