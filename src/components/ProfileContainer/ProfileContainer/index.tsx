import React, { useEffect, useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useChattGator } from "../../../contexts";
import { ProfileDescription, ProfileHeader, ProfileImage, GroupMembers, ProfileMembers } from "..";
import { ProfileService, RecentChatService } from "../../../utils";
import { Loading } from "../../Misc";

interface Props {
	className?: string;
}

const ProfileContainer: React.FC<Props> = ({ className = "" }) => {
	const { user: info, isLoading, profileDetails } = useChattGator();
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [bio, setBio] = useState<any>(null);

	useEffect(() => {
		if (isLoading) return;
		const getData = async () => {
			let data = null;
			const useResponseService = new ProfileService();
			const groupResponseService = new RecentChatService();
			if (!profileDetails) return;
			if (profileDetails.isGroup) data = await groupResponseService.getGroupById(profileDetails.id);
			else data = await useResponseService.getUserById(info?._id);

			setBio(data);
			setIsFetching(false);
		};
		getData();
	}, [info?._id, isLoading, profileDetails]);

	return (
		<Transition
			as={Fragment}
			show={profileDetails !== null}
		>
			<section className={`lg:col-span-2 ${className}`}>
				<div className="h-screen">
					<div className="bg-blue-50 min-h-full">
						<ProfileHeader isGroup={profileDetails?.isGroup ?? false} />
						{isLoading && isFetching ? (
							<div className="flex items-center justify-center pt-4 lg:pt-8 space-x-2 text-blue-600">
								<Loading className="w-5 h-5 lg:w-6 lg:h-6" />
								<span className="text-sm lg:text-base">Loading Bio Information</span>
							</div>
						) : (
							<div className="border-t-2 border-slate-200">
								<ProfileImage
									link={
										bio?.avatar ??
										`https://ui-avatars.com/api/name=${
											bio?.name ?? "Unknown Name"
										}?&background=random`
									}
								/>
								{!profileDetails?.isGroup ? (
									<ProfileMembers
										name={bio?.name ?? "unknown_name"}
										username={bio?.userName}
									/>
								) : (
									<ProfileMembers
										name={bio?.name ?? "loading..."}
										NoOfParticipates={bio?.membersList?.length ?? 0}
									/>
								)}
								<ProfileDescription description={bio?.bio ?? bio?.description} />
								{profileDetails?.isGroup && (
									<>
										<hr className="border-slate-50" />
										<GroupMembers
											adminList={bio?.admins ?? []}
											memberList={bio?.membersList ?? []}
										/>
									</>
								)}
							</div>
						)}
					</div>
				</div>
			</section>
		</Transition>
	);
};

export default ProfileContainer;
