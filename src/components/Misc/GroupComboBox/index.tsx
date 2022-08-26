import { Fragment, useState, Dispatch, FC, SetStateAction } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface UserResponse {
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	_id: string;
	createdAt: string;
}

interface Props {
	peopleOptions: UserResponse[];
	className?: string;
	selected: UserResponse[];
	setSelected: Dispatch<SetStateAction<UserResponse[]>>;
}

const GroupComboBox: FC<Props> = ({ selected, setSelected, peopleOptions, className = {} }) => {
	const [query, setQuery] = useState("");

	const filteredPeople =
		query === ""
			? peopleOptions
			: peopleOptions.filter((person) =>
					person.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	return (
		<div className={`${className}`}>
			<Combobox
				value={selected}
				onChange={setSelected}
				multiple
			>
				<div className="relative">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="w-full focus:outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
							displayValue={(people: UserResponse[]) => people.map((person) => person.name).join(", ")}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredPeople.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredPeople.map((person) => (
									<Combobox.Option
										key={person._id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-blue-600 text-white" : "text-blue-900"
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-blue-600"
														}`}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default GroupComboBox;
