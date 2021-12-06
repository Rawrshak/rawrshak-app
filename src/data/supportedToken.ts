import { useEffect, useState } from 'react';
import { useWeb3 } from '../web3';
import { useAddresses } from '../web3/chains';
import { ERC20PresetMinterPauserUpgradeable__factory } from '../assets/typechain';
import { Token } from './data';

const useSupportedToken = () => {
  const { chainId, signerOrProvider, account } = useWeb3();
  const { supportedToken } = useAddresses(chainId);

  const [supportedTokenContract, setSupportedTokenContract] = useState<Token | undefined>();

  useEffect(() => {
    if (supportedToken === undefined || !signerOrProvider || account === "") return;

    const tokenContract = ERC20PresetMinterPauserUpgradeable__factory.connect(supportedToken, signerOrProvider);

    Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
    ])
      .then(([name, symbol, decimals]) => {
        const newToken: Token = {
          contract: tokenContract,
          address: supportedToken,
          name: name,
          symbol: symbol,
          decimals: decimals,
        }
        setSupportedTokenContract(newToken);
      })
      .catch(console.error)
  }, [signerOrProvider, account, supportedToken]);

  return supportedTokenContract;
}

export { useSupportedToken };