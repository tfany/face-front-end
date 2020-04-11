import {service} from "../utils/request";

export function getAccessToken() {
  return service({
    url:'/getToken',
    method:'post'
  })
}
