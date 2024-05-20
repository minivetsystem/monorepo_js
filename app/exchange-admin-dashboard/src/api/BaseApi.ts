import axios from 'axios';
import params from '../configs/params';

const baseApi = axios.create({
  baseURL: params.apiUrl,
  withCredentials: true,
});

baseApi.defaults.headers.common['Content-Type'] = 'application/json';

export default baseApi;