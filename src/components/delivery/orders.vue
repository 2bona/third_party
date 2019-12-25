<template>
<div>
<v-row  class="pa-3 mb-12 px-6">

  
  <v-flex xs12 class="my-3 px-0">
      <h1 class="title overline mb-3 font-weight-bold grey--text">Orders</h1>
  <v-card class="pb-3">
    <v-card-title>
      <v-text-field
        v-model="search" dense
        append-icon="mdi-magnify"
        label="Search by order id"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table dense  :mobile-breakpoint="30"
      :headers="headers" v-model="selected"
      :items="orders" @click:row="clicker($event)"
      :expanded.sync="expanded"
      disable-pagination hide-default-footer
      :search="search">
     
      <template v-slot:item.status="{ item }">
      <span  class="overline"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
        v-text="(item.status === 1) ? 'read' : (item.status === 2) ? 'served' : (item.status === 3) ? 'in-transit' : (item.status === 4) ? 'delivered' : (item.status === 5) ? 'rejected' : 'unread'"
      ></span>
    </template>
      <template v-slot:item.updated_at="{ item }">
      <span  class="overline"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      >{{item.updated_at | nowDate}}</span>
    </template>
      <template v-slot:item.id="{ item }">
      <span  class="d-flex overline"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      ><v-icon v-if="!(item.status === 4)" size="8" class=" mr-2" color="green">mdi-circle</v-icon> {{item.id}}</span>
    </template>
      <template v-slot:item.tracking_id="{ item }">
      <span  class="overline"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      >{{item.tracking_id}}</span>
    </template>
      <template v-slot:item.payment_method="{ item }">
      <v-icon
      size="16"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      v-if="(item.payment_method === 1)"
      >mdi-credit-card-outline
      </v-icon>
      <v-icon
      size="16"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      v-if="(item.payment_method === 2)"
      >mdi-cellphone-wireless
      </v-icon>
      <v-icon
      size="16"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      v-if="(item.payment_method === 3)"
      >mdi-cash-marker
      </v-icon>
      <v-icon
      size="16"
      :class="(item.delivery_status === 1) ? 'grey--text' : (item.delivery_status === 0) ? 'orange--text':''" 
      v-if="(item.payment_method === 4)"
      >mdi-table-chair
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">{{item}}</td>
    </template>
    </v-data-table>
    <v-progress-linear color="orange" v-show="loading" :indeterminate="loading"></v-progress-linear>
  </v-card>
     
    </v-flex>
</v-row>
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
      valid: true,
      deleteId: '',
      intervalId: null,
      search: '',
      headers: [
          {
            text: 'S/N',
            align: 'left',
            value: 'id',
          },
          { text: 'Order ID', value: 'tracking_id' },
          { text: 'Type  ', value: 'payment_method' },
          { text: 'When  ', value: 'updated_at' },
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
      return this.$store.getters.getDeliveryOrderList
    },
    loading() {
      return this.$store.getters.getDeliveryLoadStatus;
    }
  },
  beforeDestroy(){
    clearInterval(this.intervalId);
  },
  mounted(){
    const sn = this
       sn.$store.dispatch("deliveryOrderPage", {})
      .then(()=>{
       sn.$store.dispatch("setDeliveryOrderList", null)
      })
      .then(()=>{
      sn.$store.dispatch('deliveryOrderList')
      sn.navb() 
      }) 
     sn.intervalId = setInterval(() => {
     sn.$store.dispatch("deliveryOrderPage", {})
    .then(()=>{
      sn.$store.dispatch("setDeliveryOrderList", null)
    })
    .then(()=>{
    sn.$store.dispatch('deliveryOrderList')
    sn.navb() 
    }) 
          }, 90000)
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
    navb(){
     window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow && !this.loading) {
      this.$store.dispatch('deliveryOrderList')
      }
     }
    },
    clicker(e){
      if (!e.delivery_status) {
    this.$store.dispatch('deliveryOrder', {
        id: e.id,
        action: 'delivery_read'
          })
           .then(()=>{
            this.$router.push('/delivery/adminorder')  
          })
    } else {
        this.$store.dispatch('deliveryOrder', {
        id: e.id,
        action: null
          })
          .then(()=>{
            this.$router.push('/delivery/adminorder')  
          })
    }
    }
  },
  
};
</script>