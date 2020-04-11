import axios from 'axios'

// 创建axios实例
export const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials:  true,
  timeout: 15000 // 请求超时时间
})

export const baiduServer = axios.create({
  baseURL: process.env.BAIDU_API, // api的base_url
  withCredentials:  true,
  headers:{
    "Content-Type":"application/json"
  },
  timeout: 15000 // 请求超时时间
})





