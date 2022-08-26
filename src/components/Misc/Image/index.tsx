import React, { FC } from "react";

interface Props {
	src: string;
	alt: string;
	className?: string;
}

const Image: FC<Props> = ({ src, alt, className = "" }) => {
	return (
		<img
			src={src}
			alt={alt}
			className={`rounded-full object-cover w-10 h-10 lg:w-12 lg:h-12 ${className}`}
		/>
	);
};

export default Image;
