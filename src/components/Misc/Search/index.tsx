import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	className?: string;
}

const Search: React.FC<Props> = ({ search, setSearch, className = "" }) => {
	return (
		<div className={`relative ${className}`}>
			<span className="sr-only">Search</span>
			<span className="pointer-events-none absolute inset-y-0 right-4 flex items-center pl-2">
				<MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
			</span>
			<input
				className="w-full truncate rounded-lg py-3 pr-9 bg-white pl-3 text-sm placeholder-slate-400  ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
				id="search"
				type="search"
				placeholder="Search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
		</div>
	);
};

export default Search;
