import fs from "fs";
import path from "path";

export default async function getNote(fullPath: string[]) {
    return fs
        .readFileSync(path.join(...fullPath.map(decodeURIComponent)))
        .toString();
}
