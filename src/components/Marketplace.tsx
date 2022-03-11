import { useEffect } from 'react';
import ExploreFeatured from './ExploreFeatured';
import ExploreMoreAssets from './ExploreMoreAssets';
import Hero from './Hero';

function Marketplace() {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col py-2">
      <Hero />
      {/*show Featured Collections*/}
      <ExploreFeatured />
      {/*show Top Volume Assets*/}
      <ExploreMoreAssets AssetSectionTitle='Top Volume'/>
    </div>
  );
}

export default Marketplace;