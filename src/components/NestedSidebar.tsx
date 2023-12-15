"use client";

import { NestedDirectoryStructure } from "@/utils/get-notes";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NestedLayout({
    items,
}: {
    items: NestedDirectoryStructure[];
}) {
    return items.map((item) => (
        <NestedDirectoryItem item={item} key={item.fullPath} />
    ));
}

function NestedDirectoryItem({ item }: { item: NestedDirectoryStructure }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsOpen((c) => !c);
    };

    const path = usePathname();
    const isItemActive = decodeURI(path) === "/" + item.fullPath.replaceAll("\\", "/")

    if (item.children.length === 0) {
        return (
            <Link
                href={`/${item.fullPath}`}
                className={`hover:bg-gray-500/30 relative flex w-full cursor-pointer items-center justify-between rounded-md p-2 text-left text-sm ${isItemActive ? "font-bold" : ""}`}
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
                <p className={"text-left font-medium last-of-type:py-0"}>{item.name}</p>
                {isOpen ? (
                    <IconChevronDown size={16} className="mx-2" />
                ) : (
                    <IconChevronRight size={16} className="mx-2" />
                )}
            </button>
            {isOpen && (
                <ul className="ml-4 border-l border-gray-700/30">
                    {item.children.map((child) => (
                        <li key={child.fullPath} className="pl-1.5">
                            <NestedDirectoryItem item={child} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
