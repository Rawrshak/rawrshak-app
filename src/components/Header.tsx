import { useWeb3 } from '../web3';
import { SetStateAction } from 'react'
import Hamburger from '../assets/icons/Hamburger';
import WalletModal from './WalletModal';
import { useData } from '../data';
import { ethers } from "ethers";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import MenuLink from './MenuLink';


function Header({
  searchTerm,
  setSearchTerm,
  setIsNightMode,
  isNightMode
}:{
  searchTerm:string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  setIsNightMode: React.Dispatch<React.SetStateAction<boolean>>,
  isNightMode:boolean
}) {
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false)
  return (
    <div  className='inline-block fixed flex top-0 left-0 right-0 px-16 w-full bg-black opacity-95 justify-between sticky'>
      <WalletModal show={showWalletModal} setShow={setShowWalletModal} setIsNightMode={setIsNightMode} isNightMode={isNightMode}/>
      <AvailableLinks searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <div className='flex flex-row'>
        <SupportedTokenBalance />
        <div onClick={() => { setShowWalletModal(true) }} className="flex flex-row cursor-pointer">
          <div className="flex text-offWhite text-lg ml-1 mt-3">
            <Hamburger />
          </div>
          <div className="flex text-offWhite text-lg ml-1 mt-6">
            WALLET
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailableLinks({
  searchTerm,//the serch term to be used to filter assets,etc
  setSearchTerm,//function to change the search term
}:{
  searchTerm:string,
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>
}) {
  const { isDevMode } = useData();//instantiates needed data, inlcluding whethere it is in dev mode at that moment
  const web3 = useWeb3();
  const history = useHistory();

  //search bar handler for enter bar hit
  const handleKeyDown = (event: { key: string; currentTarget: { value: SetStateAction<string>; }; }) => {
    if (event.key === 'Enter') {
      history.push('/search/'.concat(searchTerm))
    } else {
      setSearchTerm(event.currentTarget.value)
    }
  }

  /*
  If in dev mode, show links to Asset Viewer, Inventory and Store.
  The only difference for not in dev mode is not to show Store link
  */
  if (isDevMode) {
    return (
      <div className='flex flex-row w-full z-50 inline-block'>
        <MenuLink menuName='Logo' />
        <div className="flex mx-4 mt-4 text-lg">
          <input 
            type='text'
            className="border-2 border-gray-300 bg-white px-2 h-10 rounded-lg text-sm focus:outline-none"
            onKeyUp={handleKeyDown}
            name="search" 
            placeholder="Search Marketplace">
          </input>
        </div>
        <MenuLink menuName='STORE' link='store'/>
        <MenuLink menuName='CREATE' link='create'/>
        {web3.account && <MenuLink menuName='INVENTORY' link='inventory'/>
        }
        <MenuLink menuName='EXPLORE' link='explore'/>
        <DropdownMenu menuName='COMMUNITY' itemList={['About','Docs','Social Media']} />
      </div>
    )
  } else {
    return (
      <div className='flex flex-row z-50 inline-block'>
        <MenuLink menuName='Logo' />
        <div className="flex mx-4 mt-4 text-lg">
          <input 
            type='text'
            className="border-2 border-gray-300 bg-white px-2 h-10 rounded-lg text-sm focus:outline-none"
            onKeyUp={handleKeyDown}
            name="search" 
            placeholder="Search">
          </input>
        </div>
        {web3.account &&  <MenuLink menuName='INVENTORY' link='inventory'/>}
        <MenuLink menuName='EXPLORE' link='explore'/>
        <DropdownMenu menuName='COMMUNITY' itemList={['About','Docs','Social Media']} />
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
        <div className="flex text-offWhite mt-6 px-4 text-lg whitespace-nowrap">
          {`${ethers.utils.formatUnits(supportedTokenBalance.toString(), supportedToken?.decimals)} ${supportedToken?.symbol}`}
        </div>
      </div>
    );
  }
}

export default Header;