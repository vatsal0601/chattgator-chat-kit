import React, { useState, useEffect } from "react";
import { ProfileService } from "../../../utils";
import { useChattGator } from "../../../contexts";
import Image from "../../Misc/Image";

interface Member {
	_id: string;
	name: string;
}

interface Props {
	_id: string;
	id: string;
	setId: React.Dispatch<React.SetStateAction<string>>;
	name?: string;
	isGroup: boolean;
	membersList: Member[];
	className?: string;
}

interface UserBioResponse {
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	_id: string;
	createdAt: string;
}

const RecentChatCard: React.FC<Props> = ({ _id, id, setId, name, isGroup, membersList, className = "" }) => {
	const [user, setUser] = useState<UserBioResponse | null>(null);
	const { user: globalUser, setActiveChat } = useChattGator();

	useEffect(() => {
		if (isGroup) return;
		const getData = async () => {
			const userResponseService = new ProfileService();
			const [member1, member2] = membersList;
			if (globalUser?._id === member1._id) {
				const data = await userResponseService.getUserById(member2._id);
				setUser(data);
			} else {
				const data = await userResponseService.getUserById(member1._id);
				setUser(data);
			}
		};
		getData();
	}, [globalUser?._id, isGroup, membersList]);

	return (
		<button
			onClick={() => {
				setId(_id);
				if (isGroup) {
					setActiveChat({ _id, name, isGroup });
				} else {
					setActiveChat({ _id: user?._id, name: user?.name, isGroup: false, avatar: user?.avatar });
				}
			}}
			className={`flex w-full items-center space-x-2 lg:space-x-4 p-2 lg:p-4 rounded-xl hover:bg-blue-100  ${
				_id === id ? "bg-blue-100 rounded-xl" : ""
			} transition-colors ${className}`}
		>
			<Image
				src={
					name
						? `https://ui-avatars.com/api/name=${name}?&background=random`
						: user?.avatar ??
						  `https://ui-avatars.com/api/name=${user?.name ?? "Unknown User"}?&background=random`
				}
				alt={user?.name ?? "user-name"}
				className="w-10 h-10 lg:w-14 lg:h-14 flex-shrink-0"
			/>
			<div className="flex-grow">
				<div className="flex items-center justify-between space-x-2">
					<h4
						className={`font-semibold text-lg lg:text-xl ${
							_id === id ? "text-blue-600" : "text-slate-900"
						}`}
					>
						{name ? name : user?.name}
					</h4>
				</div>
			</div>
		</button>
	);
};

export default RecentChatCard;
