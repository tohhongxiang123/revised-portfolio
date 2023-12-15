"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

type MermaidProps = {
    readonly chart: string;
};

export default function Mermaid({ chart }: MermaidProps) {
    const id = useId();
    const [svg, setSvg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { theme } = useTheme();

    useEffect(() => {
        setIsLoading(true);

        mermaid.initialize({
            fontFamily: "inherit",
            theme: theme === "dark" ? "dark" : "default",
        });

        mermaid
            .render(
                id.replace(/[^a-zA-Z]+/g, ""),
                // strip special chars from useId
                `${chart}`
                // apply theme and supply chart
            )
            .then(({ svg: svg2 }) => {
                setSvg(svg2);
            })
            .catch((error) => {
                console.error("Error while rendering mermaid", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, chart, theme]);

    if (isLoading) {
        return <p>...Loading</p>;
    }
    return (
        <div
            className="mt-6 flex justify-center"
            id={id}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
