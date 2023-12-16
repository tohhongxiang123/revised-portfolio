import PageWrapper from "@/components/PageWrapper";
import getFolderTree, { NestedDirectoryStructure } from "@/utils/getFolderTree";
import { redirect } from "next/navigation";

export default async function NotesPage() {
    const notes = getFolderTree("notes");
    redirect(getLinkOfFirstNote(notes));

    return (
        <PageWrapper>
            <main className="">
                <h1 className="text-4xl font-bold">Notes page</h1>
            </main>
        </PageWrapper>
    );
}

const getLinkOfFirstNote = (notes: NestedDirectoryStructure[]): string => {
    const current = notes[0];
    if (current.children.length === 0) {
        return current.path.join("");
    }

    return getLinkOfFirstNote(current.children);
};
