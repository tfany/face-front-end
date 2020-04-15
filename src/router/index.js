import Vue from 'vue'
import Router from 'vue-router'
import Camera from "../views/login/Camera";
import Home from "../views/manager/Home";
import Fixer from "../views/fixer/Fixer";
import Customer from "../views/customer/Customer";

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
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
      component: Customer
    },
    {
      path: '/fixer',
      name: 'fixer',
      component: Fixer
    }
  ]
})
