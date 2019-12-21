/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

export const order = {
    state: {
        order: [],
        payChoice: '',
        orderStatus: {
            item: Number,
            status: false,
            navBottom: true,
            deliveryParams: {}
        }
    },
    actions: {
        setOrder({
            commit,
            state,
            dispatch
        }, data) {
            commit("setOrder", data.order)
        },
        payChoice({
            commit,
            state,
            dispatch
        }, data) {
            commit("setPayChoice", data)
        },
        setDeliveryParams({
            commit,
            state,
            dispatch
        }, data) {
            commit("setDeliveryParams", data)
        },
        setNavBottom({
            commit,
            state,
            dispatch
        }, data) {
            commit("setNavBottom", data.status)
        },
        addItemCount({
            commit,
            state,
            dispatch
        }, data) {
            var d = state.order[data.orderI]
            d.item[0].qty += 1
            let sum1 = d.item[0].qty * d.item[0].price
             let sum2 = d.optional.reduce((currentTotal, item) => {
                 return (item.price * item.qty) + currentTotal
             }, 0)
             d.total = sum1 + (sum2 * d.item[0].qty)

        },
        minusItemCount({
            commit,
            state,
            dispatch
        }, data) {
            var d = state.order[data.orderI]
            if (d.item[0].qty <= 1) {
                let sum1 = d.item[0].qty * d.item[0].price
                let sum2 = d.optional.reduce((currentTotal, item) => {
                    return (item.price * item.qty) + currentTotal
                }, 0)
                d.total = sum1 + (sum2 * d.item[0].qty)
                return
            } else{
                d.item[0].qty -= 1
                let sum1 = d.item[0].qty * d.item[0].price
                let sum2 = d.optional.reduce((currentTotal, item) => {
                    return (item.price * item.qty) + currentTotal
                }, 0)
                d.total = sum1 + (sum2 * d.item[0].qty)

         }
        },
        emptyOrder({
            commit,
            state,
            dispatch
        }, data) {
            commit('emptyOrder')
        },
        setOrderStatus({
            commit,
            state,
            dispatch
        }, data) {
            commit("setOrderStatus", data.orderStatus)
        },
        removeOrder({
            commit,
            state,
            dispatch
        }, data) {
            commit("removeOrder", data.order)
        },
    },
    mutations: {
    setOrder(state, order) {
        state.order.push(order)
    },
    setPayChoice(state, choice) {
        state.payChoice = choice
    },
    emptyOrder(state) {
        state.order = []
    },
    setNavBottom(state, status) {
        state.navBottom = status
    },
    setOrderStatus(state, orderStatus) {
        state.orderStatus = orderStatus
    },
    setDeliveryParams(state, params) {
        state.deliveryParams = params
    },
    removeOrder(state, order) {
        state.order.splice(order, 1)
    }
    },
    getters: {
        getOrder(state) {
            return state.order
        },
        getPayChoice(state) {
            return state.payChoice
        },
        getOrderStatus(state) {
            return state.orderStatus
        },
        getDeliveryParams(state) {
            return state.deliveryParams
        },
        getNavBottomStatus(state) {
            return state.navBottom
        }
        
    }
}
