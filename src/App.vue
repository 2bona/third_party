
<template>
    <v-app  >               
    <v-container fluid class="pa-0">
      
    <v-snackbar
      :value="snackbarStatus"
      :timeout="timeout"
      :color="snackbarColor"
      top left
    >
      {{ text }}
      <v-btn text>
        Close
      </v-btn>
    </v-snackbar>
    <v-content>
      <router-view></router-view>

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
      timeout: 6000
        }
    },
    computed: {
      text(){return this.$store.getters.getSnackbarText},
      snackbarColor(){return this.$store.getters.getSnackbarColor},
      snackbarStatus(){return this.$store.getters.getSnackbarStatus},
    },

}
</script>
