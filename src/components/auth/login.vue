/* eslint-disable no-console */
<template>
  <div class="">
    <v-card-text class="px-6 mt-6">
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
          class="mt-4  caption font-weight-black text--darken-4 orange--text"
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
    </v-card-text>
    <v-scale-transition>
           <v-btn v-show="btn"
          fixed to="/auth"
          bottom
          right fab
          color="white" style="z-index:10" class="mb-12">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
    </v-scale-transition>
        
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
  mounted(){
    setTimeout(() => {
      this.btn=true
    }, 400);
  },
  beforeRouteLeave (to, from, next) {
  this.btn = false
     setTimeout(() => {
      next()
    }, 50);
},
methods: {
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
            sn.$store.dispatch("setUser", response.data.success.user);
            sn.$store.dispatch("setToken", response.data.success.token);
            if (sn.$route.query.nextUrl) {
              sn.$router.push(sn.$route.query.nextUrl);
            } else {
              sn.$router.push("/");
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
