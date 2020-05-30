<template>
  <v-app>
    <v-container fluid class="pa-0">
      <Offline @detected-condition="handleConnectivityChange"> </Offline>
      <v-snackbar
        :value="snackbar.status"
        :timeout="6000"
        :color="snackbar.color"
        class="text-center"
        top
      >
        {{ snackbar.text }}
      </v-snackbar>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>
  </v-app>
</template>
<style>
.texti {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff8a00),
    to(#da1b60)
  );
  background: linear-gradient(to right, #ff8a00, #da1b60);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  text-shadow: none;
}
.v-toolbar__content,
.v-toolbar__extension {
  padding: 4px 9px !important;
  justify-content: space-around !important;
}
body,
html {
  overflow-x: hidden;
}
</style>
<script>
import Offline from "v-offline";

export default {
  name: "App",
  components: {
    Offline
  },
  data() {
    return {
      vendor: "chuks world kitchen",
      timeout: 6000
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar;
    }
  },
  methods: {
    handleConnectivityChange(status) {
      if (!status) {
        this.$router.push("/offlinepage");
      }
    }
  }
};
</script>
