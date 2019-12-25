<template>
   <v-card color="grey lighten-3" style="overflow-x: hidden;" flat tile class="pb-9 px-3">
       <v-row  justify="space-around">
           <v-avatar
               size="80" 
               color="transparent"
               class="mt-6 mb-3 elevation-15">
   <v-img :src="deliveryAgent.image" @click="openImageInput" alt="profile"></v-img>
             <v-overlay
          absolute opacity="0.3"
          z-index="1"
          :value="attachments.length">
             </v-overlay>
        <v-btn :loading="loading2" style="z-index:7" dark absolute x-small rounded fab v-show="attachments.length" color="orange" class="mt-0 mb-0 mx-4" @click="uploadFile"> <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon></v-btn>
           </v-avatar>
           <v-flex xs12 class="mb-4">
            <h3 class="text-center mb-0 text-capitalize grey--text text--darken-1 font-weight-bold"><span>{{deliveryAgent.name}}</span></h3>
           </v-flex>
        <input v-show="false" ref="file" type="file" @change="fieldChange" class="v-input">
           <v-row class="">
              <v-flex xs12>
                  <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                    {{deliveryAgent.orders_count | price}}
                  </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Orders
                  </p>
           </v-flex>
           
           </v-row> 
       </v-row>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="  font-weight-regular  mb-0 subtitle-2">User Information</p> </v-expansion-panel-header>
  <v-expansion-panel-content style="position: relative" class="px-4 py-2">
         <v-form onSubmit="return false;" ref="form">
<v-flex xs12>
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            label="Full name"
            v-model="deliveryAgent.name"
            placeholder="Your first name"
            :rules="[rules.required, rules.min]"
            color="grey"
            :loading="loading"
            :disabled="loading"
            required
          ></v-text-field>
             <v-select
                class="font-weight-medium grey--text text--darken-4"
                :items="vendors"
                attach 
                chips 
                :loading="loading"
                :disabled="loading"
                v-model="vendor"
                placeholder cache-items
                label="Select the vendor you deliver for"
                color="orange"
                multiple
              ></v-select>
         <v-text-field
            validate-on-blur
            label="Address" disabled
            :loading="loading"
            :rules="[rules.required]"
            v-model="deliveryAgent.address"
            placeholder="Address"
            color="grey"
            required
          ></v-text-field>
                  <v-text-field
            label="Phone number"
            validate-on-blur
            :loading="loading"
            :disabled="loading"
            v-model="deliveryAgent.phone" :rules="numberRules"
            placeholder="Your phone number"
            color="grey"
            required
          ></v-text-field>
              <v-select
                :items="areas"
                attach
                chips cache-items
                :loading="loading"
                :disabled="loading"
                v-model="area"
                label="Areas you cover"
                color="grey"
                multiple
              ></v-select>
              <v-textarea
                name="bio"
                :loading="loading"
                :disabled="loading"
                v-model="deliveryAgent.bio"
                label="Bio"
                color="grey"
                placeholder="A little info about your business."
                hint="Maximum of 100 words"
              ></v-textarea>
</v-flex>
   <v-row class="px-3"  justify="space-between">
<v-flex xs12>
</v-flex>
   </v-row>
      <v-row class="my-5 px-3"  justify="space-around">
<v-btn depressed :disabled="editBtn" @click.prevent="edit" :loading="loading" class="px-6" small color="primary" dark rounded>Edit</v-btn>
      </v-row>
</v-form>
  </v-expansion-panel-content>
 
    </v-expansion-panel>
    <v-expansion-panel>
            <v-expansion-panel-header @click="overlay = true" class="px-3"><p class="  font-weight-regular  mb-0 subtitle-2">Areas </p> </v-expansion-panel-header>
     <v-expansion-panel-content>
        <v-list class="pt-0">
