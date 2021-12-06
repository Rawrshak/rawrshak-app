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

interface INftEscrowInterface extends ethers.utils.Interface {
  functions: {
    "deposit(uint256,address,uint256,(address,uint256))": FunctionFragment;
    "escrowedAmounts(uint256)": FunctionFragment;
    "escrowedAsset(uint256)": FunctionFragment;
    "withdraw(uint256,address,uint256)": FunctionFragment;
    "withdrawBatch(uint256[],address,uint256[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      { contentAddress: string; tokenId: BigNumberish }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "escrowedAmounts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "escrowedAsset",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawBatch",
    values: [BigNumberish[], string, BigNumberish[]]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "escrowedAmounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "escrowedAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBatch",
    data: BytesLike
  ): Result;

  events: {};
}

export class INftEscrow extends BaseContract {
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

  interface: INftEscrowInterface;

  functions: {
    deposit(
      _orderId: BigNumberish,
      _sender: string,
      _amount: BigNumberish,
      _assetData: { contentAddress: string; tokenId: BigNumberish },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    escrowedAmounts(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    escrowedAsset(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { contentAddress: string; tokenId: BigNumber }
    >;

    withdraw(
      orderId: BigNumberish,
      _receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawBatch(
      orderIds: BigNumberish[],
      _receiver: string,
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    _orderId: BigNumberish,
    _sender: string,
    _amount: BigNumberish,
    _assetData: { contentAddress: string; tokenId: BigNumberish },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  escrowedAmounts(
    _orderId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  escrowedAsset(
    _orderId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { contentAddress: string; tokenId: BigNumber }
  >;

  withdraw(
    orderId: BigNumberish,
    _receiver: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawBatch(
    orderIds: BigNumberish[],
    _receiver: string,
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(
      _orderId: BigNumberish,
      _sender: string,
      _amount: BigNumberish,
      _assetData: { contentAddress: string; tokenId: BigNumberish },
      overrides?: CallOverrides
    ): Promise<void>;

    escrowedAmounts(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    escrowedAsset(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { contentAddress: string; tokenId: BigNumber }
    >;

    withdraw(
      orderId: BigNumberish,
      _receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawBatch(
      orderIds: BigNumberish[],
      _receiver: string,
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    deposit(
      _orderId: BigNumberish,
      _sender: string,
      _amount: BigNumberish,
      _assetData: { contentAddress: string; tokenId: BigNumberish },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    escrowedAmounts(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    escrowedAsset(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      orderId: BigNumberish,
      _receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawBatch(
      orderIds: BigNumberish[],
      _receiver: string,
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      _orderId: BigNumberish,
      _sender: string,
      _amount: BigNumberish,
      _assetData: { contentAddress: string; tokenId: BigNumberish },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    escrowedAmounts(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    escrowedAsset(
      _orderId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      orderId: BigNumberish,
      _receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawBatch(
      orderIds: BigNumberish[],
      _receiver: string,
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
