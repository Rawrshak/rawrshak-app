import { useEffect, useState } from 'react';
import { OrderWithAssetMetadata, AssetWithOrders } from './data';

const useOrdersWithAssetMetadata = (orders: OrderWithAssetMetadata[] | undefined, assets: AssetWithOrders[] | undefined) => {
  const [ownedOrders, setOwnedOrders] = useState<OrderWithAssetMetadata[] | undefined>();

  useEffect(() => {
    if (orders === undefined || assets === undefined) return;

    const newOrders: OrderWithAssetMetadata[] = orders.map((order: any) => {
      const newOrder: OrderWithAssetMetadata = {
        id: order.id,
        type: order.type,
        price: order.price,
        amountOrdered: order.amountOrdered,
        amountFilled: order.amountFilled,
        amountClaimed: order.amountClaimed,
        status: order.status,
        createdAtTimestamp: order.createdAtTimestamp,
        filledAtTimestamp: order.filledAtTimestamp,
        cancelledAtTimestamp: order.cancelledAtTimestamp,
        lastClaimedAtTimestamp: order.lastClaimedAtTimestamp,
        assetId: order.assetId,
        assetName: assets[assets.findIndex((asset) => asset.id === order.assetId)].name,
        assetGame: assets[assets.findIndex((asset) => asset.id === order.assetId)].game,
      }
      return newOrder;
    });

    setOwnedOrders(newOrders);


  }, [orders, assets]);

  return ownedOrders;
}

export { useOrdersWithAssetMetadata }