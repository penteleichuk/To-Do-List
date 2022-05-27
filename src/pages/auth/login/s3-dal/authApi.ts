import { AxiosResponse } from 'axios';
import { instance } from '../../../../app/s3-dall/instance';

export const authApi = {
	// Is current user authorized
	getAuthMe() {
		return instance.get<AuthResponse<AuthMeResponse>>('/auth/me');
	},

	// Authorize on the service
	login(data: LoginParamsType) {
		return instance.post<
			LoginParamsType,
			AxiosResponse<AuthResponse<{ userId: number }>>
		>('/auth/login', data);
	},

	// Unfollow requested user
	logout() {
		return instance.delete<AuthResponse>('/auth/login');
	},
};

export type AuthResponse<D = {}> = {
	resultCode: number;
	messages: string[];
	fieldsErrors: Array<string>;
	data: D;
};

type AuthMeResponse = {
	id: number;
	email: string;
	login: string;
};

export type LoginParamsType = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha?: string;
};
