import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";


export default function Header() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Bandas", href: "/admin/home/bands" },
    { name: "Trilhas", href: "/admin/home/tracks" },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
             
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
                width={30}
                height={30}
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start gap-4">
            <div className="flex shrink-0 items-center">
              <Image
                alt="Your Company"
                src="/spotify_icon.png"
                className="size-8"
                priority={true}
                height={32}
                width={32}
                
              />
            </div>
             {
                navigation.map((item)=>(
                  <a key={item.name} href={item.href} >
                  {item.name}
                  
                  </a>
                ))
             }
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4 ">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
        
              <BellIcon aria-hidden="true" width={30} height={30}/>
            </button>

          
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden ">
              
                  <Image 
                    alt=""
                    src="/user.png"
                    className="size-8 rounded-full"
                    width={32}
                    height={32}
                  />
                </MenuButton>
              </div>
            
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden ">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton as="div">
           {
                navigation.map((item)=>(
                  <a key={item.name} href={item.href} className="flex flex-col ">
                  {item.name}
                  
                  </a>
                ))
             }
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}