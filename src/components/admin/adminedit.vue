<template>
   <v-card color="grey lighten-3" style="overflow-x: hidden;" flat tile class="pb-9 px-3">
       <v-row  justify="space-around">
           <v-avatar
               size="80"
               color="transparent"
               class="mt-6 mb-3 elevation-15">
               <img contain :src="vendor.image" @click="openImageInput" alt="profile">
             <v-overlay
          absolute opacity="0.3"
          z-index="1"
          :value="attachments.length">
             </v-overlay>
        <v-btn :loading="loading2" style="z-index:7" dark absolute x-small rounded fab v-show="attachments.length" color="orange" class="mt-0 mb-0 mx-4" @click="uploadFile"> <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon></v-btn>
           </v-avatar>
           <v-flex xs12 class="mb-4">
            <h3 class="text-center mb-0 text-capitalize grey--text text--darken-1 font-weight-bold"><span>{{vendor.name}}</span></h3>
            <p class="text-center mb-0 blue--text text--lighten-2 caption"><v-icon color="blue lighten-2" size="13">mdi-map-marker</v-icon> {{vendor.city}}</p>
           </v-flex>
        <input v-show="false" ref="file" type="file" @change="fieldChange" class="v-input">
           <v-row class="">
              <v-flex xs4>
                  <h4 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                      20
                  </h4>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Orders
                  </p>
           </v-flex>
              <v-flex xs4>
                    <h4 class="green--text font-weight-regular  text-center mb-0">
                      N2,000
                    </h4>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Wallet
                  </p>
           </v-flex>
              <v-flex xs4>
                   <h4 class="grey--text text--darken-1  font-weight-regular  text-center mb-0">
                      5000
                  </h4>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Points
                  </p>
           </v-flex>
           </v-row> 
       </v-row>
  <v-expansion-panels >
    <v-expansion-panel>
      <v-expansion-panel-header @click="overlay = true" class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-1">Business Information</p> </v-expansion-panel-header>
  <v-expansion-panel-content style="position: relative" class="px-4 py-2">
         <v-form
          onSubmit="return false;" ref="form">
<v-flex xs12>
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            label="Business name"
            v-model="vendor.name"
            placeholder="Your first name"
            :rules="[rules.required, rules.min]"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            validate-on-blur
            label="Address" disabled
            :rules="[rules.required]"
            v-model="vendor.address"
            placeholder="Address"
            color="orange"
            required
          ></v-text-field>
                  <v-text-field
            label="Phone number"
            validate-on-blur
            v-model="vendor.phone" :rules="numberRules"
            placeholder="Your phone number"
            color="orange"
            required
          ></v-text-field> 
              <v-select
                :items="areas"
                attach
                chips
                v-model="area"
                label="Areas you cover"
                color="orange"
                multiple
              ></v-select>
              <v-select
                :items="tags"
                attach
                chips
                v-model="vendorTags"
                placeholder="Select your cuisines"
                label="Tags"
                color="orange"
                multiple
              ></v-select>
              <v-textarea
                name="bio"
                v-model="vendor.bio"
                label="Bio"
                color="orange"
                placeholder="A little info about your business."
                hint="Maximum of 100 words"
              ></v-textarea>
</v-flex>
   <v-row class="px-3"  justify="space-between">
<v-flex xs12>
</v-flex>
   </v-row>
      <v-row class="my-5 px-3"  justify="space-around">
<v-btn  @click.prevent="edit" :loading="loading" class="px-6" small color="orange" dark rounded>Edit</v-btn>
      </v-row>
</v-form>
          <v-overlay
          absolute opacity="0.3"
          :value="overlay"
        >
          <v-btn
          text
            @click="overlay = false"
          >
            <v-icon>mdi-pencil-lock-outline</v-icon>
          </v-btn>
        </v-overlay>
  </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card class="mb-7">
 
          <v-list>
            <v-list-item class="">
                 <v-list-item-title class=" pl-0 subtitle-2 grey--text  font-weight-medium  text--darken-1">
                Support
                <span class="caption"></span>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark small color="orange" rounded class="px-8 font-weight-bold green--text text--lighten-4"><v-icon size="15" class="px-2 mt-0">mdi-cash-refund</v-icon></v-btn>
              </v-list-item-action>
             
            </v-list-item>
                <v-list-item>
                 <v-list-item-title class="subtitle-2 grey--text  font-weight-medium  text--darken-1">
                Withdraw funds
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark small color="green" rounded class="px-8 font-weight-bold green--text text--lighten-4"><v-icon size="15" class="px-2 mt-0">mdi-cash-refund</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
                 <v-list-item-title class="subtitle-2">
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark @click="logout"  text color="red"  class=" font-weight-regular text-capitalize red--text ">Logout</v-btn>
              </v-list-item-action> 
            </v-list-item>
          </v-list>
</v-card>
</v-card>
</template>
<style>
.v-expansion-panel-content__wrap {
    padding: 10px 0px;
}
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
    data: () => ({
      loading: false,
      loading2: false,
      load: true,
      attachments: [],
      vendorTags: [],
      areas: [],
      area: [],
      overlay: true,
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
      ]
    }),
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    vendor() {
      return this.$store.getters.getVendor;
    },
    tags() {
      return this.$store.getters.getTags;
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
        sn.load = false
      })
    this.$store.dispatch("loadTags");
    var d = sn.$store.getters.getVendor.tags
     sn.vendorTags = d.map(item => {
        return item.id;
      })
    var e = sn.$store.getters.getVendor.area
     sn.area = e.map(item => {
        return item.id;
      })  
    })
 
    },
    methods: {
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
    if (this.$refs.form.validate()) {
    this.loading = true
    const url = '/vendor/update'
    var sn = this
      http({
        url: url,
        method: 'post',
        params: {
           name: sn.vendor.name,
           bio: sn.vendor.bio,
           phone: sn.vendor.phone,
           tags: sn.vendorTags,
           areas: sn.area,
        }
      })
        .then((response) => {
          console.log(response)
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
      } else {
          sn.loading = false
      }
    }
    }
}
</script>