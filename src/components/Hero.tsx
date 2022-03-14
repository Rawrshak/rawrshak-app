import { useWeb3 } from '../web3';
import { connect } from '../web3/providers';
import HeroCubesFlattened from '../assets/images/heroCubesFlattened.png'
import InstallMetamaskModal from './InstallMetamaskModal';
import { useState } from "react";

function Hero() {
  const web3 = useWeb3();

  const [showInstallMetamaskModal, setShowInstallMetamaskModal] = useState<boolean>(false);

  const connectClicked = () => {
    if (window.ethereum) {
      connect();
    } else {
      setShowInstallMetamaskModal(true);
    }
  }

  return (
    <>
      <InstallMetamaskModal show={showInstallMetamaskModal} setShow={setShowInstallMetamaskModal} />
      <div className="flex">
        <div className="flex flex-wrap flex-shrink border-2 mb-4 rounded-xl border-darkBlue100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mx-5 my-5">
            <div className="flex">
              <img className="self-center" src={HeroCubesFlattened} alt="Abstract content cubes" />
            </div>
            <div className="justify-center m-8">
              <div className="text-offWhite text-xxxl py-4">Own your content. Own your identity.</div>
              <div className="text-offWhite text-base py-2">WELCOME TO RAWRSHAK</div>
              <div className="text-offWhite text-sm">Rawrshak utilizes blockchain technology to provide decentralized video game assets. This means you own your online gaming presence and can take it with you. Mint your own NFT’s and distribute them to your audience.</div>
              <div className="grid justify-items-center">
                {!web3.account && <button className="bg-chartreuse500 text-xsm mr-4 px-6 py-2 my-8 rounded-md" onClick={connectClicked}>CONNECT WALLET</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero;