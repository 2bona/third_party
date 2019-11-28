<template>
<div>
  <h1 class="px-3 grey--text text--darken-2">Vendor Dashboard</h1>
  <v-content style="overflow-x:hidden"> 
    <router-view></router-view>
  </v-content>
  <navbottomadmin></navbottomadmin>
</div>
</template>
<script>
import navbottomadmin from "./navbottomadmin";
export default {
    components: {
    navbottomadmin,
  },
  data() {
    return {
    }
  } 
};
</script>