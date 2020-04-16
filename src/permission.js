import router from './router'
import { Message } from 'view-design'
import {getToken, removeToken} from "./utils/auth";
import {getCookie} from "./utils/support";

router.beforeEach((to,from,next)=>{
  if(to.path === '/'){
    next()
  }else{
    if(getToken()){
      const role=getCookie("groupId")
      if(to.meta.roles.includes(role)){
        next()	//放行
      }else{
        Message.error('非法操作！')
        next({path:role})	//跳页面
      }
    }
    else{
      Message.error("请先登录！")
      next({path:'/'})
    }
  }


})


