import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ContentDataWithMetadata } from '../data/data';
import Button from "./Button";
import GameCard from './GameCard';

export function ShowSelectedCollections({
  content
}:{
  content: ContentDataWithMetadata[] | undefined
}) {

  const [filteredContent, setFilteredContent] = useState<ContentDataWithMetadata[]>();
  const [filteredAndSlicedContent, setFilteredAndSlicedContent] = useState<ContentDataWithMetadata[]>();
  const [assetShowCount, setAssetShowCount] = useState<number>(8);
  const history = useHistory();

  const openNewCollectionPage = (id:string) => {
    history.push('/collection/'.concat(id));
  }

  useEffect(() => {
    if (content === undefined) return;
    setFilteredContent(content);
  }, [content]);
  
  // Todo: Put back Search by tags
  useEffect(() => {
    if (filteredContent === undefined) return;
    setFilteredAndSlicedContent(filteredContent.slice(0, assetShowCount));
  }, [filteredContent, assetShowCount])

  if (content === undefined || filteredAndSlicedContent === undefined || filteredAndSlicedContent.length === 0) {
    return null;
  } else {
    return (
      <div className=''>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            filteredAndSlicedContent.map(contentWithMetadata => (
              <GameCard
                key={contentWithMetadata.id}
                smartContract={contentWithMetadata}
                openSmartContract={() => openNewCollectionPage(contentWithMetadata.id)}
              />
            ))
          }
        </div>
        <Button
          label="Show More Collections"
          onClick={() => setAssetShowCount(assetShowCount + 8)}
          enabled={true}
          show={content.length > assetShowCount}
          enabledClassName="flex text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md w-44 h-8 justify-center pt-1 ml-3 mt-2"
          disabledClassName=""
        />
      </div>
    );
  }
}

export default ShowSelectedCollections;