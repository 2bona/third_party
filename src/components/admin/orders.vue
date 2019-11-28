<template>
<div>
<v-row justify="space-start" class="pa-3 mb-12 px-6">

  
    <v-flex xs12 class="my-5 px-0">
        <h1 class="title mb-5 font-weight-bold grey--text">Orders</h1>
          <v-simple-table min-height="75vh">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Type</th>
          <th class="text-left">Amount</th>
          <th class="text-left">When</th>
          <th class="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 8" :key="item">
                 <td class="text-left overline">{{item}}</td>

            <td>
              <p class="mb-0 primary--text">Batch</p>
              <p class="mb-0 warning--text">Express</p>
          </td>
          <td>N1000</td>
          <td class="overline">3mins ago</td>
           <td class="text-left"><v-btn x-small color="blue">
              <v-icon size="15" color="orange lighten-2">mdi-cancel</v-icon>
              <v-icon size="15" color="white">mdi-check</v-icon>
              </v-btn></td>
        
        </tr>
      </tbody>
     
    </template>
 
  </v-simple-table>
       <v-row class="mt-3" justify="space-around">
            <v-btn fab color="white"><v-icon>mdi-chevron-left</v-icon></v-btn>
            <v-btn to="/vendorreviews" fab color="white"><v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
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
    }
  },
  created() {
     this.$store.dispatch('loadVendor', {
       vendor: this.user.id
     })
  },
  methods: {
    addCategory(){
        if (this.$refs.form.validate()) {
 this.$store.dispatch('addCategory', {
  content: this.content,
  vendor_name: this.vendor.name,
  vendor_id: this.vendor.id
  }).then((res)=> {
    this.dialog2 = false
  })
    }
    },
    deleteCat(id){
      this.deleteId = id
      this.dialog4 = true
    },
    confirmDel(){
          this.$store.dispatch('deleteCategory', {
cat_id: this.deleteId,  
vendor_name: this.vendor.name,  
      })
    }
    
  },
  
};
</script>