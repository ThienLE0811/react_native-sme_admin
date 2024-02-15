import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Accept: 'application/json, text/plain, */*',
    ...config.headers,
  };

  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  async (res: any) => {
    if (res.data && res.status === 200) {
      return res;
    }

    throw new Error('Error');
  },
  error => {
    console.log(`Error api ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);

export default axiosClient;
