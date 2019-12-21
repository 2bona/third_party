<template>
<v-app-bar class="py-1" bottom dense color="white" fixed short>  
   <router-link style="text-decoration:none" to="/">
      <div class="text-center">
        <v-icon>mdi-home-variant-outline</v-icon>
      <p style="font-size: 11px !important;" class="caption grey--text font-weight-light pa-0 mb-0 text-center">Home</p>
      </div>
   </router-link>
   <router-link active-class="orange--text" style="text-decoration:none" to="/order">
      <div class="text-center">
        <v-icon>mdi-crosshairs</v-icon>
      <p style="font-size: 11px !important;" class="caption grey--text font-weight-light pa-0 mb-0 text-center">Track</p>
      </div>
   </router-link>
   <router-link style="text-decoration:none" to="/cart">
      <div class="text-center">
        <v-icon>mdi-cart-outline</v-icon>
      <p style="font-size: 11px !important;" 
      class="caption grey--text font-weight-light pa-0 mb-0 text-center">Cart</p>
      </div>
   </router-link>
      <router-link style="text-decoration:none" to="/user">
      <div class="text-center">
        <v-icon>mdi-account-outline</v-icon>
      <p style="font-size: 11px !important;" class="caption grey--text font-weight-light pa-0 mb-0 text-center">Account</p>
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