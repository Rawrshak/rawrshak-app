import { Menu, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

function DropdownFilter({
    menuName,
    itemList,
    filter,
    setFilter
}:{
    menuName:string
    itemList:string[],
    filter:string,
    setFilter:React.Dispatch<React.SetStateAction<string>>
}) {

  const [selectedFilter,setSelectedFilter] = useState<string>(menuName)

    return(
        <div className="ml-4 flex flex-col text-lg justify-center border-solid static">
          <Menu as="div" className="static">
            <div>
              <Menu.Button className="flex text-offWhite border-solid border-white border-2 rounded-lg text-sm px-1 py-1">
                {
                  selectedFilter === menuName || selectedFilter === 'All'
                    ? 
                      menuName
                    :
                      menuName.concat(': ').concat(selectedFilter)
                }
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
              <Menu.Items className="w-fit flex flex-col flex-nowrap pr-3 border-solid border-white border-2 rounded-lg origin-top-right absolute right-50 mt-2 rounded-md shadow-lg bg-black bg-opacity-45 ring-1 ring-black ring-opacity-5 focus:outline-none">
                
              {itemList.map( (item,index) => (
                <div key={index}
                className="ml-3 mx-1">
                        <Menu.Item>
                            <div 
                              className="hover:text-chartreuse500 cursor-pointer"
                              onClick={()=> {
                                setFilter(item)
                                setSelectedFilter(item)
                              }}
                            >
                              {item}
                            </div>
                        </Menu.Item>
                </div>
                    ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
    )
}

export default DropdownFilter