import { useData } from '../data';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { AssetWithOrders } from "../data/data";
import Image from "./Image";
import TradeAssetModal from "./TradeAssetModal";
import AssetModal from "./AssetModal";
import audioIcon from '../assets/icons/audioIcon.png';
import contentIcon from '../assets/icons/contentIcon.png';
import imageIcon from '../assets/icons/imageIcon.png';
import static3dObjectIcon from '../assets/icons/static3dObjectIcon.png';
import textIcon from '../assets/icons/textIcon.png';

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
      <div className="flex flex-col h-30 text-offWhite mx-4">
        <div className="flex text-sm h-6 ml-4">
          Buy Now Price: {`${buyNowPrice} ${supportedToken?.symbol}`}
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
        <div className="flex text-sm h-6 ml-4">
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

function AssetCard({
  assetWithOrders
}: {
  assetWithOrders: AssetWithOrders
}) {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showTradeAssetModal, setShowTradeAssetModal] = useState(false);
  const [initialBuyMode, setInitialBuyMode] = useState(true);
  const [typeIcon, setTypeIcon] = useState<any>();

  const openAssetModal = () => {
    setShowAssetModal(true);
    setShowTradeAssetModal(false);
  }

  const openTradeAssetModal = (buyMode: boolean) => {
    setShowAssetModal(false);
    setShowTradeAssetModal(true);
    setInitialBuyMode(buyMode);
  }

  useEffect(() => {
    if (assetWithOrders.type === "audio") {
      setTypeIcon(audioIcon);
    } else if (assetWithOrders.type === "image") {
      setTypeIcon(imageIcon);
    } else if (assetWithOrders.type === "static3dObject") {
      setTypeIcon(static3dObjectIcon);
    } else if (assetWithOrders.type === "text") {
      setTypeIcon(textIcon);
    } else {
      setTypeIcon(contentIcon);
    }
  }, [assetWithOrders]);

  return (
    <>
      <TradeAssetModal show={showTradeAssetModal} setShow={setShowTradeAssetModal} initialBuyMode={initialBuyMode} assetWithOrders={assetWithOrders} />
      <AssetModal show={showAssetModal} setShow={setShowAssetModal} assetWithOrders={assetWithOrders} tradeAsset={openTradeAssetModal} />
      <div className="flex flex-col flex-grow h-120 m-3 assetCardBackground rounded-xl cursor-pointer">
        <div className="grid grid-cols-8 h-10 my-2 ml-4 mr-3">
          <div className="col-span-7 text-offWhite text-sm mt-1 truncate ...">
            {assetWithOrders.game}
          </div>
          <div className="col-span-1">
            <img
              src={typeIcon}
              alt=" "
              className={"h-8 mt-1"}
            />
          </div>
        </div>
        <div onClick={() => openAssetModal()} className="flex h-72 text-offWhite text-xxl p-6 rounded-xl justify-center">
          <Image src={assetWithOrders.imageUri} className="flex cursor-pointer object-contain" type="content" />
        </div>
        <div className="text-offWhite h-8 text-xxl mx-8 mt-2 truncate ...">
          {assetWithOrders.name}
        </div>
        <BuyNow assetWithOrders={assetWithOrders} buyNow={() => openTradeAssetModal(true)} />
      </div>
    </>
  );
}

export default AssetCard;