"use client";

import { motion } from "framer-motion";

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
