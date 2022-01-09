import { useState } from 'react';
import { useData } from '../data';
import GameCard from "./GameCard";
import AssetCard from './AssetCard';
import { ContentDataWithMetadata } from '../data/data';
import Image from './Image';

function FeaturedContent({
  setShowExploreAssets
}: {
  setShowExploreAssets: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { featuredContentWithMetadata } = useData();

  const [showAssetsView, setShowAssetsView] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<ContentDataWithMetadata>();

  const selectGame = (contentDataWithMetadata: ContentDataWithMetadata) => {
    setShowAssetsView(true);
    setSelectedGame(contentDataWithMetadata);
    setShowExploreAssets(false);
  }

  const backToGameView = () => {
    setShowAssetsView(false);
    setShowExploreAssets(true);
  }

  if (showAssetsView) {
    return (
      <AssetsView contentWithMetadata={selectedGame} show={showAssetsView} backToGameView={backToGameView} />
    );
  } else {
    return (
      <GameView contentsWithMetadata={featuredContentWithMetadata} selectGame={selectGame} show={!showAssetsView} />
    );
  }
}

function GameView({
  contentsWithMetadata,
  selectGame,
  show
}: {
  contentsWithMetadata: ContentDataWithMetadata[] | undefined,
  selectGame: (contentDataWithMetadat: ContentDataWithMetadata) => void,
  show: boolean
}) {
  if (show) {
    if (contentsWithMetadata === undefined) {
      return (null);
    } else {
      return (
        <div className="flex flex-grow max-w-screen-xl m-4">
          <div className="flex flex-col flex-grow">
            <div className="flex text-offWhite text-xxxl mx-4">
              Featured Collections
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {contentsWithMetadata.map(contentWithMetadata => (
                <GameCard
                  key={contentWithMetadata.id}
                  smartContract={contentWithMetadata}
                  openSmartContract={() => selectGame(contentWithMetadata)}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (null);
  }
}

function AssetsView({
  contentWithMetadata,
  show,
  backToGameView
}: {
  contentWithMetadata: ContentDataWithMetadata | undefined,
  show: boolean,
  backToGameView: () => void
}) {
  if (show) {
    if (contentWithMetadata === undefined) {
      return (
        <div className="flex text-offWhite text-xxxl m-2">
          No Assets Found
        </div>
      );
    } else {
      return (
        <div className="flex flex-col">
          <div onClick={() => backToGameView()} className="flex text-offWhite text-sm m-2 cursor-pointer">
            {`< Marketplace`}
          </div>
          <div className="flex justify-center ml-2">
            <Image
              src={contentWithMetadata.imageUri}
              className="flex  w-1/4 rounded-xl"
              type="content"
            />
          </div>
          <div className="flex text-offWhite text-xxl mt-1 ml-4">
            {contentWithMetadata.name}
          </div>
          <div className="flex text-offWhite text-base mt-1 ml-4">
            {contentWithMetadata.description}
          </div>
          <div className="flex text-offWhite text-base mt-1 ml-4">
            Creator: {contentWithMetadata.creator}
          </div>
          <div className="flex text-offWhite text-base mt-1 ml-4">
            Contract Address: {contentWithMetadata.contractAddress}
          </div>
          <div className="flex text-offWhite text-base mt-1 ml-4">
            Creator Address: {contentWithMetadata.creatorAddress}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {contentWithMetadata.assets.map(asset => (
              <AssetCard key={asset.id} assetWithOrders={asset} />
            ))}
          </div>
        </div>
      );
    }
  } else {
    return (null);
  }
}

export default FeaturedContent;