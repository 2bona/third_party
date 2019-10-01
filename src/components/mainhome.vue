<template>
<div>
<div class="container fluid mt-6 mb-0 px-0">
 <v-btn v-show="loginStatus" @click="logout()">logout</v-btn>
        <flickity  ref="flickity" :options="flickityOptions" class="mt-12 ">
<div v-for="n in 7" :key="n" class=" pa-2 pb-0 carousel-cell">
      <v-card to="/components"  height="250px" color="transparent" width="100%">
             <v-img
                src="https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                class="elevation-2"
                height="240px">
              </v-img>
            <v-card-title 
            
            style="width:100%;position:absolute; bottom:0;background:linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.28) 50%, rgb(0, 0, 0) 100%)"
            class="align-end font-weight-black fill-height">
            
            <h1 class="white--text mb-6 headline font-weight-black" style="line-height:1;">Discover Restaurants around you.</h1>
            
            </v-card-title>

    </v-card>
</div>

    </flickity>
    </div>
        <v-container class="ma-auto mt-0  mb-10">

    <v-layout row wrap class="pa-2 pt-0 mt-0">
        
  
      <v-flex xs12 md4 d-flex align-content-center>
      <v-flex >
                    <p style="line-height:1;" class="font-weight-black title my-auto mt-0  ml-1 texti">Hot meals around you</p>
                    <p class="caption font-weight-medium my-auto grey--text text--lighten-1 ml-1">From verified vendors</p>

      </v-flex>

      <v-flex align-end class="text-right">
      <v-btn to="/details" class="mx-2" fab icon   small color="">
      <v-icon >mdi-arrow-right</v-icon>
    </v-btn>   
      </v-flex>
      </v-flex>
<v-flex xs12 md8 >
  <v-card color="transparent " class=" py-4 px-1" flat style="
    overflow-x: scroll;   
    display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin: 0 0 5rem;
    ">

  <v-card to="/vendor/egusi" color="transparent"  flat v-for="n in 12" :key="n" 
  max-width="200px" width="100px"
   min-width="100px" style=" flex: 0 0 auto;"
 class="mr-4" min-height="150px"> 
 <v-avatar
 class="elevation-3"
   size="100"
   tile
   style="border-radius: 10px"
   color="red"
 >
   <img src="https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="alt">

 </v-avatar>
<v-card flat tile color="transparent" class="mt-1">
  <p class="caption text-capitalize text-truncate mb-0">egusi soup soup soup</p>
  <p class="caption font-weight-black mb-1 text-capitalize text-truncate">N1000/plate</p>
  <p style=" font-size: 9px;" class=" grey--text mb-1 text-capitalize text-truncate">30/50 plates sold</p>
    <v-chip
      x-small
      color="white"
      class='elevation-1 grey--text text--darken-1'
    >{{vendor | name}}
    </v-chip>
</v-card>
  </v-card>
  </v-card>
</v-flex>
</v-layout>
  </v-container>
  <v-btn to="/admin">admin</v-btn>
  <v-btn to="/userview">notadmin</v-btn>
  <v-btn to="/component">guest</v-btn>
  </div>
</template>
<script>
import flickity from "vue-flickity";

export default {
    name: "App",
    components: {
        flickity,
        
    },
    data() {
        return {
          vendor: 'chuks world kitchen',
            flickityOptions: {
        contain: true,
        pageDots: false,
        percentPosition: false,
        wrapAround: false,
        freeScroll: true,
        autoPlay: 1500
        }
        }
    }, computed : {
      loginStatus(){ return this.$store.getters.getUserLoginStatus},
    },    methods: {
     logout(){
    this.$store.dispatch( 'logout');
    
}
    }
}
</script>