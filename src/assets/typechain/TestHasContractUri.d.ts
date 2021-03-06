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

interface TestHasContractUriInterface extends ethers.utils.Interface {
  functions: {
    "contractUri()": FunctionFragment;
    "initialize(string)": FunctionFragment;
    "parent()": FunctionFragment;
    "setContractUri(string)": FunctionFragment;
    "setParent(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "contractUri",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(functionFragment: "parent", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setContractUri",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setParent", values: [string]): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "contractUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "parent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setContractUri",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setParent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "ContractUriUpdated(address,string)": EventFragment;
    "ParentSet(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ContractUriUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ParentSet"): EventFragment;
}

export type ContractUriUpdatedEvent = TypedEvent<
  [string, string] & { parent: string; uriPrefix: string }
>;

export type ParentSetEvent = TypedEvent<[string] & { parent: string }>;

export class TestHasContractUri extends BaseContract {
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

  interface: TestHasContractUriInterface;

  functions: {
    contractUri(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    parent(overrides?: CallOverrides): Promise<[string]>;

    setContractUri(
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setParent(
      arg0: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  contractUri(overrides?: CallOverrides): Promise<string>;

  initialize(
    _contractUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  parent(overrides?: CallOverrides): Promise<string>;

  setContractUri(
    _contractUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setParent(
    arg0: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    contractUri(overrides?: CallOverrides): Promise<string>;

    initialize(_contractUri: string, overrides?: CallOverrides): Promise<void>;

    parent(overrides?: CallOverrides): Promise<string>;

    setContractUri(
      _contractUri: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setParent(arg0: string, overrides?: CallOverrides): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
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

    "ParentSet(address)"(
      parent?: null
    ): TypedEventFilter<[string], { parent: string }>;

    ParentSet(parent?: null): TypedEventFilter<[string], { parent: string }>;
  };

  estimateGas: {
    contractUri(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    parent(overrides?: CallOverrides): Promise<BigNumber>;

    setContractUri(
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setParent(
      arg0: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    contractUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    parent(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setContractUri(
      _contractUri: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setParent(
      arg0: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
