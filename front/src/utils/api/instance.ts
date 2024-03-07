type BaseUrl = string;
const baseUrl: BaseUrl = 'http://localhost:4000/';

export class API {
	readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async request<T>(endpoint: string, options: RequestInit = {}) {
		const response = await fetch(this.baseUrl + endpoint, options);

		if (!response.ok) throw new Error(response.statusText);

		return (await response.json) as T;
	}

	get(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
		return this.request(endpoint, { ...options, method: 'GET' });
	}

	post(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
		return this.request(endpoint, {
			...options,
			method: 'POST',
			...(!!body && { body: JSON.stringify(body) })
		});
	}
}

export const api = new API(baseUrl);
