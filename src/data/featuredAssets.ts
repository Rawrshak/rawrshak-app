import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Asset } from './data';

const useFeaturedAssets = (contentsSubgraphEndpoint: string | undefined) => {
  const [featuredAssets, setFeaturedAssets] = useState<Asset[]>();

  useEffect(() => {
    if (contentsSubgraphEndpoint === undefined) return;

    const featuredAssetIds = `[
      "0x2bf2685c0cf29ff00bdfc66041fe8efa1bcf5d7f-0",
      "0x2bf2685c0cf29ff00bdfc66041fe8efa1bcf5d7f-1"
    ]`;

    const exploreAssetsQuery = `
      query {
        assets (where: {id_in: ${featuredAssetIds}}) {
          id
          tokenId
          currentSupply
          maxSupply
          name
          type
          subtype
          tags {
            id
          }
          imageUri
          parentContract {
            id
          }
        }
      }
    `;

    const contentsClient = new ApolloClient({
      uri: contentsSubgraphEndpoint,
      cache: new InMemoryCache(),
    });

    contentsClient.query({
      query: gql(exploreAssetsQuery)
    })
      .then((data) => {
        const newFeaturedAssets = data.data.assets.map((asset: any) => {
          const newTags: string[] = asset.tags.map((tag: any) => tag.id)
          const newAsset: Asset = {
            id: asset.id,
            tokenId: asset.tokenId,
            currentSupply: asset.currentSupply,
            maxSupply: asset.maxSupply,
            name: asset.name,
            type: asset.type,
            subtype: asset.subtype,
            tags: newTags,
            imageUri: asset.imageUri,
            parentContract: asset.parentContract.id,
            balance: undefined,
          }
          return newAsset;
        })
        setFeaturedAssets(newFeaturedAssets)
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setFeaturedAssets(undefined);
      });
  }, [contentsSubgraphEndpoint]);

  return featuredAssets;
}

export { useFeaturedAssets }