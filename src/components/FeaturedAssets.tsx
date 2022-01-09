import AssetCard from "./AssetCard";
import { useData } from '../data';

function FeaturedAssets() {
  const { featuredAssetsWithOrders } = useData();

  if (featuredAssetsWithOrders === undefined) {
    return (null);
  } else {
    return (
      <div className="flex flex-grow flex-col m-4">
        <div className="flex text-offWhite text-xxxl my-2 ml-4">
          Featured Assets
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredAssetsWithOrders.map(featuredAsset => (
            <AssetCard key={featuredAsset.id} assetWithOrders={featuredAsset} />
          ))}
        </div>
      </div>
    )
  }
}

export default FeaturedAssets;