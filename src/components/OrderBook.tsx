import React, { useEffect, useState } from "react";
import { useData } from '../data';
import { ethers } from 'ethers';
import { AssetWithOrders, Order } from "../data/data";
import Button from "./Button";

function BuyOrders({
  buyOrders
}: {
  buyOrders: Order[] | undefined
}) {
  const { supportedToken } = useData();

  if (buyOrders === undefined || buyOrders.length === 0 || supportedToken === undefined) {
    return (
      <div className="flex justify-center text-black200">
        No Buy Orders found
      </div>
    )
  } else {
    return (
      <div className="flex flex-grow flex-col text-black200">
        <div className="flex justify-center">
          Buy Orders
        </div>
        <div className="flex-grow grid grid-cols-2 justify-items-center">
          <div className="flex flex-grow">
            Price ({supportedToken.symbol})
          </div>
          <div className="flex flex-grow">
            Quantity
          </div>
          {buyOrders.map((order) => (
            <React.Fragment key={(order.id).toString()}>
              <div className="flex flex-grow text-semanticGreen">
                {ethers.utils.formatUnits(order.price, supportedToken.decimals)}
              </div>
              <div className="flex flex-grow text-semanticGreen">
                {((order.amountOrdered).sub(order.amountFilled)).toString()}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

function SellOrders({
  sellOrders
}: {
  sellOrders: Order[] | undefined
}) {
  const { supportedToken } = useData();

  if (sellOrders === undefined || sellOrders.length === 0 || supportedToken === undefined) {
    return (
      <div className="flex justify-center  text-black200">
        No Sell Orders found
      </div>
    )
  } else {
    return (
      <div className="flex flex-grow flex-col  text-black200">
        <div className="flex justify-center">
          Sell Orders
        </div>
        <div className="grid grid-cols-2 justify-items-center">
          <div className="flex flex-grow">
            Price ({supportedToken.symbol})
          </div>
          <div className="flex flex-grow">
            Quantity
          </div>
          {sellOrders.map((order) => (
            <React.Fragment key={(order.id).toString()}>
              <div className="flex flex-grow text-semanticRed">
                {ethers.utils.formatUnits(order.price, supportedToken.decimals)}
              </div>
              <div className="flex flex-grow text-semanticRed">
                {((order.amountOrdered).sub(order.amountFilled)).toString()}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

function OrderBook({
  assetWithOrders,
  showInTheMarketplace,
  showBuyAndSellButtons,
  tradeAsset
}: {
  assetWithOrders: AssetWithOrders | undefined,
  showInTheMarketplace: boolean,
  showBuyAndSellButtons: boolean,
  tradeAsset: ((buyMode: boolean) => void) | undefined
}) {
  const { supportedToken } = useData();
  const [buyOrders, setBuyOrders] = useState<Order[] | undefined>();
  const [sellOrders, setSellOrders] = useState<Order[] | undefined>();
  useEffect(() => {
    if (assetWithOrders === undefined) return;

    setBuyOrders((assetWithOrders.orders
      .filter(order => order.type === "Buy" && Number(order.cancelledAtTimestamp) === 0 && Number(order.filledAtTimestamp) === 0))
      .sort((firstOrder, secondOrder) => firstOrder.price.lt(secondOrder.price) ? 0 : -1)
      .splice(0, 6));

    setSellOrders((assetWithOrders.orders
      .filter(order => order.type === "Sell" && Number(order.cancelledAtTimestamp) === 0 && Number(order.filledAtTimestamp) === 0))
      .sort((firstOrder, secondOrder) => firstOrder.price.gt(secondOrder.price) ? 0 : -1)
      .splice(0, 6));

  }, [assetWithOrders]);

  const inTheMarketplace = () => {
    if (showInTheMarketplace) {
      return (
        <div className="flex text-lg mb-2 ml-2 text-offWhite">
          In The Marketplace
        </div>
      );
    } else {
      return (null);
    }
  }

  if (supportedToken === undefined) {
    return (null);
  } else {
    return (
      <div className="flex flex-col bg-black450 my-1 mx-4 p-4 rounded-lg">
        {inTheMarketplace()}
        <div className="flex-grow grid grid-cols-2 justify-items-center">
          <BuyOrders buyOrders={buyOrders} />
          <SellOrders sellOrders={sellOrders} />
          {tradeAsset !== undefined && assetWithOrders !== undefined ? <Button
            label="BUY"
            onClick={() => tradeAsset(true)}
            enabled={true}
            show={showBuyAndSellButtons}
            enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 mt-4 py-1 rounded-lg w-24"
            disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 mt-4 py-1 rounded-lg w-24"
          /> : null}
          {tradeAsset !== undefined && assetWithOrders !== undefined ? <Button
            label="SELL"
            onClick={() => tradeAsset(false)}
            enabled={true}
            show={showBuyAndSellButtons}
            enabledClassName="flex justify-center text-chartreuse500 text-sm bg-black450 border-chartreuse500 border-2 mt-4 py-1 rounded-lg w-24"
            disabledClassName="flex justify-center text-black300 text-sm bg-black450 border-black300 border-2 mt-4 py-1 rounded-lg w-24"
          /> : null}
        </div>
      </div>
    );
  }
}

export default OrderBook;