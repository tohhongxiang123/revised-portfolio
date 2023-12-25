import NestedLayout from "@/components/NestedSidebar";
import getFolderTree from "@/utils/getFolderTree";

export default function Layout({ children }: { children: React.ReactNode }) {
    const notes = getFolderTree("notes");

    return (
        <div className="flex h-full">
            <div>
                <NestedLayout items={notes} />
            </div>
            <div className="flex w-full flex-col overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
