import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { GroupComboBox, ComboBox, ListBox } from "../../Misc";
import { useChattGator } from "../../../contexts";
import { RecentChatService } from "../../../utils";

interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const chatOptions = [{ name: "New DM" }, { name: "New Group" }];

const AddChat: React.FC<Props> = ({ visible, setVisible }) => {
	const { projectUsers, selectedPeople, setSelectedPeople, selectedGroup, setSelectedGroup, user, projectConfig } =
		useChattGator();
	const [selectedChat, setSelectedChat] = useState(chatOptions[0]);
	const [groupName, setGroupName] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit: () => void = () => {
		if (selectedChat.name === chatOptions[1].name && groupName === "") return;

		const createGroup = async () => {
			const recentChatService = new RecentChatService();
			switch (selectedChat.name) {
				case "New DM":
					await recentChatService.createOneToOneChat({
						projectId: projectConfig.projectId,
						membersList: [user?._id ?? "id", selectedPeople._id],
					});
					window.location.reload();
					break;
				case "New Group":
					await recentChatService.createGroup({
						projectId: projectConfig.projectId,
						name: groupName,
						description: "This group was created by developer's chat application",
						admins: [user?._id ?? "id"],
						membersList: Array.from(
							new Set([user?._id ?? "id", ...selectedGroup.map((people) => people._id)])
						),
					});
					window.location.reload();
					break;
				default:
					break;
			}
			setIsLoading(false);
			setVisible(false);
		};

		setIsLoading(true);
		createGroup();
		console.log("F");
	};

	return (
		<Dialog
			open={visible}
			onClose={() => setVisible(false)}
			className="relative z-50"
		>
			<div
				className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
				aria-hidden="true"
			/>

			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto p-4 space-y-2 lg:space-y04 w-full lg:w-2/5 rounded-lg bg-blue-50 shadow-lg">
					<Dialog.Title className="font-semibold text-2xl lg:text-3xl text-blue-500">
						Start New Chat
					</Dialog.Title>
					<div>
						<div className="flex items-center space-x-2 lg:space-x-4">
							<div className="w-1/3">
								<p className="text-xs lg:text-sm font-semibold mb-1 text-blue-600">Chat Type</p>
								<ListBox
									selected={selectedChat}
									setSelected={setSelectedChat}
									chatOptions={chatOptions}
								/>
							</div>
							{projectUsers?.length > 0 && selectedChat.name === chatOptions[1].name && (
								<div className="grow">
									<p className="text-xs lg:text-sm font-semibold mb-1 text-blue-600">Group Name</p>
									<input
										className="w-full truncate rounded-lg p-1.5 shadow-md bg-white text-sm placeholder-slate-400  ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
										placeholder="Enter Group Name"
										value={groupName}
										onChange={(e) => setGroupName(e.target.value)}
										required
									/>
								</div>
							)}
							{projectUsers?.length > 0 && selectedChat.name === chatOptions[0].name && (
								<div className="grow">
									<p className="text-xs lg:text-sm font-semibold mb-1 text-blue-600">Select User</p>
									<ComboBox
										selected={selectedPeople}
										setSelected={setSelectedPeople}
										peopleOptions={projectUsers}
										className="grow"
									/>
								</div>
							)}
						</div>
						{projectUsers?.length > 0 && selectedChat.name === chatOptions[1].name && (
							<div className="grow mt-4">
								<p className="text-xs lg:text-sm font-semibold mb-1 text-blue-600">Add Users</p>
								<GroupComboBox
									selected={selectedGroup}
									setSelected={setSelectedGroup}
									peopleOptions={projectUsers}
									className="grow"
								/>
							</div>
						)}
						<div className="mt-4 text-center">
							<button
								type="button"
								disabled={isLoading}
								className="shadow-lg disabled:bg-slate-200 disabled:text-slate-900 shadow-slate-200 mx-auto rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-md font-medium text-white active:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								onClick={() => handleSubmit()}
							>
								{isLoading ? "Creating..." : "Create Chat"}
							</button>
						</div>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default AddChat;
