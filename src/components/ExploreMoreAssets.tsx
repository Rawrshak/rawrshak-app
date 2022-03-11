import { useState } from 'react';
import { useData } from '../data';
import ShowSelectedAssets from './ShowSelectedAssets';
import ShowSelectedCollections from './ShowSelectedCollections';

function ExploreMoreAssets({
  AssetSectionTitle
}:{
  AssetSectionTitle:string
}) {

  const { assetsWithOrders,allContentWithMetadata } = useData();
  const [collectionsView,setCollectionsView] = useState<boolean>(true);

  return (
    <div className="flex flex-col m-4">
      <div className="flex justify-start flex-wrap">
        <div className="flex text-offWhite text-xxxl my-2 ml-4">
          {AssetSectionTitle}
        </div>
        <div className="inline-flex">
          <button 
            className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
            onClick={() => {setCollectionsView(true)}}
          >
            Collections
          </button>
          <button 
            className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
            onClick={() => {setCollectionsView(false)}}
          >
            Assets
          </button>
        </div>
      </div>
      {
        collectionsView
          ?
            <ShowSelectedCollections content={allContentWithMetadata}/>
          : 
            <ShowSelectedAssets  assets={assetsWithOrders}/>
      }
    </div>
  );
}


export default ExploreMoreAssets;