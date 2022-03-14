import { useParams } from 'react-router-dom';
import { useData } from '../data';
import Image from './Image';
import AssetCard from './AssetCard';
import { useEffect, useState } from 'react';
import { AssetWithOrders } from '../data/data';
import Button from "./Button";
import DropdownFilter from './DropdownFilter';

function FullCollectionPage() {

  const { allContentWithMetadata } = useData();
  const { collectionID } = useParams<{ collectionID: string }>();
  const [assetView,setAssetView] = useState<boolean>(true);
  const [searchTerm,setSearchTerm] = useState<string>('');
  const [filteredAssets, setFilteredAssets] = useState<AssetWithOrders[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(8);
  const [fullAssets, setFullAssets] = useState<AssetWithOrders[]>([])
  const [genre,setGenre] = useState<string>('')
  const [type,setType] = useState<string>('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  //filter assets according to type and name
  useEffect(() => {
    if (genre === undefined || type === undefined || fullAssets === undefined ) return;

    const newFilteredAssets = fullAssets.filter(assetWithOrders => {
      // if there is no filter, return all assets
      if (genre === '' && type === '') return true;
      if (assetWithOrders.type.toLowerCase().includes(type.toLowerCase()) || type.toLowerCase() === 'all') {
        return true;
      }
      return false;
    });

    setFilteredAssets(newFilteredAssets);

  }, [fullAssets, type, genre]);


  useEffect(() => {
    if (searchTerm === undefined || allContentWithMetadata === undefined) return;
    
    const someAssets = allContentWithMetadata.find(content => content.id === collectionID)
    if (someAssets !== undefined) {
      setFullAssets(someAssets.assets)
    }

    if (fullAssets !== undefined) {

      const newFilteredAssets = fullAssets.filter(asset => {
        // if there is no filter, return all assets
        if (searchTerm === "") return true;
        //filter for search word in asset name
        if (asset.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      setFilteredAssets(newFilteredAssets.slice(0, assetShowCount));
    }

  }, [allContentWithMetadata, assetShowCount, collectionID, fullAssets, searchTerm]);

  if (allContentWithMetadata === undefined) {
    return (
      <div className="flex text-offWhite text-xxxl m-2">
        No Assets Found
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        {
          allContentWithMetadata.filter(content => content.id === collectionID).map( (content,key) =>
            <div key={key} className="flex flex-col"> 
              <div className="flex flex-row m-5">
                <div className="flex w-1/2 place-content-around m-10 rounded-xl">
                  <Image
                    className="w-1/2 rounded-xl"
                    src={content.imageUri}
                    type="content"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex w-full rounded-xl text-offWhite text-xxxl">
                    {content.name}
                  </div>
                  <div className="flex w-full rounded-xl text-offWhite text-xxl">
                    Creator: {content.creator}
                  </div>
                  <div className="mt-2 flex w-full rounded-xl text-offWhite text-l">
                    Creator Address: {content.creatorAddress}
                  </div>
                  <div className="flex w-full rounded-xl text-offWhite text-l my-3">
                    Contract Address: {content.contractAddress}
                  </div>
                  <div className="flex w-full rounded-xl text-offWhite text-m">
                    Description: {content.description}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row place-content-center">
                <button 
                  className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
                  onClick={()=>setAssetView(true)}
                >
                  Assets
                </button>
                <button 
                  className="bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 ml-3 my-3 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
                  onClick={()=>setAssetView(false)}
                >
                  Statistics
                </button>
              </div>
                {
                  assetView && (filteredAssets !== undefined)
                    ?
                      <div>
                        <div className="w-full flex flex-row place-content-center text-offWhite">
                          <div className="flex text-offWhite text-sm mt-1 mr-2">
                            Search For Asset:
                          </div>
                          <div className="flex">
                            <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} type="text" className="flex text-offWhite bg-black450 focus:outline-none rounded py-1 px-2 w-96" />
                          </div>
                          <DropdownFilter 
                            menuName="Genre" 
                            itemList={['All','Horror','RPG','Open World','Story']} 
                            filter={genre} setFilter={setGenre}
                          />
                          <DropdownFilter 
                            menuName="Type" 
                            itemList={['All','Text','Image','Audio','3D']} 
                            filter={type} setFilter={setType}
                          />
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {
                            filteredAssets.map( (asset,key) =>
                              <AssetCard key={asset.id} assetWithOrders={asset} />
                            )
                          }
                        </div>
                        <Button
                          label="Show More Assets"
                          onClick={() => setAssetShowCount(assetShowCount + 8)}
                          enabled={true}
                          show={fullAssets.length > assetShowCount}
                          enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
                          disabledClassName=""
                        />
                      </div>
                    :
                      <div className='flex text-offWhite text-xl w-full place-content-center mt-10'>
                        Statistics to come.
                      </div>
                }
            </div>
          )
        }
      </div>
    );
  }
}

export default FullCollectionPage;