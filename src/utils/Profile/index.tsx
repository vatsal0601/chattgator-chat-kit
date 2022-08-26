import { HttpClient } from "../../lib";

interface NewUserBio {
	_id: string;
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
}

interface UserBioResponse {
	projectId: string;
	name: string;
	userId: string;
	avatar: string;
	userName: string;
	bio: string;
	_id: string;
	createdAt: string;
}

interface UserUpdatedBio {
	_id: string;
	userId: string;
	name: string;
	avatar: string;
	userName: string;
	bio: string;
}

class ProfileService extends HttpClient {
	public async getAllUsers(projectId: string): Promise<UserBioResponse[]> {
		return this.get(`/user?projectId=${projectId}`);
	}

	public async getUserById(id?: string): Promise<UserBioResponse> {
		return this.get(`/user/${id}`);
	}

	public async getUserByUserId(id?: string): Promise<UserBioResponse[]> {
		return this.get(`/user?userId=${id}`);
	}

	public async createUser(data: NewUserBio): Promise<UserBioResponse> {
		return this.post("/user", data);
	}

	public async deleteUser(userId: string): Promise<UserBioResponse> {
		return this.delete(`/user/${userId}`);
	}

	public async updateUser(data: UserUpdatedBio): Promise<UserBioResponse> {
		return this.put(`/user/${data._id}`, data);
	}
}

export default ProfileService;
