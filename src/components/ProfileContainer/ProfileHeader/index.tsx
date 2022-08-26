import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useChattGator } from "../../../contexts";

interface Props {
	isGroup?: boolean;
}

const ProfileHeader: React.FC<Props> = ({ isGroup }) => {
	const { setProfileDetails } = useChattGator();

	return (
		<button
			onClick={() => setProfileDetails(null)}
			className="flex p-5"
		>
			<XMarkIcon className="text-blue-600 hover:bg-blue-100 hover:rounded-lg cursor-pointer h-8 w-8 mr-2 my-auto" />
			<span className="text-blue-600 text-2xl font-semibold">
				{!isGroup ? "Contact Information" : "Group Information"}
			</span>
		</button>
	);
};

export default ProfileHeader;
