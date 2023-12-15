"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeChanger from "./ThemeChanger";
import SearchBar from "./Searchbar";

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

    return (
        <nav className="sticky top-0 z-10 w-full border-b border-slate-900/10 bg-white/95 backdrop-blur-sm dark:border-slate-50/[0.06] dark:bg-gray-900/95">
            <div className="mx-auto flex w-full items-center justify-between px-4 py-2">
                <Link href="/" className="mx-4">
                    <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
                        THX
                    </span>
                </Link>
                <div className="flex">
                    <ul className="text-md flex items-center gap-x-6 px-2 py-1 font-light">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={
                                        link.href === path ? "font-bold" : ""
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
    );
}
