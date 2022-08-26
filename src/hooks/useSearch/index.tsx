import React from "react";
import { useEffect, useState } from "react";

function useSearch<Type>(
	initialList: Type[],
	key: keyof Type
): [string, React.Dispatch<React.SetStateAction<string>>, Type[]] {
	const [search, setSearch] = useState<string>("");
	const [filteredList, setFilteredProjects] = useState<Type[]>(initialList);

	useEffect(() => {
		const searchValue = search.toLowerCase().trim();

		const filteredList1 = initialList.filter((item) => {
			const title = String(item[key]).toLowerCase();
			if (search === "") return item;
			else if (title.startsWith(searchValue)) return item;
			return null;
		});

		const filteredList2 = initialList.filter((item) => {
			const title = String(item[key]).toLowerCase();
			if (search === "") return item;
			else if (title.includes(searchValue)) return item;
			return null;
		});

		const set = new Set([...filteredList1, ...filteredList2]);
		setFilteredProjects(Array.from(set));
	}, [search, initialList, key]);

	return [search, setSearch, filteredList];
}

export default useSearch;
