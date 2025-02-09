import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';

export async function fetchData<T>(endpoint: string): Promise<T | null> {
  if (!endpoint) {
    console.error('Endpoint is required');
    return null;
  }

  try {
    const { data } = await axios.get<T>(`${BASE_URL}${endpoint}`, { timeout: 10000 });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : error);
    return null;
  }
}
