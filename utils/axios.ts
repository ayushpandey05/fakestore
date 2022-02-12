import axios, {AxiosRequestConfig} from 'axios';

const axiosBase = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

const AxiosInstance = {
  get: async (url: string, config?: AxiosRequestConfig<any> | undefined) => {
    try {
      const res = await axiosBase.get(url, config);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }
  },
  post: async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined,
  ) => {
    try {
      const res = axiosBase.post(url, data, config);
      return res;
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export default AxiosInstance;
