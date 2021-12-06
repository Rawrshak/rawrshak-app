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