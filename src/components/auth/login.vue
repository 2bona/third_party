/* eslint-disable no-console */
<template>
  <div class="">
    <v-card-text class="px-6 mt-6">
      <v-scale-transition>
        <v-btn
          v-show="btn"
          fixed
          @click="$router.push('/auth')"
          bottom
          color="white"
          right
          fab
          style="z-index:10"
          class="elevation-6 mb-12"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-scale-transition>
      <v-form ref="form">
        <v-text-field
          class="ma-auto px-8"
          color="orange"
          style="width:320px"
          type="text"
          placeholder="0**********"
          :rules="numberRules"
          validate-on-blur
          label="Phone number"
          @keyup.enter.native="login"
          v-model="phone"
        ></v-text-field>
        <v-text-field
          class="ma-auto px-8"
          color="orange"
          style="width:320px"
          type="password"
          placeholder="*****"
          :rules="[rules.required]"
          validate-on-blur
          label="Password"
          @keyup.enter.native="login"
          v-model="password"
        ></v-text-field>
        <v-btn
          @click="login()"
          :loading="loading"
          dark
          rounded
          color="white"
          class="mt-4 mb-3 caption font-weight-black text--darken-4 orange--text"
        >
          login
        </v-btn>
      </v-form>
      <v-btn
        to="/auth/reset"
        rounded
        class="mt-4 caption font-weight-black grey--text"
        small
        text
        color=""
        >forgot password</v-btn
      >
      <v-btn
        to="/auth/register"
        rounded
        class="mt-4 caption font-weight-black grey--text"
        small
        text
        color=""
        >create account</v-btn
      >
    </v-card-text>
  </div>
</template>

<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});
export default {
  data() {
    return {
      password: "",
      phone: "",
      loading: false,
      btn: false,
      rules: {
        required: value => !!value || "required.",
        password: value => value.length >= 6 || "min 6 characters",
        // eslint-disable-next-line no-unused-vars
        c_password: value =>
          this.password === this.c_password || "does not match passoword"
      },
      numberRules: [
        v => (v != null && v.length >= 10) || "Min 10 characters",
        v => !!v || "Phone number is required",
        v => /^[0-9]*$/.test(v) || "Number must be valid"
      ]
    };
  },
  computed: {
    ios() {
      return this.$store.getters.getIos;
    },
    android() {
      return this.$store.getters.getAndroid;
    }
  },
  mounted() {
    setTimeout(() => {
      this.btn = true;
    }, 300);
  },
  beforeRouteLeave(to, from, next) {
    this.btn = false;
    setTimeout(() => {
      next();
    }, 80);
  },
  methods: {
    setFcm() {
      const url = "/setfcm";
      var token = localStorage.getItem("fcm");
      const sn = this;
      http({
        url: url,
        method: "post",
        params: {
          fcm: token,
          type: "vendor"
        }
      }).then(() => {
        sn.go();
      });
    },
    go() {
      if (this.$route.query.nextUrl) {
        this.$router.push(this.$route.query.nextUrl);
      } else {
        this.$router.push("/");
      }
    },
    login() {
      var sn = this;
      if (this.$refs.form.validate()) {
        this.loading = true;
        const url = "/login";
        http({
          url: url,
          method: "post",
          params: {
            phone: sn.phone,
            password: sn.password
          }
        })
          .then(response => {
            sn.loading = false;
            var d = response.data.success.user;
            if (d.role !== "vendor") {
              sn.$store.dispatch("snack", {
                color: "red",
                text: "Sorry, you are not a Vendor"
              });
              return;
            } else {
              var token = localStorage.getItem("token");
              sn.$store.dispatch("setUser", d);
              if (sn.ios || sn.android) {
                if (d.token != token) {
                  sn.setFcm();
                } else {
                  sn.go();
                }
              } else {
                sn.go();
              }
              sn.$store.dispatch("setToken", response.data.success.token);
              sn.$store
                .dispatch("setToken", response.data.success.token)
                .then(() => {
                  sn.$store.dispatch("loadVendor");
                  sn.go();
                });
            }
          })
          .catch(function(error) {
            var d = error.response.data.error;
            sn.$store.dispatch("snack", {
              color: "red",
              text: d
            });
            sn.loading = false;
          });
      } else {
        sn.loading = false;
      }
    }
  }
};
</script>
