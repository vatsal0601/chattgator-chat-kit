import React from "react";

interface ButtonProps {
	className?: string;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, children }) => {
	return (
		<button className={`bg-yellow-300 text-slate-900 px-2 py-1 rounded-lg font-semibold ${className}`}>
			{children}
		</button>
	);
};

export default Button;
