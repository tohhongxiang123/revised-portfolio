import getNote from "@/utils/get-note";

import { use } from "react";
import Post from "./_post";
import BreadCrumbs from "./_components/Breadcrumbs";

interface SpecificNotePageProps {
    params: {
        id: string[];
    };
}

export default function SpecificNotePage({ params }: SpecificNotePageProps) {
    const content = use(getNote(["notes"].concat(params.id)));
    return (
        <div>
            <BreadCrumbs parts={params.id} />
            <div className="my-4" />
            <Post rawStringContent={content} />
        </div>
    );
}
