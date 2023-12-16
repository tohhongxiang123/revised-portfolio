import NestedLayout from "@/components/NestedSidebar";
import getNotes from "@/utils/get-notes";

export default function Layout({ children }: { children: React.ReactNode }) {
    const notes = getNotes("notes");

    return (
        <div className="flex h-full">
            <div>
                <NestedLayout items={notes} />
            </div>
            <div className="flex w-full flex-col items-center overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
