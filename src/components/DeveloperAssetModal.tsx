import { useEffect, useState } from 'react';
import { BigNumber, ethers } from "ethers";
import Button from './Button';
import { InputNumber } from "./Input";
import { Asset, AssetWithOrders, ContentDataWithMetadata } from "../data/data";
import { useWeb3 } from '../web3';
import { Content, Content__factory } from '../assets/typechain';
import { useTransaction } from "../web3/transactions";
import Loader from './Loader';
import Image from './Image';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import X from '../assets/icons/X';

function AssetModal({
  show,
  setShow,
  assetWithOrders,
  content,
  openUpdateAssetModal
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  assetWithOrders: AssetWithOrders | Asset | undefined,
  content: ContentDataWithMetadata | undefined,
  openUpdateAssetModal: (asset: Asset) => void
}) {
  const [mintAmount, setMintAmount] = useState<BigNumber>();
  const [mintAmountString, setMintAmountString] = useState<string>("");
  const { signerOrProvider, account } = useWeb3();
  const [contentContract, setContentContract] = useState<Content>();
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [assetUri, setAssetUri] = useState<string>();

  useEffect(() => {
    if (assetWithOrders === undefined || signerOrProvider === undefined || content === undefined) return;

    setContentContract(Content__factory.connect(assetWithOrders.parentContract, signerOrProvider));
  }, [assetWithOrders, signerOrProvider, content]);

  useEffect(() => {
    if (contentContract === undefined || assetWithOrders === undefined) return;

    contentContract["uri(uint256)"](assetWithOrders.tokenId)
      .then(uri => {
        setAssetUri(uri);
      })
      .catch((error) => console.error(error));
  }, [assetWithOrders, contentContract]);

  useEffect(() => {
    if (mintAmountString !== "") {
      setMintAmount(BigNumber.from(mintAmountString));
    } else {
      setMintAmount(BigNumber.from("0"));
    }
  }, [mintAmountString]);

  const mint = () => {
    if (
      contentContract === undefined ||
      assetWithOrders === undefined ||
      mintAmount === undefined ||
      mintAmount.eq(BigNumber.from("0")) ||
      account === undefined
    ) return;

    setTransactionPending(true);

    transaction(() => contentContract.mintBatch({
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
      () => updateAssetSuccess(),
      () => setTransactionPending(false)
    );
  }

  const updateAssetSuccess = () => {
    setMintAmount(BigNumber.from("0"));
    setMintAmountString("");
  }

  const calculateMax = (maxSupply: string) => {
    if (maxSupply === ethers.constants.MaxUint256.toString()) {
      return "MAX"
    } else {
      return Number(maxSupply);
    }
  }

  if (assetWithOrders === undefined) {
    return (null);
  } else {
    return (
      <SlidingPane
        className="flex bg-gray"
        overlayClassName="sliding-pane"
        isOpen={show}
        onRequestClose={() => { setShow(false) }}
        width="40%"
        hideHeader={true}
      >
        <div className="flex flex-grow flex-col">
          <div className="flex justify-start mb-4">
            <button className="focus:outline-none p-1" onClick={() => setShow(false)}>
              <X />
            </button>
          </div>
          <div className="flex mb-12 justify-center">
            <Image src={assetWithOrders.imageUri} className="flex w-1/3 cursor-pointer" type="content" />
          </div>
          <div className="flex flex-grow flex-col bg-black450 mx-4 my-2 px-4 py-2 rounded-lg">
            <div className="text-offWhite text-lg mb-2">
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
              Supply: {Number(assetWithOrders.currentSupply)} / {calculateMax(assetWithOrders.maxSupply)}
            </div>
            <div className="break-all text-offWhite text-sm">
              URI: {assetUri}
            </div>
            <div className="flex flex-wrap my-2">
              {assetWithOrders.tags.map(tag => (
                <div key={tag} className="flex flex-shrink text-offWhite text-sm bg-gray rounded-xl m-1 px-2 py-1 border-2 border-neutral600">
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex flex-shrink my-2">
              <Button
                label="Edit Metadata"
                onClick={() => openUpdateAssetModal(assetWithOrders)}
                enabled={true}
                show={true}
                enabledClassName="bg-opacity-1 text-chartreuse500 border-chartreuse500 border-2 text-sm mr-4 px-6 py-1 rounded-md"
                disabledClassName="bg-opacity-1 text-black200 border-black200 border-2 text-sm mr-4 px-6 py-1 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-grow flex-col bg-black450 mx-4 my-2 px-4 py-2 rounded-lg">
            <div className="text-offWhite text-sm">
              Quantity
            </div>
            <div className="flex text-offWhite text-sm my-2">
              <InputNumber
                value={mintAmountString}
                onChange={(e) => { setMintAmountString(e) }}
                className="bg-black400 focus:outline-none rounded py-1 px-2 mr-2"
                disabled={false}
              />
            </div>
            <div className="flex text-offWhite text-sm my-1">
              <Button
                label="MINT"
                onClick={mint}
                enabled={
                  mintAmount !== undefined &&
                  mintAmount !== null &&
                  mintAmount.gt(BigNumber.from("0")) &&
                  mintAmount.lte(BigNumber.from(assetWithOrders.maxSupply).sub(BigNumber.from(assetWithOrders.currentSupply)))}
                show={!transactionPending}
                enabledClassName="bg-opacity-1 text-chartreuse500 border-chartreuse500 border-2 text-sm mr-4 px-6 py-1 rounded-md"
                disabledClassName="bg-opacity-1 text-black200 border-black200 border-2 text-sm mr-4 px-6 py-1 rounded-md"
              />
              <Loader show={transactionPending} />
            </div>
          </div>
        </div>
      </SlidingPane>
    );
  }
}

export default AssetModal;