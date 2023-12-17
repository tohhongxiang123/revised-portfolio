import fs from "fs";
import path from "path";

export type NestedDirectoryStructure = {
    name: string;
    path: string[];
    children: NestedDirectoryStructure[];
};

export default function getFolderTree(
    folder: string
): NestedDirectoryStructure[] {
    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    });
    const filesOrFolders = fs.readdirSync(folder).sort(collator.compare);

    const nested = filesOrFolders.map((fileOrFolder) => {
        const name = path.parse(fileOrFolder).name;
        const fullPath = path.join(folder, fileOrFolder);
        let children: NestedDirectoryStructure[] = [];

        if (fs.lstatSync(fullPath).isDirectory()) {
            children = getFolderTree(fullPath);
        }

        return {
            name,
            path: fullPath.split(path.sep),
            children,
        };
    });

    return nested;
}
