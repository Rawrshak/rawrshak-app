import { useEffect, useState } from 'react';
import { useData } from '../data';
import { AssetWithOrders, ContentDataWithMetadata } from "../data/data"
import ShowSelectedCollections from './ShowSelectedCollections';
import ShowSelectedAssets from './ShowSelectedAssets';

function SearchResults({
  filterWords,
  filters
}: {
  filterWords: string | undefined,
  filters:string[]
}) {
  const { assetsWithOrders, allContentWithMetadata } = useData();

  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  const [filteredCollections, setFilteredCollections] = useState<ContentDataWithMetadata[]>();
  const [collectionsView,setCollectionsView] = useState<boolean>(false);
  
  //filter content for search word in name
  useEffect(() => {
    if (filterWords === undefined || allContentWithMetadata === undefined) return;

    const filteredCollections = allContentWithMetadata.filter(contentWithMetadata => {
      // if there is no filter, return all assets
      if (filterWords === "") return true;

      if (filterWords && contentWithMetadata.name && contentWithMetadata.name.toLowerCase().includes(filterWords)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredCollections(filteredCollections);

  }, [allContentWithMetadata, filterWords]);

  //filter assets according to type and name
  useEffect(() => {
    if (filterWords === undefined || assetsWithOrders === undefined ) return;

    const newFilteredAssets = assetsWithOrders.filter(assetWithOrders => {
      // if there is no filter, return all assets
      if (filterWords === "") return true;

      //filter for search word in asset name
      if (filterWords && assetWithOrders.name && assetWithOrders.name.toLowerCase().includes(filterWords)) {
        //filter for type
        if (filters[1] !== undefined) {
          if (assetWithOrders.type.toLowerCase().includes(filters[1].toLowerCase()) || filters[1].toLowerCase() === 'all') {
            return true;
          }
        }
      }
      return false;
    });

    setFilteredAssets(newFilteredAssets);

  }, [assetsWithOrders, filterWords, filters]);


  if ((!filteredAssets && !filteredCollections) || filterWords === '' || filterWords === undefined) {
    return (
      <div className='flex text-offWhite text-xl w-full place-content-center mt-20'>
        No Assets or Collections found
      </div>
    );
  }

  if (filteredAssets === undefined || filteredCollections === undefined) {
    return <div className='flex text-offWhite text-xxxl my-2 mx-4'>No Assets Found</div>;
  } else {
    return (
      <>
        <div className="w-full flex flex-row place-content-center">
          <button 
            className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 mx-2 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
            onClick={() => {setCollectionsView(true)}}
          >
            Collections
          </button>
          <button 
            className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 mx-2 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
            onClick={() => {setCollectionsView(false)}}
          >
            Assets
          </button>
        </div>
        {
          collectionsView
            ?
              <div className='flex w-full text-offWhite justify-center'><div className='flex'>Currently in Collections view. Switch to Assets view to see asset search results.</div></div>
              
            :
              <div className='flex w-full text-offWhite justify-center'><div className='flex'>Currently in Assets view. Switch to Collections view to see collections search results.</div></div>
        }
        {
          collectionsView
            ?
              filteredCollections.length === 0
                ?
                  <div className='flex text-offWhite text-xl w-full place-content-center mt-20'>
                    No Collections found
                  </div>
                :
                  <ShowSelectedCollections content={filteredCollections}/>
            : 
            filteredAssets.length === 0 
              ?
              <div className='flex text-offWhite text-xl w-full place-content-center mt-20'>
                No Assets found
              </div>
              :
                <ShowSelectedAssets  assets={filteredAssets}/>
        }
      </>
    );
  }
}

export default SearchResults;