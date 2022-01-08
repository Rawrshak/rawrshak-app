import { useEffect, useState } from 'react';
import { useData } from '../data';
import { ContentJson } from "../data/data";
import axios from 'axios';
import Modal from './Modal';
import Button from './Button';
import { InputAmount } from './Input';
import { BigNumber } from '@ethersproject/bignumber';
import { useTransaction } from "../web3/transactions";
import Loader from "./Loader";
import { useWeb3 } from '../web3';

function CreateSmartContractModal({
  show,
  setShow
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { systemContracts: { contentFactory } } = useData();
  const web3 = useWeb3();

  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataApiSecret, setPinataApiSecret] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/");
  const [creator, setCreator] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [tags, setTags] = useState<string[]>([""]);
  const [royaltyAccount, setRoyaltyAccount] = useState<string>("");
  const [royaltyRateString, setRoyaltyRateString] = useState<string>("0");
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [showCreateButton, setShowCreateButton] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [createButtonEnabled, setCreateButtonEnabled] = useState<boolean>(false);
  const [contentJson, setContentJson] = useState<ContentJson>();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);

  useEffect(() => {
    if (web3.account === undefined) return;

    setRoyaltyAccount(web3.account);
  }, [web3.account]);

  const [royaltyRate, setRoyaltyRate] = useState<BigNumber>(BigNumber.from("0"));
  useEffect(() => {
    setRoyaltyRate(BigNumber.from(Number(royaltyRateString) * 10000));
  }, [royaltyRateString]);

  useEffect(() => {
    const newContentJson: ContentJson = {
      name: name,
      description: description,
      image: imageUri,
      game: game,
      creator: creator,
      tags: tags.filter( element => element )
    }

    setContentJson(newContentJson);
  }, [name, description, imageUri, creator, game, tags]);

  useEffect(() => {
    if (name !== "" && description !== "" && imageUri !== "" && creator !== "" && royaltyAccount !== "" && pinataApiKey.length === 20 && pinataApiSecret.length === 64) {
      setCreateButtonEnabled(true);
    } else {
      setCreateButtonEnabled(false);
    }

  }, [name, description, imageUri, creator, game, royaltyAccount, pinataApiKey, pinataApiSecret]);

  useEffect(() => {
    if (transactionPending) {
      setShowCreateButton(false);
      setShowLoader(true);
      setShowStatusMessage(true);
      setStatusMessage("Pinning and propagating JSON to IPFS");
      setShowStatusMessage(true);
    } else {
      setShowCreateButton(true);
      setShowLoader(false);
      setStatusMessage("");
      setShowStatusMessage(false);
    }
  }, [transactionPending]);

  const createContractSuccess = () => {
    setName("");
    setDescription("");
    setCreator("");
    setGame("");
    setTags([""]);
    setRoyaltyAccount("");
    setRoyaltyRateString("0");

    setShow(false);
  }

  const updateRoyaltyRateString = (royaltyRateString: string) => {
    if (Number(royaltyRateString) > 100) {
      royaltyRateString = "100";
    }

    setRoyaltyRateString(royaltyRateString);
  }

  const uploadAndDeploy = () => {
    if (contentFactory === undefined) return;

    setTransactionPending(true);

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    axios
      .post(url, contentJson, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret
        }
      })
      .then(response => {
        setTimeout(() => {
          setShowStatusMessage(false);
          setStatusMessage("");
          transaction(() => contentFactory.createContracts(
            royaltyAccount,
            royaltyRate,
            response.data.IpfsHash,
          ),
            "Transaction pending",
            "Transaction failed",
            "Transaction succeeded",
            () => setTransactionPending(false),
            () => createContractSuccess(),
            () => setTransactionPending(false)
          );
        }, 60000);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <Modal isOpen={show} setIsOpen={setShow} forceOpen={transactionPending}>
      <div className="flex flex-col">
        <div className="flex text-xl justify-center mb-4">
          Create Content Contract
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4 my-3 mr-2 text-right">
            Pinata API Key
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={pinataApiKey} onChange={(e) => { setPinataApiKey(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Pinata API Secret
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} type="password" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Name
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Description
          </div>
          <div className="flex flex-grow col-span-8 my-2 h-14">
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={imageUri} onChange={(e) => { setImageUri(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Creator
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={creator} onChange={(e) => { setCreator(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Game
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={game} onChange={(e) => { setGame(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 mt-3 mr-2 text-right">
            Tags
          </div>
          {tags.map((tag, index) => {
            let tagInputJsx = [];
            if (index > 0) {
              tagInputJsx.push(
                <div className="col-span-4" />
              );
            }
            tagInputJsx.push(
              <div key={index} className="flex flex-grow flex-row col-span-8">
                <input
                  value={tag}
                  onChange={e => setTags([...tags.slice(0, index), e.target.value, ...tags.slice(index + 1, tags.length)])}
                  type="text"
                  className="flex flex-grow bg-neutral700 focus:outline-none rounded mb-1 mt-2 py-1 px-2"
                />
                <Button
                  label="X"
                  onClick={() => { setTags([...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]) }}
                  enabled={true}
                  show={true}
                  enabledClassName="ml-2 text-chartreuse500"
                  disabledClassName=""
                />
              </div>
            );
            return (tagInputJsx);
          }
          )}
          <div className="col-span-4" />
          <div className="col-span-8 mt-1 mb-2">
            <Button
              label="+"
              onClick={() => { setTags(tags.concat([""])) }}
              enabled={true}
              show={true}
              enabledClassName="flex bg-chartreuse500 text-neutral900 text-xl px-3 rounded-md"
              disabledClassName=""
            />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Account Address
          </div>
          <div className="col-span-8 flex flex-grow my-2">
            <textarea value={royaltyAccount} onChange={(e) => { setRoyaltyAccount(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Rate (%)
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <InputAmount
              value={royaltyRateString}
              decimals={2}
              onChange={(e) => updateRoyaltyRateString(e)}
              className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2"
              disabled={false}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center mt-4">
          {showStatusMessage && <div className="flex justify-center text-offWhite">
            {statusMessage}
          </div>}
          <div className="flex justify-center">
            <Button
              label="Create"
              onClick={() => uploadAndDeploy()}
              enabled={createButtonEnabled}
              show={showCreateButton}
              enabledClassName="flex justify-center bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-24"
              disabledClassName="flex justify-center bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-24"
            />
          </div>
          <Loader show={showLoader} />
        </div>
      </div>
    </Modal >
  );
}

export default CreateSmartContractModal;