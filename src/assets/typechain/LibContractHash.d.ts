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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface LibContractHashInterface extends ethers.utils.Interface {
  functions: {
    "CONTRACT_CONTENT_FACTORY()": FunctionFragment;
    "CONTRACT_DAI_TOKEN()": FunctionFragment;
    "CONTRACT_ERC20_ESCROW()": FunctionFragment;
    "CONTRACT_EXCHANGE()": FunctionFragment;
    "CONTRACT_EXCHANGE_FEE_ESCROW()": FunctionFragment;
    "CONTRACT_EXECUTION_MANAGER()": FunctionFragment;
    "CONTRACT_LIQUIDITY_MINING()": FunctionFragment;
    "CONTRACT_NFT_ESCROW()": FunctionFragment;
    "CONTRACT_ORDERBOOK()": FunctionFragment;
    "CONTRACT_RAWR_TOKEN()": FunctionFragment;
    "CONTRACT_ROYALTY_MANAGER()": FunctionFragment;
    "CONTRACT_STAKING()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "CONTRACT_CONTENT_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_DAI_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_ERC20_ESCROW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_EXCHANGE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_EXCHANGE_FEE_ESCROW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_EXECUTION_MANAGER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_LIQUIDITY_MINING",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_NFT_ESCROW",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_ORDERBOOK",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_RAWR_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_ROYALTY_MANAGER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_STAKING",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "CONTRACT_CONTENT_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_DAI_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_ERC20_ESCROW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_EXCHANGE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_EXCHANGE_FEE_ESCROW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_EXECUTION_MANAGER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_LIQUIDITY_MINING",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_NFT_ESCROW",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_ORDERBOOK",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_RAWR_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_ROYALTY_MANAGER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_STAKING",
    data: BytesLike
  ): Result;

  events: {};
}

export class LibContractHash extends BaseContract {
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

  interface: LibContractHashInterface;

  functions: {
    CONTRACT_CONTENT_FACTORY(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_DAI_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_ERC20_ESCROW(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_EXCHANGE(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_EXCHANGE_FEE_ESCROW(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_EXECUTION_MANAGER(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_LIQUIDITY_MINING(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_NFT_ESCROW(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_ORDERBOOK(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_RAWR_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_ROYALTY_MANAGER(overrides?: CallOverrides): Promise<[string]>;

    CONTRACT_STAKING(overrides?: CallOverrides): Promise<[string]>;
  };

  CONTRACT_CONTENT_FACTORY(overrides?: CallOverrides): Promise<string>;

  CONTRACT_DAI_TOKEN(overrides?: CallOverrides): Promise<string>;

  CONTRACT_ERC20_ESCROW(overrides?: CallOverrides): Promise<string>;

  CONTRACT_EXCHANGE(overrides?: CallOverrides): Promise<string>;

  CONTRACT_EXCHANGE_FEE_ESCROW(overrides?: CallOverrides): Promise<string>;

  CONTRACT_EXECUTION_MANAGER(overrides?: CallOverrides): Promise<string>;

  CONTRACT_LIQUIDITY_MINING(overrides?: CallOverrides): Promise<string>;

  CONTRACT_NFT_ESCROW(overrides?: CallOverrides): Promise<string>;

  CONTRACT_ORDERBOOK(overrides?: CallOverrides): Promise<string>;

  CONTRACT_RAWR_TOKEN(overrides?: CallOverrides): Promise<string>;

  CONTRACT_ROYALTY_MANAGER(overrides?: CallOverrides): Promise<string>;

  CONTRACT_STAKING(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    CONTRACT_CONTENT_FACTORY(overrides?: CallOverrides): Promise<string>;

    CONTRACT_DAI_TOKEN(overrides?: CallOverrides): Promise<string>;

    CONTRACT_ERC20_ESCROW(overrides?: CallOverrides): Promise<string>;

    CONTRACT_EXCHANGE(overrides?: CallOverrides): Promise<string>;

    CONTRACT_EXCHANGE_FEE_ESCROW(overrides?: CallOverrides): Promise<string>;

    CONTRACT_EXECUTION_MANAGER(overrides?: CallOverrides): Promise<string>;

    CONTRACT_LIQUIDITY_MINING(overrides?: CallOverrides): Promise<string>;

    CONTRACT_NFT_ESCROW(overrides?: CallOverrides): Promise<string>;

    CONTRACT_ORDERBOOK(overrides?: CallOverrides): Promise<string>;

    CONTRACT_RAWR_TOKEN(overrides?: CallOverrides): Promise<string>;

    CONTRACT_ROYALTY_MANAGER(overrides?: CallOverrides): Promise<string>;

    CONTRACT_STAKING(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    CONTRACT_CONTENT_FACTORY(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_DAI_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_ERC20_ESCROW(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_EXCHANGE(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_EXCHANGE_FEE_ESCROW(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_EXECUTION_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_LIQUIDITY_MINING(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_NFT_ESCROW(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_ORDERBOOK(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_RAWR_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_ROYALTY_MANAGER(overrides?: CallOverrides): Promise<BigNumber>;

    CONTRACT_STAKING(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    CONTRACT_CONTENT_FACTORY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_DAI_TOKEN(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_ERC20_ESCROW(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_EXCHANGE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    CONTRACT_EXCHANGE_FEE_ESCROW(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_EXECUTION_MANAGER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_LIQUIDITY_MINING(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_NFT_ESCROW(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_ORDERBOOK(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_RAWR_TOKEN(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_ROYALTY_MANAGER(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    CONTRACT_STAKING(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
