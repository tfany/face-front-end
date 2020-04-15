import {service} from "../utils/request";

/**
 * 模拟数据
 * @param userId 用户id
 * @returns {AxiosPromise}
 */
export  function imitationData(userId) {
  return service({
    url: "/imitationData",
    method: 'post',
    params: {
      userId,
      count: 12
    }
  })
}

/**
 * 获取当月数据
 * @param userId
 * @returns {AxiosPromise}
 */
export function getCurrentMonth(userId){
  return service({
    url: "/getCurrentMonth",
    method: 'get',
    params: {
      userId,
      amount: 0
    }
  })
}

export function getHistory(userId) {
  return service({
    url: '/getHistory',
    method: 'get',
    params:{
      userId,
      amount: 24
    }
  })
}
