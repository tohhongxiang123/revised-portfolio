import getNotes, { NestedDirectoryStructure } from "@/utils/get-notes";
import Link from "next/link";

function NestedLayout({
    filesAndFolders,
}: {
    filesAndFolders: NestedDirectoryStructure[];
}) {
    return (
        <ul className="ml-4">
            {filesAndFolders.map((file) => (
                <li key={file.name}>
                    {file.children.length > 0 ? (
                        <div>
                            <p>{file.name}</p>
                            <NestedLayout filesAndFolders={file.children} />
                        </div>
                    ) : (
                        <Link href={`/${file.fullPath}`}>{file.name}</Link>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const notes = getNotes("notes");

    return (
        <div className="flex">
            <div>
                <NestedLayout filesAndFolders={notes} />
            </div>
            <div>{children}</div>
        </div>
    );
}
