import axios from 'axios'
import store from '../store'
import {getToken} from "./auth";
import {Message} from "view-design";
import router from '../router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true,
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  //console.log(error) // for debug
})

service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 200) {
      Message.error('error')
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    Message.error('用户身份过期，请重新登录')
    router.push({
      path: '/'
    })
    return Promise.reject(error)
  }
)


const baiduServer = axios.create({
  baseURL: process.env.BAIDU_API, // api的base_url
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000 // 请求超时时间
})

export {
  service,
  baiduServer
}




