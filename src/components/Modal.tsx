import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import X from '../assets/icons/X';

function Modal({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto text-white"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl px-6 py-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray border border-none shadow-glow rounded-xl">
              <div className="flex justify-start mb-4">
                <button className="focus:outline-none p-1" onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </div>
              <div className="flex justify-center">
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal;
