import React, { useEffect, useState } from "react";
import { Search, Loading } from "../../Misc";
import { useSearch } from "../../../hooks/index";
import { useChattGator } from "../../../contexts";
import { RecentChatService } from "../../../utils";
import RecentChatCard from "../RecentChatCard";
import RecentChatHeader from "../RecentChatHeader";

interface Props {
	className?: string;
}

interface Member {
	_id: string;
	name: string;
}

interface GroupMembersResponse {
	_id: string;
	projectId: string;
	name: string;
	description: string;
	isGroup: boolean;
	admins: Member[];
	membersList: Member[];
	messages: string[];
	createdAt: string;
}

const ReacentChatContainer: React.FC<Props> = ({ className = "" }) => {
	const { user, chatId, setChatId, isLoading } = useChattGator();
	const [groups, setGroups] = useState<GroupMembersResponse[]>([]);
	const [search, setSearch, filteredList] = useSearch<GroupMembersResponse>(groups, "name");

	useEffect(() => {
		if (isLoading) return;
		const getData = async () => {
			const recentChatService = new RecentChatService();
			const data = await recentChatService.getRecentChatsByUser(user?._id);
			console.log(data);
			setGroups(data);
		};
		getData();
	}, [user?._id, isLoading]);

	return (
		<div className={`space-y-2 lg:space-y-6 lg:col-span-2 bg-blue-50 ${className}`}>
			<RecentChatHeader />
			<div className="px-4 lg:px-8">
				<Search
					search={search}
					setSearch={setSearch}
				/>
			</div>
			{isLoading ? (
				<div className="flex items-center justify-center pt-4 lg:pt-8 space-x-2 text-blue-600">
					<Loading className="w-5 h-5 lg:w-6 lg:h-6" />
					<span className="text-sm lg:text-base">Loading Recent Chats</span>
				</div>
			) : (
				<div className="space-y-2 lg:space-y-4 px-4 lg:px-8">
					{filteredList.map(({ _id, name, isGroup, membersList }, index) => (
						<RecentChatCard
							key={index}
							_id={_id}
							id={chatId}
							setId={setChatId}
							name={name}
							isGroup={isGroup}
							membersList={membersList}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ReacentChatContainer;
