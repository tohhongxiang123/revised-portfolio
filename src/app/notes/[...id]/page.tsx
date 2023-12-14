import getNote from "@/utils/get-note";

import { use } from "react";
import Post from "./_post";

interface SpecificNotePageProps {
    params: {
        id: string[];
    };
}

export default function SpecificNotePage({
    params,
}: SpecificNotePageProps) {
    const content = use(getNote(["notes"].concat(params.id)))
    return (
        <div>
            <Post rawStringContent={content} />
        </div>
    );
}