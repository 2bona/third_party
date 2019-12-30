<template>
  <v-card tile flat style="overflow:hidden; height: calc(100vh - 48px)" width="100vw">
<div id="map" style="width: 100%; height: 100%;"></div>
            <div id="infowindow-content" >
                   <v-card :ripple="false" :to="'/vendor/'+vendorList[info].name" flat tile  width="250" height="auto">
        <!-- remove class and set height auto -->
         <v-list class="py-0" avatar>
         <v-list-item class="px-1">
            <v-list-item-avatar class="mr-1">
              <v-img :src="vendorList[info].image"></v-img>
            </v-list-item-avatar>
                 <v-list-item-content>
              <v-list-item-title class="font-weight-bold grey--text text--darken-1" v-html="vendorList[info].name"></v-list-item-title>
              <v-list-item-subtitle><v-rating
                          size="12"
                          :value="4"
                          dense
                          color="orange"
                          hover
                          background-color="grey"
                          class="pa-0"
                          style="line-height: 0;"
                        ></v-rating>
                      </v-list-item-subtitle>
            </v-list-item-content>
  </v-list-item>
         </v-list>
         <div class="px-3 pb-3">
           <div v-for="n in vendorList[info].area" :key="n.id">
      <p v-if="n.name === userArea" class="mb-1 overline font-weight-medium grey--text text-capitalize">delivery: <v-icon style="padding-bottom: 1px" size="10px">mdi-currency-ngn</v-icon>{{n.pivot.fee}} - {{n.pivot.distance | distance}} - {{n.pivot.duration | duration}}</p>
           </div>
      <p v-if="vendorList[info].cash_on_delivery || vendorList[info].cash_on_delivery" class="overline mb-1 font-weight-medium grey--text text-capitalize">options: <v-icon v-if="vendorList[info].cash_on_delivery"  size="23px">mdi-cash-marker</v-icon><v-icon v-if="vendorList[info].card_on_delivery" size="18px">mdi-cellphone-wireless</v-icon></p>
      <v-chip class="mr-1 mb-1" x-small v-for="tag in vendorList[info].tags" :key="tag.tag">{{tag.tag}}</v-chip>
         </div>
      </v-card>
      </div>
    <v-card
      style="position: absolute;z-index: 9;
        bottom: 0;background: transparent"
      absolute
      height="225px"
      width="100%"
     flat tile class="">   
     <p style="position: absolute;text-shadow: -1px 3px 18px black; top:-19px" class="overline mt-6 mb-4 pl-4 grey--text  text--darken-1 font-weight-bold">
           Vendors
               </p>
           <v-layout row wrap class="pt-6 px-5 mx-0" 
           style="overflow-x: auto;
                  display: flex; height:100%;
                  flex-wrap: nowrap;">     
        <v-flex style="flex: 0 0 auto;" v-show="load || !vendorList.length" class="my-2 px-3" xs12 sm6 md6 lg6 v-for="n in ['yi2', 'yi3']" :key="n">
            <v-skeleton-loader
            ref="skeleton" height="100"
            type="list-item-avatar-three-line" 
            tile width="250px"
          ></v-skeleton-loader> 
        </v-flex>
        <v-flex v-show="!load" class="my-2 mx-2" xs12 sm6 md4 lg3 v-for="(n, i) in vendorList" :key="n.id">
          <v-card
          @click="infoShow(i)"
            width="250px"
            height="100px"
            max-height 
            min-height
            color=""
            style=" border-radius:10px 10px 10px 10px"
            class="elevation-24 mx-auto mb-2 px-1 pt-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
                <v-list-item-avatar
                  size="92"
                  tile
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2">
                  <v-img :src="n.image"></v-img>
                </v-list-item-avatar>
              <v-list-item-title >
             
                      <h2
                        style="line-height:1;text-decoration: none;"
                        class="body-1 grey--text text-truncate text--darken-3 font-weight-medium"
                      >{{n.name}}</h2>
                 
                <v-card-title class="mb-0 py-0 px-0">
                  <v-rating
                    :value="4"
                    dense
                    color="orange"
                    hover
                    background-color="grey"
                    size="12"
                    class="mr-2"
                    style="line-height: 0;"
                  ></v-rating>
                  <span class="grey--text overline my-0">(64)</span>
                </v-card-title>
                
             
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>

    </v-card>
  </v-card>
</template>
<style lang="stylus">

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
      info: 0,
       markers: [],
       nothing: false,
       loaded: false,
       infowindow: false
    }
    },
  mounted() {
var sn = this
 if (this.vendorList.length) {
    this.$nextTick(() => {
        sn.initMap()
        sn.loaded = true
  })
      } else{
        this.nothing = true
      }  },
      beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.navb()
    })
  },
  computed: {
    vendorList() {
      return this.$store.getters.getVendorList
    },
    userArea() {
      return this.$store.getters.getUserArea.name;
    },
    load() {
      return this.$store.getters.getVendorLoading;
    }
  },
methods: {
      navb(){
      this.$store.dispatch('mapNav', false)
    },
initMap(){
      this.loaded = true
      var mapDiv = document.getElementById('map')
      var map = new google.maps.Map(mapDiv, {
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: false,
      center: new google.maps.LatLng(6.222004300000001, 7.082116199999973),
      styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  }, //put image in kata
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
    });
    
    const sn = this
     sn.markers = []
    sn.map = map
    var infowindow = new google.maps.InfoWindow();
      var infoOptions= {
            maxWidth: '235px'
          };
    var bounds = new google.maps.LatLngBounds();
    infowindow.close()
    var marker, i;
    for (i = 0; i <sn.vendorList.length; i++) {
      var labels = {
                  fontSize: '10px',
                  color: 'orange',
                  fontWeight: '900',
                  text: this.vendorList[i].name.slice(0, 7).toUpperCase()
              }
      var icons ={
        url: 'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1575637118/in.png'
      }
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(sn.vendorList[i].lat, sn.vendorList[i].lng),
        map: map,
        label: labels,
        icon: icons
      })
      bounds.extend(marker.position)
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        sn.infowindow = true
        const infowindowContent = document.getElementById("infowindow-content");    
        return function() {
          infowindow.setContent(infowindowContent);
          infowindow.setOptions(infoOptions)
          infowindow.open(map, marker);
          map.panTo(marker.getPosition())
          map.setZoom(16);
        }
      })(marker, i));
      sn.markers.push(marker);
    }
    map.fitBounds(bounds);
      var listener = google.maps.event.addListener(map, "idle", function () {
        map.setZoom(12);
        google.maps.event.removeListener(listener);
      });
      },
infoShow(i){ 
  if (this.vendorList.length) {
    this.info = i 
    google.maps.event.trigger(this.markers[i], 'click');
  }else{
      return
  }
  },
}
}
  </script>