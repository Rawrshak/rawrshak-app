import { useEffect, useState } from 'react';
import ExploreFeatured from './ExploreFeatured';
import ExploreMoreAssets from './ExploreMoreAssets';

function Explore({
  searchTerm,
  setSearchTerm
}:{
  searchTerm:string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [showExploreAssets, setShowExploreAssets] = useState<boolean>(true);
  return (
    <div className="flex justify-items-center place-content-center flex-wrap">
      <ExploreFeatured setShowExploreAssets={setShowExploreAssets} />
      <ExploreMoreAssets show={showExploreAssets}/>
    </div>
  );
}

export default Explore;