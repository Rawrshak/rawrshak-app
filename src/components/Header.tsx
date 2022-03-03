import { useWeb3 } from '../web3';
import { Fragment, SetStateAction } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Logo from '../assets/icons/Logo';
import Hamburger from '../assets/icons/Hamburger';
import ActiveLink from './router/ActiveLink';
import WalletModal from './WalletModal';
import { Link } from 'react-router-dom';
import { useData } from '../data';
import { ethers } from "ethers";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AvailableLinks({
  searchTerm,//the serch term to be used to filter assets,etc
  setSearchTerm//function to change the search term
}:{
  searchTerm:string,
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>
}) {
  const { isDevMode } = useData();//instantiates needed data, inlcluding whethere it is in dev mode at that moment
  const web3 = useWeb3();
  const history = useHistory();

  //search bar handler for enter bar hit
  const handleKeyDown = (event: { key: string; currentTarget: { value: SetStateAction<string>; }; }) => {
    setSearchTerm(event.currentTarget.value)
    if (event.key === 'Enter') {
      history.push('/search/'.concat(searchTerm))
    }
  }

  if (isDevMode) {
    /*
    If in dev mode, show links to Asset Viewer, Inventory and Store.
    The only difference for not in dev mode is not to show Store link
    */
    return (
      <div className='flex flex-row'>
        <div className="flex mr-12 mt-2">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex mx-4 pt-4 text-lg">
          <input 
            type='text'
            className="border-2 border-gray-300 bg-white px-2 h-10 rounded-lg text-sm focus:outline-none"
            onKeyUp={handleKeyDown}
            name="search" 
            placeholder="Search">
          </input>
        </div>
        <div className="flex-nowrap text-offWhite mx-4 pt-4 flex flex-col justify-center text-lg">
          <a 
            href="https://rawrshak.itch.io/rawrshak-asset-viewer" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-nowrap justify-center" >
            ASSET VIEWER
          </a>
        </div>
        <div className="mx-4 pt-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/store" exact>
            STORE
          </ActiveLink>
        </div>
        {web3.account && <div className="mx-4 pt-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/inventory" exact>
            INVENTORY
          </ActiveLink>
        </div>
        }
        <div className="mx-4 pt-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/explore" exact>
            EXPLORE
          </ActiveLink>
        </div>
        <div className="mx-4 pt-4 flex flex-col text-lg justify-center">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-offWhite text-lg">
                COMMUNITY
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-50 mt-2 w-56 rounded-md shadow-lg bg-darkBlue200 bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="ml-3 py-1">
                  <Menu.Item>
                    <ActiveLink to="/about" exact>
                      About
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink to="/docs" exact>
                      Docs
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink to="/social_media" exact>
                      Social Media
                    </ActiveLink>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-row'>
        <div className="flex mr-12 mt-2">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex mx-4 pt-4 text-lg">
          <input 
            type='text'
            className="border-2 border-gray-300 bg-white px-2 h-10 rounded-lg text-sm focus:outline-none"
            onKeyPress={handleKeyDown}
            name="search" 
            placeholder="Search">
          </input>
        </div>
        {web3.account && <div className="h-26 mx-4 pt-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/inventory" exact>
            INVENTORY
          </ActiveLink>
        </div>
        }
        <div className="mx-4 pt-4 flex flex-col justify-center text-lg">
          <ActiveLink to="/explore" exact>
            EXPLORE
          </ActiveLink>
        </div>
        <div className="mx-4 pt-4 flex flex-col text-lg justify-center">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-offWhite text-lg">
                COMMUNITY
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-50 mt-2 w-56 rounded-md shadow-lg bg-darkBlue200 bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="ml-3 py-1">
                  <Menu.Item>
                    <ActiveLink to="/about" exact>
                      About
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink to="/docs" exact>
                      Docs
                    </ActiveLink>
                  </Menu.Item>
                  <Menu.Item>
                    <ActiveLink to="/social_media" exact>
                      Social Media
                    </ActiveLink>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    );
  }
}

function SupportedTokenBalance() {
  const { supportedToken, supportedTokenBalance } = useData();

  if (supportedToken === undefined || supportedTokenBalance === undefined) {
    return (null);
  } else {
    return (
      <div className='w-full'>
        <div className="flex text-offWhite pt-4 px-4 text-lg whitespace-nowrap">
          {`${ethers.utils.formatUnits(supportedTokenBalance.toString(), supportedToken?.decimals)} ${supportedToken?.symbol}`}
        </div>
      </div>
    );
  }
}


function Header({
  searchTerm,
  setSearchTerm
}:{
  searchTerm:string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  return (
    <div  className='fixed flex top-0 left-0 right-0 px-16 w-full bg-black opacity-95 justify-between'>
      <WalletModal show={showWalletModal} setShow={setShowWalletModal} />
      <div className="flex">
        <AvailableLinks searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className='flex flex-row r-0'>
        <div className="flex mt-2 flex-row w-full">
          <SupportedTokenBalance />
          <div onClick={() => { setShowWalletModal(true) }} className="flex flex-row cursor-pointer pt-1">
            <Hamburger />
            <div className="flex text-offWhite text-lg ml-1 mt-3">
              WALLET
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;