import { useHistory } from 'react-router-dom';
import { useData } from '../data';
import { useEffect, useState } from 'react';
import Button from './Button';
import GameCard from './GameCard';
import { ContentDataWithMetadata } from '../data/data';

function ChooseCollection() {

  const { ownedContentWithMetadata } = useData();
  const [filteredAndSlicedContent, setFilteredAndSlicedContent] = useState<ContentDataWithMetadata[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(8);
  const history = useHistory();

  const createAssetPageForward = (id:string) => {
    history.push('/create/a_creation/'.concat(id));
  }
  
  // Todo: Put back Search by tags
  useEffect(() => {
    if (ownedContentWithMetadata === undefined) return;
    setFilteredAndSlicedContent(ownedContentWithMetadata.slice(0, assetShowCount));
  }, [ownedContentWithMetadata, assetShowCount])

  if (ownedContentWithMetadata === undefined || filteredAndSlicedContent === undefined || filteredAndSlicedContent.length === 0) {
    return null;
  } else {
    return (
      <div className='text-offWhite text-xxl text-center mt-5'>
        Choose Collection to create an assset with:
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            ownedContentWithMetadata.length > 0 
              ?
                filteredAndSlicedContent.map(contentWithMetadata => (
                  <GameCard
                    key={contentWithMetadata.id}
                    smartContract={contentWithMetadata}
                    openSmartContract={() => createAssetPageForward(contentWithMetadata.id)}
                  />
                ))
              :
                <div className='w-full flex flex-col'>
                  <div className='w-full flex text-offWhite text-xl text-center'>
                    No Smart Contracts yet! You must have an existing Smart Contract to create an asset.
                  </div>
                  <div className='w-full flex'>
                    <Button
                      label="Create Smart Contract"
                      onClick={() => history.push('create/sc_creation/')}
                      enabled={true}
                      show={true}
                      enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
                      disabledClassName=""
                    />
                  </div>
                </div>
          }
        </div>
        <Button
          label="Show More Collections"
          onClick={() => setAssetShowCount(assetShowCount + 8)}
          enabled={true}
          show={ownedContentWithMetadata.length > assetShowCount}
          enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
          disabledClassName=""
        />
      </div>
    );
  }
}

export default ChooseCollection;