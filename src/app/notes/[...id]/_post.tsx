import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { remarkMermaid } from "remark-mermaid-nextra";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { compileMDX } from "next-mdx-remote/rsc";

import { use } from "react";
import Mermaid from "./_mermaid";

async function compile(rawStringContent: string) {
    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: rawStringContent,
        components: { Mermaid: Mermaid },
        options: {
            mdxOptions: {
                development: true,
                remarkPlugins: [
                    // @ts-expect-error wrong types defined
                    remarkMermaid,
                    remarkGfm,
                    remarkMath,
                ],
                // @ts-expect-error wrong types defined
                rehypePlugins: [rehypeKatex, rehypeHighlight],
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
