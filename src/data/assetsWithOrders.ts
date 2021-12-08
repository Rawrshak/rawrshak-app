import { useEffect, useState } from 'react';
import { Asset, Order, AssetWithOrders } from './data';

const useAssetsWithOrders = (assets: Asset[] | undefined, assetOrders: { [assetId: string]: Order[] } | undefined) => {
  const [assetsWithOrders, setAssetsWithOrders] = useState<AssetWithOrders[]>();

  useEffect(() => {
    if (assets === undefined || assetOrders === undefined) {
      return;
    }

    const newAssetsWithOrders = assets.map((asset) => {
      const newAssetWithOrder: AssetWithOrders = {
        id: asset.id,
        tokenId: asset.tokenId,
        currentSupply: asset.currentSupply,
        maxSupply: asset.maxSupply,
        name: asset.name,
        type: asset.type,
        subtype: asset.subtype,
        tags: asset.tags,
        imageUri: asset.imageUri,
        parentContract: asset.parentContract,
        balance: asset.balance,
        creator: asset.creator,
        orders: assetOrders[asset.id] ? assetOrders[asset.id] : [],
      }

      return newAssetWithOrder
    });
    setAssetsWithOrders(newAssetsWithOrders);
  }, [assets, assetOrders]);

  return assetsWithOrders;
}

export { useAssetsWithOrders }