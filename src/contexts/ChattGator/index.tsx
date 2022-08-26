import { ProfileService, ChatService } from "../../utils";
import { useEffect, createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { io, Socket } from "socket.io-client";
import React, { FC, ReactNode } from "react";

const socket: Socket = io("https://chatgator-backend.herokuapp.com");

interface UserResponse {
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	_id: string;
	createdAt: string;
}

interface Message {
	userId: UserResponse;
	groupId: string;
	messageType: "Text" | "Image" | "Video" | "File";
	message: string;
}

interface ProjectConfig {
	projectId: string;
	projectSecret: string;
}

interface User {
	projectId: ProjectConfig["projectId"];
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
}

interface ChattGatorContextProps {
	socket: Socket;
	projectConfig: ProjectConfig;
	user: UserResponse | null;
	chatId: string;
	setChatId: Dispatch<SetStateAction<string>>;
	profileDetails: ProfileType | null;
	setProfileDetails: Dispatch<SetStateAction<ProfileType | null>>;
	activeChat: any;
	setActiveChat: Dispatch<SetStateAction<any>>;
	chatMessages: Message[];
	setChatMessages: Dispatch<SetStateAction<Message[]>>;
	isLoading: boolean;
	isMessagesLoading: boolean;
}

interface InitialValue {
	projectConfig: ProjectConfig;
	user: User;
}

interface ChattGatorProviderProps {
	value: InitialValue;
	children: ReactNode;
}

interface ProfileType {
	id: string;
	isGroup: boolean;
}

interface MessageResponse {
	user: UserResponse;
	success: boolean;
	message: string;
}

const ChattGatorContext = createContext<ChattGatorContextProps | undefined>(undefined);

export const ChattGatorProvider: FC<ChattGatorProviderProps> = ({ value, children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(true);
	const [user, setUser] = useState<UserResponse | null>(null);
	const [activeChat, setActiveChat] = useState<any>(null);
	const [chatId, setChatId] = useState<string>("");
	const [profileDetails, setProfileDetails] = useState<ProfileType | null>(null);
	const [chatMessages, setChatMessages] = useState<Message[]>([]);

	useEffect(() => {
		const getData = async () => {
			const userResponseService = new ProfileService();
			try {
				const data = await userResponseService.getUserByUserId(value.user.userId);
				setUser(data[0]);
				socket.on("connect", () => console.log(`Client connected: ${socket.id}`));
				socket.on("message", ({ user, message }: MessageResponse) => {
					console.log({ user, message });
					setChatMessages((chatMessages) => [
						...chatMessages,
						{ userId: user, groupId: chatId, messageType: "Text", message },
					]);
				});
				socket.on("disconnect", (reason) => console.log(`Client disconnected: ${reason}`));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, [value.user.userId]);

	useEffect(() => {
		const getData = async () => {
			const chatService = new ChatService();
			const messagesData = await chatService.getMessageByGroup(chatId);
			setChatMessages(messagesData.reverse());
			setIsMessagesLoading(false);
		};

		setIsMessagesLoading(true);
		setChatMessages([]);
		if (chatId !== "") {
			socket.emit("joinRoom", { user, groupId: chatId });
			getData();
		}
	}, [chatId]);

	return (
		<ChattGatorContext.Provider
			value={{
				projectConfig: value.projectConfig,
				user,
				socket,
				chatId,
				setChatId,
				profileDetails,
				setProfileDetails,
				isLoading,
				activeChat,
				setActiveChat,
				chatMessages,
				setChatMessages,
				isMessagesLoading,
			}}
		>
			{children}
		</ChattGatorContext.Provider>
	);
};

export const useChattGator: () => ChattGatorContextProps = () => {
	const context = useContext(ChattGatorContext);
	if (context === undefined) throw new Error("useChattGator must be used within a ChattGatorProvider");
	return context;
};
