import {service} from "../utils/request";

/**
 * 查询所有维修历史
 * @returns {AxiosPromise}
 */
export function queryFixBadRecord() {
  return service({
    url: 'queryFixBadRecord',
    method: 'get'
  })
}

/**
 * 进行维修
 * @param id 维修表id
 * @param fixResult 维修结果
 * @param fixerId 维修人员id
 * @returns {AxiosPromise}
 */
export function detailBad(id,fixResult,fixerId) {
  return service({
    url: 'detailBad',
    method: 'post',
    data:{
      id,
      fixResult,
      fixerId
    }
  })

}
