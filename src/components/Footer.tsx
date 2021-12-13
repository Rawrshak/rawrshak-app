import Logo from '../assets/icons/Logo';
import DiscordLogo from '../assets/icons/DiscordLogo';
import TwitterLogo from '../assets/icons/TwitterLogo';
import { Link } from 'react-router-dom';
import { useData } from '../data';
import { useWeb3 } from '../web3';

function Footer() {
  const { isDevMode } = useData();
  const web3 = useWeb3();

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-grow" />
      <div className="flex grid-cols-3 mt-12 mb-4">
        <div className="flex flex-grow ml-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-grow flex-col text-offWhite justify-center">
          {web3.account && <Link to="/inventory" className="flex justify-center">
            Inventory
          </Link>}
          <Link to="/marketplace" className="flex justify-center">
            Marketplace
          </Link>
          {isDevMode && <Link to="/store" className="flex justify-center">
            Store
          </Link>}
        </div>
        <div className="flex flex-grow justify-end">
          <a
            href="https://discord.gg/7VGPphBU"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center m-4"
          >
            <DiscordLogo />
          </a>
          <a
            href="https://twitter.com/rawrshak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center m-4 mr-8"
          >
            <TwitterLogo />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;