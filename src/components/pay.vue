<template>
  <div>
    <v-app-bar
      style="background: linear-gradient(to bottom, #000000b8 0%,#0d0d0d6e 50%, rgba(0, 0, 0, 0) 100%);"
      dark
      color="transparent"
      fixed
      flat>
      <v-btn @click="back()" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        Payment
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
  
    </v-app-bar>

    <div class="container">

    <v-card class="mx-6" flat tile color="transparent">

   <v-row class="mt-0" justify-space-around>

<router-view></router-view>
   </v-row>
    </v-card>
    </div>
    
  </div>
</template>

<style>
.v-tooltip__content{
    padding: 0px 0px!important;
    width: 90%;
}
</style>

<script>


export default {
    name: "pay",
 
  methods: {
    back() {
      this.$router.go("-1");
    }
  },
 data() {
    return {
           
    }
 }
};
</script>