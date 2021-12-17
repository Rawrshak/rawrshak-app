import { useWeb3 } from '../web3';
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ContentData, AssetWithOrders } from './data';

const useOwnedContent = (contentsSubgraphEndpoint: string | undefined) => {
  const { account } = useWeb3();
  const [ownedContent, setOwnedContent] = useState<ContentData[] | undefined>();

  useEffect(() => {
    if (account === undefined || contentsSubgraphEndpoint === undefined) {
      setOwnedContent(undefined);
      return;
    }

    const ownedContentQuery = `
      query {
        contentManagers (where: {owner: "${account?.toLowerCase()}"}) {
          id
          content {
            id
            contractAddress
            contractUri
            name
            game
            creator
            creatorAddress
            owner
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
      query: gql(ownedContentQuery)
    })
      .then((data) => {
        const newContents: ContentData[] = data.data.contentManagers.map((contentManager: any) => {
          const newAssets: AssetWithOrders[] = contentManager.content.assets.map((asset: any) => {
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
              parentContract: contentManager.content.id,
              balance: undefined,
              creator: contentManager.content.creator,
              game: contentManager.content.game,
              orders: [],
            }
            return newAsset;
          });
          const newContent: ContentData = {
            id: contentManager.content.id,
            contractAddress: contentManager.content.contractAddress,
            contractUri: contentManager.content.contractUri,
            name: contentManager.content.name,
            game: contentManager.content.game,
            creator: contentManager.content.creator,
            creatorAddress: contentManager.content.creatorAddress,
            owner: contentManager.content.owner,
            managerAddress: contentManager.content.manager.id,
            assets: newAssets,
          }
          return (newContent);
        });
        setOwnedContent(newContents);
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setOwnedContent(undefined);
      });
  }, [account, contentsSubgraphEndpoint]);

  return ownedContent;
}

export { useOwnedContent }