import React from "react";
import Message from "../Message";
import { useChattGator } from "../../../contexts";

interface Props {
	className?: string;
	messages: any;
}

const ChatWindow: React.FC<Props> = ({ className = "", messages }) => {
	const { user } = useChattGator();

	return (
		<>
			<div className={`bg-white h-full justify-end flex flex-col ${className}`}>
				{messages.map((message: any, index: number) => (
					<Message
						key={index}
						sender={user?._id === message?.userId?._id ?? false}
						name={message?.userId?.name}
						message={message.message}
						time={new Date(message.createdAt)}
					/>
				))}
			</div>
		</>
	);
};

export default ChatWindow;