<p class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center">AREAS YOU COVER</p>
                 <v-divider class="mt-2 mb-9 grey lighten-3"></v-divider> 
      <div v-for="(item, i) in deliveryAgent.areas"
      :key="item.lat">
      <v-list-item class="my-2 mt-2" style="max-height: 38px!important">
        <v-list-item-content  v-show="!show[i]">
          <v-list-item-title class="caption grey--text font-weight-medium text--darken-1 pb-0">{{item.name}}</v-list-item-title>
          <v-list-item-title class="overline text-lowercase grey--text mb-7">{{item.pivot.distance | distance}}-{{item.pivot.duration | duration}}</v-list-item-title>
        </v-list-item-content>
               </v-list-item>
               </div>
       </v-list>
  </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
            <v-expansion-panel-header @click="overlay = true" class="px-3"><p class="font-weight-regular  mb-0 subtitle-2">Payment</p> </v-expansion-panel-header>
     <v-expansion-panel-content>
        <v-list>
<p class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center">SET ACCOUNT DETAILS FOR SALARY AND TIPS </p>
             
        <v-divider class="mt-2 mb-9 grey lighten-3"></v-divider> 
         <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-0 mr-2">
          <v-icon color="grey lighten-2">mdi-bank</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-6">Bank Name</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="pl-4 pr-1">
          <v-text-field  :disabled="payLoad" :loading="payLoad" solo
             dense color="grey"
            placeholder="Bank Name" v-model="deliveryAgent.bank_name">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>
         <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-0 mr-2">
          <v-icon color="grey lighten-2">mdi-account-card-details</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-6">Account name</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="pl-4 pr-1">
          <v-text-field  :disabled="payLoad" :loading="payLoad" solo
           dense color="grey"
            placeholder="Account name" v-model="deliveryAgent.account_name">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>
         <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-0 mr-2">
          <v-icon color="grey lighten-2">mdi-numeric-0-box</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-6">Account number</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="pl-4 pr-1">
          <v-text-field :rules="minRule" :disabled="payLoad" :loading="payLoad" solo
           dense color="grey"
            placeholder="Account number" v-model="deliveryAgent.account_number">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>
       </v-list>
         <v-row class="mb-7 mt-0 px-3"  justify="space-around">
         <v-btn depressed  @click.prevent="paySet" :loading="payLoad" class="px-6" small color="primary" dark rounded>set</v-btn>
      </v-row>
  </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card flat tile class="mb-7">
 
          <v-list>
            <v-list-item class="">
                 <v-list-item-title class=" pl-0 subtitle-2   font-weight-regular">
                Support
                <span class="caption"></span>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn depressed  small color="grey lighten-3" rounded class="px-8 font-weight-bold"><v-icon size="18" color="grey lighten-1" class="px-2 mt-0">mdi-information-outline</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
                 <v-list-item-title class="subtitle-2">
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark @click="logout"  text rounded  color="red" small >Logout</v-btn>
              </v-list-item-action> 
            </v-list-item>
          </v-list>
</v-card>
</v-card>
</template>
<style>
.v-expansion-panel-content__wrap {
    padding: 0px 0px;
}
</style>
<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'
import $Scriptjs from 'scriptjs'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})

