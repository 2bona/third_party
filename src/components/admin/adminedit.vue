<template>
<div>

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
  menu() {
      return this.$store.getters.getMenu;
    },
  LoadStatus() {
      return this.$store.getters.getVendorLoadStatus;
    },
  user() {
      return this.$store.getters.getUser;
    },
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