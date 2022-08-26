import React from "react";
import { useChattGator } from "../../../contexts";
import ChatWindow from "../ChatWindow";
import ChatHeader from "../ChatHeader";
import { Input, StartChat, Loading } from "../../Misc";

interface Props {
	className?: string;
}

const ChatContainer: React.FC<Props> = ({ className = "" }) => {
	const { socket, user, chatId, profileDetails, chatMessages, isLoading } = useChattGator();

	const sendMessage = (message: string) => {
		const messageObj = {
			user: user,
			groupId: chatId,
			messageType: "Text",
			message,
			createdAt: Date.now(),
		};

		console.log(messageObj);
		socket.emit("chatMessage", messageObj);
	};

	if (chatId === "") {
		return (
			<div
				className={`gap-2 lg:gap-4 h-screen grid place-content-center ${
					profileDetails === null ? "lg:col-span-6" : "lg:col-span-4"
				}`}
			>
				<StartChat className="w-4/5 mx-auto" />
				<p className="text-slate-600 lg:text-lg italic text-center">Click on user or group to interact</p>
			</div>
		);
	}

	return (
		<section
			className={`bg-blue-50 ${
				profileDetails === null ? "lg:col-span-6" : "lg:col-span-4"
			} h-screen flex flex-col justify-between relative overflow-y-auto ${className}`}
		>
			<ChatHeader />
			{isLoading ? (
				<div className="flex bg-white h-full items-center justify-center pt-4 lg:pt-8 space-x-2 text-blue-600">
					<Loading className="w-5 h-5 lg:w-6 lg:h-6" />
					<span className="text-sm lg:text-base">Loading Messages</span>
				</div>
			) : (
				<>
					<ChatWindow messages={chatMessages} />
					<Input sendMessage={sendMessage} />
				</>
			)}
		</section>
	);
};

export default ChatContainer;
