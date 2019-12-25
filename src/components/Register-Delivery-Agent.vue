<template>
  <div>
    <v-card color="transparent"  max-width="600px"  class="mx-auto pb-0 mt-0" flat tile>
      <v-card-title
        class="font-weight-black pb-0 text-center grey--text text--darken-1"
      >Delivery Agent Registration</v-card-title>
      <span
        class="px-6 pt-0 mb-4 font-weight-regular caption grey--text text--lighten-1"
      >Moving happiness.</span>
      <v-stepper class="mx-2 my-4  pb-12" v-model="e6">
          <v-stepper-header>
        <v-stepper-step edit-icon="mdi-check" editable :complete="(name.length > 2) && (phone.length > 9)" color="orange"   step='1'>
          Basic Information
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>
           <v-stepper-step disabled color="orange" edit-icon="mdi-check" editable :complete="(address.length > 2)" step="2">
          Address
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>
               <v-stepper-step color="orange" editable edit-icon="mdi-check"  :complete="( bio.length > 2)" step="3">
          Additional Information
          <!-- <small>Summarize if needed</small> -->
        </v-stepper-step>
        </v-stepper-header>
          
    <v-stepper-items>
        <v-stepper-content class="px-5" step="1">
          <v-card flat tile color class=" mb-2">
            <v-card-text class="pb-0">
              <v-form  onSubmit="return false;" ref="form">
              <v-text-field
                class=""
                autofocus
                v-model="name" validate-on-blur
                color="orange"
                :rules="[rules.required, rules.min]"
                label="Your Name"
                placeholder="Your full work name"
                required
              ></v-text-field>
              <v-text-field
                class=""
                color="orange" validate-on-blur
                label="Phone Number"
                type="text" :rules="numberRules"
                v-model="phone"
                placeholder="Business phone number."
                required
              ></v-text-field>
                <v-select
                class="font-weight-medium grey--text text--darken-4"
                :items="cities"
                attach
                chips cache-items
                v-model="city"
                placeholder :loading="load2"
                label="City"
                color="orange"
              ></v-select>
                <v-select
                class="font-weight-medium grey--text text--darken-4"
                :items="areas"
                attach :disabled="disable"
                chips :loading="load"
                v-model="area"
                placeholder cache-items
                label="Select the area of the vendor you delivery for"
                color="orange"
                
              ></v-select>
                <v-select
                class="font-weight-medium grey--text text--darken-4"
                :items="vendors"
                attach :disabled="disable2"
                chips :loading="load3"
                v-model="vendor"
                placeholder cache-items
                label="Select the vendor you deliver for"
                color="orange"
                multiple
              ></v-select>
              </v-form>
            </v-card-text>
            <div class="text-right pr-5">
            <v-btn  right class="mt-3 elevation-5" dark fab small color="orange" @click="$refs.form.validate() ? e6 = 2 : false"><v-icon>mdi-arrow-right</v-icon></v-btn>
            </div>
            <v-card class="mt-2" flat tile height="300">
              
            </v-card>
          </v-card>
        </v-stepper-content>
     
        <v-stepper-content class="px-5 py-4" step="2">
          <v-card flat tile color class="mb-2">
            <v-card-text style="position:relative" class="">
              <v-text-field
                name="address"
                label="Address"
                ref="autocomplete"
                v-model="address" :disabled="disabled"
                color="orange"
                class="font-weight-medium mb-3"
                placeholder="Business address."
                hint="Note : If your address does not show enter your nearest landmark then select your location on the map"
              >
             </v-text-field>
             

<!-- save food by vendor and list food to user  -->
              <v-row justify="space-around" class="pr-3">
                <v-card id="map" color="grey" width="100%" height="350"></v-card>
    
                <div id="infowindow-content">
                  <img src width="16" height="16" id="place-icon" />
                  <span id="place-name" class="body-1 font-weight-bold"></span>
                  <br />
                  <span id="place-address" class="caption"></span>
                </div>
              </v-row>      <v-overlay
          absolute opacity="0.3"
          :value="disabled">
          <v-btn
          text
          @click="disabled = false"
          >
            <v-icon>mdi-pencil-lock-outline</v-icon>
          </v-btn>
        </v-overlay>
            </v-card-text>
