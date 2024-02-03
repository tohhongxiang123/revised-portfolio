import getFileContents from "@/utils/getFileContents";
import Post from "../notes/[...id]/_components/Post";

export default async function TestPage() {
    const content = await getFileContents(
        ["notes", "test.mdx"].map(decodeURIComponent)
    );

    return (
        <div className="p-4">
            <Post rawStringContent={content} />
        </div>
    );
}
