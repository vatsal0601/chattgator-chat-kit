import { HttpClient } from "../../lib";

interface NewUser {
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
}

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

interface UpdateUser {
	_id: string;
	userId: string;
	name: string;
	avatar: string;
	userName: string;
	bio: string;
}

class ProfileService extends HttpClient {
	public async getAllUsers(projectId: string): Promise<UserResponse[]> {
		return this.get(`/user?projectId=${projectId}`);
	}

	public async getUserById(id?: string): Promise<UserResponse> {
		return this.get(`/user/${id}`);
	}

	public async getUserByUserId(id?: string): Promise<UserResponse[]> {
		return this.get(`/user?userId=${id}`);
	}

	public async createUser(data: NewUser): Promise<UserResponse> {
		return this.post("/user", data);
	}

	public async deleteUser(userId: string): Promise<UserResponse> {
		return this.delete(`/user/${userId}`);
	}

	public async updateUser(data: UpdateUser): Promise<UserResponse> {
		return this.put(`/user/${data._id}`, data);
	}
}

export default ProfileService;
