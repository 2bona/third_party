/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import UserAPI from "../api/UserApi.js"
import router from "../router"

import { AXIOS_CONFIG } from "./../config.js"
const axios = require("axios")
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"
axios.defaults.headers.post["Accept"] = "application/json"
axios.defaults.headers.post["Credentials"] = true
var token = localStorage.getItem("token")
if (token) {
  var isLoggesIn = true
  axios.defaults.headers.common["Authorization"] = "Bearer " + token
} else {
  isLoggesIn = false
}
export const user = {
  state: {
    user: JSON.parse(localStorage.getItem("user"))|| [],
    LoadStatus: 0,
    userAddStatus: 0,
    userRegisteredStatus: 0,
    isLoggedIn: false,
    token: localStorage.getItem("token") || "",
    loginError: "",
    loginStatus: isLoggesIn,
    registerError: "",
    snackbar: {
      status: 0,
      color: 'green',
      text: 'hello'
    },
  },
  actions: {
    addUser({ commit, state, dispatch }, data) {
      commit("setUserRegisteredStatus", 1)
      axios
      .post(AXIOS_CONFIG.API_URL + "/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        c_password: data.c_password
      })
      .then(function(response) {
        commit("setUserRegisterError", [])
        commit("setUserRegisteredStatus", 2)
        commit("setSnackbar", {
          color: 'red',
          text: 'happy',
          status: 1
        })
        router.push("/auth/login")
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        commit("setUserRegisteredStatus", 3)
        commit("setUserRegisterError", error.response.data.error)
      })
    },
    login({ commit, state, dispatch }, data) {
      localStorage.removeItem("token") // store the token in localstorage
      localStorage.removeItem("user")
      commit("setUserLoginStatus", 1)
      axios
        .post(AXIOS_CONFIG.API_URL + "/login", {
          email: data.email,
          password: data.password
        })
        .then(function(response){
          let authUser = response.data.success.user
          let authToken = response.data.success.token
          localStorage.setItem("token", authToken) // store the token in localstorage
          localStorage.setItem("user", JSON.stringify(authUser))
          commit("setUser", JSON.stringify(authUser))
          commit("setToken", authToken)
          commit("setUserLoginStatus", 2)
          let role = authUser.role
          if (localStorage.getItem("token") != null) {
            if (router.currentRoute.params.nextUrl != null) {
              router.push(router.currentRoute.params.nextUrl)
            } else {
              if (role === "admin") {
                router.push("/admin")
              } else {
                router.push("/")
              }
            }
          }
        })
        .catch(function(error) {
          commit("setUserLoginStatus", 3)
          commit("setToken", null)
          commit("setUserLoginErrors", error)
          localStorage.removeItem("token")
          commit("setSnackbarStatus", 1)
          commit("setSnackbarText", error.response.data.error)
          commit("setSnackbarColor", "orange")
          delete axios.defaults.headers.common["Authorization"]
        })
    },
    passcode({ commit, state, dispatch }, data) {
      localStorage.setItem("user", JSON.stringify(data))
      commit("setUser", data)
      router.push("/auth/passcode")
    },
    resetpasscode({ commit, state, dispatch }, data) {
      localStorage.setItem("user", JSON.stringify(data))
      commit("setUser", data)
      router.push("/auth/passcode")
    },
    setUser({ commit, state, dispatch }, data) {
      localStorage.setItem("user", JSON.stringify(data))
      commit("setUser", data)
    },
    setToken({ commit, state, dispatch }, data) {
      localStorage.setItem("token", data)
      commit("setToken", data)
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + data
    },
    snack({ commit, state, dispatch }, data) {
      commit("setSnackbar", {
           color: data.color,
           text: data.text,
           status: 1
         })
    },
    logout({ commit, state, dispatch }, data) {
      axios.get(AXIOS_CONFIG.API_URL + "/logout").then(function(response) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common["Authorization"]
        router.push("/auth/login")
      })
    },
       
  },
  mutations: {
    setLoadStatus(state, status) {
      state.LoadStatus = status
    },
    setUser(state, user) {
      state.user = user
    },
    setUserLoginErrors(state, loginError) {
      state.loginError = loginError
    },
    setUserLoginStatus(state, loginStatus) {
      state.loginStatus = loginStatus
    },
    setUserRegisterError(state, registerError) {
      state.registerError = registerError
    },
    setSnackbar(state, snack) {
      state.snackbar = snack
      setTimeout(() => {
        state.snackbar.status = 0
      }, 6000)
    },
    setToken(state, token) {
      state.token = token
    },
    setUserAddedStatus(state, snack) {
      state.userAddStatus = snack
    },
    setUserRegisteredStatus(state, value) {
      state.userRegisteredStatus = value
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUserLoadStatus(state) {
      return state.LoadStatus
    },
    getUserLoginStatus(state) {
      return state.loginStatus
    },
    getUserRegisteredStatus(state) {
      return state.userRegisteredStatus
    },
    getUserAddStatus(state) {
      return state.userAddStatus
    },
    getSnackbar(state) {
      return state.snackbar
    },
    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    },
    getRegisterError(state) {
      return state.registerError
    },
    getLoginError(state) {
      return state.loginError
    }
  }
}
