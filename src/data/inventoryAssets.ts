import { useWeb3 } from '../web3';
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Asset } from './data';

const useInventoryAssets = (contentsSubgraphEndpoint: string | undefined) => {
  const { account } = useWeb3();
  const [inventoryAssets, setInventoryAssets] = useState<Asset[] | undefined>();

  useEffect(() => {
    const updateInventory = () => {
      if (account === undefined || contentsSubgraphEndpoint === undefined) {
        setInventoryAssets(undefined);
        return;
      }

      const assetBalancesQuery = `
          query {
            accounts(where: {address: "${account}"}) {
              id
              address
              assetBalances(where: {amount_gt: "0" }) {
                id
                asset {
                  id
                  tokenId
                  currentSupply
                  maxSupply
                  name
                  type
                  subtype
                  dateCreated
                  tags {
                    id
                  }
                  imageUri
                  latestPublicUri
                  parentContract {
                    id
                    creator
                    name
                  }         
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
            const inventoryAssets = data.data.accounts[0].assetBalances.map((assetBalance: any) => {
              const newTags: string[] = assetBalance.asset.tags.map((tag: any) => tag.id);
              const newAsset: Asset = {
                id: assetBalance.asset.id,
                tokenId: assetBalance.asset.tokenId,
                currentSupply: assetBalance.asset.currentSupply,
                maxSupply: assetBalance.asset.maxSupply,
                name: assetBalance.asset.name,
                type: assetBalance.asset.type,
                subtype: assetBalance.asset.subtype,
                tags: newTags,
                imageUri: assetBalance.asset.imageUri,
                parentContract: assetBalance.asset.parentContract.id,
                balance: assetBalance.amount,
                creator: assetBalance.asset.parentContract.creator,
                game: assetBalance.asset.parentContract.name,
                latestPublicUri: assetBalance.asset.latestPublicUri,
                dateCreated: assetBalance.asset.dateCreated,
              }

              return newAsset;
            });
            setInventoryAssets(inventoryAssets);
          } else {
            setInventoryAssets(undefined);
          }
        })
        .catch(err => {
          console.error("Error fetching GraphQL data: ", err);
          setInventoryAssets(undefined);
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

  return inventoryAssets;
}

export { useInventoryAssets }