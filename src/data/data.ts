import { useState } from 'react';
import { useInventoryAssets } from './inventoryAssets';
import { useAssets } from './assets';
import { useFeaturedAssets } from './featuredAssets';
import { useExploreContent } from './exploreContent';
import { useOwnedContent } from './ownedContent';
import { useContentWithMetadata } from './contentWithMetadata';
import { useContentWithMetadataAndOrders } from './contentWithMetadataAndOrders';
import { useCuratedTags } from './curatedTags';
import { useAllTags } from './allTags';
import { useAssetOrders } from './assetOrders';
import { useAssetsWithOrders } from './assetsWithOrders';
import { useSupportedToken } from './supportedToken';
import { useSupportedTokenBalance } from './supportedTokenBalance';
import { useSupportedTokenAllowance } from './supportedTokenAllowance';
import { useFeaturedContent } from './featuredContent';
import {
  AddressResolver,
  ContentFactory,
  Exchange,
  ERC20PresetMinterPauserUpgradeable,
  Erc20Escrow,
  NftEscrow
} from '../assets/typechain';
import {
  useAddressResolverContract,
  useContentFactoryContract,
  useExchangeContract,
  useRawrTokenContract,
  useErc20EscrowContract,
  useNftEscrowContract,
} from './systemContracts';
import {
  useContentsSubgraphEndpoint,
  useExchangeSubgraphEndpoint
} from './subgraphEndpoints'
import { BigNumber } from '@ethersproject/bignumber';

export interface Token {
  contract: ERC20PresetMinterPauserUpgradeable,
  address: string,
  name: string,
  symbol: string,
  decimals: number,
}

export interface Game {
  id: string | undefined,
  contractAddress: string | undefined,
  contractUri: string | undefined,
  name: string | undefined,
  creator: string | undefined,
  owner: string | undefined,
}

export interface ContentData {
  id: string,
  contractAddress: string,
  contractUri: string,
  name: string,
  creator: string,
  owner: string,
  managerAddress: string,
  assets: AssetWithOrders[],
}

export interface ContentApproval {
  id: string,
  approved: boolean,
}

export interface ContentDataWithMetadata extends ContentData {
  name: string,
  description: string,
  imageUri: string,
  creator: string,
  owner: string,
  tags: string[],
}

export interface Asset {
  id: string,
  tokenId: BigNumber,
  currentSupply: string,
  maxSupply: string,
  name: string,
  type: string,
  subtype: string,
  tags: string[],
  imageUri: string,
  parentContract: string,
  balance: BigNumber | undefined,
  creator: string,
  game: string,
};

export interface AssetWithOrders extends Asset {
  orders: Order[],
}

export interface Order {
  id: BigNumber,
  type: "Buy" | "Sell",
  price: BigNumber,
  amountOrdered: BigNumber,
  amountFilled: BigNumber,
  status: string,
  createdAtTimestamp: BigNumber,
  filledAtTimestamp: BigNumber,
  cancelledAtTimestamp: BigNumber,
  lastClaimedAtTimestamp: BigNumber,
}

export interface ContentJson {
  name: string,
  description: string,
  image: string,
  creator: string,
  owner: string,
  tags: string[]
}

export interface PublicAssetMetadata {
  name: string,
  description: string,
  image: string,
  tags: string[],
  type: string,
  subType: string,
  nsfw: boolean,
}

export interface AudioFileMetadata {
  name: string,
  engine: string,
  compression: string,
  uri: string,
  contentType: string,
  duration: number,
  channelCount: number,
  sampleRate: number,
}

export interface AudioAssetMetadata extends PublicAssetMetadata {
  assetProperties: AudioFileMetadata[]
}

export interface ImageFileMetadata {
  uri: string,
  height: number,
  width: number,
  contentType: string,
}

export interface ImageAssetMetadata extends PublicAssetMetadata {
  assetProperties: ImageFileMetadata[]
}

export interface Static3dObjectFileMetadata {
  name: string,
  engine: string,
  platform: string,
  renderPipeline: string,
  fidelity: string,
  shape: string,
  uri: string,
}

export interface Static3dObjectAssetMetadata extends PublicAssetMetadata {
  assetProperties: Static3dObjectFileMetadata[]
}

export interface TextFileMetadata {
  title: string,
  description: string,
}

export interface TextAssetMetadata extends PublicAssetMetadata {
  assetProperties: TextFileMetadata[]
}

