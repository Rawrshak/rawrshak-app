/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IContractUri, IContractUriInterface } from "../IContractUri";

const _abi = [
  {
    inputs: [],
    name: "contractUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IContractUri__factory {
  static readonly abi = _abi;
  static createInterface(): IContractUriInterface {
    return new utils.Interface(_abi) as IContractUriInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IContractUri {
    return new Contract(address, _abi, signerOrProvider) as IContractUri;
  }
}
