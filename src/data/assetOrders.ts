import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Asset, Order } from './data';
import { BigNumber, Event } from 'ethers';
import { Exchange } from '../assets/typechain';
import { useWeb3 } from '../web3';
import { useSubgraphEndpoints } from '../web3/chains';

const useAssetOrders = (allAssets: Asset[] | undefined, exchangeContract: Exchange | undefined) => {
  const { chainId } = useWeb3();
  const { exchangeSubgraphEndpoint } = useSubgraphEndpoints(chainId);

  const [assetOrders, setAssetOrders] = useState<{ [assetId: string]: Order[] } | undefined>();

  useEffect(() => {
    if (exchangeContract === undefined) return;

    const listenerCallback = (from: string, orderId: BigNumber, order: {
      asset: {
        contentAddress: string;
        tokenId: BigNumber;
      };
      owner: string;
      token: string;
      price: BigNumber;
      amount: BigNumber;
      isBuyOrder: boolean;
    }, event: Event) => {
      event.getBlock().then((block) => {
        const newAssetOrder: Order = {
          id: orderId,
          type: order.isBuyOrder ? "Buy" : "Sell",
          price: BigNumber.from(order.price),
          amountOrdered: BigNumber.from(order.amount),
          amountFilled: BigNumber.from("0"),
          status: "Ready",
          createdAtTimestamp: BigNumber.from(block.timestamp),
          filledAtTimestamp: BigNumber.from("0"),
          cancelledAtTimestamp: BigNumber.from("0"),
          lastClaimedAtTimestamp: BigNumber.from("0"),
        }
        const assetId = (order.asset.contentAddress + "-" + order.asset.tokenId.toString()).toLowerCase();

        setAssetOrders((assetOrders) => {
          const newAssetOrders = Object.assign({}, assetOrders);
          if (newAssetOrders[assetId] !== undefined) {
            newAssetOrders[assetId] = [...newAssetOrders[assetId], newAssetOrder];
          } else {
            newAssetOrders[assetId] = [newAssetOrder];
          }
          return newAssetOrders;
        });
      });
    }
    const filter = exchangeContract.filters.OrderPlaced();

    exchangeContract.on(filter, listenerCallback);

    return () => { exchangeContract.off(filter, listenerCallback) };
  }, [exchangeContract, exchangeSubgraphEndpoint]);

  useEffect(() => {
    if (allAssets === undefined) return;

    let assetIds: string = `["${allAssets.map(asset => asset.id).join('","')}"]`;

    const ordersQuery = `
      query {
        assets (where: {id_in: ${assetIds}}) {
          id
          orders {
            id
            type
            price
            amountOrdered
            amountFilled
            status
            createdAtTimestamp
            filledAtTimestamp
            cancelledAtTimestamp
            lastClaimedAtTimestamp
          }
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
        const newAssetsOrders: { [assetId: string]: Order[] } = {};

        data.data.assets.forEach((asset: any) => {
          const newAssetOrders = asset.orders.map((order: any) => {
            const newAssetOrder: Order = {
              id: BigNumber.from(order.id),
              type: order.type,
              price: BigNumber.from(order.price),
              amountOrdered: BigNumber.from(order.amountOrdered),
              amountFilled: BigNumber.from(order.amountFilled),
              status: order.status,
              createdAtTimestamp: BigNumber.from(order.createdAtTimestamp),
              filledAtTimestamp: BigNumber.from(order.filledAtTimestamp),
              cancelledAtTimestamp: BigNumber.from(order.cancelledAtTimestamp),
              lastClaimedAtTimestamp: BigNumber.from(order.lastClaimedAtTimestamp),
            }
            return newAssetOrder;
          })
          newAssetsOrders[asset.id] = newAssetOrders;
        })
        setAssetOrders(newAssetsOrders);
      })
      .catch(err => {
        console.error("Error fetching GraphQL data: ", err);
        setAssetOrders(undefined);
      });
  }, [allAssets, exchangeSubgraphEndpoint]);

  return assetOrders;
}

export { useAssetOrders }