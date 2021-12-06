import { useData } from '../data';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { AssetWithOrders } from "../data/data";

function BuyNow({
  assetWithOrders,
  buyNow
}: {
  assetWithOrders: AssetWithOrders,
  buyNow: (assetWithOrders: AssetWithOrders) => void
}) {
  const { supportedToken } = useData();

  const [buyNowPrice, setBuyNowPrice] = useState<string>("");
  const [buyNowAvailable, setBuyNowAvailable] = useState<boolean>(false);
  useEffect(() => {

    if (!assetWithOrders || !assetWithOrders.orders || assetWithOrders.orders.length === 0 || supportedToken === undefined) return;

    const unfilledSellOrders = (assetWithOrders.orders
      .filter(order => order.type === "Sell" && Number(order.cancelledAtTimestamp) === 0 && Number(order.filledAtTimestamp) === 0))
      .map(order => Number(ethers.utils.formatUnits(order.price, supportedToken.decimals)));

    if (unfilledSellOrders.length > 0) {
      setBuyNowAvailable(true);
      setBuyNowPrice(Math.min(...unfilledSellOrders).toString());
    } else {
      setBuyNowAvailable(false);
      setBuyNowPrice("");
    }
  }, [assetWithOrders, supportedToken]);

  if (buyNowAvailable) {
    return (
      <div className="flex flex-col h-32 text-offWhite mx-4">
        <div className="flex text-xsm h-6 ml-4">
          Buy Now Price
        </div>
        <div className="flex text-lg h-8 ml-4">
          {`${buyNowPrice} ${supportedToken?.symbol}`}
        </div>
        <div className="flex">
          <button
            onClick={() => buyNow(assetWithOrders)}
            className="flex-grow text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md mx-4 my-4 p-1 h-8"
          >
            BUY NOW
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-30 text-offWhite mx-4">
        <div className="flex text-xsm h-6 mt-8 ml-4">
          No available sell orders
        </div>
        <div className="flex">
          <button
            onClick={() => buyNow(assetWithOrders)}
            className="flex-grow text-chartreuse500 border-chartreuse500 border-2 text-sm rounded-md mx-4 my-4 p-1 h-8"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    );
  }
}

export default BuyNow;