import fs from 'fs'
import path from 'path'

export type NestedDirectoryStructure = {
    name: string,
    fullPath: string,
    children: NestedDirectoryStructure[]
}

export default function getNotes(folder: string): NestedDirectoryStructure[] {
    const filesOrFolders = fs.readdirSync(folder)

    const nested = filesOrFolders.map(fileOrFolder => {
        const name = fileOrFolder.replace(".md", "")
        const fullPath = path.join(folder, fileOrFolder)
        let children: NestedDirectoryStructure[] = []

        if (fs.lstatSync(fullPath).isDirectory()) {
            children = getNotes(fullPath)
        }

        return {
            name, fullPath, children
        }
    })

    return nested
}
