"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleOpenMenu = () => {
		setIsMenuOpen((c) => !c);
	};

	return (
		<nav className="w-full border-b border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 dark:bg-gray-900 sticky top-0 z-10">
			<div className="w-full flex items-center justify-between mx-auto px-4 py-2">
				<Link href="/" className="mx-4">
					<span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
						THX
					</span>
				</Link>
				<div className="flex">
					<ul className="flex gap-x-6 py-1 px-2 items-center font-light text-md">
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
