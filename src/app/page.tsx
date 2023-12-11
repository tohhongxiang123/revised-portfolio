import PageWrapper from "@/components/PageWrapper";

export default function Home() {
    return (
        <PageWrapper>
            <main className="flex min-h-screen flex-col items-center gap-16 p-24">
                <div className="flex flex-col items-center gap-y-8">
                    <h1 className="text-8xl font-bold tracking-tight text-black dark:text-white">
                        Toh Hong Xiang
                    </h1>
                    <p className="text-xl font-light">
                        Web Developer | Data Scientist
                    </p>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet adipisci eaque accusamus, eligendi ducimus at
                        enim incidunt commodi odio autem, in, atque illum
                        possimus officiis vitae ut accusantium laboriosam
                        sapiente.
                    </p>
                </div>
            </main>
        </PageWrapper>
    );
}
