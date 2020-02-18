<template>
   <v-card color="grey lighten-3" style="overflow-x: hidden;" flat tile class="pb-9 px-3">
       <v-row  justify="space-around">
           <v-avatar
               size="80" 
               color="transparent"
               class="mt-6 mb-3 elevation-15">
   <v-img :src="vendor.image || ''" @click="openImageInput" alt="profile"></v-img>
             <v-overlay
          absolute opacity="0.3"
          z-index="1"
          :value="attachments.length">
             </v-overlay>
        <v-btn :loading="loading2" style="z-index:7" dark absolute x-small rounded fab v-show="attachments.length" color="orange" class="mt-0 mb-0 mx-auto" @click="uploadFile"> <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon></v-btn>
           </v-avatar>
           <v-flex xs12 class="mb-4">
            <h3 class="text-center mb-0 text-capitalize grey--text text--darken-1 font-weight-bold"><span>{{vendor.name}}</span></h3>
           </v-flex>
        <input v-show="false" ref="file" type="file" @change="fieldChange" class="v-input">
           <v-row class=" px-6">
              <v-flex xs4>
                  <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                    {{vendor.orders_count | price}}
                  </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Orders
                  </p>
           </v-flex>
              <v-flex xs4>
                    <h5 class="green--text font-weight-regular  text-center mb-0">
                      <v-icon size="12px" style="padding-bottom:2px" color="green">mdi-currency-ngn</v-icon>{{vendor.wallet | price}}
                    </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Wallet
                  </p>
           </v-flex>
              <v-flex xs4>
                    <h5 class="green--text font-weight-regular  text-center mb-0">
                      <v-icon size="12px" style="padding-bottom:2px" color="green">mdi-currency-ngn</v-icon>20,000,000
                    </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Paid
                  </p>
           </v-flex>
  
           </v-row> 
       </v-row>
  <v-expansion-panels style="border-radius:25px 25px 0 0" accordion>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-2"><v-icon class="mr-2" color="grey lighten-3">mdi-account</v-icon>Business Information</p> </v-expansion-panel-header>
  <v-expansion-panel-content style="position: relative" class="px-4 py-2">
         <v-form onSubmit="return false;" ref="form">
<v-flex xs12>
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            label="Business name"
            v-model="vendor.name"
            placeholder="Your first name"
            :rules="[rules.required, rules.min]"
            color="grey"
            :loading="loading"
            :disabled="loading"
            required
          ></v-text-field>
         <v-text-field
            validate-on-blur
            label="Address" disabled
            :loading="loading"
            :rules="[rules.required]"
            v-model="vendor.address"
            placeholder="Address"
            color="grey"
            required
          ></v-text-field>
                  <v-text-field
            label="Phone number"
            validate-on-blur
            :loading="loading"
            :disabled="loading"
            v-model="vendor.phone" :rules="numberRules"
            placeholder="Your phone number"
            color="grey"
            required
          ></v-text-field> 
              <v-select
                :items="areas"
                attach 
                chips :rules="[rules.minArea]"
                :loading="loading"
                :disabled="loading"
                v-model="area"
                label="Areas you cover"
                color="grey"
                multiple
              ></v-select>
              <v-select
                :items="tags"
                attach :rules="[rules.minTag]"
                chips
                :loading="loading"
                :disabled="loading"
                v-model="vendorTags"
                placeholder="Select your cuisines"
                label="Tags"
                color="grey"
                multiple
              ></v-select>
              <v-textarea
                name="bio"
                :loading="loading"
                :disabled="loading"
                v-model="vendor.bio"
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
            <v-expansion-panel-header @click="overlay = true" class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-2"><v-icon class="mr-2" color="grey lighten-3">mdi-map-marker</v-icon>Delivery</p> </v-expansion-panel-header>
     <v-expansion-panel-content>
        <v-list class="pt-0">
