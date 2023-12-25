import { remarkMermaid } from "@theguild/remark-mermaid";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxImages from "remark-mdx-images";
import fs from "fs";

export default async function renderMarkdownFile(fullPath: string[]) {
	const pathString = path.join(...fullPath)
	const stringContent = fs.readFileSync(pathString, "utf8").toString()
	const cwd = path.resolve(process.cwd(), pathString, "..")

	const result = await bundleMDX({
		source: stringContent,
		cwd: cwd,
		mdxOptions(options, frontmatter) {
			options.remarkPlugins = [
				...(options.remarkPlugins ?? []),
				remarkGfm,
				remarkMdxImages,
				remarkMath,
				remarkMermaid
			];
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeKatex,
				[rehypePrettyCode, { theme: "one-dark-pro" }],
			];

			return options;
		},
		esbuildOptions: (options) => {
			options.loader = {
				...options.loader,
				".png": "dataurl",
				".jpg": "dataurl",
				".jpeg": "dataurl",
				".svg": "dataurl",
			};

			return options;
		},
	});

	return result
}