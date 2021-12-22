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

function FilterOptions({
  show,
  setShow,
  showFilledOrders,
  showCancelledOrders,
  setShowFilledOrders,
  setShowCancelledOrders
}: {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  showFilledOrders: boolean,
  showCancelledOrders: boolean,
  setShowFilledOrders: React.Dispatch<React.SetStateAction<boolean>>,
  setShowCancelledOrders: React.Dispatch<React.SetStateAction<boolean>>
}) {

  if (show) {
    return (
      <div className="flex flex-col overflow-visible bg-black450 rounded-lg z-50">
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
    );
  } else {
    return (null);
  }
}

function SelectedOrdersActions({
  show,
  claim,
  cancel,
  selectedOrderCount
}: {
  show: boolean,
  claim: () => void,
  cancel: () => void,
  selectedOrderCount: number
}) {

  if (show) {
    return (
      <div className="flex flex-col overflow-visible bg-black450 rounded-lg z-50">
        <div className="text-offWhite text-sm pt-3 my-3 mx-3">
          Actions
        </div>
        <hr className="text-black400 mx-3 text-xsm" />
        <div onClick={() => claim()} className="text-black200 text-xsm mx-2 my-1 p-1 cursor-pointer">
          Claim Selected Orders ({selectedOrderCount})
        </div>
        <hr className="text-black400 mx-3 text-xsm" />
        <div onClick={() => cancel()} className="text-semanticRed text-xsm mx-2 my-1 p-1 cursor-pointer">
          Cancel Selected Orders ({selectedOrderCount})
        </div>
      </div>
    );
  } else {
    return (null);
  }
}

function SingleOrderActions({
  show,
  claim,
  cancel
}: {
  show: boolean,
  claim: () => void,
  cancel: () => void,
}) {

  if (show) {
    return (
      <div className="flex flex-col overflow-visible bg-black450 rounded-lg z-50">
        <div className="text-sm my-2 mx-3">
          Actions
        </div>
        <hr className="text-black400 mx-3" />
        <div onClick={() => claim()} className="text-black200 text-xsm mx-2 my-1 p-1 cursor-pointer">
          Claim This Order
        </div>
        <hr className="text-black400 mx-3" />
        <div onClick={() => cancel()} className="text-semanticRed text-xsm mx-2 my-1 p-1 cursor-pointer">
          Cancel This Order
        </div>
      </div>
    );
  } else {
    return (null);
  }
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
  const [showAction, setShowAction] = useState<boolean>(false);
  const { supportedToken } = useData();

  const claim = () => {
    if (order === undefined) return;

    setShowAction(false);
    claimOrder(order.id);
  }

  const cancel = () => {
    if (order === undefined) return;

    setShowAction(false);
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

  if (order === undefined) {
    return (null);
  } else {
    return (
      <div className="grid grid-cols-6 h-16">
        <div className="flex text-offWhite my-3">
          {order.cancelledAtTimestamp.eq(BigNumber.from("0")) && order.amountClaimed.lt(order.amountOrdered) &&
            <input
              checked={selected}
              onChange={(e) => { toggleSelected(order.id) }}
              type="checkbox"
              className="bg-neutral700 focus:outline-none rounded mt-1 mr-2"
            />}
          {order.assetName}
        </div>
        <div className="flex text-offWhite my-3">
          {order.assetGame}
        </div>
        <div className="flex text-offWhite my-3">
          {moment(Number((order.createdAtTimestamp).mul(BigNumber.from("1000")))).format()}
        </div>
        <div className="flex text-offWhite my-3">
          {Number(order.amountFilled)} / {Number(order.amountOrdered)}
        </div>
        <div className="flex text-offWhite my-3">
          {claimableAmount()}
        </div>
        <div className="flex text-offWhite my-3">
          <img onClick={() => setShowAction(!showAction)} className="cursor-pointer p-3 h-7" src={Ellipsis} alt="Ellipsis" />
          <SingleOrderActions show={showAction} claim={claim} cancel={cancel} />
        </div>
      </div>
    );
  }
}

function Orders() {
  const { ownedOrders, systemContracts: { exchange } } = useData();
  const [typeFilteredOrders, setTypeFilteredOrders] = useState<OrderWithAssetMetadata[]>([]);
  const [statusFilteredOrders, setStatusFilteredOrders] = useState<OrderWithAssetMetadata[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<BigNumber[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
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

    setShowActions(false);
    transaction(() => exchange.claimOrders(selectedOrderIds), "Transaction pending", "Transaction failed", "Transaction succeeded", undefined, undefined, undefined);
  }

  const cancelSelectedOrders = () => {
    if (exchange === undefined) return;

    setShowActions(false);
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
          Orders
        </div>
        <div className="grid grid-cols-6 mb-8 text-lg h-8">
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
          <div />
          <div />
          <div className="z-0">
            <div className="flex flex-row">
              <button onClick={() => setShowFilterOptions(!showFilterOptions)} className="flex justify-center text-chartreuse500 text-sm bg-opacity-1 border-chartreuse500 border-2 my-2 w-8 py-1 rounded-lg">
                <img className="flex my-1" src={Filter} alt="Filter" />
              </button>
              <button onClick={() => setShowActions(!showActions)} className="flex justify-center text-chartreuse500 text-sm bg-opacity-1 border-chartreuse500 border-2 ml-2 my-2 w-32 py-1 rounded-lg">
                ACTIONS
                <img className="ml-2 mt-1" src={DownArrow} alt="DownArrow" />
              </button>
            </div>
            <FilterOptions
              show={showFilterOptions}
              setShow={setShowFilterOptions}
              showFilledOrders={showFilledOrders}
              showCancelledOrders={showCancelledOrders}
              setShowFilledOrders={setShowFilledOrders}
              setShowCancelledOrders={setShowCancelledOrders}
            />
            <SelectedOrdersActions show={showActions} claim={() => claimSelectedOrders()} cancel={() => cancelSelectedOrders()} selectedOrderCount={selectedOrderIds.length} />
          </div>
        </div>
        <div className="grid grid-cols-6 mb-4 text-lg">
          <div className="flex text-offWhite">
            Item
          </div>
          <div className="flex text-offWhite">
            Collection
          </div>
          <div className="flex text-offWhite">
            Created
          </div>
          <div className="flex text-offWhite">
            Amount Filled
          </div>
          <div className="flex text-offWhite">
            Claimable
          </div>
          <div className="flex text-offWhite">
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

export default Orders;