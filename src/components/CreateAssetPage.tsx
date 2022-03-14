import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import { InputAmount } from './Input';
import { BigNumber } from '@ethersproject/bignumber';
import { useTransaction } from "../web3/transactions";
import Loader from "./Loader";
import { useWeb3 } from '../web3';
import { ethers } from 'ethers';
import Hint from '../assets/images/downArrow.png';
import { AudioAssetMetadata, AudioFileMetadata, ImageAssetMetadata, ImageFileMetadata, PublicAssetMetadata, Static3dObjectAssetMetadata, Static3dObjectFileMetadata, TextAssetMetadata, TextFileMetadata } from '../data/data';
import { ContentManager, ContentManager__factory } from '../assets/typechain';
import { useHistory, useParams } from 'react-router-dom';
import AssetTypes from './createAssetModal/AssetTypes';
import { useData } from '../data';

function CreateAssetPage() {
  
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
  const [enableNextButton, setEnableNextButton] = useState<boolean>(false);
  const history = useHistory();
  const { ownedContentWithMetadata } = useData();
  const { collectionID } = useParams<{ collectionID: string }>();
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const [addAssetsStep,setAddAssetsStep] = useState<boolean>(false)
  const [typeOfAsset,setTypeOfAsset] = useState<string>('text')

  //hint variables
  const [hintHide,setHintHide] = useState({
    'apikey' : true,
    'apisecret' : true,
    'name' : true,
    'desc' : true,
    'image_uri' : true,
    'creator' : true,
    'game' : true,
    'tags' : true,
    'max_supply' : true,
    'royalty_address' : true,
    'royalty_rate' : true,
    'nsfw' : true,
    'asset_type' : true,
  })
  //setHintVariables by each click
  const newHideValue = (key:string,newValue:boolean) => {
    let newHide = {
      'apikey' : key === 'apikey' ? newValue : hintHide['apikey'],
      'apisecret' : key === 'apisecret' ? newValue : hintHide['apisecret'],
      'name' : key === 'name' ? newValue : hintHide['name'],
      'desc' : key === 'desc' ? newValue : hintHide['desc'],
      'image_uri' : key === 'image_uri' ? newValue : hintHide['image_uri'],
      'creator' : key === 'creator' ? newValue : hintHide['creator'],
      'game' : key === 'game' ? newValue : hintHide['game'],
      'tags' : key === 'tags' ? newValue : hintHide['tags'],
      'max_supply' : key === 'max_supply' ? newValue : hintHide['max_supply'],
      'royalty_address' : key === 'royalty_address' ? newValue : hintHide['royalty_address'],
      'royalty_rate' : key === 'royalty_rate' ? newValue : hintHide['royalty_rate'],
      'nsfw' : key === 'nsfw' ? newValue : hintHide['nsfw'],
      'asset_type' : key === 'asset_type' ? newValue : hintHide['asset_type'],
    }
    setHintHide(newHide)
  }

  //new asset metadata
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

  //metadata for each asset type
  const [audioAssetMetadata, setAudioAssetMetadata] = useState<AudioAssetMetadata>();
  const [imageAssetMetadata, setImageAssetMetadata] = useState<ImageAssetMetadata>();
  const [static3dObjectAssetMetadata, setStatic3dObjectAssetMetadata] = useState<Static3dObjectAssetMetadata>();
  const [textAssetMetadata, setTextAssetMetadata] = useState<TextAssetMetadata>();

  //new individual metadata within each item of asset by asset type
  const [audioFilesMetadata, setAudioFilesMetadata] = useState<AudioFileMetadata[]>([]);
  const [imageFilesMetadata, setImageFilesMetadata] = useState<ImageFileMetadata[]>([]);
  const [static3dObjectFilesMetadata, setStatic3dObjectFilesMetadata] = useState<Static3dObjectFileMetadata[]>([]);
  const [textFileMetadata, setTextFileMetadata] = useState<TextFileMetadata>(
    {
      title: "",
      description: "",
    }
  );

  //make user wallet reciever address for royalty for asset to be creted
  useEffect(() => {
    if (web3.account === undefined) return;
    setRoyaltyReceiver(web3.account);
  }, [web3.account]);

  //royalty value for asset
  const [royaltyRateString, setRoyaltyRateString] = useState<string>("0");
  const updateRoyaltyRateString = (royaltyRateString: string) => {
    if (Number(royaltyRateString) > 100) {
      royaltyRateString = "100";
    }
    setRoyaltyRateString(royaltyRateString);
  }

  //set data for image asset to be created
  const setImageData = (imageUri: string) => {
    setImageUri(imageUri);
    if (useDefaultImage) {
        setUseDefaultImage(false);
    }
  }
  
  //set asset type
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
    setTypeOfAsset(assetType)
  }

  //enable the create button hen all required fields are set properly
  useEffect(() => {
    if (
        name !== "" && 
        description !== "" &&
        pinataApiKey.length === 20 &&
        pinataApiSecret.length === 64 &&
        (ethers.utils.isAddress(royaltyReceiver) || royaltyReceiver === "")
        ) {
          if (
            audioFilesMetadata.length > 0 ||
            imageFilesMetadata.length > 0 || 
            static3dObjectFilesMetadata.length > 0 ||
            (
                textFileMetadata.title !== "" &&
                textFileMetadata.description !== ""
            )
          ) {
            setEnableCreateButton(true);
            setEnableNextButton(true)
          } else {
            setEnableNextButton(true);
          }
    } else {
      setEnableCreateButton(false);
    }
  }, [audioFilesMetadata.length, description, imageFilesMetadata.length, name, pinataApiKey.length, pinataApiSecret.length, royaltyReceiver, static3dObjectFilesMetadata.length, textFileMetadata.description, textFileMetadata.title]);

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

  /*
  //log what's in the json of the asset 
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
    //console.log("JSON to pin: ", jsonToPin);

  }, [type, audioAssetMetadata, imageAssetMetadata, static3dObjectAssetMetadata, textAssetMetadata]);
    */


  const { signerOrProvider } = useWeb3();
  const [activeContentManagerContract, setActiveContentManagerContract] = useState<ContentManager>();


  useEffect(() => {
    if (ownedContentWithMetadata === undefined) return
    let activeContent = ownedContentWithMetadata.find(content => content.id === collectionID)
    if (activeContent === undefined || signerOrProvider === undefined) {
      console.log('Cannot find content/collection to post to')
      return
    }
    setActiveContentManagerContract(ContentManager__factory.connect(activeContent.managerAddress, signerOrProvider))
  }, [collectionID, ownedContentWithMetadata, signerOrProvider]);

  const uploadAndDeploy = async () => {
    
    if (activeContentManagerContract === undefined || collectionID === undefined || collectionID === '') {
      return
    } else {
      if (activeContentManagerContract === undefined) return;

      setTransactionPending(true);

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

      //console.log("json to pin: ", jsonToPin);

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
            transaction(() => activeContentManagerContract.addAssetBatch([{
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
    }
  };

  const createAssetSuccess = () => {
    history.push('/collection/'.concat(collectionID))
  }

  if (!addAssetsStep) {
    return (
      <div className="flex flex-col text-offWhite mt-5">
        <div className="flex flex-grow justify-center text-xl mb-4">
          Create Asset
        </div>
        <div className="grid flex-grow grid-cols-12">
          <div className="col-span-4 my-3 mr-2 text-right">
            Pinata API Key
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={pinataApiKey} onChange={(e) => { setPinataApiKey(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('apikey',!hintHide['apikey'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['apikey'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert the Pinata Key here. You should have recieved it during the creation of your pinata account.</div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Pinata API Secret
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} type="password" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('apisecret',!hintHide['apisecret'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['apisecret'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert the Pinata API Secret here. You should have recieved it during the creation of your pinata account.</div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Name
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('name',!hintHide['name'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['name'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert what you want to name your asset.</div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Description
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('desc',!hintHide['desc'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['desc'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert a description of the asset.</div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={imageUri} onChange={(e) => { setImageData(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('image_uri',!hintHide['image_uri'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['image_uri'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert the image uri for the asset.</div>
            </div>
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
              <div key={index} className="flex flex-grow flex-row col-span-8 col-start-5">
                <input data-tip data-for="registerTip" 
                  value={tag}
                  onChange={e => setTags([...tags.slice(0, index), e.target.value, ...tags.slice(index + 1, tags.length)])}
                  type="text"
                  className="flex flex-grow bg-neutral700 focus:outline-none rounded mb-1 mt-2 py-1 px-2"
                />
                {
                  tags.length >= 1 
                    ? 
                      index !== 0
                        ?
                          <Button
                            key={index}
                            label="X"
                            onClick={() => { 
                              setTags([...tags.slice(0, index), ...tags.slice(index + 1, tags.length)]) 
                            }}
                            enabled={true}
                            show={true}
                            enabledClassName="ml-2 text-chartreuse500"
                            disabledClassName=""
                          />
                        :
                          <div 
                            key={index}
                            className='content-center h-full grid' 
                            onClick={()=>newHideValue('tags',!hintHide['tags'])}
                          >
                            <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
                          </div>
                            
                    :
                      <div 
                        key={index}
                        className='content-center h-full grid' onClick={()=>newHideValue('tags',!hintHide['tags'])}>
                        <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
                      </div>
                }
                
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
          <div className='col-span-12'>
            <div className={'grid grid-cols-12 col-span-12'   + (hintHide['tags'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-4 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-8 my-2 col-start-5">
                <div>Insert a tag for the asset. You may add multiple.</div>
              </div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Max Supply
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input 
              value={maxSupply.toString()} 
              onChange={(e) => { setMaxSupply(BigNumber.from(e.target.value === '' ? '0' : e.target.value)) }} 
              type="text" 
              className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" 
            />
            <div className='content-center h-full grid' onClick={()=>newHideValue('max_supply',!hintHide['max_supply'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['max_supply'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert the maximum number for this asset to be minted.</div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            Royalty Receiver Address
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <textarea value={royaltyReceiver} onChange={(e) => { setRoyaltyReceiver(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('royalty_address',!hintHide['royalty_address'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['royalty_address'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert the address for the royalties for this asset to be directed to.</div>
            </div>
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
            <div className='content-center h-full grid' onClick={()=>newHideValue('royalty_rate',!hintHide['royalty_rate'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['royalty_rate'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Insert the royalties rate for each sale of this asset.</div>
            </div>
          </div>
          <div className="col-span-4 my-3 mr-2 text-right">
            NSFW
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <input checked={nsfw} onChange={(e) => { setNsfw(!nsfw) }} type="checkbox" className="self-center bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('nsfw',!hintHide['nsfw'])}>
              <img src={Hint} alt='hint_icon' className='ml-1 w-5 h-5'/>
            </div>
          </div>
          <div className={'grid grid-cols-12 col-span-12'   + (hintHide['nsfw'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2 col-start-5">
              <div>Check if this asset if NSFW!.</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-10">
          {showStatusMessage && <div className="flex justify-center text-offWhite">
            {statusMessage}
          </div>}
          <div className="flex justify-center">
            <Button
              label="Back"
              onClick={() => history.goBack()}
              enabled={true}
              show={true}
              enabledClassName="mx-2 flex bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-30 justify-center"
              disabledClassName="mx-2 flex bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-30 justify-center"
            />
            <Button
              label="Next"
              onClick={() => setAddAssetsStep(true)}
              enabled={enableNextButton}
              show={true}
              enabledClassName="mx-2 flex bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-30 justify-center"
              disabledClassName="mx-2 flex bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-30 justify-center"
            />
          </div>
          <Loader show={showLoader} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col text-offWhite">
        <div className="grid flex-grow grid-cols-12">
          <div className="col-span-4 my-3 mr-2 text-right">
            Asset Type
          </div>
          <div className="flex flex-grow col-span-8 my-2">
            <select 
              value = {typeOfAsset}
              onChange={(e) => setAssetType(e.target.value)} name="assetType" className="bg-neutral700 focus:outline-none rounded py-1 px-2">
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
            <div className='content-center h-full grid' onClick={()=>newHideValue('asset_type',!hintHide['asset_type'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className={'grid flex-grow grid-cols-12 col-span-12'   + (hintHide['asset_type'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
            <div className="col-span-4 my-2 mr-2 text-right">
              <div className='w-full'>
                Hint:
              </div>
            </div>
            <div className="col-span-8 my-2">
              <div>Insert the the type of asset. Check out the Rawrshak documentation if you aren't sure!.</div>
            </div>
          </div>
        </div>
        <div className='grid flex-grow grid-cols-3 col-span-12'>
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
            isModal={false}
          />
        </div>
        <div className="flex flex-col justify-center mt-12">
          {
          showStatusMessage && <div className="flex justify-center text-offWhite">
              {statusMessage}
            </div>
          }
          <div className="flex justify-center">
            <Button
              label="Back"
              onClick={() => setAddAssetsStep(false)}
              enabled={enableNextButton}
              show={showCreateButton}
              enabledClassName="mx-2 flex bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-30 justify-center"
              disabledClassName="mx-2 flex bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-30 justify-center"
            />
            <Button
              label="Create Asset"
              onClick={() => uploadAndDeploy()}
              enabled={enableCreateButton}
              show={showCreateButton}
              enabledClassName="mx-2 flex bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-30 justify-center"
              disabledClassName="mx-2 flex bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-30 justify-center"
            />
          </div>
          <div className="flex text-orange mt-2 text-base">
            IMPORTANT: Uploading IPFS Metadata is not deterministic. We will take 60 seconds to try to propagate the data so it takes a few minutes for the asset to get created. Please be patient. The subgraph may also fail to download and read the data. In this case, select and edit the asset to re-trigger the subgraph to attempt to read the metadata.
          </div>
          <Loader show={showLoader} />
        </div>
      </div>
    )
  }
}

export default CreateAssetPage;