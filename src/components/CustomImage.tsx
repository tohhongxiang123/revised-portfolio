import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'

interface CustomImageProps {
    src?: string
    alt?: string
}

export default function CustomImage({ src = '', alt = '' }: CustomImageProps) {
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="duration-75 hover:scale-[1.01]"
                >
                    <img src={src} alt={alt} />
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-slate-900">
                                    <div className="flex items-center justify-between px-4 py-2">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6"
                                        >
                                            {alt}
                                        </Dialog.Title>
                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md p-2 text-sm font-medium opacity-75 hover:opacity-100 focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                <IconX />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img src={src} alt={alt} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
