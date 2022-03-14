import { useEffect, useState } from 'react';
import { useData } from '../data';
import { ContentJson } from "../data/data";
import axios from 'axios';
import Button from './Button';
import { InputAmount } from './Input';
import { BigNumber } from '@ethersproject/bignumber';
import { useTransaction } from "../web3/transactions";
import Loader from "./Loader";
import { useWeb3 } from '../web3';
import { ethers } from 'ethers';
import Hint from '../assets/images/downArrow.png';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function CreateCollectionPage() {
  
  const { systemContracts: { contentFactory } } = useData();
  const web3 = useWeb3();

  const [pinataApiKey, setPinataApiKey] = useState<string>('');
  const [pinataApiSecret, setPinataApiSecret] = useState<string>('');
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("https://arweave.net/dI_5bBKqfDwLUHhQXu_ubnnBi5f3DcpHQ_oHmIky1QU");
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
  const history = useHistory();

  
  const [hintHide,setHintHide] = useState({
    'apikey' : true,
    'apisecret' : true,
    'name' : true,
    'desc' : true,
    'image_uri' : true,
    'creator' : true,
    'game' : true,
    'tags' : true,
    'image_tagsuri' : true,
    'royalty_address' : true,
    'royalty_rate' : true,
  })

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
      'image_tagsuri' : key === 'image_tagsuri' ? newValue : hintHide['image_tagsuri'],
      'royalty_address' : key === 'royalty_address' ? newValue : hintHide['royalty_address'],
      'royalty_rate' : key === 'royalty_rate' ? newValue : hintHide['royalty_rate'],
    }
    setHintHide(newHide)
  }

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
    if (name !== "" && description !== "" && imageUri !== "" && creator !== "" && ethers.utils.isAddress(royaltyAccount) && royaltyAccount !== ethers.constants.AddressZero && pinataApiKey.length === 20 && pinataApiSecret.length === 64) {
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
      setStatusMessage("Pinning and propagating JSON to IPFS will take 60 seconds");
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
    setImageUri("https://arweave.net/dI_5bBKqfDwLUHhQXu_ubnnBi5f3DcpHQ_oHmIky1QU");
    setCreator("");
    setGame("");
    setTags([""]);
    setRoyaltyAccount("");
    setRoyaltyRateString("0");
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
          history.push('/store/')
        }, 60000);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="flex flex-col text-offWhite mt-5">
      <ReactTooltip id='registerTip' place="right" effect="float">
        Click the lightbulb to show/hide helpful tips about the input fields!
      </ReactTooltip>
        <div className="flex text-xl justify-center mb-4">
          Create Content Contract
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-3 my-3 mr-2 text-right">
            Pinata API Key: 
          </div>
          <div className="flex flex-grow col-span-6 my-2">
            <input data-tip data-for="registerTip" value={pinataApiKey} onChange={(e) => { setPinataApiKey(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('apikey',!hintHide['apikey'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['apikey'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the Pinata Key here. You should have recieved it during the creation of your pinata account.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right ">
            Pinata API Secret
          </div>
          <div className="flex flex-grow col-span-6 my-2">
            <input data-tip data-for="registerTip" value={pinataApiSecret} onChange={(e) => { setPinataApiSecret(e.target.value) }} type="password" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('apisecret',!hintHide['apisecret'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['apisecret'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the Pinata API Secret here. You should have recieved it during the creation of your pinata account.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right">
            Name
          </div>
          <div className="flex flex-grow col-span-6 my-2">
            <input data-tip data-for="registerTip" value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('name',!hintHide['name'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['name'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the name of your collection. This cannot be changed later!</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right">
            Description
          </div>
          <div className="flex flex-grow col-span-6 my-2 h-14">
            <textarea data-tip data-for="registerTip" value={description} onChange={(e) => { setDescription(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('desc',!hintHide['desc'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['desc'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert a description of the collection.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right">
            Image URI
          </div>
          <div className="flex flex-grow col-span-6 my-2">
            <input data-tip data-for="registerTip" value={imageUri} onChange={(e) => { setImageUri(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('image_uri',!hintHide['image_uri'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['image_uri'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the image uri for the collection.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right">
            Creator
          </div>
          <div className="flex flex-grow col-span-6 my-2">
            <input data-tip data-for="registerTip" value={creator} onChange={(e) => { setCreator(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('creator',!hintHide['creator'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['creator'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the creator of this collection.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right">
            Game
          </div>
          <div className="flex flex-grow col-span-6 my-2">
            <input data-tip data-for="registerTip" value={game} onChange={(e) => { setGame(e.target.value) }} type="text" className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('game',!hintHide['game'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['game'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the game that this collection is meant for.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 mt-3 mr-2 text-right">
            Tags
          </div>
          {tags.map((tag, index) => {
            let tagInputJsx = [];
            if (index > 0) {
              tagInputJsx.push(
                <div className="col-span-6" />
              );
            }
            tagInputJsx.push(
              <div key={index} className="flex flex-grow flex-row col-span-6 col-start-4">
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
                          <div className='content-center h-full grid' onClick={()=>newHideValue('tags',!hintHide['tags'])}>
                            <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
                          </div>
                            
                    :
                      <div className='content-center h-full grid' onClick={()=>newHideValue('tags',!hintHide['tags'])}>
                        <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
                      </div>
                }
                
              </div>
            );
            return (tagInputJsx);
          }
          )}
          <div className="col-span-3" />
          <div className="col-span-6 mt-1 mb-2">
            <Button
              label="+"
              onClick={() => { setTags(tags.concat([""])) }}
              enabled={true}
              show={true}
              enabledClassName="bg-chartreuse500 text-neutral900 text-xl px-3 rounded-md"
              disabledClassName=""
            /> Press to add another Tag!
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['tags'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert a tag for the collection. You may add more than one.</div>
              </div>
            </div>
          </div>
          <div className="col-span-3 my-3 mr-2 text-right">
            Royalty Account Address
          </div>
          <div className="col-span-6 flex flex-grow my-2">
            <textarea data-tip data-for="registerTip" value={royaltyAccount} onChange={(e) => { setRoyaltyAccount(e.target.value) }} className="flex flex-grow bg-neutral700 focus:outline-none rounded py-1 px-2 h-14" />
            <div className='content-center h-full grid' onClick={()=>newHideValue('royalty_address',!hintHide['royalty_address'])}>
              <img src={Hint} alt='hint_icon' className='w-5 h-5'/>
            </div>
          </div>
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['royalty_address'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the address for the royalties for this collection to be directed to.</div>
              </div>
            </div>
          </div>
          
          <div className="col-span-3 my-3 mr-2 text-right">
            Royalty Rate (%)
          </div>
          <div data-tip data-for="registerTip"  className="flex flex-grow col-span-6 my-2">
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
          <div className='col-span-10'>
            <div className={'grid grid-cols-10 col-span-10'   + (hintHide['royalty_rate'] ? ' hiddenDesc' : ' nonHiddenDesc')}>
              <div className="col-span-3 my-2 mr-2 text-right">
                <div className='w-full'>
                  Hint:
                </div>
              </div>
              <div className="col-span-6 my-2 col-start-4">
                <div>Insert the royalties rate for sales of assets for this collection.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center mt-4">
          {showStatusMessage && <div className="flex justify-center text-offWhite">
            {statusMessage}
          </div>}
          <div className="flex justify-center">
            <Button
              label="Back"
              enabled={true}
              show={true}
              onClick={() => history.push('/create')}
              enabledClassName="flex justify-center bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-24 mx-2"
              disabledClassName="flex justify-center bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-24 mx-2"
            />
            <Button
              label="Create"
              onClick={() => uploadAndDeploy()}
              enabled={createButtonEnabled}
              show={showCreateButton}
              enabledClassName="flex justify-center bg-chartreuse500 text-neutral900 text-xsm px-6 py-2 rounded-md w-24 mx-2"
              disabledClassName="flex justify-center bg-black400 text-black300 text-xsm px-6 py-2 rounded-md w-24 mx-2"
            />
          </div>
          <div className="flex justify-center text-offWhite">
            <div className="text-xl text-orange">
              IMPORTANT: Creating a new smart contract can take a few minutes.
            </div>
          </div>
          <Loader show={showLoader} />
        </div>
      </div>
  )
}

export default CreateCollectionPage;