/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IEscrowBase, IEscrowBaseInterface } from "../IEscrowBase";

const _abi = [
  {
    inputs: [],
    name: "MANAGER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_manager",
        type: "address",
      },
    ],
    name: "registerManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IEscrowBase__factory {
  static readonly abi = _abi;
  static createInterface(): IEscrowBaseInterface {
    return new utils.Interface(_abi) as IEscrowBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEscrowBase {
    return new Contract(address, _abi, signerOrProvider) as IEscrowBase;
  }
}
