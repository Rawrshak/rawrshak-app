import React, { useEffect, useState } from 'react';
import { BigNumber, ethers } from "ethers";
import {
  PublicAssetMetadata,
  AudioFileMetadata,
  ImageFileMetadata,
  Static3dObjectFileMetadata,
  TextFileMetadata,
  AudioAssetMetadata,
  ImageAssetMetadata,
  Static3dObjectAssetMetadata,
  TextAssetMetadata
} from "../../data/data";
import axios from 'axios';
import Modal from '../Modal';
import Button from '../Button';
import Loader from '../Loader';
import { InputAmount } from '../Input';
import { ContentManager } from '../../assets/typechain';
import { useTransaction } from "../../web3/transactions";
import AssetTypes from './AssetTypes';
import { useWeb3 } from '../../web3';

function CreateAssetModal({
  show,
  setShow,
  contentManagerContract
}: {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  contentManagerContract: ContentManager | undefined
}) {
  const web3 = useWeb3();

  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataApiSecret, setPinataApiSecret] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/TsBCV3HyMssIZQk0S7MqZht_zR3e9pBXDWUo0VYAXW4");
  const [useDefaultImage, setUseDefaultImage] = useState<boolean>(true);
  const [tags, setTags] = useState<string[]>([""]);
  const [type, setType] = useState<string>("text");
  const [subtype, setSubtype] = useState<string>("title");
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [maxSupply, setMaxSupply] = useState<BigNumber>(BigNumber.from("0"));
  const [royaltyReceiver, setRoyaltyReceiver] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showCreateButton, setShowCreateButton] = useState<boolean>(false);
  const [enableCreateButton, setEnableCreateButton] = useState<boolean>(false);

  const [publicAssetMetadata, setPublicAssetMetadata] = useState<PublicAssetMetadata>(
    {
      name: "",
      description: "",
      image: "",
      tags: [""],
      type: "",
      subtype: "",
      nsfw: false,
    }
  );

  const [audioFilesMetadata, setAudioFilesMetadata] = useState<AudioFileMetadata[]>([]);
  const [imageFilesMetadata, setImageFilesMetadata] = useState<ImageFileMetadata[]>([]);
  const [static3dObjectFilesMetadata, setStatic3dObjectFilesMetadata] = useState<Static3dObjectFileMetadata[]>([]);
  const [textFileMetadata, setTextFileMetadata] = useState<TextFileMetadata>(
    {
      title: "",
      description: "",
    }
  );

  const [audioAssetMetadata, setAudioAssetMetadata] = useState<AudioAssetMetadata>();
  const [imageAssetMetadata, setImageAssetMetadata] = useState<ImageAssetMetadata>();
  const [static3dObjectAssetMetadata, setStatic3dObjectAssetMetadata] = useState<Static3dObjectAssetMetadata>();
  const [textAssetMetadata, setTextAssetMetadata] = useState<TextAssetMetadata>();

  useEffect(() => {
    if (web3.account === undefined) return;

    setRoyaltyReceiver(web3.account);
  }, [web3.account]);

  const [royaltyRateString, setRoyaltyRateString] = useState<string>("0");
  const updateRoyaltyRateString = (royaltyRateString: string) => {
    if (Number(royaltyRateString) > 100) {
      royaltyRateString = "100";
    }
    setRoyaltyRateString(royaltyRateString);
  }

  const setImageData = (imageUri: string) => {
    setImageUri(imageUri);
    if (useDefaultImage) {
        setUseDefaultImage(false);
    }
  }
  
  const setAssetType = (assetType: string) => {
    setType(assetType);
    if (useDefaultImage) {
      if (assetType === "audio") {
        setImageUri("https://arweave.net/eAnYl_kEpDtYQA8240b0naau5PP4czOFP1qGg4zazQQ");
      } else if (assetType === "image") {
        setImageUri("https://arweave.net/2BmDysofcccaTUbjKJHgr9_0ImlFadE00yAS_3E9M00");
      } else if (assetType === "static3dobject") {
        setImageUri("https://arweave.net/5jpY4ouIl9EXqyep6z0p0S_6nt87DEfsnsxefAa9cOE");
      } else {
        setImageUri("https://arweave.net/TsBCV3HyMssIZQk0S7MqZht_zR3e9pBXDWUo0VYAXW4");
      }
    }
  }

  useEffect(() => {
    if (
        name !== "" && 
        description !== "" &&
        pinataApiKey.length === 20 &&
        pinataApiSecret.length === 64 &&
        (ethers.utils.isAddress(royaltyReceiver) || royaltyReceiver === "") && 
        (
            audioFilesMetadata.length > 0 ||
            imageFilesMetadata.length > 0 || 
            static3dObjectFilesMetadata.length > 0 ||
            (
                textFileMetadata.title !== "" &&
                textFileMetadata.description !== ""
            )
        )
        ) {
      setEnableCreateButton(true);
    } else {
      setEnableCreateButton(false);
    }
  }, [name, description, royaltyReceiver, pinataApiKey.length, pinataApiSecret, audioFilesMetadata, imageFilesMetadata, static3dObjectFilesMetadata, textFileMetadata]);

  useEffect(() => {
    if (transactionPending) {
      setShowCreateButton(false);
      setShowLoader(true);
      setShowStatusMessage(true);
      setStatusMessage("Pinning and propagating JSON to IPFS will take 60 seconds");
      setShowStatusMessage(true);
    } else {
      setShowCreateButton(true);
      setShowLoader(false);
      setStatusMessage("");
      setShowStatusMessage(false);
    }
  }, [transactionPending]);

  const [royaltyRate, setRoyaltyRate] = useState<BigNumber>(BigNumber.from("0"));
  useEffect(() => {
    setRoyaltyRate(BigNumber.from(Number(royaltyRateString) * 10000));
  }, [royaltyRateString]);

  useEffect(() => {
    const newAudioAssetMetadata: AudioAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subtype: publicAssetMetadata.subtype,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: audioFilesMetadata
    }

    setAudioAssetMetadata(newAudioAssetMetadata);
  }, [publicAssetMetadata, audioFilesMetadata]);

  useEffect(() => {
    const newImageAssetMetadata: ImageAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subtype: publicAssetMetadata.subtype,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: imageFilesMetadata
    }

    setImageAssetMetadata(newImageAssetMetadata);
  }, [publicAssetMetadata, imageFilesMetadata]);

  useEffect(() => {
    const newStatic3dObjectAssetMetadata: Static3dObjectAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subtype: publicAssetMetadata.subtype,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: static3dObjectFilesMetadata
    }

    setStatic3dObjectAssetMetadata(newStatic3dObjectAssetMetadata);
  }, [publicAssetMetadata, static3dObjectFilesMetadata]);

  useEffect(() => {
    const newTextAssetMetadata: TextAssetMetadata = {
      name: publicAssetMetadata.name,
      description: publicAssetMetadata.description,
      image: publicAssetMetadata.image,
      tags: publicAssetMetadata.tags,
      type: publicAssetMetadata.type,
      subtype: publicAssetMetadata.subtype,
      nsfw: publicAssetMetadata.nsfw,
      assetProperties: textFileMetadata
    }

    setTextAssetMetadata(newTextAssetMetadata);
  }, [publicAssetMetadata, textFileMetadata]);

  useEffect(() => {
    const newPublicAssetMetadata: PublicAssetMetadata = {
      name: name,
      description: description,
      image: imageUri,
      tags: tags.filter( element => element ),
      type: type,
      subtype: subtype,
      nsfw: nsfw,
    }

    setPublicAssetMetadata(newPublicAssetMetadata);
  }, [name, description, imageUri, tags, type, subtype, nsfw]);

  useEffect(() => {
    if (type === "audio") {
      setSubtype("sound-effect");
    } else if (type === "image") {
      setSubtype("square");
    } else if (type === "static3dobject") {
      setSubtype("trophy");
    } else {
      setSubtype("title");
    }
  }, [type]);

  useEffect(() => {
    let jsonToPin;

    if (type === "audio") {
      jsonToPin = audioAssetMetadata;
    } else if (type === "image") {
      jsonToPin = imageAssetMetadata;
    } else if (type === "static3dobject") {
      jsonToPin = static3dObjectAssetMetadata;
    } else {
      jsonToPin = textAssetMetadata;
    }

    console.log("JSON to pin: ", jsonToPin);

  }, [type, audioAssetMetadata, imageAssetMetadata, static3dObjectAssetMetadata, textAssetMetadata]);

  const uploadAndDeploy = async () => {
    if (contentManagerContract === undefined) return;

    setTransactionPending(true);

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    let jsonToPin;

    if (type === "audio") {
      jsonToPin = audioAssetMetadata;
    } else if (type === "image") {
      jsonToPin = imageAssetMetadata;
    } else if (type === "static3dobject") {
      jsonToPin = static3dObjectAssetMetadata;
    } else {
      jsonToPin = textAssetMetadata;
    }

    console.log("json to pin: ", jsonToPin);

    axios
      .post(url, jsonToPin, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataApiSecret
        }
      })
      .then(response => {
        setTimeout(() => {
          console.log("URI: ", response.data.IpfsHash);
          const hiddenDataUri: string = "";
          const receiver = ethers.utils.isAddress(royaltyReceiver) ? royaltyReceiver : ethers.constants.AddressZero;
          transaction(() => contentManagerContract.addAssetBatch([{
            publicDataUri: response.data.IpfsHash,
            hiddenDataUri: hiddenDataUri,
            maxSupply: maxSupply,
            royaltyReceiver: receiver,
            royaltyRate: royaltyRate
          }]),
            "Transaction pending",
            "Transaction failed",
            "Transaction succeeded",
            () => setTransactionPending(false),
            () => createAssetSuccess(),
            () => setTransactionPending(false)
          );
        }, 60000);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const createAssetSuccess = () => {
    setName("");
    setDescription("");
    setImageUri("");
    setUseDefaultImage(true);
    setTags([""]);
    setMaxSupply(BigNumber.from("0"));
    setRoyaltyReceiver("");
    setRoyaltyRateString("0");
    setNsfw(false);
    setType("text");

    setShow(false);
  }

  return (
    <Modal isOpen={show} setIsOpen={setShow} forceOpen={transactionPending}>
      <div className="flex flex-col">
        <div className="flex flex-grow justify-center text-xl mb-4">
          Create Asset
        </div>
        <div className="grid flex-grow grid-cols-12">
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
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={imageUri} onChange={(e) => { setImageData(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
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
            Max Supply
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={maxSupply?.toString()} onChange={(e) => { setMaxSupply(BigNumber.from(e.target.value)) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Receiver Address
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={royaltyReceiver} onChange={(e) => { setRoyaltyReceiver(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
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
          <div className="col-span-4 my-3 mr-2 text-right">
            NSFW
          </div>
          <div className="col-span-8 my-2 mt-3">
            <input checked={nsfw} onChange={(e) => { setNsfw(!nsfw) }} type="checkbox" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Asset Type
          </div>
          <div className="col-span-8 my-2">
            <select onChange={(e) => setAssetType(e.target.value)} name="assetType" className="bg-neutral700 focus:outline-none rounded py-1 px-2">
              <option value="text">
                Text
              </option>
              <option value="audio">
                Audio
              </option>
              <option value="image">
                Image
              </option>
              <option value="static3dobject">
                Static 3D Object
              </option>
            </select>
          </div>
        </div>
        <AssetTypes
          assetType={type}
          audioFilesMetadata={audioFilesMetadata}
          imageFilesMetadata={imageFilesMetadata}
          static3dObjectFilesMetadata={static3dObjectFilesMetadata}
          textFileMetadata={textFileMetadata}
          subtype={subtype}
          setSubtype={setSubtype}
          subtypeEditable={true}
          setAudioFilesMetadata={setAudioFilesMetadata}
          setImageFilesMetadata={setImageFilesMetadata}
          setStatic3dObjectFilesMetadata={setStatic3dObjectFilesMetadata}
          setTextFileMetadata={setTextFileMetadata}
        />
        <div className="flex flex-col justify-center mt-10">
          {showStatusMessage && <div className="flex justify-center text-offWhite">
            {statusMessage}
          </div>}
          <div className="flex justify-center">
            <Button
              label="Create Asset"
              onClick={() => uploadAndDeploy()}
              enabled={enableCreateButton}
              show={showCreateButton}
              enabledClassName="flex bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-30 justify-center"
              disabledClassName="flex bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-30 justify-center"
            />
          </div>
          <Loader show={showLoader} />
        </div>
      </div>
    </Modal >
  );
}

export default CreateAssetModal;