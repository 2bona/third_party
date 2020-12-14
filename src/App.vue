<template>
  <v-app>
    <v-container fluid class="pa-0">
      <Offline @detected-condition="handleConnectivityChange"> </Offline>
   <v-snackbar
        :value="snackbar.status"
        :timeout="5000"
        :color="snackbar.color"
        top
        left
        multi-line
        style="z-index:99999"
      >
        {{ snackbar.text }}
        <v-btn dark icon @click="$store.dispatch('status1', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
      <v-snackbar
        style="border-radius: 20px;background-image: url('https://res.cloudinary.com/dnqw7x4bp/image/upload/c_scale,w_720/v1590919715/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg');
    background-position: center center;background-size: cover;background-repeat: no-repeat;"
        :value="snackbar2.status"
        bottom
        color="transparent"
        right
        vertical
        :timeout="0"
      >
        <p class="title mb-1 font-weight-bold" v-html="snackbar2.title"></p>
        {{ snackbar2.text }}

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark text @click="$store.dispatch('status2', false)">
            close
          </v-btn>
          <v-btn
            v-if="snackbar2.action && snackbar2.id && snackbar2.actionText"
            dark
            text
            @click="action(snackbar2.action, snackbar2.id)"
          >
            {{ snackbar2.actionText }}
          </v-btn>
        </v-card-actions>
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
import axios from "axios";
import wrapper from "axios-cache-plugin";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});

export default {
  name: "App",
  components: {
    Offline
  },
  data() {
    return {
      timeout: 6000
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar;
    },
    snackbar2() {
      return this.$store.getters.getSnackbar2;
    }
  },
  mounted(){
 this.navb2()
  },
  methods: {
        navb2() {
      const sn = this;
        let url = "/reply/all";
        http({
          url: url,
          method: "get"
        })
          .then(response => {
            sn.$store.dispatch("setReplys", {
              replys: response.data.replys
            });
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    handleConnectivityChange(status) {
      if (!status) {
        // this.$router.push("/offlinepage");
      }
    },
    action(x, y) {
      if (x === 1) {
        this.$store.dispatch("order", {
          id: y,
          action: null
        });
      } else if (x === 2) {
        this.$router.push("/adminedit");
      } else {
        this.$router.push("/");
      }
      this.$store.dispatch("status2", false);
    }
  } 
};
</script>
