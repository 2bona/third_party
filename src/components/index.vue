<template>
  <div>
    <v-scale-transition>
    <v-btn
      fixed @click="nav ? $router.push('/map') : $router.go(-1)"
      fab :disabled="mapBtn"
      bottom  :dark="nav ? true : false"
      right :size="nav ? '20px' : '10px'"
      :color="nav ? 'orange darken-4' : 'white'" style="z-index:10;margin-bottom: 60px;">
      <v-icon>{{nav ? 'mdi-map-search-outline' : 'mdi-arrow-left'}}</v-icon>
    </v-btn>
    </v-scale-transition>
    <v-expand-transition>
    <v-app-bar v-show="nav" fixed dense color="orange darken-4" extension-height="55">
      <v-menu max-height="300" nudge-bottom="5" allow-overflow max-width="200" offset-y>
      <template  v-slot:activator="{ on }">
        <v-btn   v-show="nav"
        :disabled="loadingAreaList && load"
          color="white"
          x-small dark
          class="text-capitalize font-weight-medium orange--text elevation-9"
          v-on="on">
          <span class="padding-bottom:3px">
          {{userArea.name | name}}<v-icon>mdi-menu-down</v-icon>
          </span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group active-class="orange--text" color="orange darken-4">
             <v-list-item dense 
             @click="$router.push('/usercity')"
         >
          <v-list-item-title class="primary--text text--lighten-2">Choose a different city</v-list-item-title>
        </v-list-item>
        <v-list-item dense 
          v-for="item in areas"
          :key="item.text" @click="changeArea(item.value, item.text)">
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
         </v-list-item-group>
      </v-list>
    </v-menu>
          <div class="flex-grow-1"></div>


      
     
    </v-app-bar>
    </v-expand-transition>
<v-fade-transition>
    <router-view></router-view>
</v-fade-transition>
    <navbottom></navbottom>
  </div>
</template>
<style></style>
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
    navbottom
  },
  data() {
    return {
      rating: 3,
      loadingAreaList: true,
      mapBtn: false,
      
    }
  },
computed: {
    userArea() {
      return this.$store.getters.getUserArea;
    },
    areas() {
      return this.$store.getters.getUserAreaList;
    },
    load() {
      return this.$store.getters.getVendorLoading;
    },
      orders() {
      return this.$store.getters.getOrder;
    },
      vendors() {
      return this.$store.getters.getVendorList;
    },
    navBottomStatus() {
      return this.$store.getters.getNavBottomStatus;
    },
    nav() {
      return this.$store.getters.getMapNav;
    }
  },
mounted(){
  this.navb()
 },
  created () {
    const sn = this
  
    sn.$store.dispatch('vendorLoading', true)
       if (sn.areas.length) {
      sn.loadingAreaList = false
      return
    } else{
    $Scriptjs.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0', function () {
      sn.mapBtn = false
    })
    let url = "/city/areas?id="+sn.$store.getters.getUserCity.id
    http({
      url: url,
      method: 'get'
    })
      .then((response) => {
         sn.$store.dispatch('setAreaList', {
          items: response.data.areas
        })
        sn.loadingAreaList = false
      })
      .catch((err)=>{
        console.log(err)
        sn.loadingAreaList = false
        sn.$router.push('/usercity')
      })
    }

  },
  methods: {
    navb(){
    const sn = this
     let url = "/page?id="+sn.userArea.id
      http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        sn.$store.dispatch('setVendorList', {
          items: response.data.items
      })
        sn.$store.dispatch('vendorLoading', false)
      })
      .catch(function (error) {
        alert(error)
         sn.$store.dispatch('vendorLoading', false)
        sn.$router.push('/usercity')
      })
    },
    changeArea(x, y) {
    const sn = this  
    sn.$store.dispatch('vendorLoading', true)  
    sn.$store.dispatch('setUserArea', {
    area: {id: x, name: y}
      }).then(()=>{
      let url = "/page?id="+sn.$store.getters.getUserArea.id
      http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        sn.$store.dispatch('setVendorList', {
          items: response.data.items
        })
        sn.$store.dispatch('vendorLoading', false)
      }).catch(function (error) {
        console.log(error)
        sn.$store.dispatch('vendorLoading', false)
        sn.$router.push('/usercity')
      })
      })
    }
  }
};
</script>
