"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeChanger from "./ThemeChanger";
import SearchBar from "./Searchbar";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/projects",
        label: "Projects",
    },
    {
        href: "/notes",
        label: "Notes",
    },
    {
        href: "/contact-us",
        label: "Contact Us",
    },
];

export default function Navbar() {
    const path = usePathname();
    const rootPath = `/${path.split("/")[1]}`;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative z-20">
            <nav className="w-full border-b border-slate-900/10 bg-white/95 backdrop-blur-sm dark:border-slate-50/[0.06] dark:bg-gray-900/95">
                <div className="mx-auto flex w-full items-center justify-between px-4 py-2">
                    <Link href="/" className="mx-4">
                        <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
                            THX
                        </span>
                    </Link>
                    <div className="flex md:hidden">
                        <button onClick={() => setIsOpen((c) => !c)}>
                            {isOpen ? <IconX /> : <IconMenu2 />}
                        </button>
                    </div>
                    <div className="hidden md:flex">
                        <ul className="text-md flex items-center gap-x-6 px-2 py-1 font-light">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={
                                            link.href === rootPath
                                                ? "font-bold"
                                                : ""
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <SearchBar />
                            </li>
                            <li>
                                <ThemeChanger />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="absolute top-0 -z-10 flex h-screen w-full flex-col md:hidden"
                    >
                        <div className="my-6" />
                        <ul className="text-md z-20 flex h-full w-full flex-col gap-2 gap-x-6 rounded-b-lg bg-white px-2 py-4 pb-2 font-light shadow dark:bg-slate-800">
                            <li>
                                <SearchBar />
                            </li>
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={
                                        link.href === rootPath
                                            ? "font-bold"
                                            : ""
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    <li className="w-full rounded-md px-2 py-2 hover:bg-gray-600/10">
                                        {link.label}
                                    </li>
                                </Link>
                            ))}
                            <div className="mt-auto border-b-2 border-gray-400/10" />
                            <li className="ml-auto">
                                <ThemeChanger menuItemClassnames="bottom-full" />
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
