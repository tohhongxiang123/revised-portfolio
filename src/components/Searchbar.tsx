export default function SearchBar() {
	return (
		<div className="relative">
			<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
				<svg
					className="w-4 h-4 text-gray-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="search"
				id="search"
				className="block w-full px-4 py-2 ps-10 text-sm text-slate-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-700"
				placeholder="Search"
				required
			/>
			<kbd className="text-slate-900 absolute end-2.5 inset-y-1.5 rounded-lg text-xs px-1.5 py-0.5 bg-white border-2 dark:text-slate-400 dark:bg-slate-600 dark:border-slate-700">
				CTRL + K
			</kbd>
		</div>
	);
}
