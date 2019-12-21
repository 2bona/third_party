<template>
  <div>
    <v-card-text class="px-6 py-6">
      <v-form onSubmit="return false;" ref="form">
        <v-text-field
          class="text-align-center ma-auto px-8"
          autofocus
          color="orange"
          label="Passcode"
          style="width:150px"
          type="text"
          placeholder="*****"
          :error-messages="error"
          :rules="[rules.required]"
          validate-on-blur
          @keyup.enter.native="passcode"
          v-model="code"
        ></v-text-field>
        <v-btn
          @click="passcode()"
          :loading="loading"
          dark
          rounded
          color="white"
          class="mt-4 orange--text"
        >
          <span class>proceed</span>
          
        </v-btn>
      </v-form>
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
      code: "",
      loading: false,
      error: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    passcode() {
      var sn = this;
      if (this.$refs.form.validate()) {
        this.loading = true;
        const url = "/passcode";
        var data = "";
        const sn = this;
        if (sn.user.type === "email") {
          var data = sn.user.email;
        } else {
          var data = sn.user.phone;
        }
        http({
          url: url,
          method: "post",
          params: {
            data: data,
            type: sn.user.type,
            passcode: sn.code
          }
        })
          .then(response => {
            var res = response.data.success;
            var sn = this;
            if (res.error) {
              console.log(res.error);
              sn.loading = false;
              sn.error = res.error;
            } else {
              sn.loading = false;
              sn.$store.dispatch("setUser", response.data.success.user);
              sn.$router.push("/auth/registerdata");
            }
          })
          .catch(function(error) {
            var d = error.response.data.error;
            console.log(d);
            sn.loading = false;
          });
      } else {
        sn.loading = false;
      }
    }
  }
};
</script>