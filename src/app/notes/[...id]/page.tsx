import getFileContents from "@/utils/getFileContents";

import Post from "./_components/Post";
import BreadCrumbs from "./_components/Breadcrumbs";

interface SpecificNotePageProps {
    params: {
        id: string[];
    };
}

export default async function SpecificNotePage({
    params,
}: SpecificNotePageProps) {
    const content = await getFileContents(
        ["notes"].concat(params.id).map(decodeURIComponent)
    );

    return (
        <div className="mx-auto block p-4">
            <BreadCrumbs parts={params.id} />
            <div className="my-4" />
            <Post rawStringContent={content} />
        </div>
    );
}
