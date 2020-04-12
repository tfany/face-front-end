import {service} from "../utils/request";

//获取百度云Token
export function getBaiduToken() {
  return service({
    url:'/getToken',
    method:'post'
  })
}


