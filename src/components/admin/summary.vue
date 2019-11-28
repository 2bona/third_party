<template>
<div>
<v-row justify="space-start" class="pa-3 px-6">
    <v-flex xs12 class>
            <h1 class="title mb-5 font-weight-bold grey--text">Summary</h1>
        
    </v-flex>
    <v-flex xs6>

  <v-card
    class="mx-auto"
    color="green lighten-2"
    dark max-width="96%"
  >
  <v-card-title class="px-2 title green--text text--lighten-4">
      Sales today
  </v-card-title>
  <p  class="ml-4 font-weight-bold mb-0 green--text text--lighten-5">N2000</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn to="/vendortables" block depressed color="green lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
    <v-flex xs6>
  <v-card
    class="mx-auto"
    color="blue "
    dark max-width="96%"
  >
  <v-card-title class="px-2 title blue--text text--lighten-4">
      Orders today
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold blue--text text--lighten-5">300</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn to="/vendorforms" block color="blue lighten-1" depressed>full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
          <v-flex xs6>

  <v-card
    class="mx-auto"
    color="teal lighten-2"
    dark max-width="96%"
  >
  <v-card-title class="px-2 title mt-2 teal--text text--lighten-4">
      Reviews today
  </v-card-title>
  <p  class="ml-4 font-weight-bold mb-0 teal--text text--lighten-5">20</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn to="/vendortables" block depressed color="teal lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
        <v-flex xs6>

  <v-card
    class="mx-auto"
    color="blue-grey lighten-2"
    dark max-width="96%">
  <v-card-title class="px-2 title mt-2 blue-grey--text text--lighten-4">
      Visits today
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold blue-grey--text text--lighten-5">200</p>
    

 

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn to="/vendortables" block depressed color="blue-grey lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
</v-row>
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