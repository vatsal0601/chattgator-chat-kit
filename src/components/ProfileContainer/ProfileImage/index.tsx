import React from "react";

interface Props {
	link?: string;
	alt?: string;
}

const ProfileImage: React.FC<Props> = ({ link, alt }) => {
	return (
		<div className="p-5">
			<img
				src={link}
				alt={alt}
				className="mx-auto rounded-full w-2/4"
			/>
		</div>
	);
};

export default ProfileImage;

ProfileImage.defaultProps = {
	link: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
	alt: "Profile Pic",
};
