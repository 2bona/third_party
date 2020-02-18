<template>
<div>
<v-row  class="pa-3 mb-12 px-6">

  
    <v-flex xs12 class="my-3 px-0">
      <v-layout row wrap>
      <v-btn class="mb-12" bottom fixed right @click=" dialog = !dialog" fab small color="white">
            <v-icon color="grey darken-1">mdi-camera</v-icon>
          </v-btn>  
      <v-flex xs6 class="pl-3">
        <h1 class="title overline mb-3 font-weight-bold grey--text">Orders
        
        </h1>
      </v-flex>
      <v-flex xs6 >
        
          
      </v-flex>
      </v-layout>

            <v-card style="border-radius: 25px" class="pb-8">
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
      :search="search"
      disable-pagination hide-default-footer
    >
     
      <template v-slot:item.status="{ item }">
      <span  class="overline"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
        v-text="(item.status === 1) ? 'read' : (item.status === 2) ? 'served' : (item.status === 3) ? 'in-transit' : (item.status === 4) ? 'delivered' : (item.status === 5) ? 'rejected' : 'unread'"
      ></span>
    </template>
      <template v-slot:item.created_at="{ item }">
      <span  class="overline"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      >{{item.created_at | nowDate}}</span>
    </template>
      <template v-slot:item.id="{ item }">
      <span  class="overline d-flex"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      ><v-icon v-if="item.status === 3 || item.status === 1" size="8" class=" mr-2" :color="item.status === 3 ? 'green' : 'orange'">mdi-circle</v-icon>{{item.id}}</span>
    </template>
      <template v-slot:item.tracking_id="{ item }">
      <span  class=" overline"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      >{{item.tracking_id}}</span>
    </template>
      <template v-slot:item.payment_method="{ item }">
      <v-icon
      size="16"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      v-if="(item.payment_method === 1)"
      >mdi-credit-card-outline
      </v-icon>
      <v-icon
      size="16"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      v-if="(item.payment_method === 2)"
      >mdi-cellphone-wireless
      </v-icon>
      <v-icon
      size="16"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      v-if="(item.payment_method === 3)"
      >mdi-cash-marker
      </v-icon>
      <v-icon
      size="16"
      :class="(item.status === 1) ? 'blue--text' : (item.status === 2) ? 'green--text' : (item.status === 3) ? 'orange--text' : (item.status === 4) ? 'grey--text' : (item.status === 5) ? 'red--text':''" 
      v-if="(item.payment_method === 4 || item.payment_method === 5)"
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
<div style="position:fixed;width:100%; bottom:49px">
      <v-progress-linear color="grey" v-show="orderLoad" :indeterminate="orderLoad"></v-progress-linear>

</div>
   <v-dialog
      v-model="dialog"
      :overlay="false"
      max-width="300px"
      max-height="300px"
      transition="dialog-transition">
      <v-card color="grey" height="300px" width="300px">
        <qrcode-stream v-if="dialog"  @init="onInit"  @decode="onDecode"></qrcode-stream>
      </v-card>
    </v-dialog>
</div>
</template>
<style>

</style>
<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'
import { QrcodeStream } from 'vue-qrcode-reader'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})

export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      dialog: false,
      orderLoad: false,
      content: '',
      expanded : [],
      dialog2: false,
      selected: [],
      pageClose: false,
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
          { text: 'When  ', value: 'created_at' },
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
      return this.$store.getters.getOrderList;
    },
  loading() {
      return this.$store.getters.getVendorLoadStatus;
    },
  agents() {
      return this.$store.getters.getAgents;
    },
  replys() {
      return this.$store.getters.getReplys;
    },
  },
  beforeDestroy(){
    clearInterval(this.intervalId);
    this.pageClose = false
  },
  beforeRouteLeave (to, from, next) {
  this.pageClose = false
     setTimeout(() => {
      next()
    }, 50);
    },
  mounted(){
    this.pageClose = true
    const sn = this
    sn.navb2()
    sn.getAgents()
         sn.$store.dispatch("vendorOrderPage", {})
      .then(()=>{
       sn.$store.dispatch("setVendorOrderList", null)
      })
      .then(()=>{
      sn.$store.dispatch('orderList')
      sn.navb() 
      }) 
      sn.intervalId = setInterval(() => {
       sn.$store.dispatch("vendorOrderPage", {})
      .then(()=>{
        sn.$store.dispatch("setVendorOrderList", null)
      })
      .then(()=>{
        sn.$store.dispatch('orderList')
        sn.navb() 
      }) 
      }, 90000)
  },
  methods: {
         async onDecode (decodedString) {
           const sn = this
       if((decodedString != null) && (decodedString.indexOf('/adminorder') !== -1)){
        sn.$store.dispatch('order', {
        id: decodedString.substring(12),
        action: null
          })
          .then(()=>{  
            sn.dialog = false
          })
          .catch((err)=>{
            alert('Wrong restaurant or order id')

          })
      }else{
        alert('Invalid QR code, Scan a valid Food Republic QR code')
            sn.dialog = false
      }
  },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
      scrollTop() {
      window.scrollTo(0, 0);
    },
    navb(){
     window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 200;
      if (bottomOfWindow && !this.loading && this.pageClose) {
      this.$store.dispatch('orderList')
      }
     }
    },
     navb2(){
    const sn = this
    if (sn.replys.length) {
      return
    } else{
    let url = "/reply/all"
    http({
      url: url,
      method: 'get'
    })
    .then((response) => {
      sn.load = false
      sn.$store.dispatch('setReplys', {
        replys: response.data.replys
    })
    })
      .catch(function (error) {
        sn.load = false
        console.log(error)
      })
    }
    
    },
    getAgents(){
      const sn = this
    if (sn.agents.length) {
      return
    }else{
     let url = "/delivery/agents"
      http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        sn.$store.dispatch('setAgents', {
          agents: response.data.agents
      })
      sn.slide2 = 1
      })
      .catch(function (error) {
        console.log(error)
      })
    }
    },
    clicker(e){
      this.orderLoad = true
      if (!e.status) {
    this.$store.dispatch('order', {
        id: e.id,
        action: 'read'
          })
    } else {
        this.$store.dispatch('order', {
        id: e.id,
        action: null
          })
    }
    }
  },
  
};
</script>