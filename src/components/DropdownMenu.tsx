import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import DiscordLogo from "../assets/icons/DiscordLogo"
import TwitterLogo from "../assets/icons/TwitterLogo"

function DropdownMenu({
    menuName,
    itemList,
}:{
    menuName:string
    itemList:string[]
}) {
    return(
      <div className="mx-4 mt-3 flex flex-col text-lg justify-center">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-offWhite text-lg hover:text-chartreuse500">
                {menuName}
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
            <Menu.Items className="origin-top-right absolute right-50 mt-1 -ml-12 w-56 rounded-md shadow-lg bg-darkBlue200 bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                
                    {itemList.map( (item,index) => (
                      <div key={index} className="ml-3 py-1">
                        <Menu.Item>
                            {
                              item === 'Docs'
                                ?
                                  <a 
                                    href="https://docs.rawrshak.io" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex flex-nowrap text-offWhite hover:text-chartreuse500" >
                                    Documentation
                                  </a>
                                :
                                  item === 'Social Media'
                                    ?
                                      <div className="flex flex-nowrap justify-center w-full">
                                        <a
                                          href="https://discord.gg/7VGPphBU"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex justify-center m-4"
                                        >
                                          <DiscordLogo />
                                        </a>
                                        <a
                                          href="https://twitter.com/rawrshak"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex justify-center m-4 mr-8"
                                        >
                                          <TwitterLogo />
                                        </a>
                                      </div>
                                    :
                                      <Link className='hover:text-chartreuse500 text-offWhite' to={'/'.concat(item).toLowerCase()}>
                                        {item}
                                      </Link>
                            }
                        </Menu.Item>
                    </div>
                    ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
    )
}

export default DropdownMenu