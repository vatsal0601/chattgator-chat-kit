import { HttpClient } from "../../lib";

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
	createdAt: Date;
}

interface MessageResponse {
	userId: string;
	groupId: string;
	messageType: "Text" | "Image" | "Video" | "File";
	message: string;
	createdAt: Date;
}

class ChatService extends HttpClient {
	public async getRecentChatsByGroup(id: string): Promise<MessageResponse[]> {
		return this.get(`/message?groupId=${id}`);
	}

	public async getMessageByGroup(id: string): Promise<Message[]> {
		return this.get(`/message?groupId=${id}`);
	}
}

export default ChatService;
