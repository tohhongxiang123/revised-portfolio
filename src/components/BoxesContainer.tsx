"use client";

import React from "react";
import { motion } from "framer-motion";
import tailwindColors from "tailwindcss/colors";

export default function BoxesContainer() {
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);
    const colors = [
        tailwindColors.red[300],
        tailwindColors.orange[300],
        tailwindColors.amber[300],
        tailwindColors.yellow[300],
        tailwindColors.lime[300],
        tailwindColors.green[300],
        tailwindColors.emerald[300],
        tailwindColors.cyan[300],
        tailwindColors.slate[300],
        tailwindColors.violet[300],
        tailwindColors.fuchsia[300],
        tailwindColors.rose[300],
    ];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className="absolute -top-1/4 left-1/4 flex h-full  w-full -translate-x-1/2 -translate-y-1/2 p-4"
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row` + i}
                    className="relative h-8  w-16  border-l border-slate-700"
                >
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: `${getRandomColor()}`,
                                transition: { duration: 0 },
                            }}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            key={`col` + j}
                            className="relative h-8  w-16 border-r border-t border-slate-700"
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 stroke-[1px] text-slate-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
}
