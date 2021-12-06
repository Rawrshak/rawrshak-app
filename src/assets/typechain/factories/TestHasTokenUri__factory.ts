/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TestHasTokenUri,
  TestHasTokenUriInterface,
} from "../TestHasTokenUri";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "parent",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "HiddenUriUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "parent",
        type: "address",
      },
    ],
    name: "ParentSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "parent",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "PublicUriUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isPublic",
        type: "bool",
      },
    ],
    name: "getLatestUriVersion",
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
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "parent",
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
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct LibAsset.AssetUri[]",
        name: "_assets",
        type: "tuple[]",
      },
    ],
    name: "setHiddenUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setParent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
        ],
        internalType: "struct LibAsset.AssetUri[]",
        name: "_assets",
        type: "tuple[]",
      },
    ],
    name: "setPublicUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_version",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isPublic",
        type: "bool",
      },
    ],
    name: "tokenUri",
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

const _bytecode =
  "0x608060405234801561001057600080fd5b506113d9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638129fc1c1161005b5780638129fc1c1461012757806384aa92e914610131578063a7c9ef8014610161578063ea1d6e8c1461017d57610088565b806301ffc9a71461008d5780631499c592146100bd578063513a993b146100d957806360f96a8f14610109575b600080fd5b6100a760048036038101906100a29190610e8a565b610199565b6040516100b49190610fe2565b60405180910390f35b6100d760048036038101906100d29190610e20565b610211565b005b6100f360048036038101906100ee9190610eb3565b610214565b604051610100919061103f565b60405180910390f35b610111610228565b60405161011e9190610fc7565b60405180910390f35b61012f610237565b005b61014b60048036038101906101469190610eef565b610320565b6040516101589190610ffd565b60405180910390f35b61017b60048036038101906101769190610e49565b610336565b005b61019760048036038101906101929190610e49565b6103e9565b005b60006101a48261049c565b8061020a575060336000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff165b9050919050565b50565b60006102208383610506565b905092915050565b600061023261054c565b905090565b600060019054906101000a900460ff168061025d575060008054906101000a900460ff16155b61029c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102939061101f565b60405180910390fd5b60008060019054906101000a900460ff1615905080156102ec576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6102f4610576565b6102fc61064f565b801561031d5760008060016101000a81548160ff0219169083151502179055505b50565b606061032d848484610728565b90509392505050565b60005b81518110156103e5576103d482828151811061037e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151600001518383815181106103c3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015160200151610973565b806103de90611211565b9050610339565b5050565b60005b815181101561049857610487828281518110610431577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015160000151838381518110610476577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015160200151610a99565b8061049190611211565b90506103ec565b5050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000811561052c5760666000848152602001908152602001600020600101549050610546565b606760008481526020019081526020016000206001015490505b92915050565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600060019054906101000a900460ff168061059c575060008054906101000a900460ff16155b6105db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d29061101f565b60405180910390fd5b60008060019054906101000a900460ff16159050801561062b576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b801561064c5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610675575060008054906101000a900460ff16155b6106b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ab9061101f565b60405180910390fd5b60008060019054906101000a900460ff161590508015610704576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156107255760008060016101000a81548160ff0219169083151502179055505b50565b6060811561085057606660008581526020019081526020016000206001015483111561076857606660008581526020019081526020016000206001015492505b6066600085815260200190815260200160002060000183815481106107b6577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200180546107cb906111ae565b80601f01602080910402602001604051908101604052809291908181526020018280546107f7906111ae565b80156108445780601f1061081957610100808354040283529160200191610844565b820191906000526020600020905b81548152906001019060200180831161082757829003601f168201915b5050505050905061096c565b606760008581526020019081526020016000206001015483111561088857606760008581526020019081526020016000206001015492505b6067600085815260200190815260200160002060000183815481106108d6577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200180546108eb906111ae565b80601f0160208091040260200160405190810160405280929190818152602001828054610917906111ae565b80156109645780601f1061093957610100808354040283529160200191610964565b820191906000526020600020905b81548152906001019060200180831161094757829003601f168201915b505050505090505b9392505050565b6000606660008481526020019081526020016000206000018054905014156109b657600060666000848152602001908152602001600020600101819055506109e3565b6066600083815260200190815260200160002060010160008154809291906109dd90611211565b91905055505b6066600083815260200190815260200160002060000181908060018154018082558091505060019003906000526020600020016000909190919091509080519060200190610a32929190610bd6565b50606660008381526020019081526020016000206001015482610a5361054c565b73ffffffffffffffffffffffffffffffffffffffff167fe431639508eaf64b85ea47b14751ef3d7d3766c97fef52969c47f21ab163cd1660405160405180910390a45050565b6000819050600081511415610aae5750610bd2565b600060676000858152602001908152602001600020600001805490501415610af15760006067600085815260200190815260200160002060010181905550610b1e565b606760008481526020019081526020016000206001016000815480929190610b1890611211565b91905055505b6067600084815260200190815260200160002060000182908060018154018082558091505060019003906000526020600020016000909190919091509080519060200190610b6d929190610bd6565b50606760008481526020019081526020016000206001015483610b8e61054c565b73ffffffffffffffffffffffffffffffffffffffff167fc743c6ac73cb807d07e7632666a185e9bf1425c874d9ab16461861f642c769f560405160405180910390a4505b5050565b828054610be2906111ae565b90600052602060002090601f016020900481019282610c045760008555610c4b565b82601f10610c1d57805160ff1916838001178555610c4b565b82800160010185558215610c4b579182015b82811115610c4a578251825591602001919060010190610c2f565b5b509050610c589190610c5c565b5090565b5b80821115610c75576000816000905550600101610c5d565b5090565b6000610c8c610c878461107f565b61105a565b9050808382526020820190508260005b85811015610ccc5781358501610cb28882610da7565b845260208401935060208301925050600181019050610c9c565b5050509392505050565b6000610ce9610ce4846110ab565b61105a565b905082815260208101848484011115610d0157600080fd5b610d0c84828561116c565b509392505050565b600081359050610d2381611347565b92915050565b600082601f830112610d3a57600080fd5b8135610d4a848260208601610c79565b91505092915050565b600081359050610d628161135e565b92915050565b600081359050610d7781611375565b92915050565b600082601f830112610d8e57600080fd5b8135610d9e848260208601610cd6565b91505092915050565b600060408284031215610db957600080fd5b610dc3604061105a565b90506000610dd384828501610e0b565b600083015250602082013567ffffffffffffffff811115610df357600080fd5b610dff84828501610d7d565b60208301525092915050565b600081359050610e1a8161138c565b92915050565b600060208284031215610e3257600080fd5b6000610e4084828501610d14565b91505092915050565b600060208284031215610e5b57600080fd5b600082013567ffffffffffffffff811115610e7557600080fd5b610e8184828501610d29565b91505092915050565b600060208284031215610e9c57600080fd5b6000610eaa84828501610d68565b91505092915050565b60008060408385031215610ec657600080fd5b6000610ed485828601610e0b565b9250506020610ee585828601610d53565b9150509250929050565b600080600060608486031215610f0457600080fd5b6000610f1286828701610e0b565b9350506020610f2386828701610e0b565b9250506040610f3486828701610d53565b9150509250925092565b610f47816110f8565b82525050565b610f568161110a565b82525050565b6000610f67826110dc565b610f7181856110e7565b9350610f8181856020860161117b565b610f8a816112e7565b840191505092915050565b6000610fa2602e836110e7565b9150610fad826112f8565b604082019050919050565b610fc181611162565b82525050565b6000602082019050610fdc6000830184610f3e565b92915050565b6000602082019050610ff76000830184610f4d565b92915050565b600060208201905081810360008301526110178184610f5c565b905092915050565b6000602082019050818103600083015261103881610f95565b9050919050565b60006020820190506110546000830184610fb8565b92915050565b6000611064611075565b905061107082826111e0565b919050565b6000604051905090565b600067ffffffffffffffff82111561109a576110996112b8565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156110c6576110c56112b8565b5b6110cf826112e7565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600061110382611142565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561119957808201518184015260208101905061117e565b838111156111a8576000848401525b50505050565b600060028204905060018216806111c657607f821691505b602082108114156111da576111d9611289565b5b50919050565b6111e9826112e7565b810181811067ffffffffffffffff82111715611208576112076112b8565b5b80604052505050565b600061121c82611162565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561124f5761124e61125a565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b611350816110f8565b811461135b57600080fd5b50565b6113678161110a565b811461137257600080fd5b50565b61137e81611116565b811461138957600080fd5b50565b61139581611162565b81146113a057600080fd5b5056fea26469706673582212209efae58ec34d1efff2a03eaeec7a62a60cf4349a5da231ddd7094da3ccc6455564736f6c63430008030033";

export class TestHasTokenUri__factory extends ContractFactory {
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
  ): Promise<TestHasTokenUri> {
    return super.deploy(overrides || {}) as Promise<TestHasTokenUri>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestHasTokenUri {
    return super.attach(address) as TestHasTokenUri;
  }
  connect(signer: Signer): TestHasTokenUri__factory {
    return super.connect(signer) as TestHasTokenUri__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestHasTokenUriInterface {
    return new utils.Interface(_abi) as TestHasTokenUriInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestHasTokenUri {
    return new Contract(address, _abi, signerOrProvider) as TestHasTokenUri;
  }
}
