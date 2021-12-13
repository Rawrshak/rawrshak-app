import { useEffect, useState } from 'react';
import { useWeb3 } from '../web3';
import { BigNumber } from 'ethers';
import { Token } from './data';

const useSupportedTokenBalance = (supportedToken: Token | undefined) => {
  const web3 = useWeb3();
  const [supportedTokenBalance, setSupportedTokenBalance] = useState<BigNumber>();

  useEffect(() => {
    if (supportedToken === undefined || web3.account === undefined) {
      setSupportedTokenBalance(undefined);
      return;
    }

    if (supportedTokenBalance === undefined) {
      supportedToken.contract.balanceOf(web3.account)
        .then((supportedTokenBalance) => setSupportedTokenBalance(supportedTokenBalance))
        .catch((error) => console.error(error));
    }
  }, [supportedToken, web3.account, supportedTokenBalance]);

  useEffect(() => {
    if (supportedToken === undefined || web3.account === "") return;

    const listenerCallback = () => {
      if (web3.account === undefined) return;

      supportedToken.contract.balanceOf(web3.account)
        .then((supportedTokenBalance) => setSupportedTokenBalance(supportedTokenBalance))
        .catch((error) => console.error(error));
    }

    const transferFromFilter = supportedToken.contract.filters.Transfer(web3.account, null, null);
    const transferToFilter = supportedToken.contract.filters.Transfer(null, web3.account, null);

    supportedToken.contract.on(transferFromFilter, listenerCallback);
    supportedToken.contract.on(transferToFilter, listenerCallback);

    return () => {
      supportedToken.contract.off(transferFromFilter, listenerCallback);
      supportedToken.contract.off(transferToFilter, listenerCallback);
    };
  }, [supportedToken, web3.account]);

  return supportedTokenBalance;
}

export { useSupportedTokenBalance }