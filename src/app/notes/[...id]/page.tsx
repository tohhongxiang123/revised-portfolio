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
        <div className="w-full p-4">
            <div className="mx-auto max-w-fit">
                <BreadCrumbs parts={params.id} />
                <div className="my-4" />
                <Post rawStringContent={content} />
            </div>
        </div>
    );
}
