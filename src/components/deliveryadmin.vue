<template>
<v-card flat tile color="grey lighten-4">
  <v-content style="overflow-x:hidden"> 
    <router-view></router-view>
  </v-content>
  <navbottomdelivery></navbottomdelivery>
</v-card>
</template>
<script>
import navbottomdelivery from "./navbottomdelivery";
export default {
    components: {
    navbottomdelivery,
  },
  data() {
    return {
    }
  } 
};
</script>