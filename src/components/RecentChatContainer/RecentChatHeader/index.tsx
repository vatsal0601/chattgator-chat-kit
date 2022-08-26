import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useChattGator } from "../../../contexts";
import Image from "../../Misc/Image";
import NewChat from "../NewChat";

interface Props {
	className?: string;
}

const RecentChatHeader: React.FC<Props> = ({ className = "" }) => {
	const [visible, setVisible] = useState(false);
	const { user, setProfileDetails } = useChattGator();

	return (
		<>
			<NewChat
				visible={visible}
				setVisible={setVisible}
			/>
			<div
				className={`flex items-center justify-between border-b-2 border-slate-200 space-x-2 px-4 lg:px-8 pb-2 lg:pb-4 ${className}`}
			>
				<button onClick={() => setProfileDetails({ id: user?._id ?? "", isGroup: false })}>
					<Image
						src={
							user?.avatar ??
							`https://ui-avatars.com/api/name=${user?.name ?? "Unknown Name"}?&background=random`
						}
						alt={user?.name ?? "Unknown Name"}
					/>
				</button>
				<div className="space-x-2 lg:space-x-4">
					<button
						onClick={() => setVisible(true)}
						className="rounded-lg hover:bg-blue-100 text-blue-600 active:text-blue-700 inline-flex items-center space-x-1 lg:space-x-2 px-2 py-1 lg:px-4 lg:py-2 transition-colors"
					>
						<PlusIcon className="w-4 h-4 lg:w-5 lg:h-5" />
						<span className="font-semibold">New Chat</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default RecentChatHeader;
