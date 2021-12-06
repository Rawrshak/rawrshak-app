import { useEffect, useState } from 'react';
import { BigNumber, ethers } from "ethers";
import Modal from './Modal';
import Button from './Button';
import { InputNumber } from "./Input";
import { Asset, AssetWithOrders, ContentDataWithMetadata } from "../data/data";
import { useWeb3 } from '../web3';
import { Content, Content__factory } from '../assets/typechain';
import { useTransaction } from "../web3/transactions";
import Loader from './Loader';

function AssetModal({
  show,
  setShow,
  assetWithOrders,
  content,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  assetWithOrders: AssetWithOrders | Asset | undefined,
  content: ContentDataWithMetadata | undefined,
}) {
  const [mintAmount, setMintAmount] = useState<BigNumber>();
  const [mintAmountString, setMintAmountString] = useState<string>("");
  const { signerOrProvider, account } = useWeb3();
  const [activeContentContract, setActiveContentContract] = useState<Content>();
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);

  useEffect(() => {
    if (assetWithOrders === undefined || signerOrProvider === undefined || content === undefined) return;

    setActiveContentContract(Content__factory.connect(assetWithOrders.parentContract, signerOrProvider));
  }, [assetWithOrders, signerOrProvider, content]);

  useEffect(() => {
    if (mintAmountString !== "") {
      setMintAmount(BigNumber.from(mintAmountString));
    }
  }, [mintAmountString]);

  const mint = () => {
    if (
      activeContentContract === undefined ||
      assetWithOrders === undefined ||
      mintAmount === undefined ||
      mintAmount.eq(BigNumber.from("0")) ||
      account === undefined
    ) return;

    setTransactionPending(true);

    transaction(() => activeContentContract.mintBatch({
      to: account,
      tokenIds: [assetWithOrders.tokenId],
      amounts: [mintAmount],
      nonce: 1,
      signer: ethers.constants.AddressZero,
      signature: [],
    }),
      "Transaction pending",
      "Transaction failed",
      "Transaction succeeded",
      () => setTransactionPending(false),
      undefined,
      () => setTransactionPending(false)
    );
  }

  if (assetWithOrders === undefined) {
    return (null);
  } else {
    return (
      <Modal isOpen={show} setIsOpen={setShow}>
        <div className="container flex flex-col">
          <div className="flex m-1">
            <img src={assetWithOrders.imageUri} alt="Rawrshak Asset" className="self-center" />
          </div>
          <div className="flex flex-wrap my-1">
            {assetWithOrders.tags.map(tag => (
              <div key={tag} className="flex flex-shrink text-black text-sm bg-chartreuse500 rounded-xl m-1 px-2 py-1 border-2">
                {tag}
              </div>
            ))}
          </div>
          <div className="text-offWhite text-xl">
            {assetWithOrders.name}
          </div>
          <div className="text-offWhite text-sm">
            Token ID: {assetWithOrders.tokenId}
          </div>
          <div className="text-offWhite text-sm">
            Type: {assetWithOrders.type}
          </div>
          <div className="text-offWhite text-sm">
            Subtype: {assetWithOrders.subtype}
          </div>
          <div className="text-offWhite text-sm">
            Current Supply: {Number(assetWithOrders.currentSupply)}
          </div>
          <div className="text-offWhite text-sm">
            Max Supply: {Number(assetWithOrders.maxSupply)}
          </div>
          <div className="text-offWhite text-sm">
            <InputNumber
              value={mintAmountString}
              onChange={(e) => { setMintAmountString(e) }}
              className="bg-neutral700 focus:outline-none rounded py-1 px-2 mr-2"
              disabled={false}
            />
            <Button
              label="Mint"
              onClick={mint}
              enabled={true}
              show={!transactionPending}
              enabledClassName="bg-chartreuse500 text-neutral900 text-xsm mr-4 px-6 py-2 rounded-md"
              disabledClassName="bg-chartreuse500 text-neutral900 text-xsm mr-4 px-6 py-2 rounded-md"
            />
            <Loader show={transactionPending} />
          </div>
        </div>
      </Modal >
    );
  }
}

export default AssetModal;