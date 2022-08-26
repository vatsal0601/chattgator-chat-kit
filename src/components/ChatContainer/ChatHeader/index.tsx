import { Image } from "../../Misc";
import { useChattGator } from "../../../contexts";
import React from "react";

interface Props {
	className?: string;
}

const ChatHeader: React.FC<Props> = ({ className = "" }) => {
	const { activeChat, setProfileDetails } = useChattGator();

	return (
		<>
			<div
				className={`flex items-center justify-between z-20 bg-blue-600 text-white py-2 lg:py-5 px-2 sticky top-0 left-0 right-0 ${className}`}
			>
				<div
					onClick={() => setProfileDetails({ id: activeChat?._id, isGroup: activeChat?.isGroup })}
					className="flex items-center space-x-2 cursor-pointer"
				>
					<Image
						src={
							activeChat?.avatar ??
							`https://ui-avatars.com/api/name=${activeChat?.name ?? "Test Group"}?&background=random`
						}
						alt={activeChat?.name ?? "user-name"}
						className="w-8 h-8 lg:w-12 lg:h-12 flex-shrink-0"
					/>
					<div>
						<div className="font-bold text-lg">{activeChat?.name ?? "John Doe"}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatHeader;
