import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { InputAmount } from './Input';
import { BigNumber } from '@ethersproject/bignumber';
import { useTransaction } from "../web3/transactions";
import Loader from "./Loader";
import { useWeb3 } from '../web3';
import { ContentDataWithMetadata } from '../data/data';
import { Content, Content__factory, ContentManager, ContentManager__factory } from '../assets/typechain';
import { ethers } from 'ethers';

function UpdateRoyaltyModal({
  show,
  setShow,
  activeContent
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  activeContent: ContentDataWithMetadata | undefined,
}) {
  const web3 = useWeb3();
  const [transaction] = useTransaction();
  const [contentContract, setContentContract] = useState<Content>();
  const [contentManagerContract, setContentManagerContract] = useState<ContentManager>();
  const [royaltyAccount, setRoyaltyAccount] = useState<string>("");
  const [oldRoyaltyAccount, setOldRoyaltyAccount] = useState<string>("");
  const [royaltyRateString, setRoyaltyRateString] = useState<string>("0");
  const [royaltyRate, setRoyaltyRate] = useState<BigNumber>(BigNumber.from("0"));
  const [oldRoyaltyRateString, setOldRoyaltyRateString] = useState<string>("0");
  const [enableUpdateButton, setEnableUpdateButton] = useState<boolean>(false);
  const [transactionPending, setTransactionPending] = useState<boolean>(false);


  useEffect(() => {
    if (activeContent === undefined || web3.signerOrProvider === undefined) return;

    setContentContract(Content__factory.connect(activeContent.contractAddress, web3.signerOrProvider));
    setContentManagerContract(ContentManager__factory.connect(activeContent.managerAddress, web3.signerOrProvider));
  }, [activeContent, web3.signerOrProvider]);

  useEffect(() => {
    if (contentContract === undefined || web3.account === undefined) return;

    contentContract.contractRoyalty()
      .then((royaltyInfo) => {
        console.log("Royalty Info: ", royaltyInfo);
        setOldRoyaltyRateString((royaltyInfo.rate / 10000).toString());
        setOldRoyaltyAccount(royaltyInfo.receiver);
        setRoyaltyRateString((royaltyInfo.rate / 10000).toString());
        setRoyaltyAccount(royaltyInfo.receiver);
      })
      .catch((error) => console.error(error));
  }, [contentContract, web3.account, show]);

  useEffect(() => {
    if ((royaltyRateString !== oldRoyaltyRateString ||
      royaltyAccount.toLowerCase() !== oldRoyaltyAccount.toLowerCase())
      && ethers.utils.isAddress(royaltyAccount.toLowerCase())) {
      setEnableUpdateButton(true);
    } else {
      setEnableUpdateButton(false);
    }
  }, [royaltyRateString, royaltyAccount, oldRoyaltyRateString, oldRoyaltyAccount]);

  const updateRoyaltyRateString = (royaltyRateString: string) => {
    if (Number(royaltyRateString) > 100) {
      royaltyRateString = "100";
    }
    setRoyaltyRateString(royaltyRateString);
  }

  const updateRoyalties = () => {
    if (contentManagerContract === undefined) return;
    setTransactionPending(true);

    transaction(() => contentManagerContract.setContractRoyalty(
      royaltyAccount,
      royaltyRate
    ),
      "Transaction pending",
      "Transaction failed",
      "Transaction succeeded",
      undefined,
      () => { setShow(false); setTransactionPending(false) },
      undefined
    );
  }

  useEffect(() => {
    setRoyaltyRate(BigNumber.from(Number(royaltyRateString) * 10000));
  }, [royaltyRateString]);

  return (
    <Modal isOpen={show} setIsOpen={setShow} forceOpen={false}>
      <div className="flex flex-col justify-center">
        <div className="flex text-xl justify-center mb-4">
          Updating Contract Royalties
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Address
          </div>
          <div className="flex flex-grow col-span-8 my-3 mr-2 text-right">
            <input value={royaltyAccount} onChange={(e) => { setRoyaltyAccount(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />

          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Rate (%)
          </div>
          <div className="flex flex-grow col-span-8 my-3 mr-2 text-right">
            <InputAmount
              value={royaltyRateString}
              decimals={2}
              onChange={(e) => updateRoyaltyRateString(e)}
              className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
              disabled={false}
            />
          </div>
        </div>
        <div className="flex flex-grow justify-center mt-4">
          <Button
            label="UPDATE ROYALTIES"
            onClick={() => updateRoyalties()}
            enabled={enableUpdateButton}
            show={!transactionPending}
            enabledClassName="flex justify-center bg-gray border-chartreuse500 border-2 text-chartreuse500 text-xsm px-6 py-2 rounded-md"
            disabledClassName="flex justify-center bg-gray text-black300 border-black300 border-2 text-xsm px-6 py-2 rounded-md"
          />
          <Loader show={transactionPending} />
        </div>
      </div>
    </Modal>
  );
}

export default UpdateRoyaltyModal;