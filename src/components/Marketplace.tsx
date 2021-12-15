import { useState } from 'react';
import FeaturedContent from "./FeaturedContent";
import ExploreAssets from "./ExploreAssets";

function Marketplace() {
  const [showExploreAssets, setShowExploreAssets] = useState<boolean>(true);

  return (
    <div className="flex flex-col py-2">
      <FeaturedContent setShowExploreAssets={setShowExploreAssets} />
      <ExploreAssets show={showExploreAssets} />
    </div>
  );
}

export default Marketplace;