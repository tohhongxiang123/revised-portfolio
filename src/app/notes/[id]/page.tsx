import getNotes from "@/utils/get-notes";

interface SpecificNotePageProps {
	params: {
		id: string;
	};
}

export default function SpecificNotePage({ params }: SpecificNotePageProps) {
	return (
		<div className="p-24">
			<h1>{params.id}</h1>
		</div>
	);
}

export const dynamicParams = false
export async function generateStaticParams() {
	const notes = getNotes()

	return notes;
}
