import Vue from 'vue'
import Router from 'vue-router'
import Camera from "../views/login/Camera";
import Home from "../views/manager/Home";
import CustomerHome from "../views/Customer/Home";
import Fixer from "../views/fixer/Fixer";

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
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerHome
    },
    {
      path: '/fixer',
      name: 'fixer',
      component: Fixer
    }
  ]
})
