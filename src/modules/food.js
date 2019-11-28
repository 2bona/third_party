/* eslint-disable no-unused-vars */
import ChefAPI from "../api/ChefApi.js";
export const chefs = {
  state: {
    chefs: [],
    chefsLoadStatus: 0,
    chef: {},
    chefLoadStatus: 0
  },
  actions: {
    loadChefs({ commit }) {
      commit("setChefsLoadStatus", 1);

      ChefAPI.getChefs()
        .then(function(response) {
          commit("setChefs", response.data);
          commit("setChefsLoadStatus", 2);
        })
        .catch(function() {
          commit("setChefs", []);
          commit("setChefsLoadStatus", 3);
        });
    },
    loadChef({ commit }, data) {
      commit("setChefLoadStatus", 1);

      ChefAPI.getChef(data.id)
        .then(function(response) {
          commit("setChef", response.data);
          commit("setChefLoadStatus", 2);
        })
        .catch(function() {
          commit("setChef", {});
          commit("setChefLoadStatus", 3);
        });
    }
  },
  mutations: {
    setChefsLoadStatus(state, status) {
      state.chefsLoadStatus = status;
    },

    setChefs(state, chefs) {
      state.chefs = chefs;
    },

    setChefLoadStatus(state, status) {
      state.chefLoadStatus = status;
    },

    setChef(state, chef) {
      state.chef = chef;
    }
  },
  getters: {
    getChefsLoadStatus(state) {
      return state.chefsLoadStatus;
    },

    getChefs(state) {
      return state.chefs;
    },

    getChefLoadStatus(state) {
      return state.chefLoadStatus;
    },

    getChef(state) {
      return state.chef;
    }
  }
};
