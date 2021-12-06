import { useWeb3 } from '../web3';
import Logo from '../assets/icons/Logo';
import Hamburger from '../assets/icons/Hamburger';
import ActiveLink from './router/ActiveLink';
import WalletModal from './WalletModal';
import { Link } from 'react-router-dom';
import { useData } from '../data';
import { ethers } from "ethers";
import { useState } from 'react';

function AvailableLinks() {
  const { isDevMode } = useData();
  const web3 = useWeb3();

  if (isDevMode) {
    return (
      <>
        <div className="flex mr-12 py-4 justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="mr-4 mx-12 py-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/store" exact>
            STORE
          </ActiveLink>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex mr-12 py-4 justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        {web3.account && <div className="mr-4 mx-12 py-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/inventory" exact>
            INVENTORY
          </ActiveLink>
        </div>
        }
        <div className="mr-4 mx-12 py-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/marketplace" exact>
            MARKETPLACE
          </ActiveLink>
        </div>
      </>
    );
  }
}

function SupportedTokenBalance() {
  const { supportedToken, supportedTokenBalance } = useData();

  if (supportedToken === undefined || supportedTokenBalance === undefined) {
    return (null);
  } else {
    return (
      <div className="flex text-offWhite mx-8 mt-1 text-lg">
        {`${ethers.utils.formatUnits(supportedTokenBalance.toString(), supportedToken?.decimals)} ${supportedToken?.symbol}`}
      </div>
    );
  }
}


function Header() {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  return (
    <div className="flex ml-16 mr-8 justify-between">
      <WalletModal show={showWalletModal} setShow={setShowWalletModal} />
      <div className="flex">
        <AvailableLinks />
      </div>
      <div className="flex py-6">
        <SupportedTokenBalance />
        <div onClick={() => { setShowWalletModal(true) }} className="flex cursor-pointer">
          <div className="flex text-offWhite text-lg mx-2 mt-1">
            WALLET
          </div>
          <Hamburger />
        </div>
      </div>
    </div>
  );
}

export default Header;