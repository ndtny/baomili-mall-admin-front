import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { ElMessage, ElMessageBox } from 'element-plus';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.user().token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('response', response);
    // if the custom code is not 200, it is judged as an error.
    if (response.data.code !== 200) {
      ElMessage({
        message: response.data.message || '未知异常，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      });

      // 500: Illegal token; 401: Other clients logged in; 403: Token expired;
      if (response.data.code === 500) {
        return Promise.reject(new Error(response.data.message || '未知异常'));
      }
      if (response.data.code === 401) {
        return Promise.reject(new Error('用户权限不足'));
      }
      if (response.data.code === 403) {
        return Promise.reject(new Error('用户信息失效，请重新登录'));
      }
    } else {
      return response;
    }
  },
  error => {
    console.log('err' + error); // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
