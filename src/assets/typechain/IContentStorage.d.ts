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

interface IContentStorageInterface extends ethers.utils.Interface {
  functions: {
    "addAssetBatch(tuple[])": FunctionFragment;
    "assetCounter()": FunctionFragment;
    "contractUri()": FunctionFragment;
    "getContractRoyalty()": FunctionFragment;
    "getLatestUriVersion(uint256,bool)": FunctionFragment;
    "getRoyalty(uint256)": FunctionFragment;
    "hiddenUri(uint256,uint256)": FunctionFragment;
    "maxSupply(uint256)": FunctionFragment;
    "setContractRoyalty(address,uint24)": FunctionFragment;
    "setHiddenUriBatch(tuple[])": FunctionFragment;
    "setPublicUriBatch(tuple[])": FunctionFragment;
    "setTokenRoyaltiesBatch(tuple[])": FunctionFragment;
    "supply(uint256)": FunctionFragment;
    "updateSupply(uint256,uint256)": FunctionFragment;
    "uri(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addAssetBatch",
    values: [
      {
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "assetCounter",
    values?: undefined
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
    functionFragment: "getRoyalty",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hiddenUri",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "maxSupply",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setContractRoyalty",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setHiddenUriBatch",
    values: [{ tokenId: BigNumberish; uri: string }[]]
  ): string;
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
    functionFragment: "updateSupply",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "uri",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addAssetBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "assetCounter",
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
  decodeFunctionResult(functionFragment: "getRoyalty", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hiddenUri", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxSupply", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setContractRoyalty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setHiddenUriBatch",
    data: BytesLike
  ): Result;
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
    functionFragment: "updateSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;

  events: {
    "AssetsAdded(address,uint256[],tuple[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetsAdded"): EventFragment;
}

export type AssetsAddedEvent = TypedEvent<
  [
    string,
    BigNumber[],
    ([string, string, BigNumber, string, number] & {
      publicDataUri: string;
      hiddenDataUri: string;
      maxSupply: BigNumber;
      royaltyReceiver: string;
      royaltyRate: number;
    })[]
  ] & {
    parent: string;
    tokenIds: BigNumber[];
    assets: ([string, string, BigNumber, string, number] & {
      publicDataUri: string;
      hiddenDataUri: string;
      maxSupply: BigNumber;
      royaltyReceiver: string;
      royaltyRate: number;
    })[];
  }
>;

export class IContentStorage extends BaseContract {
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

  interface: IContentStorageInterface;

  functions: {
    addAssetBatch(
      _assets: {
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    assetCounter(overrides?: CallOverrides): Promise<[BigNumber]>;

    contractUri(overrides?: CallOverrides): Promise<[string]>;

    getContractRoyalty(overrides?: CallOverrides): Promise<[string, number]>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, number]>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    maxSupply(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setContractRoyalty(
      _receiver: string,
      _rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setHiddenUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
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

    supply(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

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

  addAssetBatch(
    _assets: {
      publicDataUri: string;
      hiddenDataUri: string;
      maxSupply: BigNumberish;
      royaltyReceiver: string;
      royaltyRate: BigNumberish;
    }[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  assetCounter(overrides?: CallOverrides): Promise<BigNumber>;

  contractUri(overrides?: CallOverrides): Promise<string>;

  getContractRoyalty(overrides?: CallOverrides): Promise<[string, number]>;

  getLatestUriVersion(
    _tokenId: BigNumberish,
    _isPublic: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getRoyalty(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, number]>;

  hiddenUri(
    _tokenId: BigNumberish,
    _version: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  maxSupply(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setContractRoyalty(
    _receiver: string,
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setHiddenUriBatch(
    _assets: { tokenId: BigNumberish; uri: string }[],
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

  supply(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

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
    addAssetBatch(
      _assets: {
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: CallOverrides
    ): Promise<void>;

    assetCounter(overrides?: CallOverrides): Promise<BigNumber>;

    contractUri(overrides?: CallOverrides): Promise<string>;

    getContractRoyalty(overrides?: CallOverrides): Promise<[string, number]>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, number]>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    maxSupply(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setContractRoyalty(
      _receiver: string,
      _rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setHiddenUriBatch(
      _assets: { tokenId: BigNumberish; uri: string }[],
      overrides?: CallOverrides
    ): Promise<void>;

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

    supply(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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
    "AssetsAdded(address,uint256[],tuple[])"(
      parent?: string | null,
      tokenIds?: null,
      assets?: null
    ): TypedEventFilter<
      [
        string,
        BigNumber[],
        ([string, string, BigNumber, string, number] & {
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[]
      ],
      {
        parent: string;
        tokenIds: BigNumber[];
        assets: ([string, string, BigNumber, string, number] & {
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
      tokenIds?: null,
      assets?: null
    ): TypedEventFilter<
      [
        string,
        BigNumber[],
        ([string, string, BigNumber, string, number] & {
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[]
      ],
      {
        parent: string;
        tokenIds: BigNumber[];
        assets: ([string, string, BigNumber, string, number] & {
          publicDataUri: string;
          hiddenDataUri: string;
          maxSupply: BigNumber;
          royaltyReceiver: string;
          royaltyRate: number;
        })[];
      }
    >;
  };

  estimateGas: {
    addAssetBatch(
      _assets: {
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    assetCounter(overrides?: CallOverrides): Promise<BigNumber>;

    contractUri(overrides?: CallOverrides): Promise<BigNumber>;

    getContractRoyalty(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxSupply(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
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

    supply(
      _tokenId: BigNumberish,
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
    addAssetBatch(
      _assets: {
        publicDataUri: string;
        hiddenDataUri: string;
        maxSupply: BigNumberish;
        royaltyReceiver: string;
        royaltyRate: BigNumberish;
      }[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    assetCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contractUri(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getContractRoyalty(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLatestUriVersion(
      _tokenId: BigNumberish,
      _isPublic: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoyalty(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hiddenUri(
      _tokenId: BigNumberish,
      _version: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxSupply(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
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
      _tokenId: BigNumberish,
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
