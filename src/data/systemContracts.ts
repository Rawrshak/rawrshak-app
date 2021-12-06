import { useState, useEffect } from 'react';
import { useWeb3 } from '../web3';
import { useAddresses } from '../web3/chains';
import {
  AddressResolver,
  AddressResolver__factory,
  ContentFactory,
  ContentFactory__factory,
  Exchange,
  Exchange__factory,
  ERC20PresetMinterPauserUpgradeable,
  ERC20PresetMinterPauserUpgradeable__factory,
  Erc20Escrow,
  Erc20Escrow__factory,
  NftEscrow,
  NftEscrow__factory,
} from '../assets/typechain';

const useAddressResolverContract = () => {
  const { chainId, signerOrProvider } = useWeb3();
  const { addressResolver } = useAddresses(chainId);
  const [addressResolverContract, setAddressResolverContract] = useState<AddressResolver>();

  useEffect(() => {
    if (!chainId || !addressResolver || !signerOrProvider) {
      setAddressResolverContract(undefined);
      return;
    }

    setAddressResolverContract(AddressResolver__factory.connect(addressResolver, signerOrProvider));
  }, [chainId, addressResolver, signerOrProvider]);

  return addressResolverContract;
}

const useContentFactoryContract = (addressResolver: AddressResolver | undefined) => {
  const { signerOrProvider } = useWeb3();
  const [contentFactoryContract, setContentFactoryContract] = useState<ContentFactory>();

  useEffect(() => {
    if (!addressResolver || !signerOrProvider) {
      setContentFactoryContract(undefined);
      return;
    }
    addressResolver.getAddress("0xdb337f7d") // The bytes32 ID for the content factory contract
      .then((contentFactory) => setContentFactoryContract(ContentFactory__factory.connect(contentFactory, signerOrProvider)))
      .catch(console.error);
  }, [addressResolver, signerOrProvider]);

  return contentFactoryContract;
}

const useExchangeContract = (addressResolver: AddressResolver | undefined) => {
  const { signerOrProvider } = useWeb3();
  const [exchangeContract, setExchangeContract] = useState<Exchange>();

  useEffect(() => {
    if (!addressResolver || !signerOrProvider) {
      setExchangeContract(undefined);
      return;
    }

    addressResolver.getAddress("0xeef64103") // The bytes32 ID for the exchange contract
      .then((exchangeContract) => {
        setExchangeContract(Exchange__factory.connect(exchangeContract, signerOrProvider))
      })
      .catch(console.error);
  }, [addressResolver, signerOrProvider]);

  return exchangeContract;
}

const useRawrTokenContract = (addressResolver: AddressResolver | undefined) => {
  const { signerOrProvider } = useWeb3();
  const [rawrTokenContract, setRawrTokenContract] = useState<ERC20PresetMinterPauserUpgradeable>();

  useEffect(() => {
    if (!addressResolver || !signerOrProvider) {
      setRawrTokenContract(undefined);
      return;
    }

    addressResolver.getAddress("0x3d13c043") // The bytes32 ID for the Rawr token contract
      .then((rawrTokenContract) => {
        setRawrTokenContract(ERC20PresetMinterPauserUpgradeable__factory.connect(rawrTokenContract, signerOrProvider))
      })
      .catch(console.error);
  }, [addressResolver, signerOrProvider]);

  return rawrTokenContract;
}

const useErc20EscrowContract = (addressResolver: AddressResolver | undefined) => {
  const { signerOrProvider } = useWeb3();
  const [erc20EscrowContract, setErc20EscrowContract] = useState<Erc20Escrow>();

  useEffect(() => {
    if (!addressResolver || !signerOrProvider) {
      setErc20EscrowContract(undefined);
      return;
    }

    addressResolver.getAddress("0x29a264aa") // The bytes32 ID for the ERC20 token escrow contract
      .then((erc20EscrowContract) => {
        setErc20EscrowContract(Erc20Escrow__factory.connect(erc20EscrowContract, signerOrProvider))
      })
      .catch(console.error);
  }, [addressResolver, signerOrProvider]);

  return erc20EscrowContract;
}

const useNftEscrowContract = (addressResolver: AddressResolver | undefined) => {
  const { signerOrProvider } = useWeb3();
  const [nftEscrowContract, setNftEscrowContract] = useState<NftEscrow>();

  useEffect(() => {
    if (!addressResolver || !signerOrProvider) {
      setNftEscrowContract(undefined);
      return;
    }

    addressResolver.getAddress("0x87d4498b") // The bytes32 ID for the NFT escrow contract
      .then((nftEscrowContract) => {
        setNftEscrowContract(NftEscrow__factory.connect(nftEscrowContract, signerOrProvider))
      })
      .catch(console.error);
  }, [addressResolver, signerOrProvider]);

  return nftEscrowContract;
}

export {
  useAddressResolverContract,
  useContentFactoryContract,
  useExchangeContract,
  useRawrTokenContract,
  useErc20EscrowContract,
  useNftEscrowContract,
}