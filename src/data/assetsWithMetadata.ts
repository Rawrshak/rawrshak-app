import { useEffect, useState } from "react";
import { Asset } from './data';

const useAssetsWithMetadata = (assets: Asset[] | undefined) => {
  const [assetsWithMetadata, setAssetsWithMetadata] = useState<Asset[]>();
  const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';

  useEffect(() => {
    if (assets === undefined) return;

    Promise.all(assets.map((asset) => {
      return (Promise.all([asset, fetchData(asset.name, asset.latestPublicUri)]));
    })).then((results) => {
      const newAssetsWithMetadata = results.map(([asset, metadata]) => {
        let assetWithMetadata: Asset
        assetWithMetadata = asset;
        if (metadata !== undefined) {
          asset.name = metadata.name;
          asset.type = metadata.type;
          asset.subtype = metadata.subtype;
          asset.imageUri = metadata.image;
        }
        return assetWithMetadata;
      })
      setAssetsWithMetadata(newAssetsWithMetadata);
    });


  }, [assets]);

  const fetchData = async (name: string, uri: string) => {
    try {
      if (name !== null) {
        return undefined;
      }
      const response = await fetch(urlPrefix + uri);
      const json = await response.json();
      return (json);
    } catch (error) {
      console.error("error", error);
    }
  }

  return assetsWithMetadata;
}

export { useAssetsWithMetadata }