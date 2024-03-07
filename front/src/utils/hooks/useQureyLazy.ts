import { useCallback, useState } from 'react';

export const useQueryLazy = <K>(request: () => Promise<any>) => {
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const query = useCallback(async (): Promise<ApiResponse<K>> => {
    setIsLoading(true);
    try {
      return await request().then(async (response) => {
        setStatus(response.status);
        return response.data;
      });
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
      return { success: false, data: { message: (error as Error).message } };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { query, error, isLoading, status };
};
