<template>
  <div>
    <v-flex xs12 lg9 class style="margin: 2.4rem 0px 6rem 0px">
      <v-card style="overflow-x:hidden;" flat tile color="transparent">
    <v-layout row wrap class="pl-2 pt-2 mb-1">
    <v-flex xs6>
      <p class="overline d-flex mt-6 pl-4 grey--text  text--darken-1 font-weight-bold">
        Vendors
      </p>
    </v-flex>
    <v-flex xs6 class="text-right pr-6 mt-4">
      <v-menu max-height="300" nudge-bottom="5" allow-overflow max-width="200" offset-y>
      <template  v-slot:activator="{ on }">
        <v-btn  
          color="white"
          x-small dark
          class="text-capitalize font-weight-medium orange--text elevation-5"
          v-on="on">
          <span class="padding-bottom:3px">
            {{filter}}<v-icon class="pb-1">mdi-menu-down</v-icon>
          </span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group active-class="orange--text" color="orange darken-4">
             <v-list-item dense
             @click="sortBy('name', 0, 'asc', 'name')">
          <v-list-item-title class="grey--text">Name</v-list-item-title>
        </v-list-item>
             <v-list-item dense
             @click="sortBy('area', 'distance', 'asc', 'distance')">
          <v-list-item-title class="grey--text">Distance</v-list-item-title>
        </v-list-item>
             <v-list-item dense
             @click="sortBy('area', 'fee', 'asc', 'Del. fee')">
          <v-list-item-title class="grey--text">Delivery fee</v-list-item-title>
        </v-list-item>
             <v-list-item dense
             @click="sortBy('minimum_order', 0, 'asc', 'Min. order')">
          <v-list-item-title class="grey--text">Min. order</v-list-item-title>
        </v-list-item>
         </v-list-item-group>
      </v-list>
    </v-menu>
    </v-flex>
    </v-layout>
    <div class="container pt-0 pb-0 mb-0">
      <v-flex xs12>
        <v-layout row wrap>
        <v-flex v-show="load" xs12 sm4 v-for="n in 2" :key="'nb'+n">
        <v-fade-transition>
          <v-skeleton-loader v-show="load"
            ref="skeleton" width="90%" 
            type="card" class=" mx-auto pt-1 pb-2 mb-5">
          </v-skeleton-loader> 
        </v-fade-transition>
              </v-flex>
              <v-flex v-show="!load" xs12 sm4 v-for="(n) in vendors" :key="n.id">
              <v-fade-transition>
                <v-card 
                  v-show="!load"
                  color="" :ripple="false"
                  style=" border-radius:20px 20px 20px 20px"
                  class=" mx-auto pt-2 pb-2 mb-5"
                  width="90%" 
              >
              <router-link :to="'/vendor/'+n.name">
                <v-img
                width="94%"
                style="border-radius: 10px;"
                class="elevation-15 mx-auto"
                height="150"
                :src="n.image">
              <v-fade-transition>
            <v-overlay
            v-if="hover === n.id"
            absolute>
            <div  class="pa-1 text-left" >
            <p class="overline font-weight-medium mb-0"> Delivery fee: <v-icon color="grey lighten-5" style="padding-bottom: 3px" size="11px">mdi-currency-ngn</v-icon>{{n.area[0].pivot.fee}} </p>
            <p class="overline font-weight-medium mb-0"> Distance: {{n.area[0].pivot.distance | distance}}</p>
            <p class="overline font-weight-medium mb-0"> Duration: {{n.area[0].pivot.duration | duration}}</p>
            <p v-if="n.cash_on_delivery" class="overline font-weight-medium mb-0"> Cash payment on delivery</p>
            <p v-if="n.card_on_delivery" class="overline font-weight-medium mb-0"> Mobile / USSD transfer on delivery</p>
            </div>
          </v-overlay>
          </v-fade-transition>
                  </v-img>
                  </router-link>

                  <v-card-text class="mx-0 py-0 px-6">
                    <v-layout row wrap>
                      <v-flex xs8>
                      <p v-text="n.name"
                          class="title text-truncate font-weight-bold mb-0 mt-2"></p>
                      </v-flex>
                      <v-flex  xs4 class="text-right">
                        <v-icon  @click="info(n.id)"
                         :color="(2000 >=  n.area[0].pivot.distance) ? 'green accent-4' : ( n.area[0].pivot.distance > 2000 ) && ( 4000 > n.area[0].pivot.distance ) ? 'lime accent-4' : ( n.area[0].pivot.distance > 4000 ) && ( 6000 >= n.area[0].pivot.distance ) ? 'yellow accent-4': ( n.area[0].pivot.distance > 6000 ) && ( 8000 >= n.area[0].pivot.distance ) ? 'orange accent-4' : ( n.area[0].pivot.distance > 8000 ) && ( 10000 >= n.area[0].pivot.distance ) ? 'deep-orange accent-4' : 'red accent-4'" 
                         class="mt-3">{{(  2000 >=  n.area[0].pivot.distance) ? 'mdi-network-strength-4' : ( n.area[0].pivot.distance > 2000 ) && ( 4000 > n.area[0].pivot.distance ) ? 'mdi-network-strength-3' : ( n.area[0].pivot.distance > 4000 ) && ( 6000 >= n.area[0].pivot.distance ) ? 'mdi-network-strength-2': ( n.area[0].pivot.distance > 6000 ) && ( 8000 >= n.area[0].pivot.distance ) ? 'mdi-network-strength-2' : ( n.area[0].pivot.distance > 8000 ) && ( 10000 >= n.area[0].pivot.distance ) ? 'mdi-network-strength-1' : 'mdi-network-strength-outline'}}
                        </v-icon>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-row style="height:" class="mb-0 px-6" justify="space-between">
                    <v-flex xs11>
                      <v-card-title
                        style="height:;
                        align-items:self-start;"
                        class="py-0 mb-1 px-0"
                      >
                        <v-rating
                          size="12"
                          :value="4"
                          dense
                          color="orange"
                          hover
                          background-color="grey"
                          class="pa-0"
                          style="
                              line-height: 0;
                          "
                        ></v-rating>
                        <span class="grey--text overline mt-0">(64)</span>
                        </v-card-title>
                    </v-flex>
                  </v-row>
                  <v-card-text class="mx-0 mb-0 mt-0 pt-0 pb-1 px-1">
                    <v-layout>
                      <v-flex xs12 class="px-1">
                              <v-chip color="grey lighten-3" class="mx-1 mb-1" x-small v-for="tag in n.tags" :key="tag.tag">{{tag.tag}}</v-chip>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
          </v-fade-transition>
              </v-flex>
            </v-layout>
          </v-flex>
        </div>
      </v-card>
    </v-flex>
  </div>
