import { Asset } from "../data/data";
import Image from './Image';
import { ethers } from "ethers";

function DeveloperAssetCard({
  asset,
  openAsset
}: {
  asset: Asset,
  openAsset: (asset: Asset) => void
}) {
  
  const calculateMax = (maxSupply: string) => {
    if (maxSupply === ethers.constants.MaxUint256.toString()) {
      return "MAX"
    } else {
      return Number(maxSupply);
    }
  }

  return (
    <div className="flex flex-col flex-grow h-44 m-3 bg-black450 rounded-xl cursor-pointer" onClick={() => openAsset(asset)}>
      <div className="grid grid-cols-5">
        <div className="col-span-4 h-6 text-offWhite text-sm ml-4 mt-1 truncate ...">
          {asset.name}
        </div>
      </div>
      <div className="flex justify-center h-28 text-offWhite text-xxl mt-1 mx-4 rounded-xl">
        <Image src={asset.imageUri} className="flex object-scale-down" type="content" />
      </div>
      <div className="h-5 text-offWhite text-sm mx-4 mt-1 truncate ...">
        {Number(asset.currentSupply)} / {calculateMax(asset.maxSupply)}
      </div>
    </div>
  );
}

export default DeveloperAssetCard;
