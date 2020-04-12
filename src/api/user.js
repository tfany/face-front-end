import {service} from "../utils/request";

export function addUser(id,name,phone,permissions) {
  return service({
    url:'/addUser',
    method: 'post',
    data:{
      id,
      name,
      phone,
      createTime: new Date(),
      updateTime: new Date(),
      permissions,
    }
  })
}
