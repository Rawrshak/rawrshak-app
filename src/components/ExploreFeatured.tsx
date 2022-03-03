import AssetCard from "./AssetCard";
import { useData } from '../data';
import { useState } from 'react';
import GameCard from "./GameCard";
import { ContentDataWithMetadata } from '../data/data';
import Image from './Image';

function ExploreFeatured({
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
      <div>
        <div className='flex justify-items-center place-content-center'>
          <div className="flex text-offWhite text-xxxxl">
            EXPLORE
          </div>
        </div>
        <GameView contentsWithMetadata={featuredContentWithMetadata} selectGame={selectGame} show={!showAssetsView} />
      </div>
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
            <div className="flex flex-row flex-grow">
              <div className="flex text-offWhite text-xxxl my-2 ml-4">
                Featured
              </div>
              <div className="inline-flex">
                <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
                  Collections
                </button>
                <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
                  Assets
                </button>
              </div>
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
          <div className="flex flex-col"> 
            <div className="flex flex-row m-5">
              <div className="flex w-1/2 place-content-around m-10 rounded-xl">
                <Image
                  className="w-1/2 rounded-xl"
                  src={contentWithMetadata.imageUri}
                  type="content"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex w-full rounded-xl text-offWhite text-xxxl">
                  {contentWithMetadata.name}
                </div>
                <div className="flex w-full rounded-xl text-offWhite text-xxl">
                  by {contentWithMetadata.creator}
                </div>
                <div className="flex w-full rounded-xl text-offWhite text-l">
                  {contentWithMetadata.creatorAddress}
                </div>
                <div className="flex w-full rounded-xl text-offWhite text-l my-3">
                  Contract Address: {contentWithMetadata.contractAddress}
                </div>
                <div className="flex w-full rounded-xl text-offWhite text-m">
                  Description: {contentWithMetadata.description}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row place-content-center">
              <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
                Assets
              </button>
              <button className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
                Statistics
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {contentWithMetadata.assets.map(asset => (
                <AssetCard key={asset.id} assetWithOrders={asset} />
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

export default ExploreFeatured;