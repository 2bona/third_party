<template>
  <div>
    <div class="container mt-3" style="margin-bottom: 100px;">
    <v-btn
      fixed @click="$router.go(-1)"
      bottom
      right fab
      color="white" style="z-index:10;margin-bottom: 60px;">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <p class="overline mb-2  font-weight-bold grey--text text--darken-1">order summary</p>
                      <v-layout width="100%" class=" mx-0" style="overflow-x:hidden; ">
              <v-container  class=" px-0 pt-0">
        <v-card class="mx-auto" style="position:relative;display:flex;justify-content: center;" flat tile  color="transparent" max-width="600px"  min-height="116px">
    <v-card  
        width="100%"
        height="110px"
        max-width="450px"
        min-height="100px"
        tile
        color="transparent"
        flat
        style="position:absolute;padding-top: 19px !important; bottom: 0px; border-radius:0px; overflow-x:scroll;"
        class=" mb-0 px-2  pt-2 pb-2 mx-auto">
        <v-list-item  class="pa-0">
        <v-list-item-avatar v-for="(n, i) in orders" :key="i"
        size="70"
        v-ripple
        class="my-auto elevation-5 mr-5">
        <v-img :src="n.item[0].image">
        </v-img>
         <p class="caption grey--text font-weight-bold" style="position:absolute; top: -19px">{{n.item[0].qty}}x</p>
         <p class="caption grey--text font-weight-bold" style="position:absolute; bottom:-36px"><v-icon color="grey" style="padding-bottom:2px" size="11">mdi-currency-ngn</v-icon>{{n.total | price}}</p>
        </v-list-item-avatar>
                </v-list-item>
            </v-card>
                </v-card> 
             </v-container>
      </v-layout>
  
        <span v-if="!(choice === 4)" class="overline grey--text  text--darken-1 font-weight-bold">
       delivery
       </span>
    <v-list-item v-if="!(choice === 4)" class="my-1" dense two-line>  
      <v-list-item-content>
        <v-list-item-title class="body-2 grey--text text--darken-1 text-wrap font-weight-bold mb-0 pb-0">{{address.name}}</v-list-item-title>
        <v-list-item-subtitle class="caption grey--text text-wrap font-weight-medium mt-0 pt-0" v-if="address.area.name">{{address.area.name}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text text-wrap font-weight-medium mt-0 pt-0" v-if="address.name_2">{{address.name_2}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text text-wrap font-weight-medium mt-0 pt-0" v-if="address.company">{{address.company}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text text-wrap font-weight-medium mt-0 pt-0" v-if="address.instruction">{{address.instruction}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text font-weight-medium mt-0 pt-0">{{user.phone}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text  font-weight-medium mt-0 pt-0">Order to arrive in {{deliveryParams.duration | duration}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

      <span class="overline grey--text  text--darken-1 font-weight-bold">
       payment
      </span>
    <v-list-item  class="my-1" dense>
      <v-list-item-content>
        <v-list-item-subtitle class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">{{paymentMethod}}  <span v-show="change"> <v-icon style="padding-bottom:2px" color="grey" size="12">mdi-currency-ngn</v-icon>{{ Math.round((change - grandTotal)/5)*5 | price}}</span></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  <v-card flat color="transparent" tile class="mb-12">
      <span class="overline grey--text  text--darken-1 font-weight-bold">
       Summary
      </span> 
<v-row  class="px-6 pt-3">
  <v-flex xs6>
    <p class="caption grey--text  mb-1 font-weight-medium">Subtotal</p>
  </v-flex>
  <v-flex xs6>
    <p class="caption grey--text  mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey">mdi-currency-ngn</v-icon>{{total | price}}.00</p>
  </v-flex>
</v-row>
      <v-row v-if="!(choice === 4)" class="px-6 pt-0">
                  <v-flex xs6>
<p class="caption grey--text  mb-1 font-weight-medium">Delivery
    </p>
    </v-flex>
      <v-flex xs6>
          <p class="caption grey--text  mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey">mdi-currency-ngn</v-icon>{{deliveryFee | price}}.00</p>
      </v-flex>      
</v-row>
      <v-row v-if="!(choice === 4)" justify="space-between" class="px-6 pt-0">
                  <v-flex xs6>
<p class="caption grey--text  mb-1 font-weight-medium">Service charge
    </p>
    </v-flex>
      <v-flex xs6>
          <p class="caption grey--text  mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey">mdi-currency-ngn</v-icon>{{serviceCharge | price}}.00</p>
      </v-flex>
</v-row>
 <v-divider></v-divider>
<v-row justify="space-between" class="px-6 pt-4">
 <v-flex xs6>
<p class="font-weight-black body-1">Total</p>
</v-flex>
<v-flex xs6>
<p class=" font-weight-black body-1 text-right"><v-icon style="padding-bottom:2px" color="black" size="15">mdi-currency-ngn</v-icon>{{grandTotal | price}}.00</p>
</v-flex>
</v-row>
 <v-divider></v-divider>
  <div>
      <v-layout  style="position:fixed; bottom:0px;background: linear-gradient(#fff0 0%, #fff 100%);width: 100%; z-index:9" row wrap class=" pb-2 px-2">
        <v-flex xs12 class="px-2">
        <v-btn v-if="!(choice === 1)" :loading="loading" block @click="proceed()" class="mt-2 elevation-10" rounded="" dark color="primary">proceed</v-btn>
        <paystack
        v-if="choice === 1"
        :amount="grandTotal"
        :email="user.email"
        :paystackkey="paystackKey"
        :reference="Date.now().toString()"
        :callback="callback"
        :metadata="metadata" :loading="payLoad"
        :close="close" 
        style="border-radius: 50px;"
        class="mt-2 elevation-10 v-btn v-btn--block v-btn--contained v-btn--rounded theme--dark v-size--default white"
        >
       <img style="width:40%" src="https://3.bp.blogspot.com/-1tMgWz_Jzws/W8Wz82rcGDI/AAAAAAAAB20/H0VaEJBvOXkahf8FUyRRsaCX_tYpPxwowCLcBGAs/s1600/Paystack%2Blogo.png">
    </paystack>
        </v-flex>
      </v-layout>
  </div>
</v-card>
    </div>
    
  </div>
</template>

<style>
.v-tooltip__content{
    padding: 0px 0px!important;
    width: 90%;
}
</style>

<script>
  import axios from 'axios'
  import paystack from 'vue-paystack'


export default{
  components: {
paystack
  },
 data() {
    return {
      loading: false, 
      payLoad: false, 
      paystackKey: ''    
    }
 }, 
 computed: {
       metadata () {
      return {
        custom_fields: [
          {
            display_name: 'Mobile Number',
            variable_name: 'mobile_number',
            value: this.user.receiver
          },
          {
            display_name: 'Address',
            variable_name: 'address',
            value: this.user.address
          },
          {
            display_name: 'First Name',
            variable_name: 'first_name',
            value: this.user.firstname
          },
          {
            display_name: 'Last Name',
            variable_name: 'last_name',
            value: this.user.lastname
          },
          {
            display_name: 'Invoice ID',
            variable_name: 'invoice_id',
            value: this.user.id
          },
          {
            display_name: 'Change',
            variable_name: 'change',
            value: this.change
          },
          {
            display_name: 'Payment Method',
            variable_name: 'pay_method',
            value: this.paymentMethod
          },
          {
            display_name: 'Cart Items',
            variable_name: 'cart_items',
            value: this.orders
          },
          {
            display_name: 'Total',
            variable_name: 'total',
            value: this.grandTotal
          }
        ]
      }
    },
    orders() {
      return this.$store.getters.getOrder;
    },
    address() {
      return this.$store.getters.getUserAddresses;
    },
    user() {
      return this.$store.getters.getUser
    },
    change() {
      return this.$store.getters.getPayChoice.change
    },
    choice() {
      return this.$store.getters.getPayChoice.choice
    },
    paymentMethod() {
      let d = ''
      if (this.choice === 1) {
        d = 'Online payment with card'
      }
      else if (this.choice === 2) {
         d = 'Mobile/USSD transfer on delivery'
      }
      else if (this.choice === 4) {
         d = 'Over the counter or use P.O.S'
      }
      else if (this.choice === 3) {
        if (this.change) {
          d = 'Paying Cash on delivery, expecting change of '
        } else {
          d = 'Paying Cash on delivery'
        }
      }
      return d
    },
    deliveryParams() {
      return this.$store.getters.getDeliveryParams
    },
    total(){
   
        return this.$store.getters.getOrder.reduce((currentTotal, item)=>{
          return item.total + currentTotal
         }, 0)
      
    },
    serviceCharge(){
      if (this.total < 2500) {
        return Math.round((this.total * 0.015) + 50)
     } else {
       return Math.round((this.total * 0.015) + 200)
     }
    },
    grandTotal(){
         if (this.choice === 4) {
         return this.total
      }else{
      return this.total + this.deliveryFee + this.serviceCharge
      }
    },
    orderStatus() {
      return this.$store.getters.getOrderStatus.status;
    },
    dialogItem() {
      return this.$store.getters.getOrderStatus.item;
    },
    deliveryFee() {
      return this.$store.getters.getDeliveryParams.fee;
    },
 },
 mounted(){
    axios.get('/settings?name=paystackKey')
    .then((res)=>{
      this.paystackKey = res.data.settings[0].name
    })
 },
 methods: {
   back() {
      this.$router.go("-1");
    },
    proceed(){
      const sn = this
      const d = sn.choice
      var a = sn.deliveryParams
      sn.loading = true
      var change = sn.change - sn.grandTotal 
        
      axios.post('/order/save', {
          vendor_id : a.vendor_id,
          duration : a.duration,
          distance: a.distance,
          total: sn.total,
          grand_total: sn.grandTotal,
          paid: false,
          items: sn.orders,
          payment_method: d,
          change_amount: (change > 0) ? change : 0,
          delivery_fee: a.fee,
          address_id: sn.address.id,
          service_charge: sn.serviceCharge
      })
        .then(res => {
            sn.$store.dispatch('snack', {
            color: 'primary',
            text: 'Transaction complete, thank you!',
          })
          sn.$store.dispatch('emptyOrder')
        })
        .then(() => {
          sn.loading = false
          sn.payLoad = false
            sn.$router.push('/cart')
      })
      .catch((err)=>{
        console.log(err)
        sn.loading = false
        })
    },
        callback () {
          this.payLoad = true
          this.proceed()
    },
    close () {
         this.$store.dispatch('snack', {
            color: 'red',
            text: 'Transaction Closed!',
          })
    }
 }
};
</script>