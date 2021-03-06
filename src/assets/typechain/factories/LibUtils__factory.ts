/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LibUtils, LibUtilsInterface } from "../LibUtils";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "modulus",
        type: "uint256",
      },
    ],
    name: "random",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x610406610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c8063b863bd3714610045578063c5d3e11d14610075575b600080fd5b61005f600480360381019061005a91906101a5565b6100a5565b60405161006c919061027a565b60405180910390f35b61008f600480360381019061008a9190610169565b610109565b60405161009c919061027a565b60405180910390f35b600081426000357fffffffff00000000000000000000000000000000000000000000000000000000166040516020016100df92919061024e565b6040516020818303038152906040528051906020012060001c6101029190610335565b9050919050565b6000828260405160200161011e929190610222565b6040516020818303038152906040528051906020012060001c905092915050565b60008135905061014e816103a2565b92915050565b600081359050610163816103b9565b92915050565b6000806040838503121561017c57600080fd5b600061018a8582860161013f565b925050602061019b85828601610154565b9150509250929050565b6000602082840312156101b757600080fd5b60006101c584828501610154565b91505092915050565b6101df6101da82610295565b6102fd565b82525050565b6101f66101f1826102a7565b61030f565b82525050565b610205816102f3565b82525050565b61021c610217826102f3565b61032b565b82525050565b600061022e82856101ce565b60148201915061023e828461020b565b6020820191508190509392505050565b600061025a828561020b565b60208201915061026a82846101e5565b6004820191508190509392505050565b600060208201905061028f60008301846101fc565b92915050565b60006102a0826102d3565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061030882610319565b9050919050565b6000819050919050565b600061032482610395565b9050919050565b6000819050919050565b6000610340826102f3565b915061034b836102f3565b92508261035b5761035a610366565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60008160601b9050919050565b6103ab81610295565b81146103b657600080fd5b50565b6103c2816102f3565b81146103cd57600080fd5b5056fea264697066735822122073b989b44b27e309456d102f4189570abadf09cee94d5ebb34dfbb9a0c1a86a264736f6c63430008030033";

export class LibUtils__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LibUtils> {
    return super.deploy(overrides || {}) as Promise<LibUtils>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LibUtils {
    return super.attach(address) as LibUtils;
  }
  connect(signer: Signer): LibUtils__factory {
    return super.connect(signer) as LibUtils__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibUtilsInterface {
    return new utils.Interface(_abi) as LibUtilsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibUtils {
    return new Contract(address, _abi, signerOrProvider) as LibUtils;
  }
}
