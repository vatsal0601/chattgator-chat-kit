import React from "react";
import { useChattGator } from "../../contexts";
import { Loading } from "../Misc";

interface ButtonProps {
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ className }) => {
	const { user, isLoading, projectConfig } = useChattGator();

	if (isLoading)
		return (
			<div className="flex items-center justify-center space-x-1 font-semibold text-blue-600">
				<Loading className="w-5 h-5" />
				<span>Loading</span>
			</div>
		);

	return (
		<div className={`space-y-4 ${className}`}>
			<pre className="block bg-slate-900 text-white p-4">{JSON.stringify(projectConfig, null, 2)}</pre>
			<pre className="block bg-slate-900 text-white p-4">{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
};

export default Button;
