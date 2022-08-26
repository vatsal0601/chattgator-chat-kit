import React from "react";

interface Props {
	title?: string;
	description: string;
}

const ProfielDescription: React.FC<Props> = ({ title, description }) => {
	return (
		<>
			<div className="p-5 border-b-2 border-slate-200">
				<span className="font-medium text-lg text-blue-600">{title}</span>
				<div className="text-slate-500  text-justify leading-6">{description}</div>
			</div>
		</>
	);
};

export default ProfielDescription;

ProfielDescription.defaultProps = {
	title: "Bio",
};