<div class="text-right pr-5">
            <v-btn  right class="mt-3 elevation-5" dark fab small color="orange" @click="e6 = 3"><v-icon>mdi-arrow-right</v-icon></v-btn>

            </div>          </v-card>
        </v-stepper-content>
 

        <v-stepper-content class="pb-12 pl-9" step="3">
          <v-card flat tile color class="mb-2">
            <v-card-text class="pb-0 pl-0">
              <v-form  ref="form3">
         
              <v-textarea
                name="bio"
                v-model="bio"
                label="Bio"
                color="orange"
                class="font-weight-medium"
                placeholder="A little info about you."
                hint="Maximum of 100 words"
              ></v-textarea>
              </v-form>
              <v-btn  :loading="loading" class="mt-12" color="orange" @click="registerDeliveryAgent()" dark rounded>Register</v-btn>
            </v-card-text>
          </v-card>
        </v-stepper-content>
    </v-stepper-items>
      </v-stepper>
      <!-- 
        <v-btn
            @click="registerDeliveryAgent()"
            to="/vendoradmin"
            dark
            large
            rounded
            color="orange"
            class="px-5 mx-auto"
      >Register</v-btn>-->
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
      load: false,
      load2: true,
      load3: false,
      disable: true,
      disable2: true,
      cities: [],
      city: [],
      vendors: [],
      areas: [],
      selectedAreas: [],
      vendor: '',
      area: '',
      phone: "",
      bio: "",
      e6: 1,
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
      long: "",
      disabled: false,
      place_id: "",
      items: [],
    }
  },
    mounted(){
    $Scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0&libraries=places', () => {
      this.initMap()
    })
  },
  created() {
    var sn = this;
    axios
      .get("/city/cities")
      .then(function (response) {
          sn.cities = response.data.city
          sn.load2 = false
      })
  },
  computed: {
    user() {
      return this.$store.getters.getUser.id;
    },
  },
  watch: {
    area (val) {
      if (!val) {
        this.vendors = []
        this.disable2 = true
      } else if(val) {
        this.vendors = []
        this.load3 = true
        var sn = this
        axios
         .get("/delivery/allvendors?id="+sn.area)
         .then(function (response) {
           var t = []
           var r = {}
           var d = response.data.vendors
           d.forEach(i => {
            var l = {
               text: i.name,
               value: i.id
             }
            t.push(l)
           });
            sn.vendors = t
            sn.disable2 = false
            sn.load3 = false
          })
      }
    },
        city (val) {
      if (!val) {
        this.areas = []
        this.disable = true
      } else if(val) {
        this.areas = []
        this.load = true
        var sn = this
        axios
         .get("/city/areas?id="+sn.city)
         .then(function (response) {
            sn.areas = response.data.areas
            sn.disable = false
            sn.load = false
          })
      }
    }
  },
methods: {
  initMap(){
 var markers = [];
    var geocoder = new google.maps.Geocoder();
    var map = (this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 6.222, lng: 7.0821 },
      zoom: 13
    }));
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete.$refs.input
    );

    this.autocomplete.bindTo("bounds", map);
    this.autocomplete.setFields([
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
    });  var sn = this
    map.addListener("click", e => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      setMapOnAll(null);
      markers = [];
      getloc(e);
      this.long = e.latLng.lng();
      this.lat = e.latLng.lat();
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
      var sn = this
    this.autocomplete.addListener("place_changed", () => {
      this.disabled = true
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

      sn.address = this.$refs.autocomplete.$refs.input.value;
      sn.lat = place.geometry.location.lat();
      sn.long = place.geometry.location.lng();
    });
  },
    logout () {
     this.$store.dispatch('logout')
    },
  registerDeliveryAgent() {
    var sn = this
    sn.loading = true
    if (sn.$refs.form.validate() && sn.address.length > 6 ) {
        axios
         .post("/delivery/save", {
           name: this.name,
           phone: this.phone,
           address: this.address,
           user_id: this.user,
           bio: this.bio,
           city: this.city,
           vendor_id: this.vendor,
           lat: this.lat,
           lng: this.long,
           place_id: this.place_id,
           category: 'delivery_agent'
         })
         .then(function (response) {
           sn.loading = false
           var d = response.data
           sn.$store.dispatch("addDeliveryAgent", d.delivery_agent)
            sn.$store.dispatch('snack', {
              color: 'green',
            text: d.message
          })
          sn.$router.push('/deliveryadmin')
         })
         .catch(function () {
           sn.loading = false
         })
          } else {
        sn.loading = false
        sn.e6 = 1
      }
    }
  }
};
</script>