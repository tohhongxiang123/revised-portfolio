import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkHtml from "remark-html";
import remarkPrism from "remark-prism";
import remarkParse from "remark-parse";
import rehypeKatex from "rehype-katex";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions`` to include MDX files
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [
            remarkParse,
            remarkGfm,
            remarkMath,
            remarkHtml,
            remarkPrism,
        ],
        rehypePlugins: [rehypeKatex],
    },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
