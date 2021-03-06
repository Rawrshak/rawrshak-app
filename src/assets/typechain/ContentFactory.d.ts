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

interface ContentFactoryInterface extends ethers.utils.Interface {
  functions: {
    "accessControlManagerImplementation()": FunctionFragment;
    "contentExists(address)": FunctionFragment;
    "contentImplementation()": FunctionFragment;
    "contentManagerExists(address)": FunctionFragment;
    "contentManagerImplementation()": FunctionFragment;
    "contentStorageImplementation()": FunctionFragment;
    "contractVersion()": FunctionFragment;
    "createContracts(address,uint24,string)": FunctionFragment;
    "initialize(address,address,address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateContracts(address,address,address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "accessControlManagerImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contentExists",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "contentImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contentManagerExists",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "contentManagerImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contentStorageImplementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contractVersion",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createContracts",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, string, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateContracts",
    values: [string, string, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "accessControlManagerImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contentExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contentImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contentManagerExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contentManagerImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contentStorageImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contractVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateContracts",
    data: BytesLike
  ): Result;

  events: {
    "ContractsDeployed(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ContractsDeployed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type ContractsDeployedEvent = TypedEvent<
  [string, string] & { content: string; contentManager: string }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class ContentFactory extends BaseContract {
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

  interface: ContentFactoryInterface;

  functions: {
    accessControlManagerImplementation(
      overrides?: CallOverrides
    ): Promise<[string]>;

    contentExists(
      _content: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    contentImplementation(overrides?: CallOverrides): Promise<[string]>;

    contentManagerExists(
      _contentManager: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    contentManagerImplementation(overrides?: CallOverrides): Promise<[string]>;

    contentStorageImplementation(overrides?: CallOverrides): Promise<[string]>;

    contractVersion(overrides?: CallOverrides): Promise<[number]>;

    createContracts(
      _contractRoyaltyAccount: string,
      _contractRoyaltyRate: BigNumberish,
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateContracts(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  accessControlManagerImplementation(
    overrides?: CallOverrides
  ): Promise<string>;

  contentExists(_content: string, overrides?: CallOverrides): Promise<boolean>;

  contentImplementation(overrides?: CallOverrides): Promise<string>;

  contentManagerExists(
    _contentManager: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  contentManagerImplementation(overrides?: CallOverrides): Promise<string>;

  contentStorageImplementation(overrides?: CallOverrides): Promise<string>;

  contractVersion(overrides?: CallOverrides): Promise<number>;

  createContracts(
    _contractRoyaltyAccount: string,
    _contractRoyaltyRate: BigNumberish,
    _contractUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    _content: string,
    _contentManager: string,
    _contentStorage: string,
    _accessControlManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateContracts(
    _content: string,
    _contentManager: string,
    _contentStorage: string,
    _accessControlManager: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    accessControlManagerImplementation(
      overrides?: CallOverrides
    ): Promise<string>;

    contentExists(
      _content: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    contentImplementation(overrides?: CallOverrides): Promise<string>;

    contentManagerExists(
      _contentManager: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    contentManagerImplementation(overrides?: CallOverrides): Promise<string>;

    contentStorageImplementation(overrides?: CallOverrides): Promise<string>;

    contractVersion(overrides?: CallOverrides): Promise<number>;

    createContracts(
      _contractRoyaltyAccount: string,
      _contractRoyaltyRate: BigNumberish,
      _contractUri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateContracts(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ContractsDeployed(address,address)"(
      content?: string | null,
      contentManager?: string | null
    ): TypedEventFilter<
      [string, string],
      { content: string; contentManager: string }
    >;

    ContractsDeployed(
      content?: string | null,
      contentManager?: string | null
    ): TypedEventFilter<
      [string, string],
      { content: string; contentManager: string }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    accessControlManagerImplementation(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    contentExists(
      _content: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    contentImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    contentManagerExists(
      _contentManager: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    contentManagerImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    contentStorageImplementation(overrides?: CallOverrides): Promise<BigNumber>;

    contractVersion(overrides?: CallOverrides): Promise<BigNumber>;

    createContracts(
      _contractRoyaltyAccount: string,
      _contractRoyaltyRate: BigNumberish,
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateContracts(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accessControlManagerImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contentExists(
      _content: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contentImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contentManagerExists(
      _contentManager: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contentManagerImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contentStorageImplementation(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createContracts(
      _contractRoyaltyAccount: string,
      _contractRoyaltyRate: BigNumberish,
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateContracts(
      _content: string,
      _contentManager: string,
      _contentStorage: string,
      _accessControlManager: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
