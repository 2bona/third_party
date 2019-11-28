<template>
   <v-card style="overflow-x: hidden;" flat tile class="pb-9">
       <v-row  justify="space-around">
           <v-avatar
               size="80"
               color="transparent"
               class="mt-6 mb-3 elevation-15" 
           >
               <img :src="user.image" @click="openImageInput" alt="profile">
             <v-overlay
          absolute opacity="0.3"
          z-index="1"
          :value="attachments.length">
             </v-overlay>
        <v-btn :loading="loading2" style="z-index:7" dark absolute x-small rounded fab v-show="attachments.length" color="orange" class="mt-0 mb-0 mx-4" @click="uploadFile"> <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon></v-btn>
           </v-avatar>
           <v-flex xs12 class="mb-4">
            <h3 class="text-center mb-0 text-capitalize grey--text text--darken-1 font-weight-bold"><span>{{user.surname}}</span> <span> {{user.middle_name}} </span> <span>{{user.first_name}}</span></h3>
            <p class="text-center mb-0 blue--text text--lighten-2 caption"><v-icon color="blue lighten-2" size="13">mdi-map-marker</v-icon> Awka, Nigeria</p>
           </v-flex>
        <input  v-show="false" ref="file" type="file" @change="fieldChange" class="v-input">
           <v-row class="">
              <v-flex xs4>
                  <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                      20
                  </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Orders
                  </p>
           </v-flex>   
              <v-flex xs4>
                    <h5 class="green--text font-weight-regular  text-center mb-0">
                      N2,000
                    </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Wallet
                  </p>
           </v-flex>   
              <v-flex xs4>
                   <h5 class="grey--text text--darken-1  font-weight-regular  text-center mb-0">
                      5000
                  </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Points
                  </p>
           </v-flex>   
           </v-row>    
       </v-row>
<v-tabs slider-color="orange" class="grey--text text--lighten-1" active-class="orange--text" color="orange" grow mobile-break-point="90">
        <v-tab class=" text-capitalize">favourites</v-tab>
        <v-tab class=" text-capitalize">Account</v-tab>
        <v-tab-item>
    <div class="container">
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6 sm4 v-for="n in 4" :key="n">
                <v-card flat
                  style=" border-radius:10px 10px 10px 10px"
                  class="elevation-2 mx-auto pt-1 mb-5" width="95%" max-width="225" height="">
                  <v-img width="95%"
                    style="border-radius: 5px;"
                    class=" elevation-9 mx-auto"
                    height="150"
                    src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  >
                    <v-btn x-small color="white" fab absolute right style="right:2px" class="ma-1">
                      <v-icon small color="grey lighten-1" class>mdi-heart</v-icon>
                    </v-btn>
                  </v-img>
                  <v-card-text class="mx-0 py-1 px-5">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <p
                          class=" body-2 grey--text text-truncate text--darken-1 font-weight-regular my-0"
                        >Roasted Bread and tea</p>
                      </v-flex>
                      <v-flex xs12>
                        <p class="caption font-weight-regular  my-0" style>N1000</p>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-row class="mb-0 px-5" justify="space-between">
                    <v-flex xs11>
                      <v-card-title
                        style="height: 10px;
    align-items: self-start;"
                        class="py-0 px-0"
                      >
                        <v-rating
                          size="12"
                          :value="4"
                          dense
                          color="orange"
                          hover
                          background-color="grey"
                          class="  pa-0"
                          style="
    line-height: 0;
"
                        ></v-rating>

                        <span class="grey--text overline mt-0">(64)</span>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs1>
                       <p class="mb-0 text-right">
                          <span style=";margin-top:;" class=" "><v-icon small color="green" class="pb-3">mdi-network-strength-4</v-icon></span>
                      </p>
                    </v-flex>
                  </v-row>
                  <v-card-text class="mx-0 mb-0  mt-0 pt-0 pb-2 px-1">
                    <v-layout>
                      <v-flex xs12>
                        <v-chip
                          x-small
                          color="white"
                          class="elevation-1 mb-1 grey--text text--darken-1 text-truncate"
                        ><v-icon color="green" size="7" class="mr-1">mdi-circle-slice-8</v-icon> mummy's pot filterthis</v-chip>
                      </v-flex>
                      
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </div>
        </v-tab-item>
        <v-tab-item class="px-4 pt-4 pb-8">
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header @click="overlay = true" class="px-3"><p class="grey--text  font-weight-regular  text--darken-2 mb-0 subtitle-2"><v-icon color="grey lighten-3">mdi-account</v-icon> Account Information</p> </v-expansion-panel-header>
  <v-expansion-panel-content style="position: relative" class="px-4 py-2">
         <v-form  
          onSubmit="return false;" ref="form">
<v-flex xs12>
      
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            class="grey--text text--darken-2"
            label="First name"
            v-model="user.first_name"
            placeholder="Your first name"
            :rules="[rules.required, rules.min]"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            class="grey--text text--darken-2"
            label="Middle name"
            v-model="user.middle_name"
            placeholder="Your middle name"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            class="grey--text text--darken-2"
            label="Last name"
            :rules="[rules.required, rules.min]"
            v-model="user.surname"
            placeholder="Your surname"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            validate-on-blur @keyup.enter.native="edit"
            class="grey--text text--darken-2"
            label="Email"
            :rules="[rules.required, rules.email]"
            v-model="user.email"
            placeholder="Your email"
            :disabled="user.verification_type === 'email'"
            color="orange"
            required
          ></v-text-field>
</v-flex>
   <v-row class="px-3"  justify="space-between">
