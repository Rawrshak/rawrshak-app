import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Asset } from './data';

const useAssets = (contentsSubgraphEndpoint: string | undefined) => {
  const [assets, setAssets] = useState<Asset[]>();

  useEffect(() => {
    if (contentsSubgraphEndpoint === undefined) return;

    const exploreAssetsQuery = `
      query {
        assets (first: 300) {
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
          latestPublicUri
          dateCreated
          parentContract {
            id
            creator
            name
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
        const allAssets = data.data.assets.map((asset: any) => {
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
            creator: asset.parentContract.creator,
            game: asset.parentContract.name,
            latestPublicUri: asset.latestPublicUri,
            dateCreated: asset.dateCreated,
          }
          return newAsset;
        })
        setAssets(allAssets)
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setAssets(undefined);
      });
  }, [contentsSubgraphEndpoint]);

  return assets;
}

export { useAssets }