import fs from "fs";
import path from "path";

export default async function getFileContents(pathParts: string[]) {
    const filePath = path.join(...pathParts);
    return fs.readFileSync(filePath).toString();
}
