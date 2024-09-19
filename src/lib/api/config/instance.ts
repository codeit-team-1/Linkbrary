import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const onRequest = async (config: InternalAxiosRequestConfig) => {
  console.log(config);
  try {
    const data = await axios.get('/api/get-token/cookie');
    if (data) {
      const accessToken = data.data.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  } catch {}

  const withCredentials = config.withCredentials;

  if (withCredentials) {
    config.withCredentials = false;
  }
  return config;
};

const onResponse = async (value: AxiosResponse) => {
  if (value.data?.accessToken) {
    try {
      const data = await axios.post(
        '/api/save-token/cookie',
        {
          accessToken: value.data.accessToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (process.env.NODE_ENV !== 'production') {
        console.log(data);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(error);
      }
    }
  }
  return value;
};

const onResponseError = (error: AxiosError | Error) => {
  Promise.reject(error);
};

instance.interceptors.request.use(onRequest, onResponseError);

instance.interceptors.response.use(onResponse);
