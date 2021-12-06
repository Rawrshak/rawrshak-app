/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ContentStorageInterface extends ethers.utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "addAssetBatch(tuple[])": FunctionFragment;
    "contractUri()": FunctionFragment;
    "getContractRoyalty()": FunctionFragment;
    "getLatestUriVersion(uint256,bool)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoyalty(uint256)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "hiddenUri(uint256,uint256)": FunctionFragment;
    "ids(uint256)": FunctionFragment;
    "initialize(address,uint24,string)": FunctionFragment;
    "maxSupply(uint256)": FunctionFragment;
    "parent()": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "setContractRoyalty(address,uint24)": FunctionFragment;
    "setHiddenUriBatch(tuple[])": FunctionFragment;
    "setParent(address)": FunctionFragment;
    "setPublicUriBatch(tuple[])": FunctionFragment;
    "setTokenRoyaltiesBatch(tuple[])": FunctionFragment;
    "supply(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "updateSupply(uint256,uint256)": FunctionFragment;
    "uri(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addAssetBatch",
    values: [
      {
        tokenId: BigNumberish;
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "contractUri",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractRoyalty",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestUriVersion",
    values: [BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoyalty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hiddenUri",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "ids", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "maxSupply",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "parent", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setContractRoyalty",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setHiddenUriBatch",
    values: [{ tokenId: BigNumberish; uri: string }[]]
  ): string;
  encodeFunctionData(functionFragment: "setParent", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setPublicUriBatch",
    values: [{ tokenId: BigNumberish; uri: string }[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenRoyaltiesBatch",
    values: [
      {
        tokenId: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "supply",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSupply",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "uri",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAssetBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestUriVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRoyalty", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hiddenUri", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ids", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxSupply", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "parent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setContractRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setHiddenUriBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setParent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setPublicUriBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenRoyaltiesBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "supply", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;

  events: {
    "AssetsAdded(address,tuple[])": EventFragment;
    "ContractRoyaltyUpdated(address,address,uint24)": EventFragment;
    "ContractUriUpdated(address,string)": EventFragment;
    "HiddenUriUpdated(address,uint256,uint256)": EventFragment;
    "ParentSet(address)": EventFragment;
    "PublicUriUpdated(address,uint256,uint256)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "TokenRoyaltyUpdated(address,uint256,address,uint24)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetsAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContractRoyaltyUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContractUriUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "HiddenUriUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ParentSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PublicUriUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenRoyaltyUpdated"): EventFragment;
}

export type AssetsAddedEvent = TypedEvent<
  [
    string,
    ([BigNumber, string, string, BigNumber, string, number] & {
      tokenId: BigNumber;
      publicDataUri: string;
      hiddenDataUri: string;
      maxSupply: BigNumber;
      royaltyReceiver: string;
      royaltyRate: number;
    })[]
  ] & {
    parent: string;
    assets: ([BigNumber, string, string, BigNumber, string, number] & {
      tokenId: BigNumber;
      publicDataUri: string;
      hiddenDataUri: string;
      maxSupply: BigNumber;
      royaltyReceiver: string;
      royaltyRate: number;
    })[];
  }
>;

export type ContractRoyaltyUpdatedEvent = TypedEvent<
  [string, string, number] & { parent: string; receiver: string; rate: number }
>;

export type ContractUriUpdatedEvent = TypedEvent<
  [string, string] & { parent: string; uriPrefix: string }
>;

export type HiddenUriUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    parent: string;
    id: BigNumber;
    version: BigNumber;
  }
>;

export type ParentSetEvent = TypedEvent<[string] & { parent: string }>;

export type PublicUriUpdatedEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    parent: string;
    id: BigNumber;
    version: BigNumber;
  }
>;

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string] & {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string] & { role: string; account: string; sender: string }
>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string] & { role: string; account: string; sender: string }
>;

export type TokenRoyaltyUpdatedEvent = TypedEvent<
  [string, BigNumber, string, number] & {
    parent: string;
    tokenId: BigNumber;
    receiver: string;
    rate: number;
  }
>;

export class ContentStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ContentStorageInterface;

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    addAssetBatch(
      _assets: {
        tokenId: BigNumberish;
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    contractUri(overrides?: CallOverrides): Promise<[string]>;

    getContractRoyalty(
      overrides?: CallOverrides
    ): Promise<[string, number] & { receiver: string; rate: number }>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, number] & { receiver: string; rate: number }>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    ids(arg0: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    initialize(
      _receiver: string,
      _rate: BigNumberish,
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    maxSupply(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    parent(overrides?: CallOverrides): Promise<[string]>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setContractRoyalty(
      _receiver: string,
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setHiddenUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setParent(
      _contentParent: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPublicUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTokenRoyaltiesBatch(
      _assets: {
        tokenId: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supply(arg0: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    updateSupply(
      _tokenId: BigNumberish,
      _supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  addAssetBatch(
    _assets: {
      tokenId: BigNumberish;
      publicDataUri: string;
      hiddenDataUri: string;
      maxSupply: BigNumberish;
      royaltyReceiver: string;
      royaltyRate: BigNumberish;
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  contractUri(overrides?: CallOverrides): Promise<string>;

  getContractRoyalty(
    overrides?: CallOverrides
  ): Promise<[string, number] & { receiver: string; rate: number }>;

  getLatestUriVersion(
    _tokenId: BigNumberish,
    _isPublic: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  getRoyalty(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, number] & { receiver: string; rate: number }>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  hiddenUri(
    _tokenId: BigNumberish,
    _version: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  ids(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  initialize(
    _receiver: string,
    _rate: BigNumberish,
    _contractUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  maxSupply(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  parent(overrides?: CallOverrides): Promise<string>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setContractRoyalty(
    _receiver: string,
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setHiddenUriBatch(
    _assets: { tokenId: BigNumberish; uri: string }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setParent(
    _contentParent: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPublicUriBatch(
    _assets: { tokenId: BigNumberish; uri: string }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTokenRoyaltiesBatch(
    _assets: {
      tokenId: BigNumberish;
      royaltyReceiver: string;
      royaltyRate: BigNumberish;
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supply(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  updateSupply(
    _tokenId: BigNumberish,
    _supply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uri(
    _tokenId: BigNumberish,
    _version: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    addAssetBatch(
      _assets: {
        tokenId: BigNumberish;
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    contractUri(overrides?: CallOverrides): Promise<string>;

    getContractRoyalty(
      overrides?: CallOverrides
    ): Promise<[string, number] & { receiver: string; rate: number }>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, number] & { receiver: string; rate: number }>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    ids(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    initialize(
      _receiver: string,
      _rate: BigNumberish,
      _contractUri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    maxSupply(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    parent(overrides?: CallOverrides): Promise<string>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setContractRoyalty(
      _receiver: string,
      _rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setHiddenUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    setParent(_contentParent: string, overrides?: CallOverrides): Promise<void>;

    setPublicUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

    setTokenRoyaltiesBatch(
      _assets: {
        tokenId: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    supply(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateSupply(
      _tokenId: BigNumberish,
      _supply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    uri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "AssetsAdded(address,tuple[])"(
      parent?: string | null,
      assets?: null
    ): TypedEventFilter<
      [
        string,
        ([BigNumber, string, string, BigNumber, string, number] & {
          tokenId: BigNumber;
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[]
      ],
      {
        parent: string;
        assets: ([BigNumber, string, string, BigNumber, string, number] & {
          tokenId: BigNumber;
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[];
      }
    >;

    AssetsAdded(
      parent?: string | null,
      assets?: null
    ): TypedEventFilter<
      [
        string,
        ([BigNumber, string, string, BigNumber, string, number] & {
          tokenId: BigNumber;
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[]
      ],
      {
        parent: string;
        assets: ([BigNumber, string, string, BigNumber, string, number] & {
          tokenId: BigNumber;
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[];
      }
    >;

    "ContractRoyaltyUpdated(address,address,uint24)"(
      parent?: string | null,
      receiver?: null,
      rate?: null
    ): TypedEventFilter<
      [string, string, number],
      { parent: string; receiver: string; rate: number }
    >;

    ContractRoyaltyUpdated(
      parent?: string | null,
      receiver?: null,
      rate?: null
    ): TypedEventFilter<
      [string, string, number],
      { parent: string; receiver: string; rate: number }
    >;

    "ContractUriUpdated(address,string)"(
      parent?: string | null,
      uriPrefix?: null
    ): TypedEventFilter<
      [string, string],
      { parent: string; uriPrefix: string }
    >;

    ContractUriUpdated(
      parent?: string | null,
      uriPrefix?: null
    ): TypedEventFilter<
      [string, string],
      { parent: string; uriPrefix: string }
    >;

    "HiddenUriUpdated(address,uint256,uint256)"(
      parent?: string | null,
      id?: BigNumberish | null,
      version?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { parent: string; id: BigNumber; version: BigNumber }
    >;

    HiddenUriUpdated(
      parent?: string | null,
      id?: BigNumberish | null,
      version?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { parent: string; id: BigNumber; version: BigNumber }
    >;

    "ParentSet(address)"(
      parent?: null
    ): TypedEventFilter<[string], { parent: string }>;

    ParentSet(parent?: null): TypedEventFilter<[string], { parent: string }>;

    "PublicUriUpdated(address,uint256,uint256)"(
      parent?: string | null,
      id?: BigNumberish | null,
      version?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { parent: string; id: BigNumber; version: BigNumber }
    >;

    PublicUriUpdated(
      parent?: string | null,
      id?: BigNumberish | null,
      version?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { parent: string; id: BigNumber; version: BigNumber }
    >;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; previousAdminRole: string; newAdminRole: string }
    >;

    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; previousAdminRole: string; newAdminRole: string }
    >;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    "TokenRoyaltyUpdated(address,uint256,address,uint24)"(
      parent?: string | null,
      tokenId?: BigNumberish | null,
      receiver?: null,
      rate?: null
    ): TypedEventFilter<
      [string, BigNumber, string, number],
      { parent: string; tokenId: BigNumber; receiver: string; rate: number }
    >;

    TokenRoyaltyUpdated(
      parent?: string | null,
      tokenId?: BigNumberish | null,
      receiver?: null,
      rate?: null
    ): TypedEventFilter<
      [string, BigNumber, string, number],
      { parent: string; tokenId: BigNumber; receiver: string; rate: number }
    >;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    addAssetBatch(
      _assets: {
        tokenId: BigNumberish;
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    contractUri(overrides?: CallOverrides): Promise<BigNumber>;

    getContractRoyalty(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ids(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _receiver: string,
      _rate: BigNumberish,
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    maxSupply(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    parent(overrides?: CallOverrides): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setContractRoyalty(
      _receiver: string,
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setHiddenUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setParent(
      _contentParent: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPublicUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTokenRoyaltiesBatch(
      _assets: {
        tokenId: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supply(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateSupply(
      _tokenId: BigNumberish,
      _supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addAssetBatch(
      _assets: {
        tokenId: BigNumberish;
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    contractUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getContractRoyalty(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ids(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _receiver: string,
      _rate: BigNumberish,
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    maxSupply(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    parent(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setContractRoyalty(
      _receiver: string,
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setHiddenUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setParent(
      _contentParent: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPublicUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTokenRoyaltiesBatch(
      _assets: {
        tokenId: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supply(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateSupply(
      _tokenId: BigNumberish,
      _supply: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
