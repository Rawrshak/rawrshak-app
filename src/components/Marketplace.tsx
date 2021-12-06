import { useState } from 'react';
import ExploreGames from "./ExploreGames";
import ExploreAssets from "./ExploreAssets";

function Marketplace() {
  const [showExploreAssets, setShowExploreAssets] = useState<boolean>(true);

  return (
    <div className="container flex flex-col py-2">
      <ExploreGames setShowExploreAssets={setShowExploreAssets} />
      <ExploreAssets show={showExploreAssets} />
    </div>
  );
}

export default Marketplace;