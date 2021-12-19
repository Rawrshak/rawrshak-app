/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AddressResolver,
  AddressResolverInterface,
} from "../AddressResolver";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes4",
        name: "id",
        type: "bytes4",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "AddressRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_id",
        type: "bytes4",
      },
    ],
    name: "getAddress",
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
        internalType: "bytes4",
        name: "_id",
        type: "bytes4",
      },
    ],
    name: "getAddressWithCheck",
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
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "bytes4[]",
        name: "_ids",
        type: "bytes4[]",
      },
      {
        internalType: "address[]",
        name: "_addresses",
        type: "address[]",
      },
    ],
    name: "registerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061138f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638129fc1c1161005b5780638129fc1c146101135780638da5cb5b1461011d5780638fafebeb1461013b578063f2fde38b1461016b57610088565b806301ffc9a71461008d57806346fab623146100bd578063552aaedb146100d9578063715018a614610109575b600080fd5b6100a760048036038101906100a29190610edd565b610187565b6040516100b49190611011565b60405180910390f35b6100d760048036038101906100d29190610e68565b6101ff565b005b6100f360048036038101906100ee9190610edd565b61051f565b6040516101009190610ff6565b60405180910390f35b61011161059a565b005b61011b610622565b005b610125610734565b6040516101329190610ff6565b60405180910390f35b61015560048036038101906101509190610edd565b61075e565b6040516101629190610ff6565b60405180910390f35b61018560048036038101906101809190610e3f565b6108b9565b005b6000610192826109b1565b806101f8575060976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff165b9050919050565b610207610a1b565b73ffffffffffffffffffffffffffffffffffffffff16610225610734565b73ffffffffffffffffffffffffffffffffffffffff161461027b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610272906110cc565b60405180910390fd5b60008484905011801561029357508181905084849050145b6102d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c9906110ac565b60405180910390fd5b60005b8484905081101561051857828282818110610319577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b905060200201602081019061032e9190610e3f565b60c9600087878581811061036b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90506020020160208101906103809190610edd565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828282818110610443577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90506020020160208101906104589190610e3f565b73ffffffffffffffffffffffffffffffffffffffff168585838181106104a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90506020020160208101906104bc9190610edd565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167ff42f9b4e32a93e3a9f9e8508c043e1e2bbf06caba61c13cf37e4ad913fd8f84060405160405180910390a38061051190611171565b90506102d5565b5050505050565b600060c96000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6105a2610a1b565b73ffffffffffffffffffffffffffffffffffffffff166105c0610734565b73ffffffffffffffffffffffffffffffffffffffff1614610616576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060d906110cc565b60405180910390fd5b6106206000610a23565b565b600060019054906101000a900460ff1680610648575060008054906101000a900460ff16155b610687576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067e9061106c565b60405180910390fd5b60008060019054906101000a900460ff1615905080156106d7576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6106df610ae9565b6106e7610bc2565b6107107f9c7ff31300000000000000000000000000000000000000000000000000000000610cab565b80156107315760008060016101000a81548160ff0219169083151502179055505b50565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff1660c96000847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610840576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108379061108c565b60405180910390fd5b60c96000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6108c1610a1b565b73ffffffffffffffffffffffffffffffffffffffff166108df610734565b73ffffffffffffffffffffffffffffffffffffffff1614610935576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092c906110cc565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156109a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099c9061102c565b60405180910390fd5b6109ae81610a23565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060019054906101000a900460ff1680610b0f575060008054906101000a900460ff16155b610b4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b459061106c565b60405180910390fd5b60008060019054906101000a900460ff161590508015610b9e576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015610bbf5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610be8575060008054906101000a900460ff16155b610c27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1e9061106c565b60405180910390fd5b60008060019054906101000a900460ff161590508015610c77576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610c87610c82610a1b565b610a23565b8015610ca85760008060016101000a81548160ff0219169083151502179055505b50565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415610d14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0b9061104c565b60405180910390fd5b600160976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600081359050610d908161132b565b92915050565b60008083601f840112610da857600080fd5b8235905067ffffffffffffffff811115610dc157600080fd5b602083019150836020820283011115610dd957600080fd5b9250929050565b60008083601f840112610df257600080fd5b8235905067ffffffffffffffff811115610e0b57600080fd5b602083019150836020820283011115610e2357600080fd5b9250929050565b600081359050610e3981611342565b92915050565b600060208284031215610e5157600080fd5b6000610e5f84828501610d81565b91505092915050565b60008060008060408587031215610e7e57600080fd5b600085013567ffffffffffffffff811115610e9857600080fd5b610ea487828801610de0565b9450945050602085013567ffffffffffffffff811115610ec357600080fd5b610ecf87828801610d96565b925092505092959194509250565b600060208284031215610eef57600080fd5b6000610efd84828501610e2a565b91505092915050565b610f0f816110fd565b82525050565b610f1e8161110f565b82525050565b6000610f316026836110ec565b9150610f3c826111e9565b604082019050919050565b6000610f54601c836110ec565b9150610f5f82611238565b602082019050919050565b6000610f77602e836110ec565b9150610f8282611261565b604082019050919050565b6000610f9a6018836110ec565b9150610fa5826112b0565b602082019050919050565b6000610fbd6015836110ec565b9150610fc8826112d9565b602082019050919050565b6000610fe06020836110ec565b9150610feb82611302565b602082019050919050565b600060208201905061100b6000830184610f06565b92915050565b60006020820190506110266000830184610f15565b92915050565b6000602082019050818103600083015261104581610f24565b9050919050565b6000602082019050818103600083015261106581610f47565b9050919050565b6000602082019050818103600083015261108581610f6a565b9050919050565b600060208201905081810360008301526110a581610f8d565b9050919050565b600060208201905081810360008301526110c581610fb0565b9050919050565b600060208201905081810360008301526110e581610fd3565b9050919050565b600082825260208201905092915050565b600061110882611147565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061117c82611167565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156111af576111ae6111ba565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433136353a20696e76616c696420696e7465726661636520696400000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f4d697373696e6720436f6e747261637420416464726573730000000000000000600082015250565b7f496e76616c696420696e707574206c656e6774682e0000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b611334816110fd565b811461133f57600080fd5b50565b61134b8161111b565b811461135657600080fd5b5056fea2646970667358221220f4de6aeca056dfafcfd57880e2b972cff784939cc4e0c212fb9b9e4677edd47664736f6c63430008030033";

export class AddressResolver__factory extends ContractFactory {
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
  ): Promise<AddressResolver> {
    return super.deploy(overrides || {}) as Promise<AddressResolver>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AddressResolver {
    return super.attach(address) as AddressResolver;
  }
  connect(signer: Signer): AddressResolver__factory {
    return super.connect(signer) as AddressResolver__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AddressResolverInterface {
    return new utils.Interface(_abi) as AddressResolverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AddressResolver {
    return new Contract(address, _abi, signerOrProvider) as AddressResolver;
  }
}
