import { useEffect, useState } from 'react';
import { Token } from './data';
import { BigNumber } from 'ethers';
import { RoyaltyManager, Erc20Escrow } from '../assets/typechain';
import { useWeb3 } from '../web3';


const useClaimableRoyalties = (
  royaltyManagerContract: RoyaltyManager | undefined,
  erc20EscrowContract: Erc20Escrow | undefined,
  supportedToken: Token | undefined
) => {
  const [claimableRoyalties, setClaimableRoyalties] = useState<BigNumber>();
  const web3 = useWeb3();

  useEffect(() => {
    if (royaltyManagerContract === undefined || supportedToken === undefined || erc20EscrowContract === undefined) return;

    const updateClaimableRoyalties = () => {
      if (royaltyManagerContract === undefined || web3.account === undefined) return;

      royaltyManagerContract.claimableRoyalties(web3.account)
        .then((claimableRoyaltiesAmounts) => {
          const index = claimableRoyaltiesAmounts.tokens.findIndex(tokenAddress => tokenAddress.toLowerCase() === supportedToken.address)
          if (index === -1) {
            setClaimableRoyalties(BigNumber.from("0"));
          } else {
            setClaimableRoyalties(claimableRoyaltiesAmounts.amounts[index]);
          }
        })
        .catch((error) => console.error(error));
    }

    if (claimableRoyalties === undefined) {
      updateClaimableRoyalties();
    }

    const filter = erc20EscrowContract.filters.ClaimedRoyalties(web3.account);

    erc20EscrowContract.on(filter, updateClaimableRoyalties);
  }, [royaltyManagerContract, web3.account, claimableRoyalties, erc20EscrowContract, supportedToken]);


  return claimableRoyalties;
}

export { useClaimableRoyalties }