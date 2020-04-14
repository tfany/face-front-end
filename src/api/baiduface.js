import {baiduServer} from "../utils/request";

//人脸对比
export function faceSearch(faceData, group_id, baiduToken) {
  return baiduServer({
    url: '/search?access_token=' + baiduToken,
    method: 'post',
    data: {
      "image": faceData, //人脸数据
      "image_type": "BASE64", //图片形式
      "group_id_list": group_id,  //分组
      "match_threshold": 80  //匹配阈值
    }
  })
}

//活体检测
export function  faceVerify(faceData, baiduToken) {
  return baiduServer({
    url: '/faceverify?access_token=' + baiduToken,
    method: 'post',
    data: [
      {
        "image": faceData, //人脸数据
        "image_type": "BASE64" //图片形式
      }
    ]
  })
}

//人脸注册
export function faceAdd(faceData, baiduToken,groupId,userId,userInfo) {
  return baiduServer({
    url: '/faceset/user/add?access_token=' + baiduToken,
    method: 'post',
    data:
      {
        "image": faceData, //人脸数据
        "image_type": "BASE64", //图片形式
        "group_id":groupId,
        "user_id": userId,
        "user_info": userInfo
      }
  })
}

//删除用户

export function deleteUser(baiduToken,groupId,userId) {
  return baiduServer({
    url:'/faceset/user/delete?access_token='+baiduToken,
    method:'post',
    data:{
      group_id: groupId,
      user_id: userId
    }
  })
}


