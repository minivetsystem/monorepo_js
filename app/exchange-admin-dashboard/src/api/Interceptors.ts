import { ILoginResponse } from '../types/user';

import instance from './BaseApi';

const SetUpInterceptor = (store: any) => {

  const refreshAccessTokenFn = async () => {
    const response: any = await instance.get<ILoginResponse>('/api/auth/refresh-token');
    store.dispatch.user.setUserTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken
     });
    return response.data;
  };
  
  instance.interceptors.request.use(config => {
    const state = store.getState();
    if(config?.url.indexOf('refresh-token') === -1 && state.user.userTokens.accessToken) {
      config.headers['Authorization'] = `Bearer ${state.user.userTokens.accessToken}`;
    } else if(config?.url.indexOf('refresh-token') >= 0 && state.user.userTokens.refreshToken) {
      config.headers['Authorization'] = `Bearer ${state.user.userTokens.refreshToken}`;
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
  
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const errMessage = error?.response?.data.message;
      if (errMessage === 'jwt expired' && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessTokenFn();
        return instance(originalRequest);
      } else {
        //ToDo redirect to login.
        //document.location.href = '/';
      }
      return Promise.reject(Array.isArray(error?.response?.data?.message) ? error?.response?.data?.message : [error?.response?.data?.message]);
    }
  );
}

export default SetUpInterceptor