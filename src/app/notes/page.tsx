import PageWrapper from "@/components/PageWrapper";
import getNotes from "@/utils/get-notes";
import Link from "next/link";

export default async function NotesPage() {
    const notes = getNotes();

    return (
        <PageWrapper>
            <main className="flex min-h-screen flex-col items-center justify-center gap-y-8 p-24">
                <h1>Notes page</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Incidunt corrupti, debitis, amet, nemo ad eos optio aperiam
                    vel vero recusandae quos? Itaque nisi temporibus reiciendis
                    aut accusamus adipisci perferendis architecto?
                </p>
                {notes.map((noteId) => (
                    <Link href={`/notes/${noteId}`} key={noteId}>
                        {noteId}
                    </Link>
                ))}
            </main>
        </PageWrapper>
    );
}
