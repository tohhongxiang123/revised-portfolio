"use client";

import { NestedDirectoryStructure } from "@/utils/get-notes";
import {
    IconChevronDown,
    IconChevronRight,
    IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
        <div className={`flex h-full flex-col ${isOpen ? "w-96" : ""}`}>
            <AnimatePresence>
                {isOpen ? (
                    <ul className="h-full overflow-auto">
                        {items.map((item) => (
                            <li key={item.fullPath}>
                                <NestedDirectoryItem item={item} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="h-full" />
                )}
            </AnimatePresence>
            <div className="flex justify-between border-t border-slate-900/10 p-4">
                <span></span>
                <button onClick={handleOpen}>
                    <IconLayoutSidebarLeftCollapse className="text-inherit opacity-50 hover:opacity-80" />
                </button>
            </div>
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

    const isItemActive = arrayEquals(
        item.fullPath.split(sep).filter(Boolean),
        decodeURIComponent(path).split(sep).filter(Boolean)
    );

    if (item.children.length === 0) {
        return (
            <Link
                href={`/${item.fullPath}`}
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
                    >
                        {item.children.map((child) => (
                            <motion.li
                                variants={nestedNavChildrenVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                key={child.fullPath}
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
        return arrayEquals(
            item.fullPath.split(sep).filter(Boolean),
            currentPath.split("/").filter(Boolean)
        );
    }

    return item.children.some((child) =>
        checkIfOpen({ ...child }, currentPath)
    );
}
