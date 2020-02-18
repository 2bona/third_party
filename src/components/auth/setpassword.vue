<template>
  <div>
    <v-card-text class="px-6 py-6">
        <v-form ref="form">
      <v-text-field
      class="ma-auto px-8"
        autofocus
        color="orange"
        style="width:180px"
        type="password"
        placeholder="*****"
        :rules="[rules.required, rules.password]"
        validate-on-blur
        label="Password"
        @keyup.enter.native="setpassword"
        v-model="password"
      ></v-text-field>
      <v-text-field
      class="ma-auto px-8"
        color="orange"
         style="width:180px"
        type="password" label="Repeat password"
        placeholder="*****"
        :rules="[rules.required, rules.c_password]"
        validate-on-blur
        @keyup.enter.native="setpassword"
        v-model="c_password"
      ></v-text-field>
      <v-btn
        @click="setpassword()"
        :loading="loading"
        dark 
        validate-on-blur
        rounded
        color="white"
        class="caption font-weight-black text--darken-4 mx-2 orange--text"
      >
        <span class>proceed</span>
      </v-btn>
        </v-form>
    </v-card-text>
  </div>
</template>

<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
export default {
  data() {
    return {
      password: "",
      c_password: "",
      loading: false,
      rules: {
        required: value => !!value || "required.",
        password: value => value.length >= 6 || "min 6 characters",
        c_password: value =>
          this.password === this.c_password || "does not match passoword"
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
  setpassword() {
    var sn = this
    if (this.$refs.form.validate()) {
    this.loading = true
      const url = '/setpassword'
      http({
        url: url,
        method: 'post',
        params: {
          phone: sn.user.phone,
          password: sn.password,
          password_confirmation: sn.c_password 
          }
      })
        .then((response) => {
          console.log(response)
          sn.loading = false
          sn.$store.dispatch('setUser', response.data.success.user)
          sn.$store.dispatch('setToken', response.data.success.token)
          sn.$router.push('/Regvendor')
        }).catch(function (error) {
          var d = error.response.data.error;
           console.log(d)
          sn.loading = false
        })
      } else {
          sn.loading = false
      }
    }
  }
};
</script>