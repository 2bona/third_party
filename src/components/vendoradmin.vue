<template>
  <v-card flat tile color="grey lighten-4">
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
  }
};
</script>
