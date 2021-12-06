/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1155HolderUpgradeable,
  ERC1155HolderUpgradeableInterface,
} from "../ERC1155HolderUpgradeable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506106dd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a714610046578063bc197c8114610076578063f23a6e61146100a6575b600080fd5b610060600480360381019061005b919061046f565b6100d6565b60405161006d91906104b6565b60405180910390f35b610090600480360381019061008b9190610321565b610150565b60405161009d91906104d1565b60405180910390f35b6100c060048036038101906100bb91906103e0565b610165565b6040516100cd91906104d1565b60405180910390f35b60007f4e2312e0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061014957506101488261017a565b5b9050919050565b600063bc197c8160e01b905095945050505050565b600063f23a6e6160e01b905095945050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60006101f76101f284610511565b6104ec565b9050808382526020820190508285602086028201111561021657600080fd5b60005b85811015610246578161022c888261030c565b845260208401935060208301925050600181019050610219565b5050509392505050565b600061026361025e8461053d565b6104ec565b90508281526020810184848401111561027b57600080fd5b6102868482856105e2565b509392505050565b60008135905061029d81610662565b92915050565b600082601f8301126102b457600080fd5b81356102c48482602086016101e4565b91505092915050565b6000813590506102dc81610679565b92915050565b600082601f8301126102f357600080fd5b8135610303848260208601610250565b91505092915050565b60008135905061031b81610690565b92915050565b600080600080600060a0868803121561033957600080fd5b60006103478882890161028e565b95505060206103588882890161028e565b945050604086013567ffffffffffffffff81111561037557600080fd5b610381888289016102a3565b935050606086013567ffffffffffffffff81111561039e57600080fd5b6103aa888289016102a3565b925050608086013567ffffffffffffffff8111156103c757600080fd5b6103d3888289016102e2565b9150509295509295909350565b600080600080600060a086880312156103f857600080fd5b60006104068882890161028e565b95505060206104178882890161028e565b94505060406104288882890161030c565b93505060606104398882890161030c565b925050608086013567ffffffffffffffff81111561045657600080fd5b610462888289016102e2565b9150509295509295909350565b60006020828403121561048157600080fd5b600061048f848285016102cd565b91505092915050565b6104a181610580565b82525050565b6104b08161058c565b82525050565b60006020820190506104cb6000830184610498565b92915050565b60006020820190506104e660008301846104a7565b92915050565b60006104f6610507565b905061050282826105f1565b919050565b6000604051905090565b600067ffffffffffffffff82111561052c5761052b610622565b5b602082029050602081019050919050565b600067ffffffffffffffff82111561055857610557610622565b5b61056182610651565b9050602081019050919050565b6000610579826105b8565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b6105fa82610651565b810181811067ffffffffffffffff8211171561061957610618610622565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61066b8161056e565b811461067657600080fd5b50565b6106828161058c565b811461068d57600080fd5b50565b610699816105d8565b81146106a457600080fd5b5056fea2646970667358221220193037ff6609dd8fca1187e0ce183740bb0cab77d15c4814b76b859b45b90a9264736f6c63430008030033";

export class ERC1155HolderUpgradeable__factory extends ContractFactory {
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
  ): Promise<ERC1155HolderUpgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC1155HolderUpgradeable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC1155HolderUpgradeable {
    return super.attach(address) as ERC1155HolderUpgradeable;
  }
  connect(signer: Signer): ERC1155HolderUpgradeable__factory {
    return super.connect(signer) as ERC1155HolderUpgradeable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155HolderUpgradeableInterface {
    return new utils.Interface(_abi) as ERC1155HolderUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155HolderUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC1155HolderUpgradeable;
  }
}
