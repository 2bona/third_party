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
    <div class="container mt-12">

    <p class="overline pt-6 font-weight-bold grey--text text--darken-1">Payment information</p>
    <v-card color="blue-grey darken-3" elevation="2" width="300px" style="border-radius: 10px" height="150px" class="mx-auto py-2 pl-6 pr-6">
     <v-row justify="">
         <v-flex xs12 class="mb-3 text-right">
             <v-avatar
              tile class=""
                 size="50"
             >
<v-icon size="50" color="blue-grey lighten-4">fab fa-cc-mastercard</v-icon>
             </v-avatar>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">4509</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">****</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">****</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">4509</p>
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
    </div>
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