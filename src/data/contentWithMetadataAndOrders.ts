import { useEffect, useState } from "react";
import { ContentDataWithMetadata, AssetWithOrders } from './data';

const useContentWithMetadataAndOrders = (
  contentsWithMetadata: ContentDataWithMetadata[] | undefined,
  assetsWithOrders: AssetWithOrders[] | undefined
) => {
  const [contentsWithMetadataAndOrders, setContentsWithMetadataAndOrders] = useState<ContentDataWithMetadata[]>();

  useEffect(() => {
    if (contentsWithMetadata === undefined || assetsWithOrders === undefined) return;

    const newContentsWithMetadataAndOrders: ContentDataWithMetadata[] = contentsWithMetadata.map(contentWithMetadata => {
      let newAssetsWithOrders: AssetWithOrders[] = [];
      contentWithMetadata.assets.forEach((asset, index) => {
        const foundAsset = assetsWithOrders.find(assetWithOrders => assetWithOrders.id === asset.id);
        if (foundAsset !== undefined) {
          newAssetsWithOrders[index] = foundAsset;
        } else {
          newAssetsWithOrders[index] = asset;
        };
        
        // Todo: these are stop-gap measures. Currently, if the graph doesn't pick up the IPFS metadata, 
        // some information will be empty. In order to combat that, we're querying for the parent contract 
        // metadata name here. We'll remove this once Arweave is supported on TheGraph
        newAssetsWithOrders[index].game = contentWithMetadata.name;
      });
      const newContentsWithMetadata: ContentDataWithMetadata = contentWithMetadata;
      newContentsWithMetadata.assets = newAssetsWithOrders;

      return newContentsWithMetadata;
    })

    setContentsWithMetadataAndOrders(newContentsWithMetadataAndOrders);

  }, [contentsWithMetadata, assetsWithOrders]);

  return contentsWithMetadataAndOrders;
}

export { useContentWithMetadataAndOrders }