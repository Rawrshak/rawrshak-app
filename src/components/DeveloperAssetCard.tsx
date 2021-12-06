import { Asset } from "../data/data";

function DeveloperAssetCard({
  asset,
  openAsset
}: {
  asset: Asset,
  openAsset: (asset: Asset) => void
}) {
  return (
    <div onClick={() => openAsset(asset)} className="box-content h-96 w-60 m-3 bg-darkBlue800 rounded-xl cursor-pointer">
      <div className="flex justify-center box-content h-40 w-52 text-offWhite text-xxl mt-5 mx-4 rounded-xl">
        <img src={asset.imageUri} alt="Rawrshak Asset" className="self-center" />
      </div>
      <div className="box-content h-16 w-52 text-offWhite text-xxl mx-4 mt-2">
        {asset.name}
      </div>
      <div className="box-content h-4 w-52 text-offWhite text-sm mx-4 mt-2">
        Token ID: {asset.tokenId}
      </div>
      <div className="box-content h-4 w-52 text-offWhite text-sm mx-4 mt-2">
        Supply: {asset.currentSupply} / {asset.maxSupply}
      </div>
    </div>
  );
}

export default DeveloperAssetCard;
