<template>
  <div>
    <v-flex xs12 lg9 class style="margin: 2.4rem 0px 6rem 0px">
      <v-card style="overflow-x:hidden;" flat tile color="transparent">
    
      <p class="overline mt-6 pl-4 grey--text  text--darken-1 font-weight-bold">
           Vendors
               </p>
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
              <v-flex v-show="!load" xs12 sm4 v-for="n in vendors" :key="n.id">
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
                  </v-img>
                  </router-link>

                  <v-card-text class="mx-0 py-0 px-6">
                    <v-layout row wrap>
                      <v-flex xs12>
                      <p v-text="n.name"
                          class="title text-truncate font-weight-bold mb-0 mt-2"></p>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-row style="height:" class="mb-0 px-6" justify="space-between">
                    <v-flex xs11>
                      <v-card-title
                        style="height:;
                        align-items:self-start;"
                        class="py-0 px-0"
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
                        <div class="">
                          <div v-for="m in n.area" :key="m.id">
                                         
                            <div v-if="m.name === userArea" class="mb-1 overline font-weight-medium grey--text text-capitalize">
                              <v-tooltip max-width="300" top>
                              <template v-slot:activator="{ on }">
                                <v-layout>
                                 <v-flex xs12>
                                   <v-flex style="display: inline;"  v-on="on">
                                 <v-icon style="padding-bottom: 2px" size="9px">mdi-currency-ngn</v-icon>{{m.pivot.fee}} - {{m.pivot.distance | distance}} - {{m.pivot.duration | duration}}
                                   </v-flex>
                          <v-tooltip v-if="n.cash_on_delivery" top>
                              <template v-slot:activator="{ on }">
                        <v-icon class="mr-1" v-on="on"  size="20px">mdi-cash-marker</v-icon>
                              </template>
                              <span class="caption font-weight-medium">Pay cash on delivery</span>
                            </v-tooltip>
                            <v-tooltip v-if="n.cash_on_delivery" top>
                              <template v-slot:activator="{ on }">
                        <v-icon v-on="on" v-if="n.card_on_delivery" size="16px">mdi-cellphone-wireless</v-icon>
                              </template>
                              <span class="caption font-weight-medium">Mobile app or ussd transfer on delivery</span>
                            </v-tooltip>
                            </v-flex> 
                                  </v-layout>
                              </template>
                              <p class="caption font-weight-medium mb-0"> Delivery fee to {{userArea}}: <v-icon color="grey lighten-5" style="padding-bottom: 1px" size="14px">mdi-currency-ngn</v-icon>{{m.pivot.fee}} </p>
                              <p class="caption font-weight-medium mb-0"> Distance: {{m.pivot.distance | distance}}</p>
                              <p class="caption font-weight-medium mb-1"> Your Order will be delivered in {{m.pivot.duration | duration}}</p>
                              </v-tooltip>
 </div>
                          </div>
                        </div>
                      
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
<style></style>
<script>
import navbottom from "./navbottom.vue";
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

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
      rating: 3,
      items: [
        {
          name: "food info",
          link: "/food/id"
        },
        {
          name: "contact seller",
          link: "/vendor/id"
        }
      ],
    };
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.navb()
    })
  },
  methods: {
    navb(){
      if (this.orders.length) {
        this.$router.go(-1)
      } else{
        this.$store.dispatch('mapNav', true)
      }
    },
  },
  computed: {
      vendors() {
      return this.$store.getters.getVendorList;
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
  }
};
</script>
