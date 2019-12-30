
<template>
    <v-app>               
    <v-container fluid class="pa-0">
    <v-content>
       <v-card class="pa-2  text-center" min-height="100vh" dark color="grey">
           <h1 class="display-4 font-weight-thin">You</h1>
           <h1 class="display-4 font-weight-light">are</h1>
           <h1 class="display-4 font-weight-bold">offline</h1>
           <h1 class="display-1 font-weight-black">Call <a :href="'tel: '+ callagent">{{callagent}}</a> to order now!</h1>
              <div style="min-width:300px; width:100%;" class="ma-auto mb-3 pt-3 align-self-center">
                  <v-avatar size="100px" color="white" flat   class="elevation-20 my-3">
                    <v-img
                      src="https://res.cloudinary.com/dnqw7x4bp/image/upload/v1577381765/food_republic.png"
                      alt="alt" width="300px" contain
                    > </v-img>
                  </v-avatar>
              </div>
       </v-card>
    </v-content>   </v-container>

  </v-app>
</template>
<style >
.texti{
  background: -webkit-gradient(linear,left top,right top,from(#ff8a00),to(#da1b60));
    background: linear-gradient(to right,#ff8a00,#da1b60);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    text-shadow: none;

}
.v-toolbar__content, .v-toolbar__extension {
    padding: 4px 9px!important;
    justify-content:space-around!important;
}
body, html{
  overflow-x: hidden;
}
</style>
<script>
export default {
    name: "App",
    components: {   
    },
    data() {
        return {
          vendor: 'chuks world kitchen',
      timeout: 6000,
      callagent: '08033685498'
        }
    },
    computed: {
    },
    methods: {
    }

}
</script>
