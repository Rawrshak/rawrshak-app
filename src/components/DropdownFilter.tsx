import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import ActiveLink from "./router/ActiveLink"

function DropdownFilter({
    menuName,
    itemList,
}:{
    menuName:string
    itemList:string[]
}) {
    return(
        <div className="ml-4 flex flex-col text-lg justify-center border-solid">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-offWhite border-solid border-white border-2 rounded-lg text-sm px-1 py-1">
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
              <Menu.Items className="pr-3 border-solid border-white border-2 rounded-lg origin-top-right absolute right-50 mt-2 rounded-md shadow-lg bg-black bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="ml-3 py-1">
                    {itemList.map( item => (
                        <Menu.Item>
                            <ActiveLink to={''.concat(item)} exact>
                            {item}
                            </ActiveLink>
                        </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
    )
}

export default DropdownFilter