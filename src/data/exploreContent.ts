import { useWeb3 } from '../web3';
import { useSubgraphEndpoints } from '../web3/chains';
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ContentData, AssetWithOrders } from './data';

const useExploreContent = () => {
  const { chainId } = useWeb3();
  const { contentsSubgraphEndpoint } = useSubgraphEndpoints(chainId);
  const [exploreContent, setExploreContent] = useState<ContentData[] | undefined>();

  useEffect(() => {
    if (contentsSubgraphEndpoint === undefined) return;

    const exploreContentQuery = `
      query {
        contents {
          id
          contractAddress
          contractUri
          name
          creator
          owner {
            id
          }
          manager {
            id
          }
          assets {
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
      }
    `;

    const client = new ApolloClient({
      uri: contentsSubgraphEndpoint,
      cache: new InMemoryCache(),
    });

    client.query({
      query: gql(exploreContentQuery)
    })
      .then((data) => {
        const newContents: ContentData[] = data.data.contents.map((content: any) => {
          const newAssets: AssetWithOrders[] = content.assets.map((asset: any) => {
            const newTags: string[] = asset.tags.map((tag: any) => tag.id);
            const newAsset: AssetWithOrders = {
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
              orders: [],
            }
            return newAsset;
          });
          const newContent: ContentData = {
            id: content.id,
            contractAddress: content.contractAddress,
            contractUri: content.contractUri,
            name: content.name,
            creator: content.creator,
            owner: content.owner.id,
            managerAddress: content.manager.id,
            assets: newAssets,
          }
          return (newContent);
        });
        setExploreContent(newContents);
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setExploreContent(undefined);
      });
  }, [contentsSubgraphEndpoint]);

  return exploreContent;
}

export { useExploreContent }