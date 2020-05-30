<template>
  <v-card flat tile color="">
    <v-content style="overflow-x:hidden">
      <router-view></router-view>
    </v-content>
    <navbottomadmin></navbottomadmin>
  </v-card>
</template>
<script>
import navbottomadmin from "./navbottomadmin";
export default {
  components: {
    navbottomadmin
  },
  data() {
    return {};
  },
  mounted(){
        this.$store.dispatch("loadVendor")
  }
};
</script>
