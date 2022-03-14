import { useState } from 'react';
import { useAllContent } from '../data/allContent';
import { useAssetOrders } from '../data/assetOrders';
import { useAssets } from '../data/assets';
import { useAssetsWithMetadata } from '../data/assetsWithMetadata';
import { useAssetsWithOrders } from '../data/assetsWithOrders';
import { useContentWithMetadata } from '../data/contentWithMetadata';
import { useContentWithMetadataAndOrders } from '../data/contentWithMetadataAndOrders';
import { useFeaturedAssets } from '../data/featuredAssets';
import { useFeaturedContent } from '../data/featuredContent';
import { useContentsSubgraphEndpoint, useExchangeSubgraphEndpoint } from '../data/subgraphEndpoints';
import { useAddressResolverContract, useExchangeContract } from '../data/systemContracts';
import ShowSelectedAssets from './ShowSelectedAssets';
import ShowSelectedCollections from './ShowSelectedCollections';

function ExploreFeatured() {

  const contentsSubgraphEndpoint = useContentsSubgraphEndpoint();
  const exchangeSubgraphEndpoint = useExchangeSubgraphEndpoint();
  const addressResolverContract = useAddressResolverContract();
  const exchangeContract = useExchangeContract(addressResolverContract);

  const featuredAssets = useFeaturedAssets(contentsSubgraphEndpoint);
  const featuredAssetsWithMetadata = useAssetsWithMetadata(featuredAssets);
  const featuredAssetOrders = useAssetOrders(featuredAssetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const featuredAssetsWithOrders = useAssetsWithOrders(featuredAssetsWithMetadata, featuredAssetOrders);

  const assets = useAssets(contentsSubgraphEndpoint);
  const assetsWithMetadata = useAssetsWithMetadata(assets);
  const assetOrders = useAssetOrders(assetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const assetsWithOrders = useAssetsWithOrders(assetsWithMetadata, assetOrders);

  const allContent = useAllContent(contentsSubgraphEndpoint);
  const allContentWithMetadata = useContentWithMetadata(allContent);
  const allContentWithMetadataAndOrders = useContentWithMetadataAndOrders(allContentWithMetadata, assetsWithOrders);
  const featuredContentWithMetadata = useFeaturedContent(allContentWithMetadataAndOrders);

  const [collectionsView,setCollectionsView] = useState<boolean>(true);

  return (
    <div className="grid grid-col m-4 w-full">
      <div className="flex justify-start flex-wrap">
        <div className="flex text-offWhite text-xxxl my-2 ml-4">
          Featured
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
            <ShowSelectedCollections content={featuredContentWithMetadata}/>
          : 
            <ShowSelectedAssets assets={featuredAssetsWithOrders}/>
      }
    </div>
  );
}

export default ExploreFeatured;