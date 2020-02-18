<template>
<div style="min-height:100vh">
<v-row  style="min-height:94vh" class="pa-3 px-4  pb-12 my-auto">
    <v-flex xs12 class>
            <h1 class="title mb-2 font-weight-bold grey--text">Summary</h1>
        
    </v-flex>
    <v-flex xs6>
  <v-card
  style="border-radius: 25px"
    class="ma-auto elevation-9"
    color="green lighten-2"
    dark max-width="91%"
  >
  <v-card-title class="px-2 headline pb-2 font-weight-black green--text text--lighten-4">
      Sales 
  </v-card-title>
  <p  class="ml-4 font-weight-bold mb-0 green--text text--lighten-5"><v-icon color=" green lighten-5" size="15" style="padding-bottom:2px" class="mr-0">mdi-currency-ngn</v-icon>2000</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn rounded class="caption font-weight-black grey--text text--lighten-2" @click="dialog = true" block depressed color="green lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
    <v-flex xs6>
  <v-card
  style="border-radius: 25px"
    class="ma-auto elevation-9"
    color="blue "
    dark max-width="91%"
  >
  <v-card-title class="px-2 headline pb-2 font-weight-black blue--text text--lighten-4">
      Orders 
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold blue--text text--lighten-5">300</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn rounded class="caption font-weight-black grey--text text--lighten-2" @click="dialog = true" block color="blue lighten-1" depressed>full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
          <v-flex xs6>

  <v-card
  style="border-radius: 25px"
    class="ma-auto elevation-9"
    color="teal lighten-2"
    dark max-width="91%"
  >
  <v-card-title class="px-2 headline pb-2 font-weight-black mt-2 teal--text text--lighten-4">
      Reviews 
  </v-card-title>
  <p  class="ml-4 font-weight-bold mb-0 teal--text text--lighten-5">20</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn rounded class="caption font-weight-black grey--text text--lighten-2" @click="dialog = true" block depressed color="teal lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
        <v-flex xs6>

  <v-card
  style="border-radius: 25px"
    class="ma-auto elevation-9"
    color="blue-grey lighten-2"
    dark max-width="91%">
  <v-card-title class="px-2 headline pb-2 font-weight-black mt-2 blue-grey--text text--lighten-4">
      Visits 
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold blue-grey--text text--lighten-5">200</p>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn rounded class="caption font-weight-black grey--text text--lighten-2" @click="dialog = true" block depressed color="blue-grey lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
        </v-flex>
        <v-flex xs6>
  <v-card
  style="border-radius: 25px"
    class="ma-auto elevation-9"
    color="cyan darken-1"
    dark max-width="91%">
  <v-card-title class="px-2 headline pb-2 font-weight-black mt-2 cyan--text text--lighten-4">
      Wallet 
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold grey--text text--lighten-5"><v-icon color=" grey lighten-5" size="15" style="padding-bottom:2px" class="mr-0">mdi-currency-ngn</v-icon>200</p>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn rounded class="caption font-weight-black grey--text text--lighten-2" @click="dialog = true" block depressed color="cyan lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
        </v-flex>
         <v-flex xs6>

  <v-card
  style="border-radius: 25px"
    class="ma-auto elevation-9"
    color="light-green darken-4"
    dark max-width="91%">
  <v-card-title class="px-2 headline pb-2 font-weight-black mt-2 light-green--text text--lighten-4">
      Payments 
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold blue-grey--text text--lighten-5"><v-icon color=" green lighten-5" size="15" style="padding-bottom:2px" class="mr-0">mdi-currency-ngn</v-icon>200</p>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn rounded class="caption font-weight-black grey--text text--lighten-4" @click="dialog = true" block depressed color="green lighten-3">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
</v-row>
                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="body-2 d-block grey text-center lighten-2" primary-title>
                       Coming Soon
                      </v-card-title>
        
                  </v-card>
                </v-dialog>
</div>
</template>
<style>

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
      dialog: false,
      content: '',
      dialog2: false,
      dialog3: false,
      valid: true,
      deleteId: '',
      dialog4: false,
        rules: {
        required: value => !!value || "Required.",
        },
              radios: 'Thank you soo much, we will keep improving',

    }
  },
  computed: {
  vendor() {
      return this.$store.getters.getVendor;
    },
  },
  methods: { 
  },
  
};
</script>