import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum StatusCode {
	Unauthorized = 401,
	Forbidden = 403,
	TooManyRequests = 429,
	InternalServerError = 500,
}

const headers: Readonly<Record<string, string>> = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

class HttpClient {
	private instance: AxiosInstance | null = null;

	private get http(): AxiosInstance {
		return this.instance ?? this.initHttp();
	}

	initHttp(): AxiosInstance {
		const http = axios.create({
			baseURL: "https://chatgator-backend.herokuapp.com/api/v1",
			headers,
		});

		http.interceptors.response.use(
			(response) => response.data.data,
			(error) => {
				const { response } = error;
				return this.handleError(response);
			}
		);

		this.instance = http;
		return http;
	}

	protected async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.get<T, R>(url, config);
	}

	protected async post<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.http.post<T, R>(url, data, config);
	}

	protected async patch<T = any, R = AxiosResponse<T>>(
		url: string,
		data?: T,
		config?: AxiosRequestConfig
	): Promise<R> {
		return this.http.patch<T, R>(url, data, config);
	}

	protected async put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.put<T, R>(url, data, config);
	}

	protected async delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.delete<T, R>(url, config);
	}

	private handleError(error: any) {
		const { status } = error;

		switch (status) {
			case StatusCode.InternalServerError: {
				throw new Error(`Error InternalServerError(${StatusCode.InternalServerError})`);
			}
			case StatusCode.Forbidden: {
				throw new Error(`Error Forbidden(${StatusCode.Forbidden})`);
			}
			case StatusCode.Unauthorized: {
				throw new Error(`Error Unauthorized(${StatusCode.Unauthorized})`);
			}
			case StatusCode.TooManyRequests: {
				throw new Error(`Error TooManyRequests(${StatusCode.TooManyRequests})`);
			}
		}

		return Promise.reject(error);
	}
}

export default HttpClient;
