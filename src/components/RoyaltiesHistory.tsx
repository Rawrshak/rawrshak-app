import { useData } from '../data';
import { OrderWithAssetMetadata } from '../data/data';
import moment from 'moment';
import Ellipsis from '../assets/images/ellipsis.png';
import Filter from '../assets/images/filter.png';
import DownArrow from '../assets/images/downArrow.png';
import { useEffect, useState } from 'react';
import Button from './Button';
import { useTransaction } from "../web3/transactions";
import { ethers, BigNumber } from "ethers";
import { Popover } from 'react-tiny-popover';

function SelectedOrdersActionsPopover({
  claim,
  cancel,
  selectedOrderCount
}: {
  claim: () => void,
  cancel: () => void,
  selectedOrderCount: number
}) {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  return (

    <Popover
      isOpen={showPopover}
      positions={['bottom', 'left', 'top', 'right']} // preferred positions by priority
      onClickOutside={() => setShowPopover(false)}
      content={
        <div className="flex flex-col overflow-visible bg-black450 rounded-lg z-50 m-2">
          <div className="text-offWhite text-sm pt-3 my-3 mx-3">
            Actions
          </div>
          <hr className="text-black400 mx-3 text-xsm" />
          <div onClick={() => { claim(); setShowPopover(false); }} className="text-offWhite text-xsm mx-2 my-1 p-1 cursor-pointer">
            Claim Selected Orders ({selectedOrderCount})
          </div>
          <hr className="text-black400 mx-3 text-xsm" />
          <div onClick={() => { cancel(); setShowPopover(false) }} className="text-semanticRed text-xsm mx-2 my-1 p-1 cursor-pointer">
            Cancel Selected Orders ({selectedOrderCount})
          </div>
        </div>
      }>
      <button onClick={() => setShowPopover(!showPopover)} className="flex justify-center text-chartreuse500 text-sm bg-opacity-1 border-chartreuse500 border-2 ml-2 my-2 w-32 py-1 rounded-lg">
        ACTIONS
        <img className="ml-2 mt-1" src={DownArrow} alt="DownArrow" />
      </button>
    </Popover>
  );
}

function SingleOrderActionsPopover({
  claim,
  cancel,
  order
}: {
  claim: () => void,
  cancel: () => void,
  order: OrderWithAssetMetadata | undefined
}) {
  const [showPopover, setShowPopover] = useState<boolean>(false);

  return (
    <Popover
      isOpen={showPopover}
      positions={['bottom', 'left', 'top', 'right']} // preferred positions by priority
      onClickOutside={() => setShowPopover(false)}
      content={
        <div className="flex flex-col overflow-visible bg-black450 rounded-lg z-50">
          <div className="text-sm my-2 mx-3 text-offWhite">
            Actions
          </div>
          <hr className="text-black400 mx-3" />
          {order?.amountFilled.gt(order.amountClaimed) ?
            <div onClick={() => { claim(); setShowPopover(false); }} className="text-offWhite text-xsm mx-2 my-1 p-1 cursor-pointer">
              Claim This Order
            </div>
            :
            <div className="text-black200 text-xsm mx-2 my-1 p-1">
              Claim This Order
            </div>
          }
          <hr className="text-black400 mx-3" />
          {order?.cancelledAtTimestamp.eq(BigNumber.from("0")) && order?.amountFilled.lt(order.amountOrdered) ?
            <div onClick={() => { cancel(); setShowPopover(false); }} className="text-semanticRed text-xsm mx-2 my-1 p-1 cursor-pointer">
              Cancel This Order
            </div>
            :
            <div className="text-black200 text-xsm mx-2 my-1 p-1">
              Cancel This Order
            </div>
          }
        </div>
      }>
      <div className="flex text-offWhite my-3">
        <img onClick={() => setShowPopover(!showPopover)} className="cursor-pointer p-3 h-7" src={Ellipsis} alt="Ellipsis" />
      </div>
    </Popover>
  );
}

