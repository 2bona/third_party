<template>
<div> 
<v-card class="pt-1 px-2" style="padding-bottom:140px" flat tile min-height="100vh">
        <v-list-item>
        <v-list-item-avatar  color="grey lighten-3" style="align-self: flex-start; top: 11px;" :class="loading ? 'elevation-0 mr-2' : 'elevation-10 mr-3'" size="80">
          <v-img :src="item.image"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="pb-0" v-if="loading">
        <v-skeleton-loader  
        ref="skeleton" width="100%"
        type="list-item-three-line"
        tile>
        </v-skeleton-loader>
       </v-list-item-content>
        <v-list-item-content class="pb-0" v-if="!loading"> 
        <v-list-item-title class="headline mb-0 grey--text text-wrap text--darken-1 text-capitalize font-weight-medium" v-html="item.name"></v-list-item-title>
        <v-list-item-subtitle class="body-1 grey--text   caption text-wrap" v-html="item.description"></v-list-item-subtitle>
        <v-list-item-subtitle class=" grey--text subtitle-1 font-weight-bold text--darken-1">
          <span><v-icon size="15" color="grey darken-1" style="padding-bottom:2px">mdi-currency-ngn</v-icon></span>{{item.price | price}}
        </v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item> 
      <div v-for="(n, i) in item.main_option" :key="n.id + n.pivot.type">
        <div v-if="n.pivot.type === 'compulsory'">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle style="" class="overline  mt-4 font-weight-medium grey--text text-wrap" v-html="n.title"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

<div v-for="(o, p) in n.option" :key="o.name">
      <v-list-item>
          <v-list-item-avatar style="border-radius:5px" class="elevation-5 mr-3" size="30" tile>
            <v-img :src="o.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium" v-html="o.name"></v-list-item-title>
          </v-list-item-content>
                  <div  class="d-flex py-0">
                    <v-switch color="primary" :disabled="compId[i] != null && compId[i] != o.id" v-model="o.available_qty" @change="addItem(o, i, p)"  class=""></v-switch> 
                  </div>           
        </v-list-item>
        <v-divider></v-divider>
        </div>

</div>
        <div v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle style="" class="overline mt-4 font-weight-medium grey--text text-wrap" v-html="n.title"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
