import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
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
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
                ></link>
            </head>
            <body
                className={`${inter.className} flex h-screen flex-col overflow-hidden bg-white text-slate-900 dark:bg-slate-900 dark:text-white/75`}
            >
                <Providers>
                    <Navbar />
                    <div className="relative overflow-hidden">{children}</div>
                </Providers>
            </body>
        </html>
    );
}
