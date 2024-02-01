"use client";

import { NestedDirectoryStructure } from "@/utils/getFolderTree";
import {
    IconChevronDown,
    IconChevronRight,
    IconLayoutSidebarLeftCollapse,
    IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sidebarVariants = {
    hidden: { x: "-100%", transition: { duration: 0.1 } },
    show: { x: "0", transition: { duration: 0.1 } },
    exit: { x: "-100%", transition: { duration: 0.1 } },
};

const nestedNavVariants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.1 } },
    show: {
        height: "auto",
        opacity: 1,
        transition: { duration: 0.1, delayChildren: 0.1 },
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.1 } },
};

const nestedNavChildrenVariants = {
    hidden: { opacity: 0, transition: { duration: 0.1 } },
    show: { opacity: 1, transition: { duration: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
};

export default function NestedLayout({
    items,
}: {
    items: NestedDirectoryStructure[];
}) {
    const [isOpen, setIsOpen] = useState(true);
    const handleOpen = () => {
        setIsOpen((c) => !c);
    };

    return (
        <div
            className={`absolute left-0 z-10 h-full lg:relative ${
                isOpen ? "w-full" : ""
            } flex flex-row bg-slate-800/50 backdrop-blur-sm transition-[width]`}
        >
            <div
                className={`flex h-full ${
                    isOpen ? "w-full sm:w-96" : ""
                } flex-col border-0 bg-white transition-[width] dark:bg-slate-900 sm:border-r sm:border-slate-400/20`}
            >
                <AnimatePresence initial={false} mode="popLayout">
                    {isOpen ? (
                        <motion.ul
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="h-full overflow-auto"
                            key="sidebar"
                        >
                            {items.map((item) => (
                                <li key={item.path.join("/")}>
                                    <NestedDirectoryItem item={item} />
                                </li>
                            ))}
                        </motion.ul>
                    ) : (
                        <div className="h-full" />
                    )}
                </AnimatePresence>
                <div className="flex justify-between border-t border-slate-900/10">
                    <span></span>
                    {isOpen ? (
                        <button onClick={handleOpen} className="p-4">
                            <IconLayoutSidebarLeftCollapse className="text-inherit opacity-50 hover:opacity-80" />
                        </button>
                    ) : (
                        <button
                            onClick={handleOpen}
                            className="hidden sm:block sm:p-4"
                        >
                            <div className="">
                                <IconLayoutSidebarRightCollapse className="text-inherit opacity-50 hover:opacity-80" />
                            </div>
                        </button>
                    )}
                </div>
                {!isOpen && (
                    <button
                        onClick={handleOpen}
                        className="absolute bottom-0 p-4 sm:hidden"
                    >
                        <IconLayoutSidebarRightCollapse className="text-inherit opacity-50 hover:opacity-80" />
                    </button>
                )}
            </div>
            <div
                onClick={() => setIsOpen(false)}
                className="w-0 sm:grow lg:w-0"
            ></div>
        </div>
    );
}

function NestedDirectoryItem({ item }: { item: NestedDirectoryStructure }) {
    const path = usePathname();
    const decodedPath = decodeURIComponent(path);

    const [isOpen, setIsOpen] = useState(checkIfOpen(item, decodedPath));
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen((c) => !c);
    };

    useEffect(() => {
        setIsOpen((isOpen) => {
            if (isOpen) {
                return isOpen;
            }

            return checkIfOpen(item, decodedPath);
        });
    }, [decodedPath]);

    const isItemActive = arrayEquals(
        item.path,
        decodeURIComponent(path).split(sep).filter(Boolean)
    );

    if (item.children.length === 0) {
        return (
            <Link
                href={`/${item.path.join("/")}`}
                className={`relative flex w-full cursor-pointer items-center justify-between rounded-md p-2 text-left text-sm hover:bg-gray-500/10 ${
                    isItemActive ? "bg-gray-500/10 font-bold" : ""
                }`}
            >
                {item.name}
            </Link>
        );
    }

    return (
        <>
            <button
                className="flex w-full items-center justify-between rounded-md p-2 hover:bg-slate-500/30"
                onClick={handleOpen}
            >
                <p className={"text-left font-medium last-of-type:py-0"}>
                    {item.name}
                </p>
                {isOpen ? (
                    <IconChevronDown size={16} className="mx-2" />
                ) : (
                    <IconChevronRight size={16} className="mx-2" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        variants={nestedNavVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="ml-4 border-l border-gray-700/30"
                        key={item.path.join("/")}
                    >
                        {item.children.map((child) => (
                            <motion.li
                                variants={nestedNavChildrenVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                key={child.path.join("/")}
                                className="pl-1.5"
                            >
                                <NestedDirectoryItem item={child} />
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </>
    );
}

const sep = /\\|\//g; // possible separators

function arrayEquals<T>(arr1: T[], arr2: T[]) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function checkIfOpen(
    item: NestedDirectoryStructure,
    currentPath: string
): boolean {
    if (item.children.length == 0) {
        return arrayEquals(item.path, currentPath.split("/").filter(Boolean));
    }

    return item.children.some((child) =>
        checkIfOpen({ ...child }, currentPath)
    );
}
