/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ExchangeFeesEscrow,
  ExchangeFeesEscrowInterface,
} from "../ExchangeFeesEscrow";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ExchangeFeesPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "rate",
        type: "uint24",
      },
    ],
    name: "FeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_manager",
        type: "address",
      },
    ],
    name: "ManagerRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "claimRewards",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct LibStaking.Reward[]",
        name: "claimedRewards",
        type: "tuple[]",
      },
    ],
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
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositFees",
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
    name: "getClaimableRewards",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct LibStaking.Reward[]",
        name: "claimableRewards",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "hasExchangeFees",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
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
    name: "initializeTokenRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint24",
        name: "_rate",
        type: "uint24",
      },
    ],
    name: "setRate",
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
        name: "_token",
        type: "address",
      },
    ],
    name: "totalFees",
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
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "updateUserRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506136b1806100206000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806391d14854116100ad578063d547741f11610071578063d547741f14610306578063dd056c2514610322578063ec87621c1461033e578063ef5cfb8c1461035c578063f31878ae1461038c57610121565b806391d1485414610262578063a217fddf14610292578063a71532cd146102b0578063c4d66de8146102cc578063c833ef43146102e857610121565b80632c4e722e116100f45780632c4e722e146101ac5780632f2ff15d146101ca578063308e401e146101e657806336568abe146102165780634a793f2d1461023257610121565b806301ffc9a71461012657806314786e6714610156578063248a9ca3146101605780632b2da97e14610190575b600080fd5b610140600480360381019061013b9190612bb7565b6103a8565b60405161014d9190612f94565b60405180910390f35b61015e6103ba565b005b61017a60048036038101906101759190612b52565b6104f1565b6040516101879190612faf565b60405180910390f35b6101aa60048036038101906101a59190612a9b565b610511565b005b6101b4610597565b6040516101c191906130e7565b60405180910390f35b6101e460048036038101906101df9190612b7b565b6105ac565b005b61020060048036038101906101fb9190612a9b565b6105d5565b60405161020d9190612f72565b60405180910390f35b610230600480360381019061022b9190612b7b565b61096d565b005b61024c60048036038101906102479190612a9b565b6109f0565b6040516102599190613102565b60405180910390f35b61027c60048036038101906102779190612b7b565b610a2f565b6040516102899190612f94565b60405180910390f35b61029a610a9a565b6040516102a79190612faf565b60405180910390f35b6102ca60048036038101906102c59190612aed565b610aa1565b005b6102e660048036038101906102e19190612a9b565b610d0d565b005b6102f0610e10565b6040516102fd9190612f94565b60405180910390f35b610320600480360381019061031b9190612b7b565b610f00565b005b61033c60048036038101906103379190612be0565b610f29565b005b610346611107565b6040516103539190612faf565b60405180910390f35b61037660048036038101906103719190612a9b565b61112b565b6040516103839190612f72565b60405180910390f35b6103a660048036038101906103a19190612a9b565b6114cc565b005b60006103b382611923565b9050919050565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b086103ec816103e761199b565b6119a3565b60008060005b6103fc60c9611a40565b8110156104eb576104178160c9611a5590919063ffffffff16565b80935081945050506104d78361042b611a81565b73ffffffffffffffffffffffffffffffffffffffff16633ae732596040518163ffffffff1660e01b815260040160206040518083038186803b15801561047057600080fd5b505afa158015610484573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a89190612c09565b670de0b6b3a7640000856104bc9190613204565b6104c691906131d3565b60cc611b3a9092919063ffffffff16565b5080806104e39061337c565b9150506103f2565b50505050565b600060656000838152602001908152602001600020600101549050919050565b6000801b6105268161052161199b565b6119a3565b6105507f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08836105ac565b8173ffffffffffffffffffffffffffffffffffffffff167f594022ae30f535100bd2169ab77ab37c1dba3d7e89d04bd6bf17b121a3ca7c2560405160405180910390a25050565b60d160149054906101000a900462ffffff1681565b6105b5826104f1565b6105c6816105c161199b565b6119a3565b6105d08383611b6f565b505050565b60607f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b086106098161060461199b565b6119a3565b60008060008061061960cc611a40565b67ffffffffffffffff811115610658577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561069157816020015b61067e6129c3565b8152602001906001900390816106765790505b50955060005b6106a160cc611a40565b811015610962576106bc8160cc611a5590919063ffffffff16565b8093508196505050600093506000925061071d8560d060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c5090919063ffffffff16565b156107c9576107738560d060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c8090919063ffffffff16565b93506107c68560cf60008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c8090919063ffffffff16565b92505b670de0b6b3a76400006107da611a81565b73ffffffffffffffffffffffffffffffffffffffff16638e4647ee8a6040518263ffffffff1660e01b81526004016108129190612f2e565b60206040518083038186803b15801561082a57600080fd5b505afa15801561083e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108629190612c09565b848461086e919061325e565b6108789190613204565b61088291906131d3565b8461088d919061317d565b9350848782815181106108c9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505083878281518110610941577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015160200181815250508061095b9061337c565b9050610697565b505050505050919050565b61097561199b565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146109e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d9906130c7565b60405180910390fd5b6109ec8282611cb3565b5050565b6000610a068260c9611c5090919063ffffffff16565b610a135760009050610a2a565b610a278260c9611c8090919063ffffffff16565b90505b919050565b60006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08610ad381610ace61199b565b6119a3565b610ae78360c9611c5090919063ffffffff16565b610b1f57610b01838360c9611b3a9092919063ffffffff16565b50610b1983600060cc611b3a9092919063ffffffff16565b50610b55565b610b538383610b388660c9611c8090919063ffffffff16565b610b42919061317d565b60c9611b3a9092919063ffffffff16565b505b6000610b5f611a81565b73ffffffffffffffffffffffffffffffffffffffff16633ae732596040518163ffffffff1660e01b815260040160206040518083038186803b158015610ba457600080fd5b505afa158015610bb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bdc9190612c09565b1115610cba57610cb883610bee611a81565b73ffffffffffffffffffffffffffffffffffffffff16633ae732596040518163ffffffff1660e01b815260040160206040518083038186803b158015610c3357600080fd5b505afa158015610c47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6b9190612c09565b670de0b6b3a764000085610c7f9190613204565b610c8991906131d3565b610c9d8660cc611c8090919063ffffffff16565b610ca7919061317d565b60cc611b3a9092919063ffffffff16565b505b8273ffffffffffffffffffffffffffffffffffffffff167fb7ce64b247702aa7691ef2c2239a31e78d4041da5c097358c75d25999acf031583604051610d009190613102565b60405180910390a2505050565b600060019054906101000a900460ff1680610d33575060008054906101000a900460ff16155b610d72576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6990613047565b60405180910390fd5b60008060019054906101000a900460ff161590508015610dc2576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610dca611d95565b610dd2611e6e565b610dda611f47565b610de2612020565b610deb8261210d565b8015610e0c5760008060016101000a81548160ff0219169083151502179055505b5050565b60008060d160149054906101000a900462ffffff1662ffffff16118015610e6b5750600073ffffffffffffffffffffffffffffffffffffffff16610e52611a81565b73ffffffffffffffffffffffffffffffffffffffff1614155b8015610efb57506000610e7c611a81565b73ffffffffffffffffffffffffffffffffffffffff16633ae732596040518163ffffffff1660e01b815260040160206040518083038186803b158015610ec157600080fd5b505afa158015610ed5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ef99190612c09565b115b905090565b610f09826104f1565b610f1a81610f1561199b565b6119a3565b610f248383611cb3565b505050565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08610f5b81610f5661199b565b6119a3565b60008262ffffff16118015610f785750620f42408262ffffff1611155b610fb7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fae90613067565b60405180910390fd5b6000610fc1611a81565b73ffffffffffffffffffffffffffffffffffffffff16633ae732596040518163ffffffff1660e01b815260040160206040518083038186803b15801561100657600080fd5b505afa15801561101a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061103e9190612c09565b1161107e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611075906130a7565b60405180910390fd5b8160d160146101000a81548162ffffff021916908362ffffff1602179055506110a561199b565b73ffffffffffffffffffffffffffffffffffffffff167f424fce24d091d223a7a9fc24c28898d088a75d9d20d30ffef7f2a252ff44096760d160149054906101000a900462ffffff166040516110fb91906130e7565b60405180910390a25050565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0881565b60607f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0861115f8161115a61199b565b6119a3565b6000806111a960d060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611a40565b67ffffffffffffffff8111156111e8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561122157816020015b61120e6129c3565b8152602001906001900390816112065790505b50935060005b61126e60d060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611a40565b8110156114c3576112c68160d060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611a5590919063ffffffff16565b809350819450505082858281518110611308577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505081858281518110611380577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151602001818152505060008211156114b2576113ed83600060d060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611b3a9092919063ffffffff16565b5061142283836114078660c9611c8090919063ffffffff16565b611411919061325e565b60c9611b3a9092919063ffffffff16565b508273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87846040518363ffffffff1660e01b815260040161145e929190612f49565b602060405180830381600087803b15801561147857600080fd5b505af115801561148c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114b09190612b29565b505b806114bc9061337c565b9050611227565b50505050919050565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b086114fe816114f961199b565b6119a3565b6000611508611a81565b73ffffffffffffffffffffffffffffffffffffffff16633ae732596040518163ffffffff1660e01b815260040160206040518083038186803b15801561154d57600080fd5b505afa158015611561573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115859190612c09565b116115c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115bc906130a7565b60405180910390fd5b60008060005b6115d560cc611a40565b81101561191c576115f08160cc611a5590919063ffffffff16565b80935081945050506116498360cf60008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c5090919063ffffffff16565b6116f8576116a183600060cf60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611b3a9092919063ffffffff16565b506116f683600060d060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611b3a9092919063ffffffff16565b505b6000670de0b6b3a764000061170b611a81565b73ffffffffffffffffffffffffffffffffffffffff16638e4647ee886040518263ffffffff1660e01b81526004016117439190612f2e565b60206040518083038186803b15801561175b57600080fd5b505afa15801561176f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117939190612c09565b6117e48660cf60008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c8090919063ffffffff16565b856117ef919061325e565b6117f99190613204565b61180391906131d3565b6118548560d060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611c8090919063ffffffff16565b61185e919061317d565b90506118b3848260d060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611b3a9092919063ffffffff16565b50611907848460cf60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020611b3a9092919063ffffffff16565b505080806119149061337c565b9150506115cb565b5050505050565b600061192e82612286565b80611994575060976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff165b9050919050565b600033905090565b6119ad8282610a2f565b611a3c576119d28173ffffffffffffffffffffffffffffffffffffffff166014612300565b6119e08360001c6020612300565b6040516020016119f1929190612ef4565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a339190612fe5565b60405180910390fd5b5050565b6000611a4e826000016125fa565b9050919050565b600080600080611a68866000018661260f565b915091508160001c8160001c9350935050509250929050565b600060d160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663552aaedb631b48faca60e01b6040518263ffffffff1660e01b8152600401611ae59190612fca565b60206040518083038186803b158015611afd57600080fd5b505afa158015611b11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b359190612ac4565b905090565b6000611b66846000018473ffffffffffffffffffffffffffffffffffffffff1660001b8460001b61264f565b90509392505050565b611b798282610a2f565b611c4c5760016065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611bf161199b565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000611c78836000018373ffffffffffffffffffffffffffffffffffffffff1660001b61268a565b905092915050565b6000611ca8836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6126aa565b60001c905092915050565b611cbd8282610a2f565b15611d915760006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550611d3661199b565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600060019054906101000a900460ff1680611dbb575060008054906101000a900460ff16155b611dfa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611df190613047565b60405180910390fd5b60008060019054906101000a900460ff161590508015611e4a576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015611e6b5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611e94575060008054906101000a900460ff16155b611ed3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611eca90613047565b60405180910390fd5b60008060019054906101000a900460ff161590508015611f23576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015611f445760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611f6d575060008054906101000a900460ff16155b611fac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fa390613047565b60405180910390fd5b60008060019054906101000a900460ff161590508015611ffc576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b801561201d5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680612046575060008054906101000a900460ff16155b612085576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161207c90613047565b60405180910390fd5b60008060019054906101000a900460ff1615905080156120d5576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6120e96000801b6120e461199b565b612726565b801561210a5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680612133575060008054906101000a900460ff16155b612172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161216990613047565b60405180910390fd5b60008060019054906101000a900460ff1615905080156121c2576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6121cf601260e01b612734565b8160d160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506122417f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0861223c61199b565b6105ac565b600060d160146101000a81548162ffffff021916908362ffffff16021790555080156122825760008060016101000a81548160ff0219169083151502179055505b5050565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806122f957506122f88261280a565b5b9050919050565b6060600060028360026123139190613204565b61231d919061317d565b67ffffffffffffffff81111561235c577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561238e5781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106123ec577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110612476577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026124b69190613204565b6124c0919061317d565b90505b60018111156125ac577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110612528577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b828281518110612565577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806125a590613352565b90506124c3565b50600084146125f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125e790613007565b60405180910390fd5b8091505092915050565b600061260882600001612874565b9050919050565b600080600061262a848660000161288990919063ffffffff16565b9050808560020160008381526020019081526020016000205492509250509250929050565b6000818460020160008581526020019081526020016000208190555061268183856000016128a090919063ffffffff16565b90509392505050565b60006126a282846000016128b790919063ffffffff16565b905092915050565b6000808360020160008481526020019081526020016000205490506000801b811415806126dd57506126dc848461268a565b5b61271c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161271390613087565b60405180910390fd5b8091505092915050565b6127308282611b6f565b5050565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561279d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161279490613027565b60405180910390fd5b600160976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000612882826000016128ce565b9050919050565b600061289883600001836128df565b905092915050565b60006128af8360000183612930565b905092915050565b60006128c683600001836129a0565b905092915050565b600081600001805490509050919050565b600082600001828154811061291d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200154905092915050565b600061293c83836129a0565b61299557826000018290806001815401808255809150506001900390600052602060002001600090919091909150558260000180549050836001016000848152602001908152602001600020819055506001905061299a565b600090505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b6040518060400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081525090565b600081359050612a02816135f1565b92915050565b600081519050612a17816135f1565b92915050565b600081519050612a2c81613608565b92915050565b600081359050612a418161361f565b92915050565b600081359050612a5681613636565b92915050565b600081359050612a6b8161364d565b92915050565b600081359050612a8081613664565b92915050565b600081519050612a9581613664565b92915050565b600060208284031215612aad57600080fd5b6000612abb848285016129f3565b91505092915050565b600060208284031215612ad657600080fd5b6000612ae484828501612a08565b91505092915050565b60008060408385031215612b0057600080fd5b6000612b0e858286016129f3565b9250506020612b1f85828601612a71565b9150509250929050565b600060208284031215612b3b57600080fd5b6000612b4984828501612a1d565b91505092915050565b600060208284031215612b6457600080fd5b6000612b7284828501612a32565b91505092915050565b60008060408385031215612b8e57600080fd5b6000612b9c85828601612a32565b9250506020612bad858286016129f3565b9150509250929050565b600060208284031215612bc957600080fd5b6000612bd784828501612a47565b91505092915050565b600060208284031215612bf257600080fd5b6000612c0084828501612a5c565b91505092915050565b600060208284031215612c1b57600080fd5b6000612c2984828501612a86565b91505092915050565b6000612c3e8383612e98565b60408301905092915050565b612c5381613292565b82525050565b612c6281613292565b82525050565b6000612c738261312d565b612c7d8185613150565b9350612c888361311d565b8060005b83811015612cb9578151612ca08882612c32565b9750612cab83613143565b925050600181019050612c8c565b5085935050505092915050565b612ccf816132a4565b82525050565b612cde816132b0565b82525050565b612ced816132ba565b82525050565b6000612cfe82613138565b612d088185613161565b9350612d1881856020860161331f565b612d2181613423565b840191505092915050565b6000612d3782613138565b612d418185613172565b9350612d5181856020860161331f565b80840191505092915050565b6000612d6a602083613161565b9150612d7582613434565b602082019050919050565b6000612d8d601c83613161565b9150612d988261345d565b602082019050919050565b6000612db0602e83613161565b9150612dbb82613486565b604082019050919050565b6000612dd3600c83613161565b9150612dde826134d5565b602082019050919050565b6000612df6601e83613161565b9150612e01826134fe565b602082019050919050565b6000612e19601783613172565b9150612e2482613527565b601782019050919050565b6000612e3c601083613161565b9150612e4782613550565b602082019050919050565b6000612e5f601183613172565b9150612e6a82613579565b601182019050919050565b6000612e82602f83613161565b9150612e8d826135a2565b604082019050919050565b604082016000820151612eae6000850182612c4a565b506020820151612ec16020850182612ed6565b50505050565b612ed081613306565b82525050565b612edf81613315565b82525050565b612eee81613315565b82525050565b6000612eff82612e0c565b9150612f0b8285612d2c565b9150612f1682612e52565b9150612f228284612d2c565b91508190509392505050565b6000602082019050612f436000830184612c59565b92915050565b6000604082019050612f5e6000830185612c59565b612f6b6020830184612ee5565b9392505050565b60006020820190508181036000830152612f8c8184612c68565b905092915050565b6000602082019050612fa96000830184612cc6565b92915050565b6000602082019050612fc46000830184612cd5565b92915050565b6000602082019050612fdf6000830184612ce4565b92915050565b60006020820190508181036000830152612fff8184612cf3565b905092915050565b6000602082019050818103600083015261302081612d5d565b9050919050565b6000602082019050818103600083015261304081612d80565b9050919050565b6000602082019050818103600083015261306081612da3565b9050919050565b6000602082019050818103600083015261308081612dc6565b9050919050565b600060208201905081810360008301526130a081612de9565b9050919050565b600060208201905081810360008301526130c081612e2f565b9050919050565b600060208201905081810360008301526130e081612e75565b9050919050565b60006020820190506130fc6000830184612ec7565b92915050565b60006020820190506131176000830184612ee5565b92915050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600061318882613315565b915061319383613315565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156131c8576131c76133c5565b5b828201905092915050565b60006131de82613315565b91506131e983613315565b9250826131f9576131f86133f4565b5b828204905092915050565b600061320f82613315565b915061321a83613315565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615613253576132526133c5565b5b828202905092915050565b600061326982613315565b915061327483613315565b925082821015613287576132866133c5565b5b828203905092915050565b600061329d826132e6565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062ffffff82169050919050565b6000819050919050565b60005b8381101561333d578082015181840152602081019050613322565b8381111561334c576000848401525b50505050565b600061335d82613315565b91506000821415613371576133706133c5565b5b600182039050919050565b600061338782613315565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156133ba576133b96133c5565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f4552433136353a20696e76616c696420696e7465726661636520696400000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f496e76616c696420726174650000000000000000000000000000000000000000600082015250565b7f456e756d657261626c654d61703a206e6f6e6578697374656e74206b65790000600082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f4e6f207374616b656420616d6f756e7400000000000000000000000000000000600082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6135fa81613292565b811461360557600080fd5b50565b613611816132a4565b811461361c57600080fd5b50565b613628816132b0565b811461363357600080fd5b50565b61363f816132ba565b811461364a57600080fd5b50565b61365681613306565b811461366157600080fd5b50565b61366d81613315565b811461367857600080fd5b5056fea26469706673582212201c586f7985bf41d1dd1e9e3998652fdb8434e309ec94249bb873c897a295501a64736f6c63430008030033";

export class ExchangeFeesEscrow__factory extends ContractFactory {
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
  ): Promise<ExchangeFeesEscrow> {
    return super.deploy(overrides || {}) as Promise<ExchangeFeesEscrow>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ExchangeFeesEscrow {
    return super.attach(address) as ExchangeFeesEscrow;
  }
  connect(signer: Signer): ExchangeFeesEscrow__factory {
    return super.connect(signer) as ExchangeFeesEscrow__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExchangeFeesEscrowInterface {
    return new utils.Interface(_abi) as ExchangeFeesEscrowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExchangeFeesEscrow {
    return new Contract(address, _abi, signerOrProvider) as ExchangeFeesEscrow;
  }
}
