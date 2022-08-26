import React, { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import { UserResponse } from "../../../utils";
import { useChattGator } from "../../../contexts";
import Image from "../../Misc/Image";

interface Props {
	_id: string;
	id: string;
	setId: Dispatch<SetStateAction<string>>;
	name?: string;
	isGroup: boolean;
	messages: string[];
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

const RecentChat: FC<Props> = ({ _id, id, setId, name, isGroup, messages, className = "" }) => {
	const [user, setUser] = useState<UserBioResponse | null>(null);
	const { user: globalUser, setCurrentChatUser } = useChattGator();

	useEffect(() => {
		if (isGroup) return;
		const getData = async () => {
			const userResponseService = new UserResponse();
			const data = await userResponseService.getUserById(globalUser?._id);
			setUser(data);
		};
		getData();
	}, [globalUser?._id, isGroup]);

	return (
		<button
			onClick={() => {
				setId(_id);
				setCurrentChatUser(user);
			}}
			className={`flex w-full items-center space-x-2 lg:space-x-4 p-2 rounded-xl hover:bg-blue-100  ${
				_id === id ? "bg-blue-100 rounded-xl p-2" : ""
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
					{/* {messages.length > 0 && (
						<span className="text-xs lg:text-sm font-light">
							{new Date(messages[0].createdAt).toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
							})}
						</span>
					)} */}
				</div>
				{/* {messages.length > 0 && <p className="text-slate-600 text-sm lg:text-base">{messages[0].message}</p>} */}
			</div>
		</button>
	);
};

export default RecentChat;
