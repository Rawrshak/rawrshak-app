import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import { AssetWithOrders } from '../data/data';
import { useData } from '../data';
import Image from './Image';
import { Menu, Transition } from '@headlessui/react';


function FullAssetPage() {

  const { assetsWithOrders } = useData();
  const { assetID } = useParams<{ assetID: string }>();

    if(assetsWithOrders === undefined) {
      return(
        <div>

        </div>
      );
    } else {
      return (
        <div>
          <div>
            {assetsWithOrders.filter(assetsWithOrders => assetsWithOrders.id === assetID ).map((assetsWithOrders: AssetWithOrders) => (
              <div className='w-full'>
                <div className='w-full flex flex-row'>
                  <div className='w-1/2 h-1/2 place-items-center'>
                    <Image src={assetsWithOrders.imageUri} className="place-self-end flex w-2/3 cursor-pointer" type="content" />
                  </div>
                  <div className='w-1/2 h-1/2'>
                    <div title='Name' className=''>
                      <div className='flex text-offWhite text-5xl'>{assetsWithOrders.name}</div>
                    </div>
                    <div title='Creator' className=''>
                      <div className='flex text-offWhite text-3xl'> by {assetsWithOrders.creator}</div>
                    </div>
                    <div title='Tags' className='flex text-offWhite'>
                      Tags: 
                      {(assetsWithOrders.tags).map((tag)=> {
                        return(
                        <div className='text-offWhite ml-2'>
                          {tag},
                        </div>);
                      })}
                    </div>
                    <div title='OrderButtons' className='flex flex-row'>
                      <Menu as="div" className="w-1/2 mx-2">
                        <div>
                          <Menu.Button className="w-full bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 my-2 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
                            Buy
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="text-white px-3 w-full w-56 rounded-md shadow-lg bg-darkBlue200 bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="ml-3 py-1">
                              <Menu.Item>
                                <div>Instant Buy</div>
                              </Menu.Item>
                              <Menu.Item>
                                <div>Create Buy Order</div>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <Menu as="div" className="w-1/2 mx-2">
                        <div>
                          <Menu.Button className="w-full bg-darkBlue200 hover:bg-violet-600 text-white font-bold px-3 my-2 border-b-4 border-blue-700 hover:border-blue-500 rounded-full">
                            Sell
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="text-white px-3 w-full w-56 rounded-md shadow-lg bg-darkBlue200 bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="ml-3 py-1">
                              <Menu.Item>
                                <div>Instant Sell</div>
                              </Menu.Item>
                              <Menu.Item>
                                <div>Create Sell Order</div>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className='w-full flex flex-row'>
                  <div title='asset_information' className='w-1/2 flex text-offWhite text-xxxl my-2 ml-4'>
                    Information
                  </div>
                  <div title='statistics' className='w-1/2 flex text-offWhite text-xxxl my-2 ml-4'>
                    Statistics
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
}

export default FullAssetPage;