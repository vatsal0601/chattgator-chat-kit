import React, { useState, useEffect } from "react";
import { Loading } from "../../Misc";
import { ProfileService } from "../../../utils";
import { useChattGator } from "../../../contexts";

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

interface UserInfo {
	_id: string;
	name: string;
}

interface Props {
	adminList: UserInfo[];
	memberList: UserInfo[];
}

const GroupMembers: React.FC<Props> = ({ adminList, memberList }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<UserBioResponse[] | null>(null);
	const { setProfileDetails } = useChattGator();

	useEffect(() => {
		const getData = async () => {
			const userService = new ProfileService();
			const users: UserBioResponse[] = [];
			for (let i of memberList) {
				const userData = await userService.getUserById(i._id);
				users.push(userData);
			}
			setData(users);
			setIsLoading(false);
		};
		getData();
	}, [memberList]);

	return (
		<>
			<div className="p-5 overflow-auto">
				<span className="font-medium text-lg text-blue-600">Members</span>

				{isLoading ? (
					<div className="flex items-center justify-center pt-4 lg:pt-8 space-x-2 text-blue-600">
						<Loading className="w-5 h-5 lg:w-6 lg:h-6" />
						<span className="text-sm lg:text-base">Loading Members</span>
					</div>
				) : (
					<div className="mt-2">
						{data &&
							data.map((member, index) => (
								<div
									key={index}
									onClick={() => setProfileDetails({ id: member?._id, isGroup: false })}
									className="p-2 mb-2 rounded-lg flex hover:bg-blue-100 cursor-pointer"
								>
									<img
										src={
											member?.avatar ??
											`https://ui-avatars.com/api/name=${
												member?.name ?? "Unknown User"
											}?&background=random`
										}
										alt={member?.name ?? "Unknown User"}
										className="rounded-full h-10"
									/>
									<div className="text-sm ml-3">
										<p className="font-semibold text-slate-700">{member.name}</p>
										<div className="font-medium text-slate-500">
											{adminList.find((admin) => admin._id === member._id) ? "Admin" : "Member"}
										</div>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
		</>
	);
};

export default GroupMembers;
