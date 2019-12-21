<template>
  <div>
    <v-btn
      fixed @click="$router.go(-1)"
      bottom
      right fab
      color="white" style="z-index:10" class="mb-12">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-card color=""  max-width="600px"  class="mx-auto pt-3 mb-12 pb-0 mt-0" flat tile>
        <p class="overline px-3  mb-2 grey--text  text--darken-1 font-weight-bold">
      address
       </p>
          <v-card flat tile color style="margin-bottom:100px" class="">
            <v-card-text style="" class="">
                <v-row justify="space-around" class="px-3">
                <v-card id="map" color="grey" width="100%" height="200"></v-card>
                  <div id="infowindow-content">
                  <img src width="16" height="16" id="place-icon" />
                  <span id="place-name" class="body-1 font-weight-bold"></span>
                  <br />
                  <span id="place-address" class="caption"></span>
                </div>
            
              </v-row>
              <v-form ref="form"> 
              <v-text-field
                dense :disabled="loading" :loading="loading"
                label="Address"
                ref="autocomplete"
                v-model="address"
                color="grey" :rules="[rules.required]"
                placeholder=" "
                class="  mt-8 mb-0"
                hint="Note : If your address does not show enter your nearest landmark then select your location on the map."
              >
             </v-text-field>    
              <v-text-field
                dense :disabled="loading" :loading="loading"  placeholder=" "
                label="Landmark (optional)"
                v-model="landmark"
                color="grey"
                class="  my-3"
                hint="A popular location around you."
              >
             </v-text-field>
              <v-text-field
                dense :disabled="loading" :loading="loading"  placeholder=" "
                label="Company address (optional)"
                v-model="company"
                color="grey"
                class="  mt-3 mb-0"
              >
             </v-text-field>
             <v-textarea
               label="Delivery instructions (optional)."
                dense :disabled="loading" :loading="loading"  placeholder=" " class=" my-3"
               textarea color="grey"
               v-model="delivery_instructions"
             ></v-textarea>
             </v-form>
            </v-card-text>
            <div class="text-center mb-12">
              <v-btn :loading="loading" class="my-2 mb-12 mx-auto elevation-15" color="orange" @click="getAddress()" dark rounded>Proceed</v-btn>
            </div>
                    </v-card>
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
      loading: false,
      disable: true,
      landmark: '',
      delivery_instructions: "",
      company: "",
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
      address_2: "",
      lat: "",
      long: "",
      disabled: false,
      place_id: "",
    }
  },
  mounted(){
    $Scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0&libraries=places', () => {
      this.initMap()
    })
  },
  computed: {
    user() {
      return this.$store.getters.getUser.id
    },
    registerStatus() {
      return this.$store.getters.getLoadStatus
    },
     area_id() {
      return this.$store.getters.getUserArea.id
    },
  },
methods: {
  initMap(){
 var markers = []
    var geocoder = new google.maps.Geocoder()
    var map = (this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 6.222, lng: 7.0821 },
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      disableDefaultUI: true,
      gestureHandling: 'none',
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
    }))
    this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete.$refs.input
    )

    this.autocomplete.bindTo("bounds", map)
    this.autocomplete.setFields([
      "address_components",
      "place_id",
      "geometry",
      "icon",
      "name"
    ]);
    var infowindow = new google.maps.InfoWindow()
    var infowindowContent = document.getElementById("infowindow-content")
    infowindow.setContent(infowindowContent)
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    })
    var sn = this
    map.addListener("click", e => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      setMapOnAll(null)
      markers = []
      getloc(e)
      this.long = e.latLng.lng()
      this.lat = e.latLng.lat()
      var latitude = e.latLng.lat()
      var longitude = e.latLng.lng()
    
      var latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) }
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results) {
            sn.place_id = results[0].place_id
            var substring = "Unnamed"
            if (results[0].formatted_address.includes(substring)) {
              sn.address = results[1].formatted_address
            } else {
              sn.address = results[0].formatted_address
            }
          } else {
            window.alert("No results found")
          }
        } else {
          window.alert("Geocoder failed due to: " + status)
        }
      })
    })
    console.log(navigator)
    //download get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
      sn.lat = position.coords.latitude
      sn.long = position.coords.longitude
        var latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        addMarker(latlng)
        map.setCenter(latlng)
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results) {
              sn.place_id = results[0].place_id
              console.log(results)
              var substring = "Unnamed"
              if (results[1].formatted_address.includes(substring)) {
                sn.address = results[2].formatted_address
              } else {
                sn.address = results[1].formatted_address
              }
            } else {
              window.alert("No results found")
            }
          } else {
            window.alert("Geocoder failed due to: " + status)
          }
        })
      })
    }
    function getloc(e) {
      marker.setVisible(false)
      addMarker(e.latLng)
      map.setCenter(e.latLng)
    }
    function addMarker(latLng) {
      let marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true
      })
      markers.push(marker)
    }
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map)
      }
    }

//when you select an address form auto complete
      var sn = this
    this.autocomplete.addListener("place_changed", () => {
      this.disabled = true
      infowindow.close()
      marker.setVisible(false)
      let place = sn.autocomplete.getPlace()
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'")
        return
      }
      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
        map.setZoom(17) // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location)
      marker.setVisible(true)

      var address = ""
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
        ].join(" ")
      }

      infowindowContent.children["place-icon"].src = place.icon
      infowindowContent.children["place-name"].textContent = place.name
      sn.place_id = place.place_id
      infowindowContent.children["place-address"].textContent = address
      // infowindow.open(map, marker)

      sn.address = this.$refs.autocomplete.$refs.input.value
      sn.lat = place.geometry.location.lat()
      sn.long = place.geometry.location.lng()
    })
  },
  getAddress() {
    var sn = this
    sn.loading = true
    if (sn.$refs.form.validate()) {
        axios
         .post("/address/save", {
           instruction: this.delivery_instructions,
           name: this.address,
           name_2: this.landmark,
           company: this.company,
           lat: this.lat,
           area_id: this.area_id,
           lng: this.long,
           place_id: this.place_id
         })
         .then(function (response) {
           sn.loading = false
           var d = response.data.success.address
        
          sn.$store.dispatch("setAddresses", d)
          .then(()=>{
            sn.$router.push('/paychoice')
          })
         })
         .catch( (err) => {
           console.log(err)
           sn.loading = false
         })
          } else {
        sn.loading = false
      }
    }
  }
}
</script>