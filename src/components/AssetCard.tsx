import { AssetWithOrders } from "../data/data";
import Ellipsis from '../assets/images/ellipsis.png'
import BuyNow from "./BuyNow";
import Image from "./Image";

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
    <div className="flex flex-col flex-grow h-120 m-3 assetCardBackground rounded-xl">
      <div className="flex h-8 justify-end">
        <img onClick={() => openAsset(assetWithOrders)} className="absolute self-end cursor-pointer pr-6 p-3 mt-2" src={Ellipsis} alt="Ellipsis" />
      </div>
      <div onClick={() => openAsset(assetWithOrders)} className="flex box-content h-48 text-offWhite text-xxl mt-2 mx-4 rounded-xl justify-center">
        <Image src={assetWithOrders.imageUri} className="flex cursor-pointer object-scale-down" type="content" />
      </div>
      <div className="flex text-offWhite h-16 text-xxl ml-8 mt-2">
        {assetWithOrders.name}
      </div>
      <div className="flex text-offWhite h-8 text-lg ml-8 mt-2">
        Type: {assetWithOrders.type}
      </div>
      <BuyNow assetWithOrders={assetWithOrders} buyNow={() => buyNow(assetWithOrders)} />
    </div>
  );
}

export default AssetCard;