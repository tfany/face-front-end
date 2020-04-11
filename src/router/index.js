import Vue from 'vue'
import Router from 'vue-router'
import Camera from "../views/login/Camera";
import Home from "../views/manager/Home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'camera',
      component: Camera
    },
    {
      path: '/manager',
      name: 'manager',
      component: Home
    }
  ]
})
