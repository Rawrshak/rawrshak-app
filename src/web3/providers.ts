import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { supportedChains } from './chains';
import { useListeners } from './listeners';
import tailwind from '../../tailwind.config';

export interface Web3Custom {
  connected: boolean,
  provided: boolean,
  providerName: string,
  networkName?: string,
  account?: string,
  chainId?: number,
  provider?: ethers.providers.Provider,
  signerOrProvider?: ethers.providers.Provider | ethers.Signer,
};

let listenerProvider: ethers.providers.Provider;

const web3Modal = new Web3Modal({
  cacheProvider: true,
  theme: {
    background: tailwind.theme.colors.neutral900,
    main: tailwind.theme.colors.offWhite,
    secondary: tailwind.theme.colors.chartreuse500,
    border: "none",
    hover: tailwind.theme.colors.neutral800,
  }
});

export const defaultWeb3: Web3Custom = {
  connected: false,
  provided: false,
  providerName: 'not connected',
};

const makeInjectedProvider = async (web3Provider: ethers.providers.Web3Provider) => {
  const local =
    process.env.REACT_APP_LOCAL_CHAIN_ID &&
    (await web3Provider.getNetwork()).chainId === parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10);

  const customProvider: Web3Custom = {
    connected: true,
    provided: true,
    providerName: 'injected provider',
    networkName: local ? 'localhost' : (await web3Provider.getNetwork()).name,
    account: await web3Provider.getSigner().getAddress(),
    chainId: (await web3Provider.getNetwork()).chainId,
    provider: web3Provider,
    signerOrProvider: web3Provider.getSigner(),
  };

  listenerProvider = web3Provider.provider as ethers.providers.Provider;

  return customProvider;
}

const getInjectedProvider = (web3Modal: Web3Modal) => {
  return new Promise<Web3Custom>((resolve, reject) => {
    web3Modal.connect()
      .then(userSuppliedProvider => makeInjectedProvider(new ethers.providers.Web3Provider(userSuppliedProvider)))
      .then(resolve)
      .catch(reject);
  });
}

const useProvider = () => {
  const [web3Provider, setWeb3Provider] = useState(defaultWeb3);

  const reloadedProvider = useListeners(listenerProvider, web3Modal);
  useEffect(() => {
    if (!reloadedProvider) {
      setWeb3Provider(defaultWeb3);
    } else {
      makeInjectedProvider(reloadedProvider)
        .then(setWeb3Provider)
        .catch(console.error);
    }
  }, [reloadedProvider]);

  useEffect(() => {
    if (web3Provider.connected) return;

    if (web3Modal.cachedProvider && !web3Provider.provider) {
      getInjectedProvider(web3Modal)
        .then(setWeb3Provider)
        .catch(console.error);

      return;
    }

    if (web3Provider.provider) {
      web3Provider.provider.getNetwork()
        .then(network => {
          if (supportedChains().includes(network.chainId)) {
            getInjectedProvider(web3Modal)
              .then(setWeb3Provider)
              .catch(console.error);

            return;
          }
        })
        .catch(console.error);
    }

  }, [web3Provider.connected, web3Provider.provider]);

  return web3Provider;
}

const connect = () => {
  web3Modal.connect().catch(console.error);
}

export { useProvider, connect };
