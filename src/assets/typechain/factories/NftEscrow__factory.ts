/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NftEscrow, NftEscrowInterface } from "../NftEscrow";

const _abi = [
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
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
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
        internalType: "struct LibOrder.AssetData",
        name: "_assetData",
        type: "tuple",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "escrowedAmounts",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "escrowedAsset",
    outputs: [
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
    inputs: [],
    name: "initialize",
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
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
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
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
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "withdrawBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612a41806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c80638129fc1c116100a2578063bc197c8111610071578063bc197c81146102f0578063d547741f14610320578063e63697c81461033c578063ec87621c14610358578063f23a6e611461037657610116565b80638129fc1c1461027c57806391d1485414610286578063a217fddf146102b6578063a8566bab146102d457610116565b80632b2da97e116100e95780632b2da97e146101dc5780632f2ff15d146101f857806336568abe14610214578063391e35ca1461023057806362ad1ce61461026057610116565b806301ffc9a71461011b57806313f58aa81461014b578063150b7a021461017c578063248a9ca3146101ac575b600080fd5b61013560048036038101906101309190612082565b6103a6565b60405161014291906123eb565b60405180910390f35b610165600480360381019061016091906120ab565b6103b8565b6040516101739291906123c2565b60405180910390f35b61019660048036038101906101919190611e94565b6103fd565b6040516101a39190612421565b60405180910390f35b6101c660048036038101906101c1919061201d565b610411565b6040516101d39190612406565b60405180910390f35b6101f660048036038101906101f19190611dac565b610431565b005b610212600480360381019061020d9190612046565b6104b7565b005b61022e60048036038101906102299190612046565b6104e0565b005b61024a600480360381019061024591906120ab565b610563565b60405161025791906124de565b60405180910390f35b61027a60048036038101906102759190611f9e565b61057c565b005b610284610892565b005b6102a0600480360381019061029b9190612046565b6109a3565b6040516102ad91906123eb565b60405180910390f35b6102be610a0e565b6040516102cb9190612406565b60405180910390f35b6102ee60048036038101906102e99190612123565b610a15565b005b61030a60048036038101906103059190611dd5565b610afb565b6040516103179190612421565b60405180910390f35b61033a60048036038101906103359190612046565b610b10565b005b610356600480360381019061035191906120d4565b610b39565b005b610360610c31565b60405161036d9190612406565b60405180910390f35b610390600480360381019061038b9190611f0f565b610c55565b60405161039d9190612421565b60405180910390f35b60006103b182610c6a565b9050919050565b61015f6020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b600063150b7a0260e01b9050949350505050565b600060656000838152602001908152602001600020600101549050919050565b6000801b61044681610441610ce4565b610cec565b6104707f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08836104b7565b8173ffffffffffffffffffffffffffffffffffffffff167f594022ae30f535100bd2169ab77ab37c1dba3d7e89d04bd6bf17b121a3ca7c2560405160405180910390a25050565b6104c082610411565b6104d1816104cc610ce4565b610cec565b6104db8383610d89565b505050565b6104e8610ce4565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610555576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054c906124be565b60405180910390fd5b61055f8282610e6a565b5050565b6101606020528060005260406000206000915090505481565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b086105ae816105a9610ce4565b610cec565b60005b845181101561088b578281815181106105f3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516101606000878481518110610639577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015181526020019081526020016000205461065a9190612663565b6101606000878481518110610698577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015181526020019081526020016000208190555061073e8582815181106106ee577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101513086868581518110610731577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151610f4c565b6000610160600087848151811061077e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151815260200190815260200160002054141561087a5761016060008683815181106107d9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015181526020019081526020016000206000905561015f6000868381518110610831577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101518152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550505b80610884906127b2565b90506105b1565b5050505050565b600060019054906101000a900460ff16806108b8575060008054906101000a900460ff16155b6108f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ee9061249e565b60405180910390fd5b60008060019054906101000a900460ff161590508015610947576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61094f61101b565b6109576110f4565b61095f6111cd565b6109676112a6565b61096f61137f565b610977611458565b61097f61156e565b80156109a05760008060016101000a81548160ff0219169083151502179055505b50565b60006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000801b81565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08610a4781610a42610ce4565b610cec565b8161015f600087815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505082610160600087815260200190815260200160002054610ad091906125b3565b610160600087815260200190815260200160002081905550610af485853086610f4c565b5050505050565b600063bc197c8160e01b905095945050505050565b610b1982610411565b610b2a81610b25610ce4565b610cec565b610b348383610e6a565b505050565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08610b6b81610b66610ce4565b610cec565b81610160600086815260200190815260200160002054610b8b9190612663565b610160600086815260200190815260200160002081905550610baf84308585610f4c565b60006101606000868152602001908152602001600020541415610c2b5761016060008581526020019081526020016000206000905561015f6000858152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550505b50505050565b7f241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b0881565b600063f23a6e6160e01b905095945050505050565b60007f4e2312e0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610cdd5750610cdc826116c2565b5b9050919050565b600033905090565b610cf682826109a3565b610d8557610d1b8173ffffffffffffffffffffffffffffffffffffffff1660146116d4565b610d298360001c60206116d4565b604051602001610d3a929190612330565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7c919061243c565b60405180910390fd5b5050565b610d9382826109a3565b610e665760016065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610e0b610ce4565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b610e7482826109a3565b15610f485760006065600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610eed610ce4565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b60008111156110155761015f600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f242432a848461015f600089815260200190815260200160002060010154856040518563ffffffff1660e01b8152600401610fe2949392919061236a565b600060405180830381600087803b158015610ffc57600080fd5b505af1158015611010573d6000803e3d6000fd5b505050505b50505050565b600060019054906101000a900460ff1680611041575060008054906101000a900460ff16155b611080576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110779061249e565b60405180910390fd5b60008060019054906101000a900460ff1615905080156110d0576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156110f15760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff168061111a575060008054906101000a900460ff16155b611159576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111509061249e565b60405180910390fd5b60008060019054906101000a900460ff1615905080156111a9576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156111ca5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806111f3575060008054906101000a900460ff16155b611232576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112299061249e565b60405180910390fd5b60008060019054906101000a900460ff161590508015611282576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156112a35760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806112cc575060008054906101000a900460ff16155b61130b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113029061249e565b60405180910390fd5b60008060019054906101000a900460ff16159050801561135b576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b801561137c5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff16806113a5575060008054906101000a900460ff16155b6113e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113db9061249e565b60405180910390fd5b60008060019054906101000a900460ff161590508015611434576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156114555760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff168061147e575060008054906101000a900460ff16155b6114bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114b49061249e565b60405180910390fd5b60008060019054906101000a900460ff16159050801561150d576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6115367fc7aacb62000000000000000000000000000000000000000000000000000000006119ce565b61154a6000801b611545610ce4565b611aa4565b801561156b5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611594575060008054906101000a900460ff16155b6115d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ca9061249e565b60405180910390fd5b60008060019054906101000a900460ff161590508015611623576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61164c7f06265fe7000000000000000000000000000000000000000000000000000000006119ce565b6116757f150b7a02000000000000000000000000000000000000000000000000000000006119ce565b61169e7f4e2312e0000000000000000000000000000000000000000000000000000000006119ce565b80156116bf5760008060016101000a81548160ff0219169083151502179055505b50565b60006116cd82611ab2565b9050919050565b6060600060028360026116e79190612609565b6116f191906125b3565b67ffffffffffffffff811115611730577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156117625781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106117c0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061184a577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506000600184600261188a9190612609565b61189491906125b3565b90505b6001811115611980577f3031323334353637383961626364656600000000000000000000000000000000600f8616601081106118fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b828281518110611939577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c94508061197990612757565b9050611897565b50600084146119c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119bb9061245e565b60405180910390fd5b8091505092915050565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415611a37576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a2e9061247e565b60405180910390fd5b600160976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b611aae8282610d89565b5050565b6000611abd82611b2a565b80611b23575060976000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff165b9050919050565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480611b9d5750611b9c82611ba4565b5b9050919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6000611c21611c1c8461251e565b6124f9565b90508083825260208201905082856020860282011115611c4057600080fd5b60005b85811015611c705781611c568882611d97565b845260208401935060208301925050600181019050611c43565b5050509392505050565b6000611c8d611c888461254a565b6124f9565b905082815260208101848484011115611ca557600080fd5b611cb0848285612715565b509392505050565b600081359050611cc7816129af565b92915050565b600082601f830112611cde57600080fd5b8135611cee848260208601611c0e565b91505092915050565b600081359050611d06816129c6565b92915050565b600081359050611d1b816129dd565b92915050565b600082601f830112611d3257600080fd5b8135611d42848260208601611c7a565b91505092915050565b600060408284031215611d5d57600080fd5b611d6760406124f9565b90506000611d7784828501611cb8565b6000830152506020611d8b84828501611d97565b60208301525092915050565b600081359050611da6816129f4565b92915050565b600060208284031215611dbe57600080fd5b6000611dcc84828501611cb8565b91505092915050565b600080600080600060a08688031215611ded57600080fd5b6000611dfb88828901611cb8565b9550506020611e0c88828901611cb8565b945050604086013567ffffffffffffffff811115611e2957600080fd5b611e3588828901611ccd565b935050606086013567ffffffffffffffff811115611e5257600080fd5b611e5e88828901611ccd565b925050608086013567ffffffffffffffff811115611e7b57600080fd5b611e8788828901611d21565b9150509295509295909350565b60008060008060808587031215611eaa57600080fd5b6000611eb887828801611cb8565b9450506020611ec987828801611cb8565b9350506040611eda87828801611d97565b925050606085013567ffffffffffffffff811115611ef757600080fd5b611f0387828801611d21565b91505092959194509250565b600080600080600060a08688031215611f2757600080fd5b6000611f3588828901611cb8565b9550506020611f4688828901611cb8565b9450506040611f5788828901611d97565b9350506060611f6888828901611d97565b925050608086013567ffffffffffffffff811115611f8557600080fd5b611f9188828901611d21565b9150509295509295909350565b600080600060608486031215611fb357600080fd5b600084013567ffffffffffffffff811115611fcd57600080fd5b611fd986828701611ccd565b9350506020611fea86828701611cb8565b925050604084013567ffffffffffffffff81111561200757600080fd5b61201386828701611ccd565b9150509250925092565b60006020828403121561202f57600080fd5b600061203d84828501611cf7565b91505092915050565b6000806040838503121561205957600080fd5b600061206785828601611cf7565b925050602061207885828601611cb8565b9150509250929050565b60006020828403121561209457600080fd5b60006120a284828501611d0c565b91505092915050565b6000602082840312156120bd57600080fd5b60006120cb84828501611d97565b91505092915050565b6000806000606084860312156120e957600080fd5b60006120f786828701611d97565b935050602061210886828701611cb8565b925050604061211986828701611d97565b9150509250925092565b60008060008060a0858703121561213957600080fd5b600061214787828801611d97565b945050602061215887828801611cb8565b935050604061216987828801611d97565b925050606061217a87828801611d4b565b91505092959194509250565b61218f81612697565b82525050565b61219e816126a9565b82525050565b6121ad816126b5565b82525050565b6121bc816126bf565b82525050565b60006121cd8261257b565b6121d78185612597565b93506121e7818560208601612724565b6121f081612859565b840191505092915050565b60006122068261257b565b61221081856125a8565b9350612220818560208601612724565b80840191505092915050565b6000612239602083612597565b91506122448261286a565b602082019050919050565b600061225c601c83612597565b915061226782612893565b602082019050919050565b600061227f602e83612597565b915061228a826128bc565b604082019050919050565b60006122a2600083612586565b91506122ad8261290b565b600082019050919050565b60006122c56017836125a8565b91506122d08261290e565b601782019050919050565b60006122e86011836125a8565b91506122f382612937565b601182019050919050565b600061230b602f83612597565b915061231682612960565b604082019050919050565b61232a8161270b565b82525050565b600061233b826122b8565b915061234782856121fb565b9150612352826122db565b915061235e82846121fb565b91508190509392505050565b600060a08201905061237f6000830187612186565b61238c6020830186612186565b6123996040830185612321565b6123a66060830184612321565b81810360808301526123b781612295565b905095945050505050565b60006040820190506123d76000830185612186565b6123e46020830184612321565b9392505050565b60006020820190506124006000830184612195565b92915050565b600060208201905061241b60008301846121a4565b92915050565b600060208201905061243660008301846121b3565b92915050565b6000602082019050818103600083015261245681846121c2565b905092915050565b600060208201905081810360008301526124778161222c565b9050919050565b600060208201905081810360008301526124978161224f565b9050919050565b600060208201905081810360008301526124b781612272565b9050919050565b600060208201905081810360008301526124d7816122fe565b9050919050565b60006020820190506124f36000830184612321565b92915050565b6000612503612514565b905061250f8282612781565b919050565b6000604051905090565b600067ffffffffffffffff8211156125395761253861282a565b5b602082029050602081019050919050565b600067ffffffffffffffff8211156125655761256461282a565b5b61256e82612859565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006125be8261270b565b91506125c98361270b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156125fe576125fd6127fb565b5b828201905092915050565b60006126148261270b565b915061261f8361270b565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612658576126576127fb565b5b828202905092915050565b600061266e8261270b565b91506126798361270b565b92508282101561268c5761268b6127fb565b5b828203905092915050565b60006126a2826126eb565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612742578082015181840152602081019050612727565b83811115612751576000848401525b50505050565b60006127628261270b565b91506000821415612776576127756127fb565b5b600182039050919050565b61278a82612859565b810181811067ffffffffffffffff821117156127a9576127a861282a565b5b80604052505050565b60006127bd8261270b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156127f0576127ef6127fb565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f4552433136353a20696e76616c696420696e7465726661636520696400000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b50565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6129b881612697565b81146129c357600080fd5b50565b6129cf816126b5565b81146129da57600080fd5b50565b6129e6816126bf565b81146129f157600080fd5b50565b6129fd8161270b565b8114612a0857600080fd5b5056fea2646970667358221220a33566a9a1f6f3199c793fca19aaa387ba5b868ea39c12ba8d184c4b1331848764736f6c63430008030033";

export class NftEscrow__factory extends ContractFactory {
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
  ): Promise<NftEscrow> {
    return super.deploy(overrides || {}) as Promise<NftEscrow>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NftEscrow {
    return super.attach(address) as NftEscrow;
  }
  connect(signer: Signer): NftEscrow__factory {
    return super.connect(signer) as NftEscrow__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NftEscrowInterface {
    return new utils.Interface(_abi) as NftEscrowInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NftEscrow {
    return new Contract(address, _abi, signerOrProvider) as NftEscrow;
  }
}
