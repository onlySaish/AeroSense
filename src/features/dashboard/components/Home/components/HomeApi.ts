import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api/v1', // Backend API base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export interface LocationData {
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  pollutants: {
    [parameter: string]: string | null;
  };
}

// Get air quality data via backend proxy
export async function getAirQualityData(
  lat: number,
  lon: number
): Promise<{ data: LocationData[] }> {
  try {
    const response = await axiosInstance.get<{ data: LocationData[] }>('/home/air-quality', {
      params: {
        lat,
        lon,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Air Quality Fetch Error:', error.response?.data?.message || error.message);
    throw error.response?.data?.message || 'Failed to fetch air quality data';
  }
}
