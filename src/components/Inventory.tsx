import { useEffect, useState } from 'react';
import { AssetWithOrders, ContentDataWithMetadata } from '../data/data';
import DropdownFilter from './DropdownFilter';
import ShowInventoryAssets from './ShowInventoryAssets';
import ShowInventoryCollections from './ShowInventoryCollections';
import { useAddressResolverContract, useExchangeContract } from '../data/systemContracts';
import { useAssetsWithOrders } from '../data/assetsWithOrders';
import { useAssetOrders } from '../data/assetOrders';
import { useExchangeSubgraphEndpoint,useContentsSubgraphEndpoint } from '../data/subgraphEndpoints';
import { useAssetsWithMetadata } from '../data/assetsWithMetadata';
import { useInventoryAssets } from '../data/inventoryAssets';
import { useContentWithMetadata } from '../data/contentWithMetadata';
import { useInventoryContents } from '../data/inventoryContents';



function Inventory() {

  //set endpoints for contracts and subgraphs
  const addressResolverContract = useAddressResolverContract();
  const exchangeContract = useExchangeContract(addressResolverContract);
  const exchangeSubgraphEndpoint = useExchangeSubgraphEndpoint();
  const contentsSubgraphEndpoint = useContentsSubgraphEndpoint();
  //const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';

  //grab necessary inventory content,assets,metadata, and orders
  const inventoryAssets = useInventoryAssets(contentsSubgraphEndpoint);
  const inventoryAssetsWithMetadata = useAssetsWithMetadata(inventoryAssets);
  const inventoryAssetOrders = useAssetOrders(inventoryAssetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const inventoryAssetsWithOrders = useAssetsWithOrders(inventoryAssetsWithMetadata, inventoryAssetOrders);

  //get collections for inventory
  const inventoryContent = useInventoryContents(contentsSubgraphEndpoint);
  const inventoryContentWithMetadata = useContentWithMetadata(inventoryContent);

  //set up tags and filters
  const [genre,setGenre] = useState<string>('All')
  const [type,setType] = useState<string>('All')
  //const [allTags, setAllTags] = useState<string[]>([]);
  const [searchTerm,setSearchTerm] = useState<string>('')
  const [collectionsView,setCollectionsView] = useState<boolean>(false)

  //set up variables to store assets and content
  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  //const [assetsURI,setAssetsURI] = useState<string[]>([])
  const [inventoryContents,setInventoryContents] = useState<ContentDataWithMetadata[]>()
  const [inventoryContentsFiltered,setInventoryContentsFiltered] = useState<ContentDataWithMetadata[]>()

  //filter content for search word in name and duplicates
  useEffect(() => {
    if (inventoryContentWithMetadata === undefined) return

    //remove content duplicates
    const newContent = inventoryContentWithMetadata.filter(function(elem, pos) {
      if(pos > 1) {
        return elem.id !== inventoryContentWithMetadata[pos-1].id;
      } else {
        return true
      }
    })

    //filter out content if content name or asset name doesn't include filter word 
    const finalContent = newContent.filter(content => {

      let hasFilterWord = false
      if (searchTerm === undefined || searchTerm === '') return true

      if (content.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        hasFilterWord  = true
      }
      for (let asset of content.assets) {
        if (asset.name !== null) {
          if (asset.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            hasFilterWord = true
          }
        }
      }
      return hasFilterWord
    })

    //set filtered content list
    setInventoryContentsFiltered(finalContent)

    //content list but unfiltered for full list
    setInventoryContents(newContent)

  }, [inventoryContentWithMetadata, searchTerm]);

  //filter content for search word in name and type
  useEffect(() => {
    if (inventoryAssetsWithOrders === undefined) return
    if (searchTerm === '' && type === 'All') {
      // if there is no filter, return all assets
      setFilteredAssets(inventoryAssetsWithOrders)
    } else {
      const filterCache = inventoryAssetsWithOrders.filter(assetWithOrder => {
        if (searchTerm !== '' && type !== 'All') {
          if (type.toLowerCase() === assetWithOrder.type.toLowerCase() && assetWithOrder.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true
          } else {
            return false
          }
        } else {
          if (searchTerm === '' || searchTerm === undefined) {
            if (type.toLowerCase() === assetWithOrder.type.toLowerCase()) {
              return true
            } else {
              return false
            }
          } else {
            if (assetWithOrder.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return true
            } else {
              return false
            }
          }
        }
      });
      setFilteredAssets(filterCache)
    }

  }, [inventoryAssetsWithOrders, searchTerm, type]);

  /*
  //get asset uris from filtered assets
  useEffect(() => {
    if (filteredAssets !== undefined) {
      
      for (let asset of filteredAssets) {
        var middle: string[] = []
        if (asset === undefined || web3.signerOrProvider === undefined) return
        let assetContract = Content__factory.connect(asset.parentContract, web3.signerOrProvider) 
        assetContract["uri(uint256)"](asset.tokenId)
          // eslint-disable-next-line no-loop-func
          .then(uri => {
            middle.push(uri)
            setAssetsURI(middle)
          })
          .catch((error) => console.error(error));
      }
    }
  }, [filteredAssets, web3.signerOrProvider]);

  //get tags from asset uris
  //Todo: fix so that not only 1 asset tags is retrieved
  useEffect(() => {
      if (assetsURI === undefined) return
      for(let uri of assetsURI) {
        fetch(urlPrefix + uri)
        .then(response => response.json())
        .then(data => {
          setAllTags(['All'].concat(data.tags))
        })
        .catch(error => console.error(error));
      }
  }, [filteredAssets, assetsURI, allTags]);
  */

  if (filteredAssets === undefined) {
    return (
      <div className="flex flex-row w-full justify-center mt-5">
        <div className='flex-col flex ml-4'>
          <div className='flex flex-row text-offWhite text-xxxl'>
            My Inventory
          </div>
          <div className="text-offWhite text-xl mt-5">
            No items Found
          </div>
        </div>
      </div>
    );
  } else {
    //example multiselect with search for tags
    //<Multiselect className='rmsc' showArrow options={allTags} isObject={false} />
    return (
      <div className="flex flex-col text-offWhite inline-block">
        <div className='flex-row flex w-full sticky top-14 pb-2 w-full justify-center bg-black opacity-95 h-full'>
          <div className='flex flex-row text-xxxl pt-6'>
            <div className='text-offWhite'>
              My Inventory
            </div>
            <input 
              type='text'
              className="text-black ml-4 border-2 border-gray-300 bg-white px-2 h-10 rounded-lg text-sm focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
              name="search"
              value = {searchTerm}
              placeholder="Search Inventory">
            </input>
          </div>
        </div>
        <div className='my-5'>
          <div className='w-full text-xl flex flex-row inline-flex'>
            <div className='text-xl inline-flex static'>
              by Collection:
              <DropdownFilter menuName="Genre" itemList={['All','Horror','RPG','Open World','Story']} filter={genre} setFilter={setGenre}/>
            </div>
          </div>
          <ShowInventoryCollections content={inventoryContentsFiltered} />
        </div>
        <div>
          <div className='flex flex-row w-full'>
            <div className='text-xl flex flex-row self-center'>
              by Asset:
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
              <DropdownFilter menuName="Genre" itemList={['All','Horror','RPG','Open World','Story']} filter={genre} setFilter={setGenre}/>
              <DropdownFilter menuName="Type" itemList={['All','Text','Image','Audio','static3dobject']} filter={type} setFilter={setType}/>
            </div>
          </div>
          {
            collectionsView
              ?
              inventoryContents === undefined
                  ?
                    <></>
                  :
                    <div className='flex flex-col'>
                      {
                        inventoryContents.map((content,index) => 
                          filteredAssets.filter(asset => asset.parentContract === content.contractAddress ).length > 0 
                            ?
                              <div key={index} className='w-full'>
                                <div className='w-full text-offWhite text-l'>
                                  {content.name}
                                </div>
                                <div>
                                  {
                                    <ShowInventoryAssets assets={filteredAssets.filter(asset => 
                                      asset.parentContract === content.contractAddress
                                    )}/>
                                  }
                                </div>
                              </div>
                            : 
                              <></>
                        )
                      }
                    </div>
              :
                <ShowInventoryAssets assets={filteredAssets}/>
          }
        </div>
      </div>
    );
  }
}

export default Inventory;