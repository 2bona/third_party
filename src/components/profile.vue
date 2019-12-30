<template>
   <v-card style="overflow-x: hidden;margin-bottom:100px" flat tile class="pb-9">
       <v-row  justify="space-around">
           <v-avatar
               size="80"
               color="transparent"
               class="mt-6 mb-3 elevation-15">
               <v-img :src="user.image" @click="openImageInput" alt="profile"></v-img>
             <v-overlay
              absolute opacity="0.3"
              z-index="1"
              :value="attachments.length">
             </v-overlay>
        <v-btn :loading="loading2" style="z-index:7" dark absolute x-small rounded fab v-show="attachments.length" color="orange" class="mt-0 mb-0 mx-auto" @click="uploadFile"> <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon></v-btn>
           </v-avatar>
           <v-flex xs12 class="mb-4">
            <h3 class="text-center mb-0 text-capitalize grey--text text--darken-1 font-weight-bold"><span>{{user.surname}}</span> <span> {{user.middle_name}} </span> <span>{{user.first_name}}</span></h3>
            <p class="text-center mb-0 blue--text text--lighten-2 caption"><v-icon color="blue lighten-2" size="13">mdi-map-marker</v-icon> Awka, Nigeria</p>
           </v-flex>
        <input  v-show="false" ref="file" type="file" @change="fieldChange" class="v-input">
           <v-row class="">
              <v-flex xs4>
                  <h5 class="grey--text text--darken-1 font-weight-regular  text-center mb-0">
                      {{user.orders}}
                  </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Orders
                  </p>
           </v-flex>
              <v-flex xs4>
                    <h5 class="green--text font-weight-regular  text-center mb-0">
                      <v-icon size="12" color="green" style="padding-bottom: 3px">mdi-currency-ngn</v-icon>{{user.wallet | price}}
                    </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Wallet
                  </p>
           </v-flex>
              <v-flex xs4>
                   <h5 class="grey--text text--darken-1  font-weight-regular  text-center mb-0">
                      {{user.points}}
                  </h5>
                  <p class=" mt-0 grey--text text-capitalize caption font-weight-regular text--lighten-1  text-center">
                      Points
                  </p>
           </v-flex>   
           </v-row>    
       </v-row>
<v-tabs slider-color="orange" active-class="orange--text" color="orange" grow mobile-break-point="90">
        <v-tab  class="caption  font-weight-bold">Account</v-tab>
        <v-tab class="caption  font-weight-bold ">favourites</v-tab>
       
        <v-tab-item class="px-4 pt-4 pb-8">
  <v-expansion-panels style="border-radius: 25px 25px 0 0 ;">
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-2"><v-icon color="grey lighten-3">mdi-account</v-icon> Account Information</p> </v-expansion-panel-header>
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
  </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-2"><v-icon color="grey lighten-3">mdi-map-marker</v-icon> Locations</p> </v-expansion-panel-header>
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
      <v-expansion-panel-header class="px-3"><p class="grey--text  font-weight-medium  text--darken-2 mb-0 subtitle-2"><v-icon color="grey lighten-3">mdi-credit-card</v-icon> Payment</p> </v-expansion-panel-header>
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
  <v-card style="border-radius: 0 0 25px 25px;"  tile>
 
          <v-list>
            
                <v-list-item class="px-3">
                 <v-list-item-title class="subtitle-2 grey--text  font-weight-medium  text--darken-2">
                <v-icon size="30" color="grey lighten-3">mdi-cash</v-icon>
                Fund your wallet
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark small color="primary" rounded class=" caption px-8 font-weight-bold blue--text text--lighten-3">add</v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item class="px-2 pt-3">
                 <v-list-item-title class="subtitle-2">
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark @click="logout" depressed class="caption font-weight-bold px-8 red--text text--lighten-1" rounded  color="red lighten-5" small >Logout</v-btn>
              </v-list-item-action> 
            </v-list-item>
          </v-list> 
</v-card> 
        </v-tab-item>
         <v-tab-item>
    <div class="container">
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6 sm4 v-for="(n, i) in favourites" :key="i">
                <v-card flat
                  style=" border-radius:10px 10px 10px 10px"
                  class="elevation-2 pb-3 mx-auto pt-1 mb-5" width="95%" max-width="225" height="">
                  <router-link :to="'/vendor/'+n.name">
                  <v-img width="95%"
                    style="border-radius: 5px;"
                    class=" elevation-9 mx-auto"
                    height="100"
                    :src="n.image">
                  </v-img>
                  </router-link>
                  <v-card-text class="mx-0 py-1 px-5">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <p
                          class=" body-2 grey--text text-truncate text--darken-1 font-weight-medium my-0"
                        >{{n.name}}</p>
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
                  </v-row>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </div>
        </v-tab-item>
      </v-tabs>
         <v-scale-transition>
    <v-btn
      fixed to="/"
      bottom  v-if="btn"
      right fab
      color="white" style="z-index:10;margin-bottom: 60px;">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    </v-scale-transition>
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
      model: 'tab-2',
      loading2: false,
    attachments: [],
    overlay: true,
    visible: true,
    btn: false,
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
    favourites() {
      return this.$store.getters.getUserFavourites
    },
  },
  beforeRouteLeave (to, from, next) {
  this.btn = false
  this.pageClose = false
     setTimeout(() => {
      next()
    }, 50);
    },
  mounted(){
      setTimeout(() => {
      this.btn=true
    }, 50);
    const sn = this
    sn.$store.dispatch('mapNav', false)
     axios.get('/load')
    .then(res => {
      var d = res.data.success
      sn.$store.dispatch('setUser', d.user)
      .then(()=>{
        if (sn.favourites.length) {
          return
        }else{
            if (sn.favourites.length) {
              return
            }else{
              sn.$store.dispatch('getUserFavourites')
            } 
        }
      })
    })
    .catch((err)=>{
      console.log(err)
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
            text: 'File size must be lower than 2mb'
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