export interface Data {
  systemContracts: {
    addressResolver: AddressResolver | undefined,
    contentFactory: ContentFactory | undefined,
    exchange: Exchange | undefined,
    rawrToken: ERC20PresetMinterPauserUpgradeable | undefined,
    erc20Escrow: Erc20Escrow | undefined,
    nftEscrow: NftEscrow | undefined,
  },
  contentsSubgraphEndpoint: string | undefined,
  exchangeSubgraphEndpoint: string | undefined,
  supportedToken: Token | undefined,
  supportedTokenBalance: BigNumber | undefined,
  supportedTokenAllowance: BigNumber | undefined,
  isDevMode: boolean,
  changeIsDevMode: (newUserSetting: boolean) => void,
  curatedTags: string[] | undefined,
  allTags: string[] | undefined,
  assetsWithOrders: AssetWithOrders[] | undefined,
  featuredAssetsWithOrders: AssetWithOrders[] | undefined,
  inventoryAssetsWithOrders: AssetWithOrders[] | undefined,
  ownedContentWithMetadata: ContentDataWithMetadata[] | undefined,
  exploreContentWithMetadata: ContentDataWithMetadata[] | undefined,
  featuredContentWithMetadata: ContentDataWithMetadata[] | undefined,
};

function useSystemData() {
  const [isDevMode, setIsDevMode] = useState(false);
  const userChangedIsDevMode = (newUserSetting: boolean) => setIsDevMode(newUserSetting);
  const addressResolverContract = useAddressResolverContract();
  const contentFactoryContract = useContentFactoryContract(addressResolverContract);
  const exchangeContract = useExchangeContract(addressResolverContract);
  const rawrTokenContract = useRawrTokenContract(addressResolverContract);
  const erc20EscrowContract = useErc20EscrowContract(addressResolverContract);
  const nftEscrowContract = useNftEscrowContract(addressResolverContract);
  const contentsSubgraphEndpoint = useContentsSubgraphEndpoint();
  const exchangeSubgraphEndpoint = useExchangeSubgraphEndpoint();
  const curatedTags = useCuratedTags();
  const allTags = useAllTags(contentsSubgraphEndpoint);
  const ownedContent = useOwnedContent(contentsSubgraphEndpoint);
  const assets = useAssets(contentsSubgraphEndpoint);
  const assetOrders = useAssetOrders(assets, exchangeContract, exchangeSubgraphEndpoint);
  const assetsWithOrders = useAssetsWithOrders(assets, assetOrders);
  const featuredAssets = useFeaturedAssets(contentsSubgraphEndpoint);
  const featuredAssetOrders = useAssetOrders(featuredAssets, exchangeContract, exchangeSubgraphEndpoint);
  const featuredAssetsWithOrders = useAssetsWithOrders(featuredAssets, featuredAssetOrders);
  const inventoryAssets = useInventoryAssets(contentsSubgraphEndpoint);
  const inventoryAssetOrders = useAssetOrders(inventoryAssets, exchangeContract, exchangeSubgraphEndpoint);
  const inventoryAssetsWithOrders = useAssetsWithOrders(inventoryAssets, inventoryAssetOrders);
  const supportedToken = useSupportedToken();
  const ownedContentWithMetadata = useContentWithMetadata(ownedContent);
  const supportedTokenBalance = useSupportedTokenBalance(supportedToken);
  const supportedTokenAllowance = useSupportedTokenAllowance(supportedToken, erc20EscrowContract);
  const exploreContent = useExploreContent(contentsSubgraphEndpoint);
  const exploreContentWithMetadata = useContentWithMetadata(exploreContent);
  const exploreContentWithMetadataAndOrders = useContentWithMetadataAndOrders(exploreContentWithMetadata, assetsWithOrders);
  const featuredContentWithMetadata = useFeaturedContent(exploreContentWithMetadataAndOrders);

  const data: Data = {
    systemContracts: {
      addressResolver: addressResolverContract,
      contentFactory: contentFactoryContract,
      exchange: exchangeContract,
      rawrToken: rawrTokenContract,
      erc20Escrow: erc20EscrowContract,
      nftEscrow: nftEscrowContract,
    },
    contentsSubgraphEndpoint: contentsSubgraphEndpoint,
    exchangeSubgraphEndpoint: exchangeSubgraphEndpoint,
    supportedToken: supportedToken,
    supportedTokenBalance: supportedTokenBalance,
    supportedTokenAllowance: supportedTokenAllowance,
    isDevMode: isDevMode,
    changeIsDevMode: userChangedIsDevMode,
    curatedTags: curatedTags,
    allTags: allTags,
    assetsWithOrders: assetsWithOrders,
    featuredAssetsWithOrders: featuredAssetsWithOrders,
    inventoryAssetsWithOrders: inventoryAssetsWithOrders,
    ownedContentWithMetadata: ownedContentWithMetadata,
    exploreContentWithMetadata: exploreContentWithMetadataAndOrders,
    featuredContentWithMetadata: featuredContentWithMetadata,
  }

  console.log("data: ", data);

  return data;
}

export { useSystemData }