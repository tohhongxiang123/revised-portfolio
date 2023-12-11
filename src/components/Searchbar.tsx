export default function SearchBar() {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                    className="h-4 w-4 text-gray-500"
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
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 ps-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-700"
                placeholder="Search"
                required
            />
            <kbd className="absolute inset-y-1.5 end-2.5 rounded-lg border-2 bg-white px-1.5 py-0.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-600 dark:text-slate-400">
                CTRL + K
            </kbd>
        </div>
    );
}
