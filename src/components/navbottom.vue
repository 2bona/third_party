<template>
<v-app-bar class="py-1" bottom dense color="white" fixed short>  
   <router-link style="text-decoration:none" to="/">
      <div class="text-center">
        <v-icon>mdi-home-variant</v-icon>
      <p style="font-size: 11px !important;" class="caption grey--text font-weight-medium pa-0 mb-0 text-center">Home</p>
      </div>
   </router-link>
   <router-link style="text-decoration:none" to="/cart">
      <div class="text-center">
        <v-icon>mdi-cart</v-icon>
      <p style="font-size: 11px !important;" 
      class="caption grey--text font-weight-medium pa-0 mb-0 text-center">Orders</p>
      </div>
   </router-link>
      <router-link style="text-decoration:none" to="/user">
      <div class="text-center">
        <v-icon>mdi-account</v-icon>
      <p style="font-size: 11px !important;" class="caption grey--text font-weight-medium pa-0 mb-0 text-center">Account</p>
      </div>
      </router-link>
    </v-app-bar>
    </template>
<script>
export default {
    computed: {
    area() {
      return this.$store.getters.getUserArea.id
    }
    }
}
</script>