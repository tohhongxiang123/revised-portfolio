import { IconChevronRight } from "@tabler/icons-react";

interface BreadCrumbsProps {
    parts: string[];
}

export default function BreadCrumbs({ parts }: BreadCrumbsProps) {
    return (
        <ul className="flex py-2" aria-label="breadcrumb">
            {parts.map((part, index) => (
                <li key={index} className="flex items-center">
                    {index > 0 && (
                        <IconChevronRight size={16} className="mx-2" />
                    )}
                    <span className="inline-flex items-center text-sm font-medium text-slate-700 dark:text-slate-400">
                        {decodeURI(part)}
                    </span>
                </li>
            ))}
        </ul>
    );
}
