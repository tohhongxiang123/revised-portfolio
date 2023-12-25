"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    const path = usePathname()

    return (
        <motion.div
            key={path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
