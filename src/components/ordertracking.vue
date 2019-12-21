<template>
  <v-card tile elevation="20" style="overflow-y:hidden" height="100vh" width="100vw">

<div id="map" style="width: 100%; height: 100%;"></div>
    <v-card
      style="position: absolute;z-index: 99;
bottom: 0;"
      absolute
      height="180px"
      width="100%"
      color="white"
    >
    <v-row justify="space-around">
        <v-col class="pb-0 mb-0">
            <p class="grey--text text--darken-1 text-center mb-2 text-uppercase font-weight-bold title">Tracking Order</p>
            <p class="text-center mb-1  grey--text text--darken-1 caption text-uppercase">invoice: 2do9pis</p>
            <p class="text-center grey--text mb-1 font-weight-regular body-2">Arriving in: 9 mins</p>
        </v-col>

    </v-row>
    <v-row class="pt-0" justify="space-around">
     
      
      <v-flex xs6>
                    <v-btn to="/cart" small block color="orange" class="caption font-weight-black"  dark rounded>order details</v-btn>

        </v-flex>  
    </v-row>
    <v-row justify="space-around">
           <v-flex xs9  class="text-center pt-1">
                    <v-btn  right icon class="mr-2" rounded color="success"><v-icon>mdi-whatsapp</v-icon></v-btn>

      
                    <v-btn icon  rounded color="info"><v-icon>mdi-phone</v-icon></v-btn>

        </v-flex>
  </v-row>
    </v-card>
  </v-card>
</template>
  <script>
  import $Scriptjs from 'scriptjs'
export default {
  mounted(){
    $Scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0', () => {
      this.initMap()
    })
  },
    methods: {
      initMap(){
          var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
      }
  
    }
    }
  </script>