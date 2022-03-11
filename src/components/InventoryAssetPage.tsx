import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssetWithOrders } from '../data/data';
import { useData } from '../data';
import Image from './Image';
import { useWeb3 } from '../web3';
import { Content,Content__factory } from '../assets/typechain';
import OrderBook from './OrderBook';
import { BigNumber, ethers } from "ethers";


function InventoryAssetPage() {

  const { assetsWithOrders } = useData()
  const { assetID } = useParams<{ assetID: string }>()


  const web3 = useWeb3();
  const [contentContract, setContentContract] = useState<Content>();
  const [assetWithOrders,setAssetWithOrder] = useState<AssetWithOrders>();
  const [assetUri, setAssetUri] = useState<string>();
  const [description, setDescription] = useState<string | undefined>();
  const urlPrefix = 'https://gateway.pinata.cloud/ipfs/';
  const [nsfw, setNsfw] = useState<boolean | undefined>();
  const [tags,setTags] = useState<string[]>([])
  const [assetBalance] = useState<BigNumber>();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const calculateMax = (maxSupply: string) => {
    if (maxSupply === ethers.constants.MaxUint256.toString()) {
      return "MAX"
    } else {
      return Number(maxSupply);
    }
  }


  useEffect(() => {
    if (assetsWithOrders !== undefined) {
      setAssetWithOrder(assetsWithOrders.find(assetsWithOrders => assetsWithOrders.id === assetID))
      if (assetWithOrders === undefined || web3.signerOrProvider === undefined) return;
      setContentContract(Content__factory.connect(assetWithOrders.parentContract, web3.signerOrProvider));
    }

  }, [assetWithOrders, web3.signerOrProvider, assetsWithOrders, assetID]);

  useEffect(() => {
    if (contentContract === undefined || assetWithOrders === undefined || assetUri !== undefined) return;

    contentContract["uri(uint256)"](assetWithOrders.tokenId)
      .then(uri => {
        setAssetUri(uri);
      })
      .catch((error) => console.error(error));
  }, [assetUri, assetWithOrders, contentContract]);

  useEffect(() => {
    if (assetUri === undefined) return;
    
    // Todo: if assetUri is empty, query the blockchain for the asset uri instead.
    fetch(urlPrefix + assetUri)
      .then(response => response.json())
      .then(data => {
        setDescription(data.description);
        setNsfw(data.nsfw);
        setTags(data.tags)
      })
      .catch(error => console.error(error));
  }, [assetUri]);


  if(assetsWithOrders === undefined) {
    return(
      <div></div>
    );
  } else {
    return (
      <div>
        <div>
          {assetsWithOrders.filter(assetWithOrders => assetWithOrders.id === assetID ).map((assetWithOrders: AssetWithOrders) => (
            <div className='w-full -mt-12'>
              <div className='w-full flex flex-row'>
                <div className='flex w-1/2 flex-col'>
                  <div className='flex w-full h-full justify-center'>
                    <Image src={assetWithOrders.imageUri} className="flex w-1/2 h-auto self-center" type="content" />
                  </div>
                </div>
                <div className='flex flex-col w-1/2'>
                  <div title='Name' className=''>
                    <div className='flex text-offWhite text-5xl'>{assetWithOrders.name}</div>
                  </div>
                  <div title='Creator' className=''>
                    <div className='flex text-offWhite text-2xl'> By: {assetWithOrders.creator === null ? 'Unknown' : assetWithOrders.creator}</div>
                  </div>
                  <div title='Description' className=''>
                    <div className='flex text-offWhite text-2xl'> Description: {description}</div>
                  </div>
                  <div title='Tags' className='flex text-offWhite text-2xl'>
                    <div className='self-center'>
                      Tags: 
                    </div>
                    {tags.map( tag => 
                      <div className='flex flex-shrink text-offWhite text-sm bg-gray rounded-xl m-1 px-2 py-1 border-2 border-neutral600'>
                        {tag} 
                      </div>
                    )}
                    {
                      nsfw 
                        ? 
                          <div className='flex flex-shrink text-offWhite text-sm bg-gray rounded-xl m-1 px-2 py-1 border-2 border-neutral600'>
                            NSFW
                          </div>
                        :
                          <div className='flex flex-shrink text-offWhite text-sm bg-gray rounded-xl m-1 px-2 py-1 border-2 border-neutral600'>
                            SFW
                          </div>
                    }
                  </div>
                  <div title='Listings' className='w-full h-full text-offWhite text-xl'>
                    <OrderBook assetWithOrders={assetWithOrders} showInTheMarketplace={true} showBuyAndSellButtons={true} tradeAsset={undefined} />
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-row mt-1'>
                <div title='asset_information' className='w-1/2 flex text-offWhite text-xxxl '>
                  <div className="flex flex-grow flex-col bg-black450 rounded-lg mx-1">
                    <div className="text-offWhite text-lg mb-2 ml-1">
                      Additional Information:
                    </div>
                    {assetBalance !== undefined ? <div className="text-black200 text-sm ml-1">
                      Qty {(assetBalance).toString()}
                    </div> : null}
                    <div className="flex text-black200 text-sm ml-1">
                      Supply: {Number(assetWithOrders.currentSupply)}
                    </div>
                    <div className="flex text-black200 text-sm ml-1">
                      Max Supply: {calculateMax(assetWithOrders.maxSupply)}
                    </div>
                    <div className="flex text-black200 text-sm ml-1">
                      Collection: {assetWithOrders.game}
                    </div>
                    <div className="flex text-black200 text-sm ml-1">
                      Contract Address: {assetWithOrders.parentContract}
                    </div>
                    <div className="flex text-black200 text-sm ml-1">
                      Token ID: {assetWithOrders.tokenId}
                    </div>
                    <div className="flex text-black200 text-sm ml-1">
                      Type: {assetWithOrders.type}
                    </div>
                    <div className="flex text-black200 text-sm ml-1">
                      Subtype: {assetWithOrders.subtype}
                    </div>
                    {nsfw !== undefined ? <div className="flex text-black200 text-sm ml-1">
                      NSFW: {nsfw ? "TRUE" : "FALSE"}
                    </div> : null}
                    {assetUri !== undefined ? <div className="flex flex-grow flex-wrap break-all text-black200 text-sm ml-1">
                      URI: {assetUri}
                    </div> : null}
                  </div>
                </div>
                <div title='statistics' className='w-1/2 flex text-offWhite text-xxxl'>
                  <div className="flex flex-grow flex-col bg-black450 rounded-lg mx-1">
                    <div className="text-offWhite text-lg mb-2 ml-1">
                      Statistics
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default InventoryAssetPage;