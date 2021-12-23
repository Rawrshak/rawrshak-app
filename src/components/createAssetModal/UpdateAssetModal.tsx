import React, { useEffect, useState } from 'react';
import {
  PublicAssetMetadata,
  AudioFileMetadata,
  ImageFileMetadata,
  Static3dObjectFileMetadata,
  TextFileMetadata,
  AudioAssetMetadata,
  ImageAssetMetadata,
  Static3dObjectAssetMetadata,
  TextAssetMetadata,
  Asset
} from "../../data/data";
import axios from 'axios';
import Modal from '../Modal';
import Button from '../Button';
import Loader from '../Loader';
import { ContentManager, Content, Content__factory } from '../../assets/typechain';
import { useTransaction } from "../../web3/transactions";
import { useWeb3 } from '../../web3';
import AssetTypes from './AssetTypes';

function UpdateAssetModal({
  show,
  setShow,
  contentManagerContract,
  asset
}: {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  contentManagerContract: ContentManager | undefined,
  asset: Asset | undefined
}) {
  const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';
  const { signerOrProvider } = useWeb3();

  const [pinataApiKey, setPinataApiKey] = useState<string>("");
  const [pinataApiSecret, setPinataApiSecret] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/");
  const [tags, setTags] = useState<string[]>([""]);
  const [type, setType] = useState<string>("audio");
  const [subtype, setSubtype] = useState<string>("sound-effect");
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
  const [transaction] = useTransaction();
  const [transactionPending, setTransactionPending] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showCreateButton, setShowCreateButton] = useState<boolean>(false);
  const [contentContract, setContentContract] = useState<Content>();
  const [oldAssetUri, setOldAssetUri] = useState<string>();
  const [oldJson, setOldJson] = useState<any>();
  const [enableUpdateButton, setEnableUpdateButton] = useState<boolean>(false);

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

  const [audioFilesMetadata, setAudioFilesMetadata] = useState<AudioFileMetadata[]>(
    [
      {
        name: "",
        engine: "unity",
        compression: "compressed",
        uri: "https://arweave.net/",
        contentType: "wav",
        duration: 0,
        channelCount: 0,
        sampleRate: 0,
      }
    ]
  );
  const [imageFilesMetadata, setImageFilesMetadata] = useState<ImageFileMetadata[]>(
    [
      {
        uri: "https://arweave.net/",
        height: 0,
        width: 0,
        contentType: "png",
      }
    ]
  );
  const [static3dObjectFilesMetadata, setStatic3dObjectFilesMetadata] = useState<Static3dObjectFileMetadata[]>(
    [
      {
        name: "",
        engine: "unity",
        platform: "windows",
        renderPipeline: "brp",
        fidelity: "low",
        shape: "horizontal",
        uri: "https://arweave.net/",
      }
    ]
  );
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
    if (name !== "" && description !== "" && pinataApiKey.length === 20 && pinataApiSecret.length === 64) {
      setEnableUpdateButton(true);
    } else {
      setEnableUpdateButton(false);
    }
  }, [name, description, pinataApiKey.length, pinataApiSecret]);

  useEffect(() => {
    if (asset === undefined || signerOrProvider === undefined) return;

    setContentContract(Content__factory.connect(asset.parentContract, signerOrProvider));
  }, [asset, signerOrProvider]);

  useEffect(() => {
    if (contentContract === undefined || asset === undefined) return;

    contentContract["uri(uint256)"](asset.tokenId)
      .then(uri => {
        setOldAssetUri(uri);
      })
      .catch((error) => console.error(error));
  }, [asset, contentContract]);

  useEffect(() => {
    fetch(urlPrefix + oldAssetUri)
      .then(response => response.json())
      .then(data => {
        setOldJson(data);
      })
      .catch(error => console.error(error));

  }, [oldAssetUri]);

  useEffect(() => {
    if (oldJson === undefined) return;

    setType(oldJson.type);
    setName(oldJson.name);
    setDescription(oldJson.description);
    setImageUri(oldJson.image);
    setTags(oldJson.tags);
    setNsfw(oldJson.nsfw);
    setSubtype(oldJson.subtype);

    if (oldJson.type === "audio") {
      const newAudioFilesMetadata: AudioFileMetadata[] = oldJson.assetProperties.map((audioFileJson: any) => {
        const newAudioFileMetadata: AudioFileMetadata = {
          name: audioFileJson.name,
          engine: audioFileJson.engine,
          compression: audioFileJson.compression,
          uri: audioFileJson.uri,
          contentType: audioFileJson.contentType,
          duration: audioFileJson.duration,
          channelCount: audioFileJson.channelCount,
          sampleRate: audioFileJson.sampleRate,
        }
        return newAudioFileMetadata;
      });

      setAudioFilesMetadata(newAudioFilesMetadata);

    } else if (oldJson.type === "image") {
      const newImageFilesMetadata: ImageFileMetadata[] = oldJson.assetProperties.map((imageFileJson: any) => {
        const newImageFileMetadata: ImageFileMetadata = {
          uri: imageFileJson.uri,
          height: imageFileJson.height,
          width: imageFileJson.width,
          contentType: imageFileJson.contentType,
        }
        return newImageFileMetadata;
      });
      setImageFilesMetadata(newImageFilesMetadata);

    } else if (oldJson.type === "static3dobject") {
      const newStatic3dObjectFilesMetadata: Static3dObjectFileMetadata[] = oldJson.assetProperties.map((static3dObjectFileJson: any) => {
        const newStatic3dObjectFileMetadata: Static3dObjectFileMetadata = {
          name: static3dObjectFileJson.name,
          engine: static3dObjectFileJson.engine,
          platform: static3dObjectFileJson.platform,
          renderPipeline: static3dObjectFileJson.renderPipeline,
          fidelity: static3dObjectFileJson.fidelity,
          shape: static3dObjectFileJson.shape,
          uri: static3dObjectFileJson.uri,
        }
        return newStatic3dObjectFileMetadata;
      });
      setStatic3dObjectFilesMetadata(newStatic3dObjectFilesMetadata);
    } else if (oldJson.type === "text") {
      const newTextFileMetadata: TextFileMetadata = {
        title: oldJson.assetProperties.title,
        description: oldJson.assetProperties.description
      }
      setTextFileMetadata(newTextFileMetadata);
    } else {
      return;
    }
  }, [oldJson]);

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
      tags: tags,
      type: type,
      subtype: subtype,
      nsfw: nsfw,
    }

    setPublicAssetMetadata(newPublicAssetMetadata);
  }, [name, description, imageUri, tags, type, subtype, nsfw]);

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
        if (asset !== undefined && asset.tokenId !== undefined) {
          setTimeout(() => {
            console.log("URI: ", response.data.IpfsHash);

            transaction(() => contentManagerContract.setPublicUriBatch([{
              tokenId: asset?.tokenId,
              uri: response.data.IpfsHash
            }]),
              "Transaction pending",
              "Transaction failed",
              "Transaction succeeded",
              () => setTransactionPending(false),
              () => updateAssetSuccess(),
              () => setTransactionPending(false)
            );

          }, 60000);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const updateAssetSuccess = () => {
    setName("");
    setDescription("");
    setImageUri("");
    setTags([""]);
    setNsfw(false);
    setType("audio");

    setShow(false);
  }

  return (
    <Modal isOpen={show} setIsOpen={setShow} forceOpen={transactionPending}>
      <div className="flex flex-grow flex-col">
        <div className="flex justify-center text-xl mb-4">
          Updating Asset
        </div>
        <div className="flex justify-center text-lg mb-4">
          {asset?.name}
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
            <textarea value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Name
          </div>
          <div className="flex flex-grow col-span-8 my-3 mx-2">
            {name}
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
            <textarea value={imageUri} onChange={(e) => { setImageUri(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
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
            NSFW
          </div>
          <div className="col-span-8 my-2 mt-3">
            <input checked={nsfw} onChange={(e) => { setNsfw(!nsfw) }} type="checkbox" className="bg-neutral700 focus:outline-none rounded py-1 px-2" />
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Asset Type
          </div>
          <div className="col-span-8 mx-1 my-3">
            {type.charAt(0).toUpperCase() + type.slice(1)}
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
          subtypeEditable={false}
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
              label="Update Asset"
              onClick={() => uploadAndDeploy()}
              enabled={enableUpdateButton}
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

export default UpdateAssetModal;