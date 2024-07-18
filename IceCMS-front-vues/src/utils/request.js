import axios from 'axios'
import {getUser} from '@/utils/userUtils'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 跨域请求时是否携带cookies，这里被注释掉了
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    //这里得加个判空条件
    const user = getUser()
    if(user != null) {
      config.headers.Authorization = user.token;
      config.headers.Accept = '*/*';

      // 如果用户信息存在（即用户已登录），则将用户的token添加到请求的Authorization头中，格式为token
      // 这样做是为了在服务器端验证请求的合法性，确保只有持有有效token的用户才能访问受保护的资源。
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

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

)

export default service
