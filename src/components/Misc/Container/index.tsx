import React, { FC, ReactNode } from "react";

interface Props {
	className?: string;
	children: ReactNode;
}

const Container: FC<Props> = ({ className = "", children }) => {
	return (
		// TODO - Vatsal: Remove min-h-screen in prod
		<section className={`min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 ${className}`}>
			{children}
		</section>
	);
};

export default Container;
