/* eslint-disable no-unused-vars */
import restaurantAPI from '../api/RestaurantApi.js';
export const restaurants = {
    state: {
        restaurants: [],
        restaurantsLoadStatus: 0,
        restaurant: {},
        restaurantLoadStatus: 0,

    },
    actions: {
        loadrestaurants({
            commit
        }) {
            commit('setRestaurantsLoadStatus', 1);

            restaurantAPI.getrestaurants()
                .then(function (response) {
                    commit('setRestaurants', response.data);
                    commit('setRestaurantsLoadStatus', 2);
                })
                .catch(function () {
                    commit('setRestaurants', []);
                    commit('setRestaurantsLoadStatus', 3);
                });
        },
        loadrestaurant({
            commit
        }, data) {
            commit('setRestaurantLoadStatus', 1);

            restaurantAPI.getrestaurant(data.id)
                .then(function (response) {
                    commit('setRestaurant', response.data);
                    commit('setRestaurantLoadStatus', 2);
                })
                .catch(function () {
                    commit('setRestaurant', {});
                    commit('setRestaurantLoadStatus', 3);
                });
        }
    },
    mutations: {
        setRestaurantsLoadStatus(state, status) {
            state.restaurantsLoadStatus = status;
        },

        setRestaurants(state, restaurants) {
            state.restaurants = restaurants;
        },

        setRestaurantLoadStatus(state, status) {
            state.restaurantLoadStatus = status;
        },

        setRestaurant(state, restaurant) {
            state.restaurant = restaurant;
        }
    },
    getters: {
        getrestaurantsLoadStatus(state) {
            return state.restaurantsLoadStatus;
        },

        getrestaurants(state) {
            return state.restaurants;
        },

        getrestaurantLoadStatus(state) {
            return state.restaurantLoadStatus;
        },

        getrestaurant(state) {
            return state.restaurant;
        }
    }
}