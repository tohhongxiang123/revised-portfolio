import PageWrapper from '@/components/PageWrapper'
import Post from '@/components/Post'
import BreadCrumbs from '@/components/BreadCrumbs'
import renderMarkdownFile from '@/utils/renderMarkdownFile'

interface SpecificNotePageProps {
    params: {
        id: string[]
    }
}

export default async function SpecificNotePage({
    params,
}: SpecificNotePageProps) {
    const result = await renderMarkdownFile([
        'notes',
        ...params.id.map(decodeURIComponent),
    ])

    return (
        <div className="mx-auto w-full max-w-3xl px-16 pb-16 xl:w-2/3">
            <BreadCrumbs parts={params.id} />
            <div className="my-4" />
            <PageWrapper>
                <Post content={result.code} />
            </PageWrapper>
        </div>
    )
}
