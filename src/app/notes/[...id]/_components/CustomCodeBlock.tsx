import Children from "react-children-utilities";
import CodeCopyButton from "./CodeCopyButton";

interface CustomCodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    children?: React.ReactNode;
}

export default function Pre({ children, ...props }: CustomCodeBlockProps) {
    const code = Children.onlyText(children);

    return (
        <div className="relative">
            <CodeCopyButton code={code} className="absolute right-0 top-0" />
            <pre {...props}>{children}</pre>
        </div>
    );
}
