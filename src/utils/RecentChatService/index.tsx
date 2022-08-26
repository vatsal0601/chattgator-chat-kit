import { HttpClient } from "../../lib";

interface GroupResponse {
	projectId: string;
	name?: string;
	description?: string;
	isGroup: boolean;
	admins: string[];
	membersList: string[];
	messages: string[];
	_id: string;
	createdAt: string;
}

interface Member {
	_id: string;
	name: string;
}

interface GroupMembersResponse {
	_id: string;
	projectId: string;
	name: string;
	description: string;
	isGroup: boolean;
	admins: Member[];
	membersList: Member[];
	messages: string[];
	createdAt: string;
}

interface createGroup {
	projectId: string;
	name: string;
	description: string;
	admins: string[];
	membersList: string[];
}

interface createOneToOne {
	projectId: string;
	membersList: string[];
}

class RecentChatService extends HttpClient {
	public async getRecentChatsByUser(id?: string): Promise<GroupMembersResponse[]> {
		return this.get(`/group?membersList=${id}`);
	}

	public async createGroup(data: createGroup): Promise<GroupResponse> {
		return this.post("/group", { ...data, isGroup: true });
	}

	public async createOneToOneChat(data: createOneToOne): Promise<GroupResponse> {
		return this.post("/group", { ...data, isGroup: false });
	}

	public async addMemberToGroup(id: string, memberId: string): Promise<GroupResponse> {
		return this.patch(`/group/member/add/${id}`, { memberId });
	}

	public async removeMemberToGroup(id: string, memberId: string): Promise<GroupResponse> {
		return this.patch(`/group/member/add/${id}`, { memberId });
	}

	public async getGroupById(id: string): Promise<GroupResponse> {
		return this.get(`/group/${id}`);
	}
}

export default RecentChatService;
