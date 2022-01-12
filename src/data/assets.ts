import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Asset } from './data';

const useAssets = (contentsSubgraphEndpoint: string | undefined) => {
  const [assets, setAssets] = useState<Asset[]>();

  useEffect(() => {
    if (contentsSubgraphEndpoint === undefined) return;
    
    if (process.env.REACT_APP_BANNED_CONTENT_ADDRESSES === undefined) {
      console.error("Banned contracts have not been set!");
      return;
    }
  
    const bannedContracts = process.env.REACT_APP_BANNED_CONTENT_ADDRESSES;

    const exploreAssetsQuery = `
      query {
        assets (where: {parentContract_not_in: ${bannedContracts} } ) {
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
            game: asset.parentContract.name
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