import { Asset } from "../data/data";
import Image from './Image';

function DeveloperAssetCard({
  asset,
  openAsset
}: {
  asset: Asset,
  openAsset: (asset: Asset) => void
}) {
  return (
    <div className="flex w-64 h-44 m-3 bg-black450 rounded-xl cursor-pointer" onClick={() => openAsset(asset)} >
      <div className="flex flex-grow absolute justify-center h-6 w-64">
        <div className="flex text-offWhite text-sm z-50 mt-1 h-6 truncate ...">
          {asset.name}
        </div>
      </div>
      <div className="flex absolute text-offWhite text-sm z-50 mt-36 ml-4 h-6 truncate ...">
        {asset.currentSupply} / {asset.maxSupply}
      </div>
      <div className="flex h-38">
        <Image src={asset.imageUri} className="object-cover h-44 w-64 rounded-xl opacity-95" type="content" />
      </div>
    </div>
  );
}

export default DeveloperAssetCard;
