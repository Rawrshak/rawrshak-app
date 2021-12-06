import { useEffect, useState } from 'react';
import { useData } from '../data';
import { ContentJson } from "../data/data";
import axios from 'axios';
import Modal from './Modal';
import Button from './Button';
import { InputAddress, InputNumber } from './Input';
import { BigNumber } from '@ethersproject/bignumber';
import { useTransaction } from "../web3/transactions";
import Loader from "./Loader";

function CreateSmartContractModal({
  show,
  setShow
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    systemContracts: { contentFactory }
  } = useData();

  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataApiSecret, setPinataApiSecret] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/");
  const [creator, setCreator] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [tags, setTags] = useState<string[]>([""]);
  const [royaltyAccount, setRoyaltyAccount] = useState<string>("");
  const [royaltyRateString, setRoyaltyRateString] = useState<string>("0");
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [showCreateButton, setShowCreateButton] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [createButtonEnabled, setCreateButtonEnabled] = useState<boolean>(false);

  const [contentJson, setContentJson] = useState<ContentJson>();

  const [royaltyRate, setRoyaltyRate] = useState<BigNumber>(BigNumber.from("0"));
  useEffect(() => {
    setRoyaltyRate(BigNumber.from(Number(royaltyRateString) * 10000));
  }, [royaltyRateString]);

  useEffect(() => {
    const newContentJson: ContentJson = {
      name: name,
      description: description,
      image: imageUri,
      creator: creator,
      owner: owner,
      tags: tags
    }

    setContentJson(newContentJson);
  }, [name, description, imageUri, creator, owner, tags]);

  useEffect(() => {
    if (name !== "" && description !== "" && imageUri !== "" && creator !== "" && owner !== "" && royaltyAccount !== "") {
      setCreateButtonEnabled(true);
    } else {
      setCreateButtonEnabled(false);
    }

  }, [name, description, imageUri, creator, owner, royaltyAccount]);

  useEffect(() => {
    if (transactionPending) {
      setShowCreateButton(false);
      setShowLoader(true);
    } else {
      setShowCreateButton(true);
      setShowLoader(false);
    }
  }, [transactionPending]);

  const createContractSuccess = () => {
    setName("");
    setDescription("");
    setCreator("");
    setOwner("");
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
      .then(function (response) {
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
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <Modal isOpen={show} setIsOpen={setShow}>
      <div>
        <div className="flex text-xl justify-center mb-4">
          Create Content Contract
        </div>
        <div className="grid grid-cols-2">
          <div className="my-3 mr-2 text-right">
            Pinata API Key
          </div>
          <div className="my-2">
            <input value={pinataApiKey} onChange={(e) => { setPinataApiKey(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Pinata API Secret
          </div>
          <div className="my-2">
            <input value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Name
          </div>
          <div className="my-2">
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Description
          </div>
          <div className="my-2">
            <input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="my-2">
            <input value={imageUri} onChange={(e) => { setImageUri(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Creator
          </div>
          <div className="my-2">
            <input value={creator} onChange={(e) => { setCreator(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Owner
          </div>
          <div className="my-2">
            <input value={owner} onChange={(e) => { setOwner(e.target.value) }} type="text" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="my-3 mr-2 text-right">
            Tags
          </div>
          <div className="my-2">
            {tags.map((tag, index) => (
              <div key={index}>
                <input
                  value={tag}
                  onChange={e => setTags([...tags.slice(0, index), e.target.value, ...tags.slice(index + 1, tags.length)])}
                  type="text"
                  className="bg-neutral700 focus:outline-none rounded mb-2 py-1 px-2"
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
            ))}
            <Button
              label="+"
              onClick={() => { setTags(tags.concat([""])) }}
              enabled={true}
              show={true}
              enabledClassName="bg-chartreuse500 text-neutral900 text-xl px-3 rounded-md"
              disabledClassName=""
            />
          </div>
          <div className="my-3 mr-2 text-right">
            Royalty Account Address
          </div>
          <div className="my-2">
            <InputAddress
              value={royaltyAccount}
              onChange={(e) => { setRoyaltyAccount(e) }}
              className="bg-neutral700 focus:outline-none rounded py-1 px-2"
              disabled={false}
            />
          </div>
          <div className="my-3 mr-2 text-right">
            Royalty Rate (%)
          </div>
          <div className="my-2">
            <InputNumber
              value={royaltyRateString}
              onChange={(e) => updateRoyaltyRateString(e)}
              className="bg-neutral700 focus:outline-none rounded py-1 px-2"
              disabled={false}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            label="Create"
            onClick={() => uploadAndDeploy()}
            enabled={createButtonEnabled}
            show={showCreateButton}
            enabledClassName="bg-chartreuse500 text-neutral900 text-xsm mr-4 px-6 py-2 rounded-md"
            disabledClassName="bg-black400 text-black300 text-xsm mr-4 px-6 py-2 rounded-md"
          />
          <Loader show={showLoader} />
        </div>
      </div>
    </Modal >
  );
}

export default CreateSmartContractModal;