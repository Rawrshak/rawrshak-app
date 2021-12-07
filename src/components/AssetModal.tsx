import { AssetWithOrders } from "../data/data"
import { BigNumber } from "ethers";
import OrderBook from "./OrderBook";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import X from '../assets/icons/X';

function AssetModal({
  show,
  setShow,
  assetWithOrders,
  tradeAsset
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  assetWithOrders: AssetWithOrders | undefined,
  tradeAsset: (assetWithOrders: AssetWithOrders) => void
}) {

  if (assetWithOrders === undefined) {
    return (null);
  } else {
    return (
      <SlidingPane
        className="flex bg-black400 rounded-bl-lg rounded-tl-lg rounded-br-lg"
        overlayClassName="sliding-pane"
        isOpen={show}
        onRequestClose={() => { setShow(false) }}
        width="500px"
        hideHeader={true}
      >
        <div className="flex flex-grow flex-col">
          <div className="flex justify-start mb-4">
            <button className="focus:outline-none p-1" onClick={() => setShow(false)}>
              <X />
            </button>
          </div>
          <div className="flex mb-12 justify-center">
            <img src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="self-center" />
          </div>

          <div className="flex flex-grow flex-col bg-black450 mx-4 my-2 px-4 py-2 rounded-lg">
            <div className="text-offWhite text-lg">
              {assetWithOrders.name}
            </div>
            <AssetQuantity balance={assetWithOrders.balance} />
            <div className="flex flex-wrap my-1">
              {assetWithOrders.tags.map(tag => (
                <div key={tag} className="flex flex-shrink text-black text-xxsm bg-neutral700 rounded-xl m-1 px-2 py-1 border-2 border-neutral600">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <OrderBook assetWithOrders={assetWithOrders} showInTheMarketplace={true} showBuyAndSellButtons={true} tradeAsset={tradeAsset} />
        </div>
      </SlidingPane>
    );
  }
}

function AssetQuantity({
  balance
}: {
  balance: BigNumber | undefined
}) {
  if (balance === undefined) {
    return (null);
  } else {
    return (
      <div className="text-offWhite text-lg">
        Qty {balance.toString()}
      </div>
    );
  }
}

export default AssetModal;