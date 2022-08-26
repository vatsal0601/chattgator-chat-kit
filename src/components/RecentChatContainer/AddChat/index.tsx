import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Dialog } from "@headlessui/react";
import { GroupComboBox, ComboBox, ListBox } from "../../Misc";

interface Props {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
}

const chatOptions = [{ name: "Add New DM" }, { name: "Create New Group" }];

const peopleOptions = [
	{ id: 1, name: "Wade Cooper" },
	{ id: 2, name: "Arlene Mccoy" },
	{ id: 3, name: "Devon Webb" },
	{ id: 4, name: "Tom Cook" },
	{ id: 5, name: "Tanya Fox" },
	{ id: 6, name: "Hellen Schmidt" },
];

const AddChat: FC<Props> = ({ visible, setVisible }) => {
	const [selectedChat, setSelectedChat] = useState(chatOptions[0]);
	const [selectedPeople, setSelectedPeople] = useState(peopleOptions[0]);
	const [selectedGroup, setSelectedGroup] = useState([peopleOptions[0]]);

	function closeModal() {
		setVisible(false);
	}

	return (
		<Dialog
			open={visible}
			onClose={() => setVisible(false)}
			className="relative z-50"
		>
			<div
				className="fixed inset-0 bg-black/30 backdrop-blur-sm"
				aria-hidden="true"
			/>

			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto p-5 w-1/2 rounded-lg bg-blue-50 shadow-lg">
					<Dialog.Title className="font-semibold text-xl text-blue-500">Start New Chat</Dialog.Title>
					<div className="flex">
						<div className="w-1/4 mt-4">
							<p className="text-xs ml-1 text-blue-600">Chat Type</p>
							<ListBox
								selected={selectedChat}
								setSelected={setSelectedChat}
								chatOptions={chatOptions}
							/>
						</div>
						{selectedChat.name == "Create New Group" && (
							<input
								className="ml-2 mt-8 grow shadow-md rounded-lg px-2"
								placeholder="Enter Group Name"
								required
							/>
						)}
						{selectedChat.name == "Add New DM" && (
							<>
								<span className="px-2" />
								<div className="grow mt-4">
									<p className="text-xs ml-1 text-blue-600">Select User</p>
									<ComboBox
										selected={selectedPeople}
										setSelected={setSelectedPeople}
										peopleOptions={peopleOptions}
										className="grow"
									/>
								</div>
							</>
						)}
					</div>
					{selectedChat.name == "Create New Group" && (
						<div className="grow mt-4">
							<p className="text-xs ml-1 text-blue-600">Add Participants</p>
							<GroupComboBox
								selected={selectedGroup}
								setSelected={setSelectedGroup}
								peopleOptions={peopleOptions}
								className="grow"
							/>
						</div>
					)}
					<div className="mt-4 flex justify-center">
						<button
							type="button"
							className="shadow-lg shadow-slate-200 mx-auto rounded-md border border-transparent bg-blue-500 px-4 py-2 text-md font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
							onClick={closeModal}
						>
							Create Chat
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default AddChat;
