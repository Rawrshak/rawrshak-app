/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RoyaltyManager,
  RoyaltyManagerInterface,
} from "../RoyaltyManager";

const _abi = [
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "claimRoyalties",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
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
        internalType: "address",
        name: "_resolver",
        type: "address",
      },
    ],
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
        name: "_asset",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
    ],
    name: "payableRoyalties",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
    ],
    name: "transferPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_total",
        type: "uint256",
      },
    ],
    name: "transferPlatformFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_royaltyFee",
        type: "uint256",
      },
    ],
    name: "transferRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "transferRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061289f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80638da5cb5b116100715780638da5cb5b146101795780638f46d22214610197578063a34fe5a8146101c8578063c162c916146101e4578063c4d66de814610200578063f2fde38b1461021c576100b4565b806301ffc9a7146100b957806319410c52146100e95780631f6de15d1461010557806331f7701c146101215780634c74af7b1461013d578063715018a61461016f575b600080fd5b6100d360048036038101906100ce9190611e3c565b610238565b6040516100e0919061224d565b60405180910390f35b61010360048036038101906100fe9190611ccd565b6102b0565b005b61011f600480360381019061011a9190611d58565b610557565b005b61013b60048036038101906101369190611c6a565b6107fc565b005b61015760048036038101906101529190611e65565b6108f6565b604051610166939291906121df565b60405180910390f35b610177610bc0565b005b610181610c48565b60405161018e9190612156565b60405180910390f35b6101b160048036038101906101ac9190611c18565b610c72565b6040516101bf929190612216565b60405180910390f35b6101e260048036038101906101dd9190611eca565b610d13565b005b6101fe60048036038101906101f99190611c18565b610e0a565b005b61021a60048036038101906102159190611c18565b610efb565b005b61023660048036038101906102319190611c18565b610ff6565b005b6000610243826110ee565b806102a9575060976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff165b9050919050565b6102b8611158565b73ffffffffffffffffffffffffffffffffffffffff166102d6610c48565b73ffffffffffffffffffffffffffffffffffffffff161461032c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610323906122e3565b60405180910390fd5b610334611160565b73ffffffffffffffffffffffffffffffffffffffff1663c833ef436040518163ffffffff1660e01b815260040160206040518083038186803b15801561037957600080fd5b505afa15801561038d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b19190611e13565b15610552576000620f42406103c4611160565b73ffffffffffffffffffffffffffffffffffffffff16632c4e722e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561040957600080fd5b505afa15801561041d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104419190611ea1565b62ffffff168361045191906124ca565b61045b9190612499565b9050610465611160565b73ffffffffffffffffffffffffffffffffffffffff1663a71532cd84836040518363ffffffff1660e01b815260040161049f9291906121b6565b600060405180830381600087803b1580156104b957600080fd5b505af11580156104cd573d6000803e3d6000fd5b505050506104d9611219565b73ffffffffffffffffffffffffffffffffffffffff16636c05ca4884866104fe611160565b856040518563ffffffff1660e01b815260040161051e9493929190612171565b600060405180830381600087803b15801561053857600080fd5b505af115801561054c573d6000803e3d6000fd5b50505050505b505050565b61055f611158565b73ffffffffffffffffffffffffffffffffffffffff1661057d610c48565b73ffffffffffffffffffffffffffffffffffffffff16146105d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ca906122e3565b60405180910390fd5b6105db611160565b73ffffffffffffffffffffffffffffffffffffffff1663c833ef436040518163ffffffff1660e01b815260040160206040518083038186803b15801561062057600080fd5b505afa158015610634573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106589190611e13565b156107f7576000620f424061066b611160565b73ffffffffffffffffffffffffffffffffffffffff16632c4e722e6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106b057600080fd5b505afa1580156106c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e89190611ea1565b62ffffff16836106f891906124ca565b6107029190612499565b905061070c611160565b73ffffffffffffffffffffffffffffffffffffffff1663a71532cd85836040518363ffffffff1660e01b81526004016107469291906121b6565b600060405180830381600087803b15801561076057600080fd5b505af1158015610774573d6000803e3d6000fd5b50505050610780611219565b73ffffffffffffffffffffffffffffffffffffffff1663480a0044846107a4611160565b846040518463ffffffff1660e01b81526004016107c393929190612323565b600060405180830381600087803b1580156107dd57600080fd5b505af11580156107f1573d6000803e3d6000fd5b50505050505b505050565b610804611158565b73ffffffffffffffffffffffffffffffffffffffff16610822610c48565b73ffffffffffffffffffffffffffffffffffffffff1614610878576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086f906122e3565b60405180910390fd5b610880611219565b73ffffffffffffffffffffffffffffffffffffffff166331f7701c848685856040518563ffffffff1660e01b81526004016108be9493929190612171565b600060405180830381600087803b1580156108d857600080fd5b505af11580156108ec573d6000803e3d6000fd5b5050505050505050565b6000806000610903611158565b73ffffffffffffffffffffffffffffffffffffffff16610921610c48565b73ffffffffffffffffffffffffffffffffffffffff1614610977576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096e906122e3565b60405180910390fd5b839050610982611160565b73ffffffffffffffffffffffffffffffffffffffff1663c833ef436040518163ffffffff1660e01b815260040160206040518083038186803b1580156109c757600080fd5b505afa1580156109db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109ff9190611e13565b15610abb576000620f4240610a12611160565b73ffffffffffffffffffffffffffffffffffffffff16632c4e722e6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a5757600080fd5b505afa158015610a6b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8f9190611ea1565b62ffffff1686610a9f91906124ca565b610aa99190612499565b90508082610ab79190612524565b9150505b610afd632a55205a60e01b866000016020810190610ad99190611c18565b73ffffffffffffffffffffffffffffffffffffffff166112d290919063ffffffff16565b15610bb957846000016020810190610b159190611c18565b73ffffffffffffffffffffffffffffffffffffffff16632a55205a8660200135866040518363ffffffff1660e01b8152600401610b5392919061235a565b604080518083038186803b158015610b6a57600080fd5b505afa158015610b7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba29190611d1c565b80935081945050508181610bb69190612524565b90505b9250925092565b610bc8611158565b73ffffffffffffffffffffffffffffffffffffffff16610be6610c48565b73ffffffffffffffffffffffffffffffffffffffff1614610c3c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c33906122e3565b60405180910390fd5b610c4660006112f7565b565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606080610c7d611219565b73ffffffffffffffffffffffffffffffffffffffff1663d84ce420846040518263ffffffff1660e01b8152600401610cb59190612156565b60006040518083038186803b158015610ccd57600080fd5b505afa158015610ce1573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610d0a9190611da7565b91509150915091565b610d1b611158565b73ffffffffffffffffffffffffffffffffffffffff16610d39610c48565b73ffffffffffffffffffffffffffffffffffffffff1614610d8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d86906122e3565b60405180910390fd5b610d97611219565b73ffffffffffffffffffffffffffffffffffffffff1663a34fe5a88484846040518463ffffffff1660e01b8152600401610dd393929190612323565b600060405180830381600087803b158015610ded57600080fd5b505af1158015610e01573d6000803e3d6000fd5b50505050505050565b610e12611158565b73ffffffffffffffffffffffffffffffffffffffff16610e30610c48565b73ffffffffffffffffffffffffffffffffffffffff1614610e86576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7d906122e3565b60405180910390fd5b610e8e611219565b73ffffffffffffffffffffffffffffffffffffffff1663c162c916826040518263ffffffff1660e01b8152600401610ec69190612156565b600060405180830381600087803b158015610ee057600080fd5b505af1158015610ef4573d6000803e3d6000fd5b5050505050565b600060019054906101000a900460ff1680610f21575060008054906101000a900460ff16155b610f60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f57906122c3565b60405180910390fd5b60008060019054906101000a900460ff161590508015610fb0576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610fb86113bd565b610fc0611496565b610fc98261157f565b610fd161170a565b8015610ff25760008060016101000a81548160ff0219169083151502179055505b5050565b610ffe611158565b73ffffffffffffffffffffffffffffffffffffffff1661101c610c48565b73ffffffffffffffffffffffffffffffffffffffff1614611072576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611069906122e3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156110e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d990612283565b60405180910390fd5b6110eb816112f7565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b600060c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663552aaedb637f17083660e01b6040518263ffffffff1660e01b81526004016111c49190612268565b60206040518083038186803b1580156111dc57600080fd5b505afa1580156111f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112149190611c41565b905090565b600060c960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663552aaedb6329a264aa60e01b6040518263ffffffff1660e01b815260040161127d9190612268565b60206040518083038186803b15801561129557600080fd5b505afa1580156112a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112cd9190611c41565b905090565b60006112dd836117f0565b80156112ef57506112ee838361183d565b5b905092915050565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060019054906101000a900460ff16806113e3575060008054906101000a900460ff16155b611422576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611419906122c3565b60405180910390fd5b60008060019054906101000a900460ff161590508015611472576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156114935760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806114bc575060008054906101000a900460ff16155b6114fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f2906122c3565b60405180910390fd5b60008060019054906101000a900460ff16159050801561154b576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61155b611556611158565b6112f7565b801561157c5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806115a5575060008054906101000a900460ff16155b6115e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115db906122c3565b60405180910390fd5b60008060019054906101000a900460ff161590508015611634576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156116a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169b90612303565b60405180910390fd5b8160c960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080156117065760008060016101000a81548160ff0219169083151502179055505b5050565b600060019054906101000a900460ff1680611730575060008054906101000a900460ff16155b61176f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611766906122c3565b60405180910390fd5b60008060019054906101000a900460ff1615905080156117bf576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6117cc600d60e01b611968565b80156117ed5760008060016101000a81548160ff0219169083151502179055505b50565b600061181c827f01ffc9a70000000000000000000000000000000000000000000000000000000061183d565b801561183657506118348263ffffffff60e01b61183d565b155b9050919050565b6000806301ffc9a760e01b836040516024016118599190612268565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000808573ffffffffffffffffffffffffffffffffffffffff16617530846040516118e3919061213f565b6000604051808303818686fa925050503d806000811461191f576040519150601f19603f3d011682016040523d82523d6000602084013e611924565b606091505b509150915060208151101561193f5760009350505050611962565b81801561195c57508080602001905181019061195b9190611e13565b5b93505050505b92915050565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614156119d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119c8906122a3565b60405180910390fd5b600160976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000611a51611a4c846123a8565b612383565b90508083825260208201905082856020860282011115611a7057600080fd5b60005b85811015611aa05781611a868882611b2b565b845260208401935060208301925050600181019050611a73565b5050509392505050565b6000611abd611ab8846123d4565b612383565b90508083825260208201905082856020860282011115611adc57600080fd5b60005b85811015611b0c5781611af28882611c03565b845260208401935060208301925050600181019050611adf565b5050509392505050565b600081359050611b25816127f6565b92915050565b600081519050611b3a816127f6565b92915050565b600082601f830112611b5157600080fd5b8151611b61848260208601611a3e565b91505092915050565b600082601f830112611b7b57600080fd5b8151611b8b848260208601611aaa565b91505092915050565b600081519050611ba38161280d565b92915050565b600081359050611bb881612824565b92915050565b600060408284031215611bd057600080fd5b81905092915050565b600081519050611be88161283b565b92915050565b600081359050611bfd81612852565b92915050565b600081519050611c1281612852565b92915050565b600060208284031215611c2a57600080fd5b6000611c3884828501611b16565b91505092915050565b600060208284031215611c5357600080fd5b6000611c6184828501611b2b565b91505092915050565b60008060008060808587031215611c8057600080fd5b6000611c8e87828801611b16565b9450506020611c9f87828801611b16565b9350506040611cb087828801611b16565b9250506060611cc187828801611bee565b91505092959194509250565b600080600060608486031215611ce257600080fd5b6000611cf086828701611b16565b9350506020611d0186828701611b16565b9250506040611d1286828701611bee565b9150509250925092565b60008060408385031215611d2f57600080fd5b6000611d3d85828601611b2b565b9250506020611d4e85828601611c03565b9150509250929050565b600080600060608486031215611d6d57600080fd5b6000611d7b86828701611b16565b9350506020611d8c86828701611bee565b9250506040611d9d86828701611bee565b9150509250925092565b60008060408385031215611dba57600080fd5b600083015167ffffffffffffffff811115611dd457600080fd5b611de085828601611b40565b925050602083015167ffffffffffffffff811115611dfd57600080fd5b611e0985828601611b6a565b9150509250929050565b600060208284031215611e2557600080fd5b6000611e3384828501611b94565b91505092915050565b600060208284031215611e4e57600080fd5b6000611e5c84828501611ba9565b91505092915050565b60008060608385031215611e7857600080fd5b6000611e8685828601611bbe565b9250506040611e9785828601611bee565b9150509250929050565b600060208284031215611eb357600080fd5b6000611ec184828501611bd9565b91505092915050565b600080600060608486031215611edf57600080fd5b6000611eed86828701611bee565b9350506020611efe86828701611b16565b9250506040611f0f86828701611bee565b9150509250925092565b6000611f258383611f49565b60208301905092915050565b6000611f3d8383612121565b60208301905092915050565b611f5281612558565b82525050565b611f6181612558565b82525050565b6000611f7282612420565b611f7c818561245b565b9350611f8783612400565b8060005b83811015611fb8578151611f9f8882611f19565b9750611faa83612441565b925050600181019050611f8b565b5085935050505092915050565b6000611fd08261242b565b611fda818561246c565b9350611fe583612410565b8060005b83811015612016578151611ffd8882611f31565b97506120088361244e565b925050600181019050611fe9565b5085935050505092915050565b61202c8161256a565b82525050565b61203b81612576565b82525050565b600061204c82612436565b612056818561247d565b93506120668185602086016125db565b80840191505092915050565b600061207f602683612488565b915061208a826126dd565b604082019050919050565b60006120a2601c83612488565b91506120ad8261272c565b602082019050919050565b60006120c5602e83612488565b91506120d082612755565b604082019050919050565b60006120e8602083612488565b91506120f3826127a4565b602082019050919050565b600061210b601083612488565b9150612116826127cd565b602082019050919050565b61212a816125d1565b82525050565b612139816125d1565b82525050565b600061214b8284612041565b915081905092915050565b600060208201905061216b6000830184611f58565b92915050565b60006080820190506121866000830187611f58565b6121936020830186611f58565b6121a06040830185611f58565b6121ad6060830184612130565b95945050505050565b60006040820190506121cb6000830185611f58565b6121d86020830184612130565b9392505050565b60006060820190506121f46000830186611f58565b6122016020830185612130565b61220e6040830184612130565b949350505050565b600060408201905081810360008301526122308185611f67565b905081810360208301526122448184611fc5565b90509392505050565b60006020820190506122626000830184612023565b92915050565b600060208201905061227d6000830184612032565b92915050565b6000602082019050818103600083015261229c81612072565b9050919050565b600060208201905081810360008301526122bc81612095565b9050919050565b600060208201905081810360008301526122dc816120b8565b9050919050565b600060208201905081810360008301526122fc816120db565b9050919050565b6000602082019050818103600083015261231c816120fe565b9050919050565b60006060820190506123386000830186612130565b6123456020830185611f58565b6123526040830184612130565b949350505050565b600060408201905061236f6000830185612130565b61237c6020830184612130565b9392505050565b600061238d61239e565b9050612399828261260e565b919050565b6000604051905090565b600067ffffffffffffffff8211156123c3576123c261269d565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156123ef576123ee61269d565b5b602082029050602081019050919050565b6000819050602082019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b60006124a4826125d1565b91506124af836125d1565b9250826124bf576124be61266e565b5b828204905092915050565b60006124d5826125d1565b91506124e0836125d1565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156125195761251861263f565b5b828202905092915050565b600061252f826125d1565b915061253a836125d1565b92508282101561254d5761254c61263f565b5b828203905092915050565b6000612563826125a2565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062ffffff82169050919050565b6000819050919050565b60005b838110156125f95780820151818401526020810190506125de565b83811115612608576000848401525b50505050565b612617826126cc565b810181811067ffffffffffffffff821117156126365761263561269d565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433136353a20696e76616c696420696e7465726661636520696400000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f7265736f6c766572207061737365642e00000000000000000000000000000000600082015250565b6127ff81612558565b811461280a57600080fd5b50565b6128168161256a565b811461282157600080fd5b50565b61282d81612576565b811461283857600080fd5b50565b612844816125c2565b811461284f57600080fd5b50565b61285b816125d1565b811461286657600080fd5b5056fea264697066735822122091844e1a07337b6e0ed01aef3c16323b172ff1e4c17045fbf50009ecee60e34e64736f6c63430008030033";

export class RoyaltyManager__factory extends ContractFactory {
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
  ): Promise<RoyaltyManager> {
    return super.deploy(overrides || {}) as Promise<RoyaltyManager>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RoyaltyManager {
    return super.attach(address) as RoyaltyManager;
  }
  connect(signer: Signer): RoyaltyManager__factory {
    return super.connect(signer) as RoyaltyManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoyaltyManagerInterface {
    return new utils.Interface(_abi) as RoyaltyManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RoyaltyManager {
    return new Contract(address, _abi, signerOrProvider) as RoyaltyManager;
  }
}