<div v-for="(o, p) in n.option" :key="o.name">
      <v-list-item>
          <v-list-item-avatar class="elevation-5 mr-3" size="30" tile>
            <v-img :src="o.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title style="padding-left:1px" class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium" v-html="o.name"></v-list-item-title>
            <v-list-item-subtitle class=" grey--text pl-0">
              <span><v-icon size="13" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon></span>{{o.price * (o.total_qty === 0 ? 1 : o.total_qty) | price}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <div class="d-flex py-5">
       <v-btn x-small @click="removeComp(o, i, p)" fab  color="white"  class="my-0 grey--text elevation-4">
           <v-icon>mdi-minus</v-icon>
           </v-btn>
    <p  color="grey lighten-2"  class="pt-1 mx-1 grey--text text--darken-1 text-center mb-0">{{o.total_qty}}</p> 
    <v-btn x-small @click="addComp(o, i, p)" fab  color="white"  class="my-0 grey--text elevation-4">
        <v-icon>mdi-plus</v-icon>
        </v-btn> 
        </div>          
        </v-list-item>
        <v-divider></v-divider>
        </div>

</div>
    
         </div>
         <v-layout v-if="order.item.length" style="position:fixed; bottom:0px;background: linear-gradient(#fff0 0%, #fff 100%);width: 100%" row wrap 
         class="mx-auto pb-2 px-3">
              <v-flex xs6>
                  <v-text-field
              name="item"
              label="Total" :value="totalAmt | price" @input="value=>item.price=value"
              hide-details disabled
              single-line
              color="orange"
              class="mt-0 font-weight-bold headline"
            prepend-inner-icon="mdi-currency-ngn"></v-text-field>  
              </v-flex>
              <v-flex xs6 class="pr-3">
                
 <v-btn block :disabled="!(order.compulsory.length === compulsoryCount.length)" @click="addToCart" :class="(order.compulsory.length === compulsoryCount.length) ? 'mt-2 elevation-10 caption font-weight-black blue--text text--lighten-4' : 'mt-2'"  color="primary" rounded="" dark>add to cart</v-btn>
              </v-flex>
          </v-layout>
       <div v-if="loading" class="mt-8 px-1">
             <v-skeleton-loader  
        ref="skeleton" width="100%"
        type="sentences"
        tile class="px-4 mt-6 mb-6"
      ></v-skeleton-loader>
        <v-skeleton-loader v-for="n in ['e', 'g', 'r', 'l']" :key="n" 
        ref="skeleton" width="100%"
        type="list-item-avatar-two-line"
        tile
      ></v-skeleton-loader>
             <v-skeleton-loader  
        ref="skeleton" width="100%"
        type="sentences"
        tile class="px-4 mt-4 mb-3"
      ></v-skeleton-loader>
        <v-skeleton-loader v-for="n in ['q', 'w', 'z', 'p']" :key="n" 
        ref="skeleton" width="100%"
        type="list-item-avatar-two-line"
        tile class="px-4 mt-0 mb-3"
      ></v-skeleton-loader>

             </div> 
           <v-btn
              fixed @click="$router.go(-1)"
              fab 
              bottom 
              right
              color="white" style="z-index:999; margin-bottom: 60px;">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-card> 
  
  </div>
</template>


<script>
import navbottom from "./navbottom.vue";
import axios from 'axios'
import wrapper from 'axios-cache-plugin'
import $Scriptjs from 'scriptjs'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
export default {
  components: {
  },
  data() {
    return {
        loading: true,
        totalAmt: 0,
        order:{
          item: [],
          compulsory: [],
          optional: [],
          total: Number
        },
        compId: [],
        tray: []

    }
  },
computed: {
    item() {
      return this.$store.getters.getItem;
    },
    compulsoryCount() {
       return this.$store.getters.getItem.main_option.filter((item)=>{
         return item.pivot.type === 'compulsory'
       })
    },
    orders() {
      return this.$store.getters.getOrder;
    },
  },
mounted(){
    this.navb()
 },
  created () {
  },
  methods: {
  getTotal(){
    const sn = this
    var main = sn.order.item[0]
    const d = sn.order.optional
    var total = 0;
     if (d.length) {
       d.forEach((item) => { total += (item.price * item.qty) })
       sn.totalAmt = total + (main.price * main.qty)
     } else {
       sn.totalAmt = main.price
     }
     sn.order.total = sn.totalAmt
  },
 addToCart(){
   const sn = this
  sn.$store.dispatch('setOrder', {
    order: sn.order
  })
  sn.$store.dispatch('setOrderStatus', {
    orderStatus: {
      status: true
    }
  })
  sn.$router.go(-1)
    },
    addComp(x, y, p){
      const sn = this
      const d = sn.order.optional
      var index = null
      if (d.length) {
          for (var i in d) {
        if (d[i].id === x.id) {
          d[i].qty += 1
          sn.item.main_option[y].option[p].total_qty+= 1
          sn.getTotal()
          return
           }
        }
         d.push({
          name: x.name,
          price: x.price,
          image: x.image,
          qty: 1,
          id: x.id,
          type: sn.item.main_option[y].pivot.type
        })
        sn.getTotal()
          sn.item.main_option[y].option[p].total_qty = 1
        
      } else{
         d.push({
          name: x.name,
          price: x.price,
          image: x.image,
          qty: 1,
          id: x.id,
          type: sn.item.main_option[y].pivot.type
        })
        sn.getTotal()
          sn.item.main_option[y].option[p].total_qty = 1
      }
    },
    removeComp(x, y, p){
      const sn = this
      const d = sn.order.optional
      var index = null
        for (var i in d) {
        if (d[i].name === x.name) {
            if (sn.item.main_option[y].option[p].total_qty === 1) {
            sn.item.main_option[y].option[p].total_qty = 0
            d.splice(i, 1)
            sn.getTotal()
          } else{
          d[i].qty --
          sn.item.main_option[y].option[p].total_qty--
          sn.getTotal()
          }
          return
        }
        }
    },
  addItem(x, y, z){
       const sn = this
       if(x.available_qty){
          sn.compId[y] = x.id
          sn.order.compulsory.push({
          name: x.name,
          price: x.price,
          image: x.image,
          qty: 1,
          id: x.id, 
          type: sn.item.main_option[y].pivot.type
        })
        sn.getTotal()
       } else{
         sn.compId[y] = null
        const d = sn.order.compulsory
         for (var i in d) {
           if(sn.order.compulsory[i].name === x.name){
             sn.order.compulsory.splice(i, 1)
             
             return
           } 
         }sn.getTotal()
       }
  },
    navb(){
    const sn = this
    const rd = sn.item
    sn.tray = sn.orders
    if (rd.id) {
        sn.loading = false
           sn.order.item.push({
              name: rd.name,
              price: rd.price,
              image: rd.image,
              id: rd.id,
              qty: 1,
            })
            sn.getTotal()
        return
    } else {
        let url = "/vendoritem?cat="+sn.$route.params.category+"&name="+sn.$route.params.name
        http({
            url: url,
            method: 'get'
        })
        .then((response) => {
            sn.loading = false
            var d = response.data.item
            sn.order.item.push({
              name: d.name,
              price: d.price,
              image: d.image,
              qty: 1,

            })
             sn.getTotal()
           sn.$store.dispatch('setItem', d)
        })
    }

    }
  }
};
</script>
