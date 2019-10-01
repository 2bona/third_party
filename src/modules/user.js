/* eslint-disable no-unused-vars */
import UserAPI from "../api/UserApi.js";
import router from "../router";

import { AXIOS_CONFIG } from "./../config.js";
const axios = require("axios");
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Credentials"] = true;
var token = localStorage.getItem("user-token");
if (token) {
  var isLoggesIn = true;
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
} else {
  isLoggesIn = false;
}

export const user = {
  state: {
    user: localStorage.getItem("user-token") || "",
    userLoadStatus: 0,
    userAddStatus: 0,
    userRegisteredStatus: 0,
    isLoggedIn: false,
    token: localStorage.getItem("user-token") || "",
    loginError: "",
    loginStatus: isLoggesIn,
    registerError: "",
    snackbarStatus: 0,
    snackbarColor: "",
    snackbarText: ""
  },
  actions: {
    user({ commit }) {
      commit("setChefsLoadStatus", 1);

      UserAPI.userDetails()
        .then(function(response) {
          commit("setUser", response.data);
          commit("setUserLoadStatus", 2);
        })
        .catch(function() {
          commit("setUser", []);
          commit("setUserLoadStatus", 3);
        });
    },
    addUser({ commit, state, dispatch }, data) {
      commit("setUserRegisteredStatus", 1);
      axios
        .post(AXIOS_CONFIG.API_URL + "/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          c_password: data.c_password
        })
        .then(function(response) {
          commit("setUserRegisterError", []);
          commit("setUserRegisteredStatus", 2);
          commit("setUser", response.data.success.user);
          commit("setSnackbarStatus", 1);
          commit("setSnackbarText", "Registered Successfully");
          commit("setSnackbarColor", "green");
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          commit("setUserRegisteredStatus", 3);
          commit("setUserRegisterError", error.response.data.error);
        });
    },
    login({ commit, state, dispatch }, data) {
      localStorage.removeItem("user-token"); // store the token in localstorage
      localStorage.removeItem("user");
      commit("setUserLoginStatus", true);
      commit("setIsLoggedIn", true);
      axios
        .post(AXIOS_CONFIG.API_URL + "/login", {
          email: data.email,
          password: data.password
        })

        .then(function(response) {
          let authUser = response.data.success.user;
          let authToken = response.data.success.token;
          commit("setIsLoggedIn", false);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + authToken;
          localStorage.setItem("user-token", authToken); // store the token in localstorage
          localStorage.setItem("user", JSON.stringify(authUser));
          commit("setToken", authToken);
          commit("setUserLoginStatus", true);
          let role = authUser.role;
          if (localStorage.getItem("user-token") != null) {
            //  this.$emit('isLoggedIn')
            if (router.currentRoute.params.nextUrl != null) {
              router.push(router.currentRoute.params.nextUrl);
            } else {
              if (role === "admin") {
                router.push("/admin");
              } else {
                router.push("/");
              }
            }
          }
        })

        .catch(function(error) {
          commit("setUserLoginStatus", false);
          commit("setIsLoggedIn", false);
          commit("setToken", null);
          commit("setUserLoginErrors", error);
          localStorage.removeItem("user-token");
          commit("setSnackbarStatus", 1);
          commit("setSnackbarText", error.response.data);
          commit("setSnackbarColor", "orange");
          delete axios.defaults.headers.common["Authorization"];
        });
    },
    logout({ commit, state, dispatch }, data) {
      axios.get(AXIOS_CONFIG.API_URL + "/logout").then(function(response) {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user");
        commit("setUserLoginStatus", false);
        commit("setSnackbarStatus", 1);
        commit("setSnackbarText", response.data.message);
        commit("setSnackbarColor", "red");
        delete axios.defaults.headers.common["Authorization"];
      });
    }
  },
  mutations: {
    setUserLoadStatus(state, status) {
      state.userLoadStatus = status;
    },

    setUser(state, user) {
      state.user = user;
    },
    setIsLoggedIn(state, loginStatus) {
      state.isLoggedIn = loginStatus;
    },
    setUserLoginErrors(state, loginError) {
      state.loginError = loginError;
    },
    setUserLoginStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
      state.snackbarStatus = 1;
      state.snackbarText = "Login Successful";
      state.snackbarColor = "blue";
    },
    setUserRegisterError(state, registerError) {
      state.registerError = registerError;
    },
    setSnackbarStatus(state, snack) {
      state.snackbarStatus = snack;
    },
    setSnackbarColor(state, color) {
      state.snackbarColor = color;
    },
    setSnackbarText(state, text) {
      state.snackbarText = text;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserAddedStatus(state, snack) {
      state.userAddStatus = snack;
    },
    setUserRegisteredStatus(state, snack) {
      state.userRegisteredStatus = snack;
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,

    getUserLoadStatus(state) {
      return state.userLoadStatus;
    },
    getUserLoginStatus(state) {
      return state.loginStatus;
    },
    getUserRegisteredStatus(state) {
      return state.userRegisteredStatus;
    },
    getUserAddStatus(state) {
      return state.userAddStatus;
    },
    getSnackbarColor(state) {
      return state.snackbarColor;
    },
    getSnackbarStatus(state) {
      return state.snackbarStatus;
    },
    getSnackbarText(state) {
      return state.snackbarText;
    },

    getUser(state) {
      return state.user;
    },
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
    getRegisterError(state) {
      return state.registerError;
    },
    getLoginError(state) {
      return state.loginError;
    }
  }
};