export default {
    data: () => ({
      loading: false,
      loadingFee: false,
      loading2: false,
      payLoad: false,
      load: true,
      attachments: [],
      deliveryAgentTags: [],
      areas: [],
      results: [],
      distance: [],
      vendors: [],
      vendor: [],
      duration: [],
      area: [],
      show: [],
      overlay: true,
      editBtn: true,
      visible: true,
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
      minRule: [
        (v) => !!v || 'Phone number is required',
        (v) => /^[0-9]*$/.test(v) || 'Number must be valid'
      ]
    }),
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    deliveryAgent() {
      return this.$store.getters.getDeliveryAgent;
    },
  },
 created() {
   var sn = this
    sn.$store.dispatch("loadDeliveryAgent")
    .then(()=> {
         var l = []
           var n = sn.deliveryAgent.vendors
           if (n.length) {
             n.forEach(i => {
              var o = {
                 text: i.name,
                 value: i.id
               }
              l.push(o)
             });
              sn.vendor = l
           } 
       axios
      .get("/city/delivery?city="+sn.deliveryAgent.city)
      .then(function (response) {
        sn.areas = response.data.areas
        sn.results = response.data.result
        sn.load = false
        axios
         .get("/delivery/allvendors?id="+sn.deliveryAgent.city)
         .then(function (response) {
           var t = []
           var d = response.data.vendors
           d.forEach(i => {
            var l = {
               text: i.name,
               value: i.id
             }
            t.push(l)
           });
            sn.vendors = t
          })
      })
      $Scriptjs.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyA1Uoi_ddjhFR5HNAgofZNat9eQAsUFtg0', function () {
        sn.editBtn = false
      })
      const e = sn.$store.getters.getDeliveryAgent.areas
     sn.area = e.map(item => {
        return item.id
      }) 
 
    })
 
    },
  methods: {
  paySet(){
    const sn = this
    sn.payLoad = true
    const url = '/delivery/payset'
      http({
        url: url,
        method: 'post',
        params: {
         bank_name: sn.deliveryAgent.bank_name,
           account_name: sn.deliveryAgent.account_name,
           account_number: sn.deliveryAgent.account_number
        }
      })
      .then((response) => {
        sn.payLoad = false
        sn.$store.dispatch('loadDeliveryAgent')
        sn.$store.dispatch('snack', {
          color: 'green',
          text: 'Your account details has been set successfully'
        })
        }).catch(function (error) {
          sn.payLoad = false
          sn.$store.dispatch('snack', {
            color: 'red',
            text: error
          })
        })
      },
      logout(){
        this.$store.dispatch('logout');
      },
    openImageInput () {
      this.attachments = []
      this.$refs.file.click()
    },
    text (val) {
      this.form.description = val
    },
    fieldChange (e) {
      this.attachments = []
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.attachments.push(selectedFiles[i])
      }
    },
    uploadFile () {
      var sn = this
      sn.loading2 = true
      const fd = new FormData()
      for (var i = 0; i < sn.$refs.file.files.length; i++) {
        let file = sn.$refs.file.files[i]
        fd.append('files[' + i + ']', file)
      }
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      axios.post('/delivery/upload', fd, config)
        .then(res => {
          var d = res.data.success
          sn.$store.dispatch('loadDeliveryAgent')
          sn.loading2 = false
            sn.$store.dispatch('snack', {
            color: 'green',
            text: d.message
          })
          sn.attachments = []
        })
        .catch(err => {
          sn.attachments = []
          sn.$store.dispatch('snack', {
            color: 'red',
            text: err
          })
          sn.loading2 = false
        })
    },
  edit() {
    if (this.$refs.form.validate()) {
    this.loading = true
    const url = '/delivery/update'
    var sn = this
    var d = sn.results
    var e = []
    sn.area.forEach(element => {
       e.push(d.find((item)=>{
      return item.id === element
      }))
    })
    const origin = []
    var set = []
        e.forEach(item => {
        set = new google.maps.LatLng(item.lat, item.lng)
        origin.push(set)
      })  
 
      var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [new google.maps.LatLng(sn.deliveryAgent.lat, sn.deliveryAgent.lng)],
          destinations: origin,
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          const duration = []
          const distance = []
         if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
           
            var answer = response.rows[0].elements
            answer.forEach(element => {
              distance.push(element.distance.value)
              duration.push(element.duration.value)
            })
          }
            console.log(duration)
     
      http({
        url: url,
        method: 'post',
        params: {
           name: sn.deliveryAgent.name,
           bio: sn.deliveryAgent.bio,
           phone: sn.deliveryAgent.phone,
           areas: sn.area,
           vendors: sn.vendor,
           duration: duration,
           distance: distance
        }
      })
        .then((response) => {
          sn.loading = false
          sn.$store.dispatch('loadDeliveryAgent')
          sn.$store.dispatch('snack', {
            color: 'green',
            text: 'Your profile has been successfully updated'
          })
          }).catch(function (error) {
              sn.$store.dispatch('snack', {
            color: 'red',
            text: error
          })
          sn.loading = false
        })
         })
      } else {
          sn.loading = false
      }
      
    }
    }
}
</script>