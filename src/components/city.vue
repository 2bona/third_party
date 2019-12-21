<template>
  <div class="px-3">
    <v-card class="pb-0 mt-0 mb-5 pb-12" flat tile>
    <v-btn small class="mx-auto my-3" color="primary" @click="display = !display" v-text="display ? 'hide form': 'add new city'"></v-btn>
    <v-scale-transition>
      <div v-show="display">
     <v-card flat tile color class="mb-2">
            <v-card-text style="position:relative" class="pb-0 pl-4">
              <v-text-field
                name="address"
                label="City"
                ref="autocomplete"
                v-model="address"
                color="orange"
                class="font-weight-medium mb-3"
                placeholder="Enter city">
             </v-text-field>
<!-- save food by vendor and list food to user  -->
              <v-row justify="space-around" class="px-3 mb-6">
                <v-card id="map" color="grey" width="100%" height="300"></v-card>
                <div id="infowindow-content">
                  <img src width="16" height="16" id="place-icon" />
                  <span id="place-name" class="body-1 font-weight-bold"></span>
                  <br />
                  <span id="place-address" class="caption"></span>
                </div>
              </v-row>     
          <v-btn :loading="loading" absolute right @click="registerCity"
          color="primary" :disabled="address.length < 3"
          >
        Submit
            </v-btn>
            </v-card-text>

 </v-card>
      </div>
    </v-scale-transition>
    </v-card>
 
    <v-card
        class=" my-5 mx-auto"
      max-width="400" width="100%"
      tile
    >
      <v-list>
          <v-subheader>Cities</v-subheader>
            <v-list-item-group color="primary">
                  <v-list-item :to="'/area/'+item.id+'/'+item.name"
                    v-for="(item, i) in items"
                    :key="i">
                       <v-list-item-icon>
            <v-icon>mdi-tag</v-icon>
          </v-list-item-icon>
                         <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
                  </v-list-item>
            </v-list-item-group>
      </v-list>
    </v-card>
   
  </div>
</template>
<style>
#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}
</style>
<script>
import axios from "axios";
import $Scriptjs from 'scriptjs'

export default {
  data() {
    return {
      name: "",
      display: false,
      loading: false,
      items:[],
      rules: {
        required: value => !!value || "Required.",
        min: value => value.length >= 3 || "Min 3 characters",
        c_password: value =>
          this.password === this.c_password || "does not match passoword",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      numberRules: [
        (v) => (v != null && v.length >= 11) || "Min 11 characters",
        (v) => !!v || 'Phone number is required',
        (v) => v[0] === '0' || 'Phone number must start with "0"',
        (v) => /^[0-9]*$/.test(v) || 'Number must be valid'
      ],
      address: "",
      lat: "",
      tags: "",
      long: "",
      disabled: false,
      place_id: "",
    }
  },
  mounted: function() {
    const sn = this
      $Scriptjs.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0&libraries=places', function () {
sn.map()
    })
  },
  created() {
      var sn = this;
      axios
         .get("/city/all")
         .then(function (response) {
             sn.items = response.data.city
         })
         },
  computed: {
    city() {
      return this.$store.getters.getUser.id;
    }
  },
methods: {
  map(){
    const sn = this
    var markers = [];
    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 6.222, lng: 7.0821 },
      zoom: 13
    });
    sn.autocomplete = new google.maps.places.Autocomplete(
      sn.$refs.autocomplete.$refs.input
    );

    sn.autocomplete.bindTo("bounds", map);
    sn.autocomplete.setFields([
      "address_components",
      "place_id",
      "geometry",
      "icon",
      "name"
    ]);
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    }); 
    map.addListener("click", e => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      setMapOnAll(null);
      markers = [];
      getloc(e);
      sn.long = e.latLng.lng();
      sn.lat = e.latLng.lat();
      var latitude = e.latLng.lat();
      var longitude = e.latLng.lng();
    
      var latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
            sn.place_id = results[0].place_id;
            var substring = "Unnamed";
            if (results[0].formatted_address.includes(substring)) {
              sn.address = results[1].formatted_address;
            } else {
              sn.address = results[0].formatted_address;
            }
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    });
    //onload get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
      sn.lat = position.coords.latitude;
      sn.long = position.coords.longitude;
        var latlng = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude)
        };
        addMarker(latlng);
        map.setCenter(latlng);
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results) {
              sn.place_id = results[0].place_id;
              console.log(results);
              var substring = "Unnamed";
              if (results[1].formatted_address.includes(substring)) {
                sn.address = results[2].formatted_address;
              } else {
                sn.address = results[1].formatted_address;
              }
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        });
      });
    }
    function getloc(e) {
      addMarker(e.latLng);
    }
    function addMarker(latLng) {
      let marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true
      });
      markers.push(marker);
    }
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

//when you select an address form auto complete
    sn.autocomplete.addListener("place_changed", () => {
      sn.disabled = true
      infowindow.close();
      marker.setVisible(false);
      let place = sn.autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = "";
      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            ""
        ].join(" ");
      }

      infowindowContent.children["place-icon"].src = place.icon;
      infowindowContent.children["place-name"].textContent = place.name;
      sn.place_id = place.place_id;
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);

      sn.address = sn.$refs.autocomplete.$refs.input.value;
      sn.lat = place.geometry.location.lat();
      sn.long = place.geometry.location.lng();
    });
  },
    logout () {
     this.$store.dispatch('logout')
    },
  registerCity() {

    var sn = this
    sn.loading = true
   
        axios
         .post("/city/save", {
           name: this.address,
           lat: this.lat,
           lng: this.long,
           place_id: this.place_id,
         })
         .then(function (response) {
           sn.loading = false
           sn.$store.dispatch('snack', {
              color: 'green',
            text: 'City saved'
          })
         })
         .catch(function () {
           sn.loading = false
            sn.$store.dispatch('snack', {
              color: 'red',
            text: 'An error occured'
          })
         });
    }
  }
};
</script>