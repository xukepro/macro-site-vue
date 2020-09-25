import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUser } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    user: {
      'id': 1,
      'username': 'xuke',
      'nickname': '卡特琳娜',
      'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ4dWtlIiwiY3JlYXRlZCI6MTYwMDczODU4NzQ5MiwiZXhwIjoxNjAxMzQzMzg3fQ.hLlzZXYNqiks0q68TdpSodSKzMDpxRTIfbV9Wyfp_Hceo7UFu_qSXkoX6laP_xgJxcBB_Yryw_9yNRFkg9Ak2g',
      'avatarUrl': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3092876123,1883080168&fm=26&gp=0.jpg',
      'roles': ['USER', 'ADMIN', 'SUPERADMIN'],
      'likeArticles': [1, 2, 3, 4],
      'collectArticles': [1, 2, 3],
      'lastLoginDate': '2020-9-22 01:35:54'
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo

    const { data } = await login({ username: username.trim(), password: password })
    commit('SET_USER', data)
    setUser(data)
    console.log('setUser(data.token)')
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

