import { useState } from 'react';
import { useInventoryAssets } from './inventoryAssets';
import { useAssets } from './assets';
import { useAssetsWithMetadata } from './assetsWithMetadata';
import { useFeaturedAssets } from './featuredAssets';
import { useAllContent } from './allContent';
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
import { useOwnedOrders } from './ownedOrders';
import { useOrdersWithAssetMetadata } from './ordersWithAssetMetadata';
import { useClaimableRoyalties } from './claimableRoyalties';
import {
  AddressResolver,
  ContentFactory,
  Exchange,
  ERC20PresetMinterPauserUpgradeable,
  Erc20Escrow,
  NftEscrow,
  RoyaltyManager
} from '../assets/typechain';
import {
  useAddressResolverContract,
  useContentFactoryContract,
  useExchangeContract,
  useRawrTokenContract,
  useErc20EscrowContract,
  useNftEscrowContract,
  useRoyaltyManagerContract
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
  game: string,
  creator: string,
  owner: string,
  managerAddress: string,
  creatorAddress: string,
  assets: AssetWithOrders[],
  dateCreated: BigNumber,
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
  latestPublicUri: string, 
  dateCreated: BigNumber,
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
  amountClaimed: BigNumber,
  status: string,
  createdAtTimestamp: BigNumber,
  filledAtTimestamp: BigNumber,
  cancelledAtTimestamp: BigNumber,
  lastClaimedAtTimestamp: BigNumber,
}

export interface OrderWithAssetMetadata extends Order {
  assetId: string,
  assetName: string | undefined,
  assetGame: string | undefined,
}

export interface ContentJson {
  name: string,
  description: string,
  image: string,
  creator: string,
  game: string,
  tags: string[]
}

export interface PublicAssetMetadata {
  name: string,
  description: string,
  image: string,
  tags: string[],
  type: string,
  subtype: string,
  nsfw: boolean,
}

export interface AudioFileMetadata {
  name: string,
  uri: string,
  contentType: string,
  duration: number,
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
  assetProperties: TextFileMetadata
}

export interface Data {
  systemContracts: {
    addressResolver: AddressResolver | undefined,
    contentFactory: ContentFactory | undefined,
    exchange: Exchange | undefined,
    rawrToken: ERC20PresetMinterPauserUpgradeable | undefined,
    erc20Escrow: Erc20Escrow | undefined,
    nftEscrow: NftEscrow | undefined,
    royaltyManager: RoyaltyManager | undefined
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
  allContentWithMetadata: ContentDataWithMetadata[] | undefined,
  featuredContentWithMetadata: ContentDataWithMetadata[] | undefined,
  ownedOrders: OrderWithAssetMetadata[] | undefined,
  claimableRoyalties: BigNumber | undefined,
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
  const royaltyManagerContract = useRoyaltyManagerContract(addressResolverContract);
  const contentsSubgraphEndpoint = useContentsSubgraphEndpoint();
  const exchangeSubgraphEndpoint = useExchangeSubgraphEndpoint();
  const curatedTags = useCuratedTags();
  const allTags = useAllTags(contentsSubgraphEndpoint);
  const ownedContent = useOwnedContent(contentsSubgraphEndpoint);
  const assets = useAssets(contentsSubgraphEndpoint);
  const assetsWithMetadata = useAssetsWithMetadata(assets);
  const assetOrders = useAssetOrders(assetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const assetsWithOrders = useAssetsWithOrders(assetsWithMetadata, assetOrders);
  const featuredAssets = useFeaturedAssets(contentsSubgraphEndpoint);
  const featuredAssetsWithMetadata = useAssetsWithMetadata(featuredAssets);
  const featuredAssetOrders = useAssetOrders(featuredAssetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const featuredAssetsWithOrders = useAssetsWithOrders(featuredAssetsWithMetadata, featuredAssetOrders);
  const inventoryAssets = useInventoryAssets(contentsSubgraphEndpoint);
  const inventoryAssetsWithMetadata = useAssetsWithMetadata(inventoryAssets);
  const inventoryAssetOrders = useAssetOrders(inventoryAssetsWithMetadata, exchangeContract, exchangeSubgraphEndpoint);
  const inventoryAssetsWithOrders = useAssetsWithOrders(inventoryAssetsWithMetadata, inventoryAssetOrders);
  const supportedToken = useSupportedToken();
  const ownedContentWithMetadata = useContentWithMetadata(ownedContent);
  const supportedTokenBalance = useSupportedTokenBalance(supportedToken);
  const supportedTokenAllowance = useSupportedTokenAllowance(supportedToken, erc20EscrowContract);
  const allContent = useAllContent(contentsSubgraphEndpoint);
  const allContentWithMetadata = useContentWithMetadata(allContent);
  const allContentWithMetadataAndOrders = useContentWithMetadataAndOrders(allContentWithMetadata, assetsWithOrders);
  const featuredContentWithMetadata = useFeaturedContent(allContentWithMetadataAndOrders);
  const ownedOrders = useOwnedOrders(exchangeSubgraphEndpoint);
  const ownedOrdersWithAssetMetadata = useOrdersWithAssetMetadata(ownedOrders, assetsWithOrders);
  const claimableRoyalties = useClaimableRoyalties(royaltyManagerContract, erc20EscrowContract, supportedToken);

  const data: Data = {
    systemContracts: {
      addressResolver: addressResolverContract,
      contentFactory: contentFactoryContract,
      exchange: exchangeContract,
      rawrToken: rawrTokenContract,
      erc20Escrow: erc20EscrowContract,
      nftEscrow: nftEscrowContract,
      royaltyManager: royaltyManagerContract
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
    allContentWithMetadata: allContentWithMetadataAndOrders,
    featuredContentWithMetadata: featuredContentWithMetadata,
    ownedOrders: ownedOrdersWithAssetMetadata,
    claimableRoyalties: claimableRoyalties
  }

  console.log("data: ", data);

  return data;
}

export { useSystemData }