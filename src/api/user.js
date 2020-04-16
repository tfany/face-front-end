import {service} from "../utils/request";

/**
 * 用户登录
 * @param userId
 * @returns {AxiosPromise}
 */
export function login(userId) {
  return service({
    url: '/login',
    method: 'post',
    params: {
      userId
    }
  })

}


/**
 * 添加用户
 * @param id 用户id
 * @param name 用户姓名
 * @param phone 手机号码
 * @param permissions 权限
 * @returns {AxiosPromise}
 */
export function addUser(id, name, phone, permissions) {
  return service({
    url: '/addUser',
    method: 'post',
    data: {
      id,
      name,
      phone,
      permissions,
    }
  })
}

/**
 * 获取用户信息
 * @returns {*}
 */
export function getInfo() {
  return request({
    url: '/info',
    method: 'get',
  })
}

export function findUserById(userId) {
  return service({
    url: 'findUserById',
    method: 'get',
    params:{
      userId
    }
  })
}

/**
 * 获取用户列表
 * @param pageNum
 * @param pageSize
 * @param groupId
 * @returns {AxiosPromise}
 */
export function getList(pageNum, pageSize, groupId) {
  return service({
    url: "/getUser",
    method: 'get',
    params: {
      pageNum,
      pageSize,
      groupId
    }
  })
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteUser(id) {
  return service({
    url: "deleteUser",
    method: 'post',
    params: {
      userId: id
    }
  })
}

/**
 * 故障报修
 * @param customerId 用户id
 * @param badType 错误类型
 * @param customerTalk 用户留言
 * @returns {AxiosPromise}
 */
export function tellNewBad(customerId, badType, customerTalk) {
  return service({
    url: '/tellNewBad',
    method: 'post',
    data:{
      customerId,
      badType,
      customerTalk
    }
  })
}

/**
 * 获取用户维修历史
 * @param customerId id
 * @returns {AxiosPromise}
 */
export function queryTellBadRecord(customerId){
  return service({
    url: '/queryTellBadRecord',
    method: 'get',
    params:{
      customerId
    }
  })
}
