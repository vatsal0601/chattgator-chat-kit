import React from "react";

interface Props {
	name: string;
}

type ConditionalProps =
	| {
			username?: string;
			NoOfParticipates?: never;
	  }
	| {
			username?: never;
			NoOfParticipates?: number;
	  };

const ProfileMembers: React.FC<Props & ConditionalProps> = ({ name, username, NoOfParticipates }) => {
	return (
		<>
			<div className="text-center border-b-2 border-slate-200 pb-2">
				<h1 className="text-blue-500 text-3xl font-semibold capitalize">{name}</h1>
				{username ? (
					<h1 className="text-slate-500 text-lg font-normal">{username}</h1>
				) : (
					<h1 className="text-slate-500 text-xl font-normal">{NoOfParticipates} Members</h1>
				)}
			</div>
		</>
	);
};

export default ProfileMembers;