<v-flex xs12>
         <v-text-field
            label="Phone number"
            :disabled="user.verification_type === 'phone'"
            validate-on-blur @keyup.enter.native="edit"
            class="grey--text text--darken-2"
            v-model="user.phone" :rules="numberRules"
            placeholder="Your phone number"
            color="orange"
            required
          ></v-text-field> 
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
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="grey--text  font-weight-regular  text--darken-2 mb-0 subtitle-2"><v-icon color="grey lighten-3">mdi-map-marker</v-icon> Locations</p> </v-expansion-panel-header>
  <v-expansion-panel-content class="px-0 py-2">
         <v-carousel show-arrows-on-hover
 height="290px" :show-arrows="false">
    <v-carousel-item  v-for="n in 4" :key="n">
      <v-card color="transparent" style="border-radius:10px;" class="mx-auto mb-4 elevation-8" height="150px" width="250px">          
            <iframe
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJU-eUi72CQxARU0e9iuuRI88&key=AIzaSyAxr9nMrLhiCl-smUP-tmuclQ_i7n3DmI0"
      allowfullscreen
    ></iframe>
      </v-card>
      <v-row>
        <v-btn rounded small class="mx-auto mt-2" icon color="red lighten-2"><v-icon>mdi-trash-can</v-icon></v-btn>
  
      </v-row>
    </v-carousel-item>
   </v-carousel>
   <p class="overline px-3 pt-3 grey--text"> these are places you have ordered from. <strong class="blue--text text--lighten-1">read our privacy statement.</strong></p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="grey--text  font-weight-regular  text--darken-2 mb-0 subtitle-2"><v-icon color="grey lighten-3">mdi-credit-card</v-icon> Payment</p> </v-expansion-panel-header>
          <v-expansion-panel-content class="px-0 py-2 pb-1">
   <v-carousel show-arrows-on-hover
 height="250px" :show-arrows="false">
    <v-carousel-item  v-for="n in 4" :key="n">
 <v-card color="blue-grey darken-3" elevation="8" width="250px" style="border-radius: 10px" height="130px" class="mx-auto pt-2 pb-1 pl-5 pr-6">
     <v-row class="px-0">
         
         <v-flex xs12 class="text-right">
             <v-avatar
              tile class=""
                 size="50"
             >
<v-icon size="50" color="blue-grey lighten-4">fab fa-cc-mastercard</v-icon>
             </v-avatar>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">4***</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">****</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">****</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">***9</p>
         </v-flex>
<v-flex xs12 class="px-3">
   <v-row justify-space-between>
<v-flex xs9>
   <p class="caption font-weight-black blue-grey--text text--lighten-3  text-truncate"> Okoli Bonaventure Udechukwu </p>
</v-flex>
<v-flex xs3>
       <p class="caption text-right font-weight-black blue-grey--text text--lighten-3 "> 4/30 </p>

</v-flex>

</v-row> 
</v-flex>
     </v-row>
    </v-card>
      <v-row class="my-5 px-3"  justify="space-around">
<v-btn  to="/pay/pin" icon class="" small color="red lighten-2" dark rounded><v-icon>mdi-trash-can</v-icon></v-btn>
      </v-row>
    </v-carousel-item>
   </v-carousel>
   <p class="overline px-3 pt-3 grey--text"> we do not store your credit card details. <strong class="blue--text text--lighten-1">read our privacy statement.</strong></p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card>
 
          <v-list>
            <v-list-item class="px-4 pr-6">
                 <v-list-item-title class=" pl-0 subtitle-2 grey--text  font-weight-regular  text--darken-2">
                Location Tracking
                <span class="caption"></span>
              </v-list-item-title>
              <v-list-item-action>
                <v-switch  color="orange"></v-switch>
              </v-list-item-action>
             
            </v-list-item>
                <v-list-item>
                 <v-list-item-title class="subtitle-2 grey--text  font-weight-regular  text--darken-2">
                Fund your wallet
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
        </v-tab-item>
      </v-tabs>
    <navbottom></navbottom>
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
  components: {
    navbottom: () => import('./navbottom'),
  },
    data: () => ({
      loading: false,
      loading2: false,
    attachments: [],
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
    }
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
      axios.post('/upload', fd, config)
        .then(res => {
          var d = res.data.success
          sn.$store.dispatch('setUser', d.user)
          sn.loading2 = false
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
    const url = '/edituser'
    var sn = this
      http({
        url: url,
        method: 'post',
        params: {
          first_name: sn.user.first_name,
          surname: sn.user.surname,
          middle_name: sn.user.middle_name,
          email: sn.user.email,
          phone: sn.user.phone,
        }
      })
        .then((response) => {
          console.log(response)
          sn.loading = false
          var d = response.data.success
          if (d.user) {
            sn.$store.dispatch('setUser', d.user)
          } else if (d.error) {
             sn.$store.dispatch('snack', {
            color: 'green',
            text: d.error
          })
          }
          sn.$store.dispatch('snack', {
            color: 'green',
            text: 'Your profile has been successfully edited'
          })
          }).catch(function (error) {
          var d = error.response.data.error;
          if (d.email) {
            sn.error.email = d.email[0]
          }
         if (d.phone) {
            sn.error.phone = d.phone[0]
          }
         if (d.first_name) {
            sn.error.first_name = d.first_name[0]
          }
         if (d.surname) {
            sn.error.surname = d.surname[0]
          }
         if (d.middlename) {
            sn.error.middlename = d.middlename[0]
          }
          sn.loading = false
        })
      } else {
          sn.loading = false
      }
    }
    }
}
</script>