import { useEffect, useState } from "react";
import { ContentData, ContentDataWithMetadata } from './data';

const useContentWithMetadata = (ownedContent: ContentData[] | undefined) => {
  const [contentWithMetadata, setContentWithMetadata] = useState<ContentDataWithMetadata[]>();
  const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';

  useEffect(() => {
    if (ownedContent === undefined) return;

    Promise.all(ownedContent.map((content) => {
      return (Promise.all([content, fetchData(content.contractUri)]));
    })).then((results) => {
      const contentsWithMetadata = results.map(([ownedContent, metadata]) => {
        let ownedContentWithMetadata: ContentDataWithMetadata
        if (metadata !== undefined) {
          ownedContentWithMetadata = {
            id: ownedContent.id,
            contractAddress: ownedContent.contractAddress,
            contractUri: ownedContent.contractUri,
            managerAddress: ownedContent.managerAddress,
            assets: ownedContent.assets,
            name: metadata.name,
            game: metadata.game,
            description: metadata.description,
            imageUri: metadata.image,
            creator: metadata.creator,
            creatorAddress: ownedContent.creatorAddress,
            owner: metadata.owner,
            tags: metadata.tags,
            dateCreated: ownedContent.dateCreated
          }
        } else {
          ownedContentWithMetadata = {
            id: ownedContent.id,
            contractAddress: ownedContent.contractAddress,
            contractUri: ownedContent.contractUri,
            managerAddress: ownedContent.managerAddress,
            assets: ownedContent.assets,
            name: "",
            game: "",
            description: "",
            imageUri: "",
            creator: "",
            creatorAddress: "",
            owner: "",
            tags: [],
            dateCreated: ownedContent.dateCreated
          }
        }
        return ownedContentWithMetadata;
      })
      setContentWithMetadata(contentsWithMetadata);
    });


  }, [ownedContent]);

  const fetchData = async (uri: string) => {
    try {
      const response = await fetch(urlPrefix + uri);
      const json = await response.json();
      return (json);
    } catch (error) {
      console.error("error", error);
    }
  }

  return contentWithMetadata;
}

export { useContentWithMetadata }