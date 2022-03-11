import { useWeb3 } from '../web3';
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ContentData } from './data';


const useInventoryContents = (contentsSubgraphEndpoint: string | undefined) => {
  const { account } = useWeb3();
  const [inventoryContents, setInventoryContents] = useState<ContentData[] | undefined>();

  useEffect(() => {
    const updateInventory = () => {
      if (account === undefined || contentsSubgraphEndpoint === undefined) {
        setInventoryContents(undefined);
        return;
      }

      const assetBalancesQuery = `
          query {
            accounts(where: {address: "${account}"}) {
              id
              address
              assetBalances(where: {amount_gt: "0" }) {
                id
                parentContract {
                  id
                  contractAddress
                  contractUri
                  name
                  game
                  manager {
                    id
                  }
                  creator
                  creatorAddress
                  owner {
                    id
                  }
                  dateCreated
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
                    latestPublicUri
                    dateCreated
                  }
                }
                asset {
                  id
                }
                amount
              }
            }
          }
        `;

      const client = new ApolloClient({
        uri: contentsSubgraphEndpoint,
        cache: new InMemoryCache(),
      });

      client.query({
        query: gql(assetBalancesQuery)
      })
        .then((data) => {
          if (data.data.accounts.length > 0) {
            const newParentContracts: string[] = data.data.accounts[0].assetBalances.map((assetBalance: any) => {
              return(assetBalance.asset.id)
            })
            const newContents: ContentData[] = data.data.accounts[0].assetBalances.map((assetBalance: any) => {
              const newContent: ContentData = {
                id: assetBalance.parentContract.id,
                contractAddress: assetBalance.parentContract.contractAddress,
                contractUri: assetBalance.parentContract.contractUri,
                name: assetBalance.parentContract.name,
                game: assetBalance.parentContract.game,
                creator: assetBalance.parentContract.creator,
                creatorAddress: assetBalance.parentContract.creatorAddress,
                owner: assetBalance.parentContract.owner,
                managerAddress: assetBalance.parentContract.manager.id,
                assets: assetBalance.parentContract.assets.filter((asset: { id: string; }) => newParentContracts.includes(asset.id)),
                dateCreated: assetBalance.parentContract.dateCreated,
              }
              return (newContent);
            });
            setInventoryContents(newContents);
          } else {
            setInventoryContents(undefined);
          }
          console.log('Inventory Contents queried')
        })
        .catch(err => {
          console.error("Error fetching GraphQL data:", err);
          setInventoryContents(undefined);
        });
    }

    if(account !== undefined) {
      updateInventory();
    }

    const interval = setInterval(() => {
      if(account !== undefined) {
        updateInventory();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [account, contentsSubgraphEndpoint]);

  console.log('useInventoryContents called')
  return inventoryContents;
}

export { useInventoryContents }