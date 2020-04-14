import { login, logout, getInfo } from '../../api/user'
import {getToken, setToken,removeToken} from "../../utils/auth";
import {getCookie} from "../../utils/support";

const user = {
  state: {
    token: getToken(),
    id: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 登录
    Login({ commit },userId) {
      return new Promise((resolve, reject) => {
        login(userId).then(response => {
          const data = response.data
          const token = data.data
          setToken(token)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
