/* eslint-disable no-unused-vars */
import VendorAPI from "../api/VendorApi.js";
export const vendor = {
  state: {
    vendors: [],
    vendorsLoadStatus: 0,
    vendor: {},
    vendorLoadStatus: 0
  },
  actions: {
    loadVendors({ commit }) {
      commit("setVendorsLoadStatus", 1);

      VendorAPI.getVendors()
        .then(function(response) {
          commit("setVendors", response.data);
          commit("setVendorsLoadStatus", 2);
        })
        .catch(function() {
          commit("setVendors", []);
          commit("setVendorsLoadStatus", 3);
        });
    },
    loadVendor({ commit }, data) {
      commit("setVendorLoadStatus", 1);

      VendorAPI.getVendor(data.id)
        .then(function(response) {
          commit("setVendor", response.data);
          commit("setVendorLoadStatus", 2);
        })
        .catch(function() {
          commit("setVendor", {});
          commit("setVendorLoadStatus", 3);
        });
    },
    addVendor({ commit, state, dispatch }, data) {
      commit("setVendorLoadStatus", 1);

      VendorAPI.postAddNewVendor(
        data.name,
        data.address,
        data.city,
        data.state,
        data.zip
      )
        .then(function(response) {
          commit("setVendorLoadStatus", 2);
          dispatch("loadVendors");
        })
        .catch(function() {
          commit("setVendorLoadStatus", 3);
        });
    }
  },
  mutations: {
    setVendorsLoadStatus(state, status) {
      state.VendorsLoadStatus = status;
    },

    setVendors(state, Vendors) {
      state.Vendors = Vendors;
    },

    setVendorLoadStatus(state, status) {
      state.VendorLoadStatus = status;
    },

    setVendor(state, Vendor) {
      state.Vendor = Vendor;
    }
  },
  getters: {
    getVendorsLoadStatus(state) {
      return state.VendorsLoadStatus;
    },

    getVendors(state) {
      return state.Vendors;
    },

    getVendorLoadStatus(state) {
      return state.VendorLoadStatus;
    },

    getVendor(state) {
      return state.Vendor;
    }
  }
};