</template>
<style>
.v-overlay__content {
    width: 100%!important;
    height: 100%!important;
    padding: 8px!important;
    background: linear-gradient(to right, rgba(255, 30, 22, 0.4) 0%, rgba(46, 141, 89, 0.3) 100%);
}
</style>
<script>
import navbottom from "./navbottom.vue";
import axios from 'axios'
import wrapper from 'axios-cache-plugin'
import _ from 'lodash'
let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
export default {
  components: {
    navbottom
  },
  data() {
    return {
      show: false,
      filter: 'filter',
      hover: [],
      rating: 3,
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.navb()
    })
  },
  methods: {
     info(d){
      const sn = this
      if (sn.hover === d) {
        sn.hover = null
      } else {
        sn.hover = d
      }
    },
    sortBy(prop, prop2, direction, prop3) {
      const sn = this
      sn.filter = prop3
       var nestedSort = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
        const a = prop2 ? e1[prop1][0]['pivot'][prop2] : e1[prop1],
            b = prop2 ? e2[prop1][0]['pivot'][prop2] : e2[prop1],
            sortOrder = direction === "asc" ? 1 : -1
        return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
    }
      sn.vendors.sort(nestedSort(prop, prop2, direction))
    },
    navb(){
        this.$store.dispatch('mapNav', true)
    },
  },
  computed: {
      vendors() {    
      return  this.$store.getters.getVendorList
    },
    orders() {
      return this.$store.getters.getOrder;
    },
  
    userArea() {
      return this.$store.getters.getUserArea.name;
    },
      load() {
      return this.$store.getters.getVendorLoading;
    }
  },
  watch: {
    userArea(){
      this.filter = 'filter'
    }
  }
};
</script>
