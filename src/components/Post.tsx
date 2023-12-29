'use client'

import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import CustomCodeBlock from './CustomCodeBlock'
import CustomImage from './CustomImage'

export default function Post({ content }: { content: string }) {
    const Component = useMemo(() => getMDXComponent(content), [content])
    return (
        <>
            <main className="mx-auto prose prose-neutral dark:prose-invert">
                <Component
                    components={{
                        pre: CustomCodeBlock,
                        img: CustomImage,
                    }}
                />
            </main>
        </>
    )
}
