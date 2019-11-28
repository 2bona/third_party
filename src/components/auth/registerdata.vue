<template>
  <div>
    <v-card-text class="px-6" min-height="100vh" style="overflow-y: auto">
      <v-form @submit="register" onSubmit="return false;" ref="form">
        <v-text-field
          autofocus
          v-model="user.first_name"
          color="orange darken-3"
          label="First name"
          placeholder="Enter your first name"
          validate-on-blur
          :rules="[rules.required, rules.min]"
          @keyup.enter.native="register"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.middle_name"
          color="orange darken-3"
          label="Middle name (optional)" 
          validate-on-blur
          placeholder="Enter your middle name"
          @keyup.enter.native="register"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.surname"
          color="orange darken-3"
          label="Surname" validate-on-blur
          placeholder="Enter your surname"
          :rules="[rules.required, rules.min]"
          @keyup.enter.native="register"
          required
        ></v-text-field>
        <v-text-field
          color="orange darken-3"
          label="Email"
          type="email"
          placeholder="eg. foodrepublic@gmail.com"
          :rules="[rules.required, rules.email]"
          :disabled="user.verification_type === 'email'"
          v-model="user.email" validate-on-blur
          @keyup.enter.native="register"
          :error-messages='error.email'
          required
        ></v-text-field>
        <v-text-field
          color="orange darken-3"
          label="Phone"
          type="text"
          :disabled="user.verification_type === 'phone'"
          placeholder="0********"
          :rules="numberRules"
          counter="11"
          validate-on-blur
          :error-messages='error.phone'
          v-model="user.phone"
          @keyup.enter.native="register"
          required
        ></v-text-field>
        <v-btn
          :loading="loading"
          @click.prevent="register()"
          rounded dark
          color="orange"
          class=" my-6"
        >next</v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>
<style>
</style>
<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'
import { isNumber } from 'util'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})

export default {
  data() {
    return {
      loading: false,
      error: {
        email: '',
        phone: ''
      },
      rules: {
        required: value => !!value || "Required.",
        min: value => value.length >= 3 || "Min 3 characters",
        c_password: value =>
          this.password === this.c_password || "does not match passoword",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      numberRules: [
        (v) => (v != null && v.length >= 11) || "Min 11 characters",
        (v) => !!v || 'Phone number is required',
        (v) => v[0] === '0' || 'Phone number must start with "0"',
        (v) => /^[0-9]*$/.test(v) || 'Number must be valid'
      ]
    } //08164691026
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  methods: {
  register() {
    if (this.$refs.form.validate()) {
    this.loading = true
    const url = '/registerdata'
    var sn = this
      var v = sn.user.verification_type
      http({
        url: url,
        method: 'post',
        params: {
          first_name: sn.user.first_name,
          surname: sn.user.surname,
          middle_name: sn.user.middle_name,
          email: sn.user.email,
          phone: sn.user.phone,
          data: sn.user[v],
          type: sn.user.verification_type
        }
      })
        .then((response) => {
          console.log(response)
          sn.loading = false
          sn.$store.dispatch('setUser', response.data.success.user)
          sn.$router.push('/auth/setpassword')
        }).catch(function (error) {
          var d = error.response.data.error;
          if (d.email) {
            sn.error.email = d.email[0]
          }
         if (d.phone) {
            sn.error.phone = d.phone[0]
          }
         if (d.first_name) {
            sn.error.first_name = d.first_name[0]
          }
         if (d.surname) {
            sn.error.surname = d.surname[0]
          }
         if (d.middlename) {
            sn.error.middlename = d.middlename[0]
          }
          sn.loading = false
        })
      } else {
          sn.loading = false
      }
    }
  }
}
</script>
