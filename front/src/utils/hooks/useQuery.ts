import { DependencyList, useEffect, useState } from 'react';

export const useQuery = <K>(
	url: string,
	deps: DependencyList = [],
	config?: Omit<RequestInit, 'method'>
) => {
	const [status, setStatus] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<K | null>(null);

	useEffect(() => {
		setIsLoading(true);
		try {
			fetch(url, {
				method: 'GET',
				credentials: 'same-origin',
				...config,

				headers: {
					'Content-Type': 'application/json',
					...(!!config?.headers && config.headers)
				}
			}).then(async (response) => {
				const responseData = await response.json();
				setStatus(response.status);
				setData(responseData);
			});
		} catch (error) {
			setIsLoading(false);
			setError((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	}, deps);

	return { data, error, isLoading, status };
};
