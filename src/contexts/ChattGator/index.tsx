import React, { useEffect, createContext, useContext, useState } from "react";
import { ProfileService, ChatService } from "../../utils";
import { io, Socket } from "socket.io-client";

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
	setChatId: React.Dispatch<React.SetStateAction<string>>;
	profileDetails: ProfileType | null;
	setProfileDetails: React.Dispatch<React.SetStateAction<ProfileType | null>>;
	activeChat: any;
	setActiveChat: React.Dispatch<React.SetStateAction<any>>;
	chatMessages: Message[];
	setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	isLoading: boolean;
	isMessagesLoading: boolean;
	projectUsers: UserResponse[];
	selectedPeople: UserResponse;
	setSelectedPeople: React.Dispatch<React.SetStateAction<UserResponse>>;
	selectedGroup: UserResponse[];
	setSelectedGroup: React.Dispatch<React.SetStateAction<UserResponse[]>>;
}

interface InitialValue {
	projectConfig: ProjectConfig;
	user: User;
}

interface ChattGatorProviderProps {
	value: InitialValue;
	children: React.ReactNode;
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

export const ChattGatorProvider: React.FC<ChattGatorProviderProps> = ({ value, children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(true);
	const [projectUsers, setProjectUsers] = useState<UserResponse[]>([]);
	const [user, setUser] = useState<UserResponse | null>(null);
	const [activeChat, setActiveChat] = useState<any>(null);
	const [chatId, setChatId] = useState<string>("");
	const [profileDetails, setProfileDetails] = useState<ProfileType | null>(null);
	const [chatMessages, setChatMessages] = useState<Message[]>([]);
	const [selectedPeople, setSelectedPeople] = useState<UserResponse>(projectUsers[0]);
	const [selectedGroup, setSelectedGroup] = useState<UserResponse[]>([projectUsers[0]]);

	useEffect(() => {
		const getData = async () => {
			const userResponseService = new ProfileService();
			try {
				const allUsers = await userResponseService.getAllUsers(value.projectConfig.projectId);
				console.log({ allUsers, chatMessages });
				setProjectUsers(allUsers);
				setSelectedPeople(allUsers[0]);
				setSelectedGroup([allUsers[0]]);
				const data = await userResponseService.getUserByUserId(value.user.userId);
				if (data.length === 0) {
					const user = await userResponseService.createUser(value.user);
					setUser(user);
				} else {
					setUser(data[0]);
				}
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
	}, []);

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
				projectUsers,
				selectedPeople,
				setSelectedPeople,
				selectedGroup,
				setSelectedGroup,
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
