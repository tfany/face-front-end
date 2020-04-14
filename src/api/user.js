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
 * 退出登录
 * @returns {AxiosPromise}
 */
export function logout() {
  return service({
    url: '/loginOut',
    method: 'post'
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
      createTime: new Date(),
      updateTime: new Date(),
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

