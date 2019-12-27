<template>
<div>
<v-row  class="pa-3 mb-12 px-6">

  
    <v-flex xs12 class="my-3 px-0">
        <h1 class="title overline mb-3 font-weight-bold grey--text">Orders</h1>
            <v-card class="pt-3 pb-12">
    <v-data-table  :mobile-breakpoint="30"
      :headers="headers" v-model="selected"
      :items="orders" @click:row="clicker($event)"
      :expanded.sync="expanded"
      no-data-text="No results"
      :search="search" item-key="tracking_id"
      disable-pagination hide-default-footer
    >
     
      <template v-slot:item.status="{ item }">
      <span  class="overline"
      :class="(item.user_status === 1) ? 'grey--text text--darken-1' : (item.user_status === 0) ? 'orange--text text--darken-4' :''" 
        v-text="(item.status === 1) ? 'recieved' : (item.status === 2) ? 'served' : (item.status === 3) ? 'in-transit' : (item.status === 4) ? 'delivered' : (item.status === 5) ? 'rejected' : 'unchecked'"
      ></span>
    </template>
      <template v-slot:item.grand_total="{ item }">
      <span  class="overline"
      :class="(item.user_status === 1) ? 'grey--text text--darken-1' : (item.user_status === 0) ? 'orange--text text--darken-4' :''" 
      >
      <v-icon 
      :class="(item.user_status === 1) ? 'grey--text text--darken-1' : (item.user_status === 0) ? 'orange--text text--darken-4' :''" 
      size="10px">mdi-currency-ngn</v-icon> {{item.grand_total | price}}</span>
    </template>
      <template  v-slot:item.tracking_id="{ item }">
      <span  class="d-flex overline"
      :class="(item.user_status === 1) ? 'grey--text text--darken-1' : (item.user_status === 0) ? 'orange--text text--darken-4' :''" 
      ><v-icon v-if="item.status === 3 || item.status === 1" size="8" class=" mr-2" :color="item.status === 3 ? 'green' : 'orange'">mdi-circle</v-icon>{{item.tracking_id}}</span>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">{{item}}</td>
    </template>
    </v-data-table>
      <v-progress-linear color="orange" v-if="loading" :indeterminate="loading"></v-progress-linear>
  </v-card>
    </v-flex>
</v-row>
    <v-scale-transition>
    <v-btn
      fixed to="/"
      bottom  v-if="btn"
      right fab
      color="white" style="z-index:10;margin-bottom: 60px;">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    </v-scale-transition>
</div>
</template>
<style>

</style>
<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})

export default {
  data() {
    return {
      dialog: false,
      content: '',
      expanded : [],
      dialog2: false,
      selected: [],
      dialog3: false,
      btn: false,
      valid: true,
      deleteId: '',
      intervalId: null,
      search: '',
      headers: [
          { align: 'left', text: 'Order ID', value: 'tracking_id' },
          { text: 'Amount', value: 'grand_total' },
          // { text: 'When  ', value: 'created_at' },
          { text: 'Status', value: 'status' },
      ],
      dialog4: false,
        rules: {
        required: value => !!value || "Required.",
        },
              radios: 'Thank you soo much, we will keep improving',
    }
  },
  computed: {
  orders() {
      return this.$store.getters.getUserOrderList;
    },
  loading() {
      return this.$store.getters.getUserOrderListLoading;
    }
  },
  beforeDestroy(){
    clearInterval(this.intervalId);
  },
    beforeRouteLeave (to, from, next) {
  this.btn = false
     setTimeout(() => {
      next()
    }, 50);
    },
  mounted(){
    setTimeout(() => {
      this.btn=true
    }, 400);
    const sn = this
       sn.$store.dispatch("orderPage", {})
      .then(()=>{
       sn.$store.dispatch("setUserOrderList", null)
      })
      .then(()=>{
      sn.$store.dispatch('userOrderList')
      sn.navb() 
      })
   
    
    // sn.intervalId = setInterval(() => {
    //                     sn.navb()
    //                   }, 90000)
  },
  methods: {
     scrollTop() {
      window.scrollTo(0, 0);
    },
    navb(){
      window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow && !this.loading) {
      this.$store.dispatch('userOrderList')
      }
      }
    },
    clicker(e){
      if (!e.user_status) {
    this.$store.dispatch('userOrder', {
        id: e.id,
        action: 'read'
          })
           .then(()=>{
            this.$router.push('/userorder/') 
          })
    } else {
        this.$store.dispatch('userOrder', {
        id: e.id,
        action: null
          })
          .then(()=>{
            this.$router.push('/userorder/') 
          })
    }
    }
  },
  
};
</script>