import {service} from "../utils/request";

export function queryFixBadRecord() {
  return service({
    url: 'queryFixBadRecord',
    method: 'get'
  })
}
