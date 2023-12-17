import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { remarkMermaid } from "remark-mermaid-nextra";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { compileMDX } from "next-mdx-remote/rsc";

import { use } from "react";
import Mermaid from "./Mermaid";
import CustomCodeBlock from "./CustomCodeBlock";

async function compile(rawStringContent: string) {
    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: rawStringContent,
        components: {
            Mermaid: Mermaid,
            pre: CustomCodeBlock,
        },
        options: {
            mdxOptions: {
                development: true,
                remarkPlugins: [
                    // @ts-expect-error wrong types defined
                    remarkMermaid,
                    remarkGfm,
                    remarkMath,
                ],
                rehypePlugins: [
                    // @ts-expect-error wrong types defined
                    rehypeKatex,
                    // @ts-expect-error wrong types defined
                    [rehypePrettyCode, { theme: "one-dark-pro" }],
                ],
            },
            parseFrontmatter: true,
        },
    });

    return { content, frontmatter };
}

export default function Post({
    rawStringContent,
}: {
    rawStringContent: string;
}) {
    const { content } = use(compile(rawStringContent));

    return (
        <article className="prose prose-neutral dark:prose-invert">
            {content}
        </article>
    );
}
