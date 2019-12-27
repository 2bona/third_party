   <template>
    <div class="">
           <v-scale-transition>
          <v-btn
          fixed @click="$router.go(-1)"
          bottom v-if="btn"
          right fab
          color="white" style="z-index:10;margin-bottom: 60px;">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
         </v-scale-transition>
     <v-card flat tile class=" pb-12 pt-2 px-3">
       <p class="overline pt-4 grey--text text--darken-1 font-weight-bold">
       select address
       </p> 
      <v-card :loading="loading" style="margin-bottom:90px" width="100%">
      <v-list-item class="pr-0" to="/address">
     
        <v-list-item-title class="caption orange--text">
       Add new address
       </v-list-item-title>
        <v-list-item-avatar>
        <v-icon color="orange">mdi-plus</v-icon>
      </v-list-item-avatar>
    </v-list-item>
    <v-divider></v-divider>
        <div v-for="(n, i) in addresses" :key="n.area.name + n.id + i">
        <v-list-item class="pr-0"  v-if="n.area.name === userArea">
          <v-list-item-content @click="orderAddress(n)">
            <v-list-item-title  class="caption mb-0 font-weight-medium mt-0 pt-0">{{n.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-icon color="grey lighten-2">mdi-pencil-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar class="mr-1">
            <v-icon color="grey lighten-2">mdi-trash-can-outline</v-icon>
          </v-list-item-avatar>
        </v-list-item>
        </div>
        <div v-for="(n, i) in addresses" :key="i">
        <v-list-item disabled v-if="!(n.area.name === userArea)">
          <v-list-item-content>
            <v-list-item-title class="caption mb-0 font-weight-medium mt-0 pt-0">{{n.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </div>
          
      </v-card>
     </v-card>   
    </div>
    </template>
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
        addresses: [],
        loading: true,   
        btn: false,   
    }
    },
      computed: {
    vendorList() {
      return this.$store.getters.getVendorList
    },
    userArea() {
      return this.$store.getters.getUserArea.name;
    },
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
    }, 50);
        const sn = this
        let url = "/address/all?area_id="+sn.$store.getters.getUserArea.id
      http({
      url: url,
      method: 'get'
    })
      .then((response) => {
          sn.addresses =  response.data.address
          sn.loading= false
      }).catch(function (error) {
        console.log(error)
          sn.loading= false
      })
        },
        methods: {
          orderAddress(x){
            this.$store.dispatch("setAddresses", x)
            .then(()=>{
              this.$router.push('/ordersummary')
            })
          }
        }
    }
    </script>