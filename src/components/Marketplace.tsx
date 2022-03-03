import { useEffect, useState } from 'react';
import FeaturedContent from "./FeaturedContent";
import ExploreAssets from "./ExploreAssets";
import Hero from './Hero';

function Marketplace() {
  const [showExploreAssets, setShowExploreAssets] = useState<boolean>(true);
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col py-2">
      <Hero />
      <FeaturedContent setShowExploreAssets={setShowExploreAssets} />
      <ExploreAssets show={showExploreAssets} />
    </div>
  );
}

export default Marketplace;