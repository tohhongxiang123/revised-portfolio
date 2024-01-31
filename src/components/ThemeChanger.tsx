"use client";

import { useState, useEffect, Fragment } from "react";
import { useTheme } from "next-themes";
import { Menu, Transition } from "@headlessui/react";
import { IconDeviceDesktop, IconMoonStars, IconSun } from "@tabler/icons-react";

const themes: {
    [key: string]: { label: string; value: string; icon: React.ReactNode };
} = {
    dark: {
        label: "Dark",
        value: "dark",
        icon: <IconMoonStars className="h-5 w-5" />,
    },
    light: {
        label: "Light",
        value: "light",
        icon: <IconSun className="h-5 w-5" />,
    },
    system: {
        label: "System",
        value: "system",
        icon: <IconDeviceDesktop className="h-5 w-5" />,
    },
};

interface ThemeChangerProps {
    menuItemClassnames?: string;
}
export default function ThemeChanger({
    menuItemClassnames = "",
}: ThemeChangerProps) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Menu as="div" className="relative z-10 inline-block text-left">
            <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm font-medium">
                {theme ? themes[theme].icon : null}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className={`absolute right-0 z-20 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-slate-800 ${menuItemClassnames}`}
                >
                    <div className="px-1 py-1">
                        {Object.values(themes).map((theme) => (
                            <Menu.Item key={theme.value}>
                                {({ active }) => (
                                    <button
                                        className={`group flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm ${
                                            active
                                                ? "bg-gray-100/50 dark:bg-slate-900/40"
                                                : ""
                                        }`}
                                        onClick={() => setTheme(theme.value)}
                                    >
                                        {theme.icon}
                                        {theme.label}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