<p class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center">SET DELIVERY FEE FOR THE AREAS YOU COVER</p>
                            <v-divider class="mt-2 mb-9 grey lighten-3"></v-divider> 
               <div v-for="(item, i) in vendor.area"
                :key="item.lat">
      <v-list-item class="my-2 mt-2" style="max-height: 38px!important">
        <v-list-item-content  v-show="!show[i]">
          <v-list-item-title class="caption grey--text font-weight-medium text--darken-1 pb-0">{{item.name| name}}</v-list-item-title>
          <v-list-item-title class="overline text-lowercase grey--text mb-7">{{item.pivot.distance | distance}}-{{item.pivot.duration | duration}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="pr-1 pl-5">
          <v-text-field :rules="minRule" :loading="loadingFee" :disabled="loadingFee" solo @keyup.enter.native="setFee"
          prepend-inner-icon="mdi-currency-ngn"
           ref="fee"  dense color="grey lighten-2"
            placeholder="Fee"
            :value="item.pivot.fee">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>
               </div>
       </v-list>
         <v-row class="mb-8 mt-0 px-3"  justify="space-around">
<v-btn depressed @click.prevent="setFee" :loading="loadingFee" class="px-6" small color="primary" dark rounded>set</v-btn>
      </v-row>
  </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
            <v-expansion-panel-header @click="overlay = true" class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-2"><v-icon class="mr-2" color="grey lighten-3">mdi-credit-card</v-icon>Payment</p> </v-expansion-panel-header>
     <v-expansion-panel-content>
        <v-list>
<p class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center">SET PAYMENT OPTIONS FOR CUSTOMERS </p>
             <v-divider class="mt-2 mb-4 grey lighten-3"></v-divider> 
               <v-list-item class="mt-2 mb-0" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-3 mr-2">
          <v-icon color="grey lighten-2">mdi-cash-marker</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-0">Cash on delivery</v-list-item-title>
        </v-list-item-content >
           <v-switch color="grey lighten-2" @change="paySet" :disabled="payLoad || isNaN(vendor.minimum_order)" :loading="payLoad" v-model="vendor.cash_on_delivery" class="pt-3"></v-switch> 
               </v-list-item>
               <v-list-item class="mb-2" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-3 mr-2">
          <v-icon color="grey lighten-2">mdi-cellphone-wireless</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-0">Transfer on delivery <span class="overline font-weight-bold text--lighten-2 grey--text"></span></v-list-item-title>
        </v-list-item-content>
           <v-switch color="grey lighten-2" @change="paySet" :disabled="payLoad || isNaN(vendor.minimum_order)" :loading="payLoad" v-model="vendor.card_on_delivery" class="pt-3"></v-switch> 
               </v-list-item>
         <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-0 mr-2">
          <v-icon color="grey lighten-2">mdi-cash</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-6">Minimum order</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="pl-4 pr-1">
          <v-text-field :rules="minRule" :disabled="payLoad" :loading="payLoad" solo
          prepend-inner-icon="mdi-currency-ngn" dense color="grey"
            placeholder="Fee" v-model="vendor.minimum_order">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>       
         <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
        <v-list-item-icon class=" mt-0 mr-2">
          <v-icon color="grey lighten-2">mdi-cash</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="body-2 grey--text text--darken-1 pb-6">P.O.S charge</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content class="pl-4 pr-1">
          <v-text-field :disabled="payLoad" :loading="payLoad" solo
          prepend-inner-icon="mdi-currency-ngn" dense color="grey"
            placeholder="Fee" v-model="vendor.pos_charge">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>       
        <p class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center">SET YOUR ACCOUNT DETAILS</p>
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
            placeholder="Bank Name" v-model="vendor.bank_name">
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
            placeholder="Account name" v-model="vendor.account_name">
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
            placeholder="Account number" v-model="vendor.account_number">
          </v-text-field> 
       </v-list-item-content>
               </v-list-item>
       </v-list>
         <v-row class="mb-7 mt-0 px-3"  justify="space-around">
         <v-btn depressed :disabled="isNaN(vendor.minimum_order)" @click.prevent="paySet" :loading="payLoad" class="px-6" small color="primary" dark rounded>set</v-btn>
      </v-row>
  </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card flat style="border-radius: 0 0 25px 25px" tile class="mb-7">
 
          <v-list>
            <v-list-item class="">
            <v-list-item-title class="subtitle-2 px-1 grey--text  font-weight-medium  text--darken-2">
                <v-icon size="19" class="mr-2" color="grey lighten-3">mdi-information</v-icon>                Support
                <span class="caption"></span>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn depressed  small color="grey lighten-3" rounded class="px-8 font-weight-bold"><v-icon size="18" color="grey lighten-1" class="px-2 mt-0">mdi-information-outline</v-icon></v-btn>
              </v-list-item-action>
             
            </v-list-item>
                <v-list-item>
 <v-list-item-title class="subtitle-2 px-1 grey--text  font-weight-medium  text--darken-2">
                <v-icon size="19" class="mr-2" color="grey lighten-3">mdi-cash</v-icon>                Withdraw funds
              </v-list-item-title>
              <v-list-item-action>
                <v-btn depressed  small color="grey lighten-3" rounded class="px-8 font-weight-bold"><v-icon size="18" color="grey lighten-1" class="px-2 mt-0">mdi-cash</v-icon></v-btn>
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
import {loadedGoogleMapsAPI} from '@/main'

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
      vendorTags: [],
      areas: [],
      results: [],
      distance: [],
      duration: [],
      area: [],
      show: [],
      overlay: true,
      editBtn: true,
      visible: true,
      rules: {
        required: value => !!value || "Required.",
        min: value => value.length >= 3 || "Min 3 characters",
        minArea: value => value.length > 0 || "Min 1 area",
        minTag: value => value.length > 0 || "Min 1 tag",
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
        (v) => /^[0-9]*$/.test(v) || 'Number must be valid'
      ]
    }),
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    vendor() {
      return this.$store.getters.getVendor;
    },
    tagsList() {
      return this.$store.getters.getTags;
    },
    tags() {
      const sn = this
      var tags = sn.tagsList.filter((item)=>{
        return item.type.toLowerCase() === sn.vendor.type.toLowerCase()
      });
      return tags
    }
  },
 created() {
   var sn = this
    sn.$store.dispatch("loadVendor")
    .then(()=> {
       axios
      .get("/city/vendorarea?city="+sn.vendor.city)
      .then(function (response) {
        sn.areas = response.data.areas
        sn.results = response.data.result
        sn.load = false
      })
    this.$store.dispatch("loadTags");
    var d = sn.$store.getters.getVendor.tags
     sn.vendorTags = d.map(item => {
        return item.id
      })
         loadedGoogleMapsAPI.then( () => {
           sn.editBtn = false
        })
    const e = sn.$store.getters.getVendor.area
     sn.area = e.map(item => {
        return item.id
      })  
    })
 
    },
  methods: {
  paySet(){
    const sn = this
    sn.payLoad = true
    const url = '/vendor/payset'
      http({
        url: url,
        method: 'post',
        params: {
           card: sn.vendor.card_on_delivery ? 1 : 0,
           cash: sn.vendor.cash_on_delivery ? 1 : 0,
           minimum: sn.vendor.minimum_order,
           pos_charge: sn.vendor.pos_charge,
           bank_name: sn.vendor.bank_name,
           account_name: sn.vendor.account_name,
           account_number: sn.vendor.account_number
        }
      })
      .then((response) => {
        sn.payLoad = false
        sn.$store.dispatch('loadVendor')
        sn.$store.dispatch('snack', {
          color: 'green',
          text: 'Your payment options has been set successfully'
        })
        }).catch(function (error) {
          sn.payLoad = false
          sn.$store.dispatch('snack', {
            color: 'red',
            text: error
          })
        })
      },
      setFee(){
        const sn = this
        sn.loadingFee = true
        var fd = new FormData()
        this.$refs.fee.forEach((fee, i) => {
            fd.append('fee[' + i + ']', fee.$refs.input.value)
        })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        axios.post('/vendor/setfee', fd, config)
        .then(res => {
            sn.$store.dispatch("loadVendor")
            sn.loadingFee = false
            sn.$store.dispatch('snack', {
            color: 'green',
            text: 'Delivery fee edited successfully'
          })
        })
      .catch(err => {
        sn.$store.dispatch('snack', {
          color: 'red',
          text: err
        })
        sn.loadingFee = false    
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
      axios.post('/vendor/upload', fd, config)
        .then(res => {
          var d = res.data.success
          sn.$store.dispatch('loadVendor')
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
    const sn = this
    if (this.$refs.form.validate()) {
    this.loading = true
    const url = '/vendor/update'
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
          origins: [new google.maps.LatLng(sn.vendor.lat, sn.vendor.lng)],
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
           name: sn.vendor.name,
           bio: sn.vendor.bio,
           phone: sn.vendor.phone,
           tags: sn.vendorTags,
           areas: sn.area,
           duration: duration,
           distance: distance
        }
      })
        .then((response) => {
          sn.loading = false
          sn.$store.dispatch('loadVendor')
          sn.$store.dispatch('snack', {
            color: 'green',
            text: 'Your profile has been successfully edited'
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