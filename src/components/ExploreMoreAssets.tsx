import { useState } from 'react';
import { useAllContent } from '../data/allContent';
import { useAssetOrders } from '../data/assetOrders';
import { useAssets } from '../data/assets';
import { useAssetsWithMetadata } from '../data/assetsWithMetadata';
import { useAssetsWithOrders } from '../data/assetsWithOrders';
import { useContentWithMetadata } from '../data/contentWithMetadata';
import { useContentsSubgraphEndpoint, useExchangeSubgraphEndpoint } from '../data/subgraphEndpoints';
import { useAddressResolverContract, useExchangeContract } from '../data/systemContracts';
import ShowSelectedAssets from './ShowSelectedAssets';
import ShowSelectedCollections from './ShowSelectedCollections';

function ExploreMoreAssets({
  AssetSectionTitle
}:{
  AssetSectionTitle:string
}) {


  const contentsSubgraphEndpoint = useContentsSubgraphEndpoint();
  const exchangeSubgraphEndpoint = useExchangeSubgraphEndpoint();
  const addressResolverContract = useAddressResolverContract();
  const exchangeContract = useExchangeContract(addressResolverContract);


  const assets = useAssets(contentsSubgraphEndpoint);
  const assetsWithMetadata = useAssetsWithMetadata(assets);
  const assetOrders = useAssetOrders(assetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const assetsWithOrders = useAssetsWithOrders(assetsWithMetadata, assetOrders);

  const allContent = useAllContent(contentsSubgraphEndpoint);
  const allContentWithMetadata = useContentWithMetadata(allContent);


  const [collectionsView,setCollectionsView] = useState<boolean>(true);

  return (
    <div className="flex flex-col m-4 w-full">
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