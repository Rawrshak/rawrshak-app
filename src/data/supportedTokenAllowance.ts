import { useEffect, useState } from 'react';
import { useWeb3 } from '../web3';
import { BigNumber } from 'ethers';
import { Token } from './data';
import { Erc20Escrow } from '../assets/typechain';

const useSupportedTokenAllowance = (supportedToken: Token | undefined, erc20Escrow: Erc20Escrow | undefined) => {
  const web3 = useWeb3();
  const [supportedTokenAllowance, setSupportedTokenAllowance] = useState<BigNumber>();

  useEffect(() => {
    if (supportedToken === undefined || erc20Escrow === undefined || web3.account === undefined) return;

    if (supportedTokenAllowance === undefined) {
      supportedToken.contract.allowance(web3.account, erc20Escrow.address)
        .then((newSupportedTokenAllowance) => setSupportedTokenAllowance(newSupportedTokenAllowance))
        .catch((error) => console.error(error));
    }
  });

  useEffect(() => {
    if (supportedToken === undefined || erc20Escrow === undefined || web3.account === "") return;

    const listenerCallback = () => {
      if (web3.account === undefined) return;

      supportedToken.contract.allowance(web3.account, erc20Escrow.address)
        .then((newSupportedTokenAllowance) => setSupportedTokenAllowance(newSupportedTokenAllowance))
        .catch((error) => console.error(error));
    }

    const transferFromFilter = supportedToken.contract.filters.Transfer(web3.account, null, null);
    const transferToFilter = supportedToken.contract.filters.Transfer(null, web3.account, null);
    const approvalFilter = supportedToken.contract.filters.Approval(web3.account, erc20Escrow.address, null);

    supportedToken.contract.on(transferFromFilter, listenerCallback);
    supportedToken.contract.on(transferToFilter, listenerCallback);
    supportedToken.contract.on(approvalFilter, listenerCallback);

    return () => {
      supportedToken.contract.off(transferFromFilter, listenerCallback);
      supportedToken.contract.off(transferToFilter, listenerCallback);
      supportedToken.contract.off(approvalFilter, listenerCallback);
    };
  }, [supportedToken, erc20Escrow, web3.account]);

  return supportedTokenAllowance;
}

export { useSupportedTokenAllowance }