import NestedLayout from "@/components/NestedSidebar";
import getNotes from "@/utils/get-notes";

export default function Layout({ children }: { children: React.ReactNode }) {
    const notes = getNotes("notes");

    return (
        <div className="flex">
            <div className="w-72">
                <NestedLayout items={notes} />
            </div>
            <div className="mx-auto">{children}</div>
        </div>
    );
}
