import React from 'react';
import { useHistory } from 'react-router-dom';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import X from '../assets/icons/X';
import Button from './Button';
import { useWeb3 } from '../web3';
import { connect } from '../web3/providers';
import { useData } from '../data';
import RightArrow from '../assets/icons/RightArrow';
import InstallMetamaskModal from './InstallMetamaskModal';
import { useState } from "react";

function truncate(fullStr: string, strLen: number, separator: string = "...") {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(charsToShow / 2 + 1); // accounts for the "0x"
  const backChars = Math.floor(charsToShow / 2 - 1); // accounts for the "0x"

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
}

function WalletModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  const web3 = useWeb3();
  const history = useHistory();
  const { isDevMode, changeIsDevMode } = useData();
  const [showInstallMetamaskModal, setShowInstallMetamaskModal] = useState<boolean>(false);

  const connectClicked = () => {
    setShow(false);
    if (window.ethereum) {
      connect();
    } else {
      setShowInstallMetamaskModal(true);
    }
  }

  const toDevMode = () => {
    changeIsDevMode(true);
    setShow(false);
    history.push('/');
  }

  const toGamerMode = () => {
    changeIsDevMode(false);
    setShow(false);
    history.push('/');
  }

  const toOrders = () => {
    setShow(false);
    history.push('/orders');
  }

  return (
    <>
      <InstallMetamaskModal show={showInstallMetamaskModal} setShow={setShowInstallMetamaskModal} />
      <SlidingPane
        className="flex bg-black400 rounded-bl-lg rounded-tl-lg rounded-br-lg"
        overlayClassName="wallet-sliding-pane"
        isOpen={show}
        onRequestClose={() => { setShow(false) }}
        hideHeader={true}
        width="40%"
      >
        <div className="flex flex-grow flex-col">
          <div className="flex justify-start mb-4">
            <button className="focus:outline-none p-1" onClick={() => setShow(false)}>
              <X />
            </button>
          </div>
          <div className="flex">
            <Button
              label="CONNECT"
              onClick={() => connectClicked()}
              enabled={true}
              show={!web3.account}
              enabledClassName="flex flex-grow justify-center text-black400 text-lg bg-chartreuse500 rounded-lg h-10 w-48 m-2 mt-16 pt-2"
              disabledClassName="flex flex-grow justify-center text-black400 text-lg bg-chartreuse500 rounded-lg h-36 w-48 m-2 pt-14"
            />

            {web3.account && <div className="text-offWhite text-sm py-1">{truncate(web3.account, 11)}</div>}
          </div>
          <div className="flex grow grid-cols-2 mt-6">
            <Button
              label="Gamer Mode"
              onClick={() => toGamerMode()}
              enabled={isDevMode}
              show={web3.account !== undefined && web3.account !== ""}
              enabledClassName="flex flex-grow justify-center text-chartreuse500 text-lg bg-black400 rounded-lg h-24 w-48 m-2 pt-8"
              disabledClassName="flex flex-grow justify-center text-black400 text-lg bg-chartreuse500 rounded-lg h-24 w-48 m-2 pt-8"
            />
            <Button
              label="Developer Mode"
              onClick={() => toDevMode()}
              enabled={!isDevMode}
              show={web3.account !== undefined && web3.account !== ""}
              enabledClassName="flex flex-grow justify-center text-chartreuse500 text-lg bg-black400 rounded-lg h-24 w-48 m-2 pt-8"
              disabledClassName="flex flex-grow justify-center text-black400 text-lg bg-chartreuse500 rounded-lg h-24 w-48 m-2 pt-8"
            />
          </div>
          {web3.account && <div className="grid grid-cols-2 text-offWhite text-lg cursor-pointer bg-black450 h-12 mx-4 mt-8 rounded-sm" onClick={() => toOrders()}>
            <div className="flex justify-start ml-4 mt-2" >
              My Orders
            </div>
            <div className="flex justify-end mr-4 mt-3">
              <RightArrow />
            </div>
          </div>}
        </div>
      </SlidingPane>
    </>
  );

}

export default WalletModal;