function Order({
  order,
  selected,
  toggleSelected,
  claimOrder,
  cancelOrder
}: {
  order: OrderWithAssetMetadata | undefined,
  selected: boolean,
  toggleSelected: (orderId: BigNumber) => void,
  claimOrder: (orderId: BigNumber) => void,
  cancelOrder: (orderId: BigNumber) => void
}) {
  const { supportedToken } = useData();

  const claim = () => {
    if (order === undefined) return;

    claimOrder(order.id);
  }

  const cancel = () => {
    if (order === undefined) return;

    cancelOrder(order.id);
  }

  const claimableAmount = () => {
    if (order === undefined || supportedToken === undefined) return;

    if (order.type === "Buy") {
      return (`${Number(order.amountFilled.sub(order.amountClaimed))} NFTs`);
    } else {
      return (`${Number(ethers.utils.formatUnits(order.amountFilled.sub(order.amountClaimed).mul(order.price), supportedToken.decimals))} ${supportedToken.symbol}`);
    }
  }

  const priceAmount = () => {
    if (order === undefined || supportedToken === undefined) return;

    if (order.type === "Buy") {
      return (`${Number(order.amountFilled.sub(order.amountClaimed))} NFTs`);
    } else {
      return (`${Number(ethers.utils.formatUnits(order.price, supportedToken.decimals))} ${supportedToken.symbol}`);
    }
  }

  if (order === undefined) {
    return (null);
  } else {
    return (
      <div className="grid grid-cols-7 h-16">
        <div className="flex text-offWhite my-3 mx-1 flex-wrap">
          {order.cancelledAtTimestamp.eq(BigNumber.from("0")) && order.amountClaimed.lt(order.amountOrdered) &&
            <input
              checked={selected}
              onChange={(e) => { toggleSelected(order.id) }}
              type="checkbox"
              className="bg-neutral700 focus:outline-none rounded mt-1 mr-2"
            />}
          {order.assetName}
        </div>
        <div className="flex text-offWhite my-3 mx-1 flex-wrap">
          {order.assetGame}
        </div>
        <div className="flex text-offWhite my-3 mx-1 flex-wrap">
          {moment(Number((order.createdAtTimestamp).mul(BigNumber.from("1000")))).format("MMM Do YYYY")}
        </div>
        <div className="flex text-offWhite my-3 mx-1 flex-wrap">
          {priceAmount()}
        </div>
        <div className="flex text-offWhite my-3 mx-1 flex-wrap">
          {Number(order.amountFilled)} / {Number(order.amountOrdered)}
        </div>
        <div className="flex text-offWhite my-3 mx-1 flex-wrap">
          {claimableAmount()}
        </div>
        <SingleOrderActionsPopover claim={() => claim()} cancel={() => cancel()} order={order} />
      </div>
    );
  }
}

function FilterPopover({
  showFilledOrders,
  showCancelledOrders,
  setShowFilledOrders,
  setShowCancelledOrders
}: {
  showFilledOrders: boolean,
  showCancelledOrders: boolean,
  setShowFilledOrders: React.Dispatch<React.SetStateAction<boolean>>,
  setShowCancelledOrders: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [showPopover, setShowPopover] = useState<boolean>(false);

  return (
    <Popover
      isOpen={showPopover}
      positions={['bottom', 'left', 'top', 'right']} // preferred positions by priority
      onClickOutside={() => setShowPopover(false)}
      content={
        <div className="flex flex-col overflow-visible bg-black450 rounded-lg z-50 m-2">
          <div className="text-offWhite text-sm pt-3 my-3 mx-3">
            Filter
          </div>
          <hr className="text-black400 mx-3 text-xsm" />
          <div className="text-black200 text-xsm mx-2 my-1 p-1 cursor-pointer">
            <input checked={showFilledOrders} onChange={(e) => { setShowFilledOrders(!showFilledOrders) }} type="checkbox" className="bg-neutral700 focus:outline-none rounded mt-1 mr-2" />
            Show Filled Orders
          </div>
          <div className="text-black200 text-xsm mx-2 my-1 p-1 cursor-pointer">
            <input checked={showCancelledOrders} onChange={(e) => { setShowCancelledOrders(!showCancelledOrders) }} type="checkbox" className="bg-neutral700 focus:outline-none rounded mt-1 mr-2" />
            Show Cancelled Orders
          </div>
        </div>
      }>
      <div className="flex justify-center border-chartreuse500 border-2 my-2 w-8 py-1 rounded-lg cursor-pointer" onClick={() => setShowPopover(!showPopover)}>
        <img className="flex my-1" src={Filter} alt="Filter" />
      </div>
    </Popover>
  );
}

function RoyaltiesHistory() {
  const { ownedOrders, systemContracts: { exchange } } = useData();
  const [typeFilteredOrders, setTypeFilteredOrders] = useState<OrderWithAssetMetadata[]>([]);
  const [statusFilteredOrders, setStatusFilteredOrders] = useState<OrderWithAssetMetadata[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<BigNumber[]>([]);
  const [orderTypeToShow, setOrderTypeToShow] = useState<string>("buy");
  const [showFilledOrders, setShowFilledOrders] = useState<boolean>(false);
  const [showCancelledOrders, setShowCancelledOrders] = useState<boolean>(false);

  const [transaction] = useTransaction();

  const toggleOrderSelected = (orderId: BigNumber) => {
    if (!selectedOrderIds.includes(orderId)) {
      setSelectedOrderIds([...selectedOrderIds, orderId]);
    } else {
      const index = selectedOrderIds.indexOf(orderId);
      if (index !== -1) {
        setSelectedOrderIds([...selectedOrderIds.slice(0, index), ...selectedOrderIds.slice(index + 1, selectedOrderIds.length)]);
      }
    }
  }

  const claimOrder = (orderId: BigNumber) => {
    if (exchange === undefined) return;
    transaction(() => exchange.claimOrders([orderId]), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);

  }

  const cancelOrder = (orderId: BigNumber) => {
    if (exchange === undefined) return;
    transaction(() => exchange.cancelOrders([orderId]), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);
  }

  const claimSelectedOrders = () => {
    if (exchange === undefined) return;

    transaction(() => exchange.claimOrders(selectedOrderIds), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);
  }

  const cancelSelectedOrders = () => {
    if (exchange === undefined) return;

    transaction(() => exchange.cancelOrders(selectedOrderIds), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);
  }

  const setTypeFilter = (type: string) => {
    setOrderTypeToShow(type);
    setSelectedOrderIds([]);
  }

  useEffect(() => {
    if (ownedOrders === undefined) return;

    if (orderTypeToShow === "buy") {
      setTypeFilteredOrders(ownedOrders.filter(order => order.type === "Buy"));
      setShowFilledOrders(false);
      setShowCancelledOrders(false);
    } else if (orderTypeToShow === "sell") {
      setTypeFilteredOrders(ownedOrders.filter(order => order.type === "Sell"));
      setShowFilledOrders(false);
      setShowCancelledOrders(false);
    } else {
      setTypeFilteredOrders(ownedOrders.filter(order => !(order.cancelledAtTimestamp.eq("0") && order.filledAtTimestamp.eq("0"))));
      setShowFilledOrders(true);
      setShowCancelledOrders(true);
    }
  }, [ownedOrders, orderTypeToShow]);

  useEffect(() => {
    let newStatusFilteredOrders = typeFilteredOrders.map(order => (order));

    if (!showFilledOrders) {
      newStatusFilteredOrders = newStatusFilteredOrders.filter(order => (order.filledAtTimestamp.eq("0")));
    }

    if (!showCancelledOrders) {
      newStatusFilteredOrders = newStatusFilteredOrders.filter(order => (order.cancelledAtTimestamp.eq("0")));
    }

    setStatusFilteredOrders(newStatusFilteredOrders);

  }, [typeFilteredOrders, showFilledOrders, showCancelledOrders]);

  return (
    <div className="flex flex-grow mt-6">
      <div className="flex flex-grow flex-col">
        <div className="text-offWhite text-xxxl mb-6">
          Royalties
        </div>
        <div className="grid grid-cols-7 mb-8 text-lg h-8">
          <div>
            <Button
              onClick={() => setTypeFilter("buy")}
              enabledClassName="flex justify-center text-offWhite text-sm bg-opacity-1 my-2 w-36 py-1 rounded-sm"
              disabledClassName="flex justify-center text-black text-sm bg-purple my-2 w-36 py-1 rounded-sm"
              enabled={orderTypeToShow !== "buy"}
              show={true}
              label="BUY ORDERS"
            />
          </div>
          <div>
            <Button
              onClick={() => setTypeFilter("sell")}
              enabledClassName="flex justify-center text-offWhite text-sm bg-opacity-1 my-2 w-36 py-1 rounded-sm"
              disabledClassName="flex justify-center text-black text-sm bg-purple my-2 w-36 py-1 rounded-sm"
              enabled={orderTypeToShow !== "sell"}
              show={true}
              label="SELL ORDERS"
            />
          </div>
          <div>
            <Button
              onClick={() => setTypeFilter("history")}
              enabledClassName="flex justify-center text-offWhite text-sm bg-opacity-1 my-2 w-36 py-1 rounded-sm"
              disabledClassName="flex justify-center text-black text-sm bg-purple my-2 w-36 py-1 rounded-sm"
              enabled={orderTypeToShow !== "history"}
              show={true}
              label="ORDER HISTORY"
            />
          </div>
          <div>
            <Button
              onClick={() => setTypeFilter("orderFullfill")}
              enabledClassName="flex justify-center text-offWhite text-sm bg-opacity-1 my-2 w-36 py-1 rounded-sm"
              disabledClassName="flex justify-center text-black text-sm bg-purple my-2 w-36 py-1 rounded-sm"
              enabled={orderTypeToShow !== "orderFullfilment"}
              show={true}
              label="FULFILLMENT"
            />
          </div>
          <div className='col-start-7'>
            <div className="z-0">
              <div className="flex flex-row">
                <FilterPopover
                  showFilledOrders={showFilledOrders}
                  showCancelledOrders={showCancelledOrders}
                  setShowFilledOrders={setShowFilledOrders}
                  setShowCancelledOrders={setShowCancelledOrders}
                />
                <SelectedOrdersActionsPopover claim={claimSelectedOrders} cancel={cancelSelectedOrders} selectedOrderCount={selectedOrderIds.length} />
              </div>

            </div>
        </div>
        </div>
        <div className="grid grid-cols-7 mb-4 text-lg">
          <div className="flex text-offWhite mx-1">
            Item
          </div>
          <div className="flex text-offWhite mx-1">
            Collection
          </div>
          <div className="flex text-offWhite mx-1">
            Created
          </div>
          <div className="flex text-offWhite mx-1">
            Price
          </div>
          <div className="flex text-offWhite mx-1">
            Quantity Filled
          </div>
          <div className="flex text-offWhite mx-1">
            Claimable
          </div>
          <div className="flex text-offWhite mx-1">
            Actions
          </div>
        </div>
        {statusFilteredOrders?.map((order) => (
          <Order
            key={(order.id).toString()}
            order={order}
            selected={selectedOrderIds.includes(order.id)}
            toggleSelected={toggleOrderSelected}
            claimOrder={claimOrder}
            cancelOrder={cancelOrder}
          />
        ))}
      </div>
    </div >
  );
}

export default RoyaltiesHistory;