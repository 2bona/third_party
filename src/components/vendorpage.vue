<template>
  <div>
    <div>
    <v-btn
      fixed @click="backBtn()"
      bottom
      right fab
      color="white" style="z-index:10;margin-bottom: 60px;">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
        <v-scale-transition origin="center">
                  <v-container v-if="orderStatus && orderso.length" style="position:fixed;z-index:9" class="px-2 pt-0">
        <v-card class="mx-auto" style="position:relative;display:flex;justify-content: center;" flat tile  color="transparent" max-width="600px"  height="125px">
          <v-card v-if="orderso.length" 
              width="100%"
              height="auto"
              max-width="450px"
              min-height=""
              tile
              color="grey lighten-3"
              hover
              style="position:absolute; bottom: 0px; border-radius:100px; overflow-x:scroll;"
              class="elevation-20 mb-2 px-2 pr-4 pt-2 pb-2 mx-auto">
                <v-list-item three-line class="pa-0">

              <v-list-item-avatar v-for="(n, i) in orderso" :key="i"
        size="70"
        v-ripple @click="dialogBtn(i)"
        class="my-auto elevation-7 mr-2">
        <v-img :src="n.item[0].image"></v-img> </v-list-item-avatar>
                </v-list-item>
            </v-card>
                </v-card> 
             </v-container>
               </v-scale-transition>
      <v-layout v-if="orderso.length" style="position:fixed; bottom:0px;background: linear-gradient(#fff0 0%, #fff 100%);width: 100%; z-index:9" row wrap class="mx-auto pb-2 px-2">
      <v-flex xs6 class="px-2">
        <v-btn block @click="orderStatus ? trayBtn(false) : trayBtn(true)" class="mt-2 elevation-10" rounded="" dark color="orange darken-4" v-html="orderStatus ? 'hide tray': 'show tray'"></v-btn>
      </v-flex>
      <v-flex xs6 class="px-2">       
        <v-btn  block to="/checkout" class="mt-2 elevation-10" rounded="" dark color="primary">checkout</v-btn>
      </v-flex>
  </v-layout>
          <v-card class="mx-auto" max-width="600" flat tile> 
            <v-tooltip max-width="120" left>
            <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="dialogVendor = true" style="right: 0;"  icon fab absolute right> <v-icon>mdi-information-outline</v-icon> </v-btn>
              </template>
              <p class="pa-2 mb-0 caption font-weight-medium">Vendor info</p>
            </v-tooltip>
            <v-tooltip max-width="130" right>
                <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="isFavourite? deFavourite(vendor.id) : favourite(vendor.id)" style="left: 0;"  icon fab absolute right>
               <v-icon :color="isFavourite ? 'red accent-4' : 'grey'">{{isFavourite ?  'mdi-heart' : 'mdi-heart-outline'}}</v-icon> </v-btn>
              </template>
              <p class="pa-2 mb-0 caption font-weight-medium">{{isFavourite ?  'Remove from favourites' : 'Add to favourites'}}</p>
            </v-tooltip>
          <v-row  justify="space-around">
           <v-avatar size="100"
               color="transparent"
               class="mt-6 mb-2 elevation-10">
               <v-img :src="vendor.image" alt="profile"></v-img>
           </v-avatar>
        <v-flex xs12 class="mb-2">
        <h2 class="text-center mb-0 text-capitalize grey--text text--darken-1 font-weight-bold">{{vendor.name}}</h2>
        </v-flex>
        <v-row class="px-12" justify="space-around" >
          <v-flex xs3>
              <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
              <span><v-icon size="12" style="padding-bottom:1.2px">mdi-currency-ngn</v-icon></span>{{vendor.minimum_order | price}}
              </h5>
              <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                  Min Order
              </p>
        </v-flex>   
          <v-flex xs3>
              <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                  {{estTime | duration}}
              </h5> 
              <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                  Est. time
              </p>
        </v-flex>   
          <v-flex xs3>
                <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                  <span><v-icon size="12" style="padding-bottom:1.2px">mdi-currency-ngn</v-icon></span>{{deliveryFee | price}}
                </h5>
              <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                  Delivery
              </p>
        </v-flex>  
        </v-row>    
       </v-row>
      <v-tabs  slider-color="orange" active-class="orange--text" color="orange">
        <v-tab v-if="loading" class="caption font-weight-medium">
        <v-skeleton-loader
        type="chip"
        tile
      ></v-skeleton-loader>  
        </v-tab>
        <v-tab v-if="loading" class="caption font-weight-medium">
        <v-skeleton-loader
        type="chip"
        tile
      ></v-skeleton-loader>
        </v-tab>
        <v-tab v-if="loading" class="caption font-weight-medium">
        <v-skeleton-loader
        type="chip"
        tile
      ></v-skeleton-loader>
        </v-tab>
        <v-tab  v-for="n in vendor.categories" :key="n.name" v-text="n.name" class="caption  font-weight-bold"></v-tab>
            <v-tab-item v-if="loadingItems" class="pt-3">
        <v-skeleton-loader v-for="n in 4" :key="n" 
        ref="skeleton" width="100%"
        type="list-item-avatar-three-line"
        tile
      ></v-skeleton-loader>  
        </v-tab-item>
            <v-tab-item v-if="loadingItems" class="pt-3">
        <v-skeleton-loader v-for="n in 4" :key="n" 
        ref="skeleton" width="100%"
        type="list-item-avatar-three-line"
        tile
      ></v-skeleton-loader>  
        </v-tab-item>
            <v-tab-item v-if="loadingItems" class="pt-3">
        <v-skeleton-loader v-for="n in 4" :key="n" 
        ref="skeleton" width="100%"
        type="list-item-avatar-three-line"
        tile
      ></v-skeleton-loader>  
        </v-tab-item>
        <v-tab-item class="pt-2 mb-12" style="padding-bottom:120px" v-for="d in items" :key="d.id">
        <div v-for="item in d.items"
             v-show="!loadingItems"
              :key="item.id">
        <v-list-item :ripple="false" @click="item.main_option.length ? openItem(item, item.category_id, item.name) : item.status = !item.status">
          <v-list-item-avatar :size="item.status ? '40' : '50'" style="align-self: flex-start; top: 8px;border-radius:5px;" class="elevation-5 mr-3" tile>
            <v-img :src="item.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title :class="!item.status ? 'body-1 font-weight-bold' : ''" class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium" v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle :class="!item.status ? 'text-wrap' : ''" class="grey--text caption " v-html="item.description"></v-list-item-subtitle>
            <v-list-item-subtitle :class="!item.status ? 'body-1 font-weight-bold pb-2' : 'caption'" class=" grey--text text--darken-1">
              <span><v-icon :size="!item.status ? '15' : '11'" color="grey darken-1" style="padding-bottom:3px">mdi-currency-ngn</v-icon></span>{{item.price | price}}
            <v-btn @click="addToCart(item)" v-if="!item.status" class="mr-4 elevation-3" absolute right small color="primary" rounded>add</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
          
        </v-list-item>
        <v-divider></v-divider>
         </div>

        <!-- <v-card flat tile color="transparent" height="100">
          
        </v-card> -->
        </v-tab-item>
  
      </v-tabs>
       </v-card>
    </div>
            <v-dialog scrollable  
            v-model="dialog" 
            max-width="500px" persistent
            transition="dialog-transition">
      <v-card color="white" v-if="orderso.length">      
      <div  v-for="(l, p) in orderso" :key="p">
      <div v-show="p === dialogItem">
        <v-card-title class="pb-1 elevation-10" primary-title>
          <span class="grey--text pr-1" v-if="l.item[0].qty > 1">{{l.item[0].qty +'x'}} </span> {{l.item[0].name +' '}} <span class="pl-1 pb-2 caption grey--text"> <v-icon size="11" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon>{{l.total | price}}</span>
          <v-btn @click="dialog3=true" style="right:3px; top:3px" class="" absolute right x-small icon color="grey lighten-2"><v-icon size="18">mdi-trash-can-outline</v-icon></v-btn>
       <div v-if="l.compulsory.length" class="px-0 pb-2">
       <v-chip class="mx-1"  small v-for="n in l.compulsory" :key="p+n.id">{{n.name}}</v-chip>
        </div>
        </v-card-title>
       <v-card-text style="max-height:200px;overflow:auto">
       <div v-for="(o) in l.optional" :key="p+o.id">
       <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="padding-left:1px" class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium" v-html="o.name"></v-list-item-title>
            <v-list-item-subtitle class=" grey--text pl-0">
              <span><v-icon size="13" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon></span>{{o.price * (o.qty === 0 ? 1 : o.qty) | price}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <div class="d-flex py-3">
    <p  color="grey lighten-2"  class="pt-1 mx-1 grey--text text--darken-1 text-center mb-0">{{'x '+o.qty}}</p> 
        </div>
        </v-list-item>
        <v-divider></v-divider>
         </div>
    </v-card-text>
        
        <v-card-actions class="pl-3 elevation-10">
            <div class="d-flex py-3">
       <v-btn x-small @click="minusItem"  fab  color="white"  class="my-0 grey--text elevation-4">
           <v-icon>mdi-minus</v-icon>
           </v-btn>
    <p  color="grey lighten-2"  class="pt-1 mx-1 grey--text text--darken-1 text-center mb-0">{{l.item[0].qty}}</p> 
    <v-btn x-small @click="addItem" fab  color="white"  class="my-0 grey--text elevation-4">
        <v-icon>mdi-plus</v-icon>
        </v-btn>
        </div>
          <div class="flex-grow-1"></div>
          <v-btn  color="grey lighten-1" text @click="dialog = false">save</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn> -->
        </v-card-actions>
      </div>
      </div>
      </v-card>
</v-dialog>
<v-dialog
      v-model="dialogLeave"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Empty your tray?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text
            @click="dialogLeave = false"
          >
            cancel
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            @click="leaveRoute">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<v-dialog
      v-model="dialog3"
      max-width="290">
      <v-card>
        <v-card-title class="headline">Delete item from tray</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text
            @click="dialog3 = false"
          >
            cancel
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            @click="removeOrder()">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
    <v-dialog v-model="dialogVendor" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile flat class="">
        <v-toolbar dark color="orange darken-4">
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <v-btn fab icon dark @click="dialogVendor = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="px-3 pt-3">
      <span class="overline pt-3 grey--text  text--darken-1 font-weight-bold">
       Description
      </span>
    <v-list-item  class="my-1 " dense>
      <v-list-item-content>
        <v-list-item-subtitle  class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">
          {{vendor.bio}}
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        </div>
  <v-divider></v-divider>
    <div class="px-3 pt-3">
      <span class="overline pt-3 grey--text  text--darken-1 font-weight-bold">
       Payment methods
      </span>
    <v-list-item  class="my-1 " dense>
      <v-list-item-content>
        <v-list-item-subtitle  class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">
          Card payment online
          </v-list-item-subtitle>
        <v-list-item-subtitle v-if="vendor.card_on_delivery" class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">
          Mobile / USSD Transfer on delivery  
          </v-list-item-subtitle>
        <v-list-item-subtitle v-if="vendor.cash_on_delivery" class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">
          Cash Payment on delivery  
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </div>
    <v-divider></v-divider>
              <div class="px-3 pt-3">

        <span class="overline pt-3 grey--text  text--darken-1 font-weight-bold">
       Opening hours
      </span>
    <v-list-item  class="my-1 " dense>
      <v-list-item-content>
        <v-list-item-subtitle  class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">
          {{vendor.bio}}
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
              </div>
<v-divider></v-divider>
                      <div class="px-3 pt-3">

      <span class="overline pt-3 grey--text  text--darken-1 font-weight-bold">
       Address
      </span>
    <v-list-item  class="my-1 " dense>
      <v-list-item-content>
        <v-list-item-subtitle class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">
          {{vendor.address}}  
          </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        
        </div>
    

      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.v-list-item__avatar:last-of-type:not(:only-child) {
    margin-left: 0px!important;
    margin-right: 10px!important;
}</style>
<script>
  import axios from 'axios'
  import wrapper from 'axios-cache-plugin'

  let http = wrapper(axios, {
    maxCacheSize: 30, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
    ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
    excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
  })
export default {
  data() {
    return {
      vendor:{},
      items:[],
      estTime: '',
      deliveryFee: '',
      total: Number,
      dialogLeave: false,
      dialogVendor: false,
      leave: false,
      dialog: false,
      dialog3: false,
      loading: true,
      loadingItems: true
    }
  },
  created () {
      this.navb()
  },
  computed: {
     userArea() {
      return this.$store.getters.getUserArea
    },
    orderso() {
      return this.$store.getters.getOrder
    },
    orderStatus() {
      return this.$store.getters.getOrderStatus.status
    },
    dialogItem() {
      return this.$store.getters.getOrderStatus.item
    },
    serviceCharge(){
     if (this.total < 2500) {
        return Math.round((this.total * 0.015) + 50)
     } else {
       return Math.round((this.total * 0.015) + 200)
     }
    },
    grandTotal(){
      return this.total + this.deliveryFee + this.serviceCharge
    },
    // favourites(){
    //   return this.$store.getters.getFavourites
    // },
    isFavourite(){
      // const sn = this
      // return sn.favourites.some((item) => {
      //  return sn.vendor.id === item.id
      // })
      return true
    }
  },
  methods: {
    favourite(x){
      alert(x)
    },
    deFavourite(x){
      alert(x)
    },
    backBtn(){
      if (this.orderso.length) {
        this.dialogLeave = true
      } else {
        this.$router.push('/')
      }
    },
  addToCart(x){
   const sn = this
  sn.$store.dispatch('setOrder', {
    order: { 
      item:[{
          name: x.name,
          price: x.price,
          image: x.image,
          id: x.id,
          qty: 1
    }],
    compulsory: [],
    optional: [],
    total: x.price
            }
  })
  sn.$store.dispatch('setOrderStatus', {
    orderStatus: {
      status: true
    }
  })
    },
    leaveRoute(){
      const sn = this
      sn.leave = true
      sn.$store.dispatch('emptyOrder')
      sn.$router.push('/')

  },
  addItem(){
    const sn = this
    sn.$store.dispatch('addItemCount', {
      orderI : sn.dialogItem
    })
  },
  minusItem(){
    const sn = this
    sn.$store.dispatch('minusItemCount', {
      orderI : sn.dialogItem
    })

  },
  trayBtn(x){
      this.$store.dispatch('setOrderStatus', {
      orderStatus: {
        item: null,
        status: x
      }
    })
  },
  dialogBtn(x){
    const sn = this
    sn.$store.dispatch('setOrderStatus', {
        orderStatus: {
          item: x,
          status: true
        }
      })
      sn.getTotal(x)
    
      sn.dialog = true
  },
  getTotal(x){
    const sn = this
  var item = sn.orderso[x].item[0]
      var sum = sn.orderso[x].optional.reduce((currentTotal, item) => {
        return item.price + currentTotal
      }, 0)
      sn.total = (item.price * item.qty) + sum
  },
  removeOrder(){
  const sn = this
    sn.$store.dispatch('removeOrder', {
        order: sn.dialogItem
      })
      sn.dialog = false
      sn.dialog3 = false
    }, 
  openItem(x, y, z){
      this.$store.dispatch('setItem', x)
      .then(()=>{
        this.$router.push('/vendoritem/'+y+'/'+z)
      })
      },
  navb(){
    const sn = this
    sn.$store.dispatch('mapNav', false)
    let url = "/vendorpage?name="+sn.$route.params.name
    http({
      url: url,
      method: 'get'
    })
    .then((response) => {
      sn.loading = false
      var m = response.data.vendor
      sn.vendor = m
      var r = m.area.find((i)=>{
        return i.name === sn.userArea.name
      })
    var d = {}
    d.fee = r.pivot.fee
    sn.estTime = r.pivot.duration
    d.duration = r.pivot.duration
    d.distance = r.pivot.distance
    d.vendor_id = sn.vendor.id
    d.payOnDelivery = m.cash_on_delivery 
    d.transferOnDelivery = m.card_on_delivery 
    d.account_name = m.account_name 
    d.account_number = m.account_number 
    d.bank_name = m.bank_name 
    sn.deliveryFee = d.fee
    sn.$store.dispatch('setDeliveryParams', d)
    let url = "/vendoritems?name="+sn.$route.params.name
    http({
      url: url,
      method: 'get'
    })
    .then((response) => {
      sn.items = response.data.items
    }).then(()=>{
      sn.loadingItems = false
    })
    .catch((err)=>{
      console.log(err)
      sn.loadingItems = false
    })
    })
    .catch((err)=>{
      console.log(err)
      sn.loading = false
    })
    },
      back() {
      this.$router.go(-1)
    }
  }
}
</script>