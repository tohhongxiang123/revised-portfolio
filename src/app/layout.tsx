import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "THX",
    description: "THX's app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} bg-white text-slate-900 dark:bg-slate-900 dark:text-white/75`}
            >
                <Providers>
                    <Navbar />
                    <div>{children}</div>
                </Providers>
            </body>
        </html>
    );
}
