/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IExchange, IExchangeInterface } from "../IExchange";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "contentAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            internalType: "struct LibOrder.AssetData",
            name: "asset",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isBuyOrder",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct LibOrder.OrderInput",
        name: "order",
        type: "tuple",
      },
    ],
    name: "OrderPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "orderIds",
        type: "uint256[]",
      },
    ],
    name: "OrdersClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "orderIds",
        type: "uint256[]",
      },
    ],
    name: "OrdersDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "orderIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "contentAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct LibOrder.AssetData",
        name: "asset",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalAssetsAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
    ],
    name: "OrdersFilled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_orderIds",
        type: "uint256[]",
      },
    ],
    name: "cancelOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_orderIds",
        type: "uint256[]",
      },
    ],
    name: "claimOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimableRoyalties",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_orderIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "amountToSell",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSpend",
        type: "uint256",
      },
    ],
    name: "fillBuyOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_orderIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "amountToBuy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSpend",
        type: "uint256",
      },
    ],
    name: "fillSellOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "contentAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            internalType: "struct LibOrder.AssetData",
            name: "asset",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOrdered",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountFilled",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isBuyOrder",
            type: "bool",
          },
          {
            internalType: "enum LibOrder.OrderState",
            name: "state",
            type: "uint8",
          },
        ],
        internalType: "struct LibOrder.Order",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nftsEscrow",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "contentAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            internalType: "struct LibOrder.AssetData",
            name: "asset",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isBuyOrder",
            type: "bool",
          },
        ],
        internalType: "struct LibOrder.OrderInput",
        name: "_order",
        type: "tuple",
      },
    ],
    name: "placeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenEscrow",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IExchange__factory {
  static readonly abi = _abi;
  static createInterface(): IExchangeInterface {
    return new utils.Interface(_abi) as IExchangeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IExchange {
    return new Contract(address, _abi, signerOrProvider) as IExchange;
  }
}
