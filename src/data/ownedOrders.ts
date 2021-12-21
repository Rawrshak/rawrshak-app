import { useWeb3 } from '../web3';
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { OrderWithAssetMetadata } from './data';
import { BigNumber } from 'ethers';

const useOwnedOrders = (exchangeSubgraphEndpoint: string | undefined) => {
  const { account } = useWeb3();
  const [ownedOrders, setOwnedOrders] = useState<OrderWithAssetMetadata[] | undefined>();

  useEffect(() => {
    const updateOrders = () => {

      const ordersQuery = `
      query {
        orders(where: {owner: "${account?.toLowerCase()}"}) {
          id
          asset {
            id
          }
          owner {
            id
          }
          type
          price
          amountOrdered
          amountFilled
          amountClaimed
          status
          createdAtTimestamp
          filledAtTimestamp
          cancelledAtTimestamp
          lastClaimedAtTimestamp
        }
      }
    `;

      const client = new ApolloClient({
        uri: exchangeSubgraphEndpoint,
        cache: new InMemoryCache(),
      });

      client.query({
        query: gql(ordersQuery)
      })
        .then((data) => {
          const newOrders: OrderWithAssetMetadata[] = data.data.orders.map((order: any) => {
            const newOrder: OrderWithAssetMetadata = {
              id: BigNumber.from(order.id),
              type: order.type,
              price: BigNumber.from(order.price),
              amountOrdered: BigNumber.from(order.amountOrdered),
              amountFilled: BigNumber.from(order.amountFilled),
              amountClaimed: BigNumber.from(order.amountClaimed),
              status: order.status,
              createdAtTimestamp: BigNumber.from(order.createdAtTimestamp),
              filledAtTimestamp: BigNumber.from(order.filledAtTimestamp),
              cancelledAtTimestamp: BigNumber.from(order.cancelledAtTimestamp),
              lastClaimedAtTimestamp: BigNumber.from(order.lastClaimedAtTimestamp),
              assetId: order.asset.id,
              assetName: undefined,
              assetGame: undefined,
            }
            return newOrder;
          });

          setOwnedOrders(newOrders);
        })
        .catch(err => {
          console.error("Error fetching GraphQL data: ", err);
          setOwnedOrders(undefined);
        });
    }

    updateOrders();

    const interval = setInterval(() => {
      updateOrders();
    }, 30000);
    return () => clearInterval(interval);

  }, [exchangeSubgraphEndpoint, account]);

  return ownedOrders;
}

export { useOwnedOrders }