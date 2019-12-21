<template>
  <div class="px-3">
    <v-card
      class=" my-5 mx-auto"
      max-width="400" width="100%"
      tile>
      <v-list>
        <v-text-field
        class="mx-3 mt-3" color="orange"
          name="name" v-model="search"
          :label="'Search areas in '+$route.params.name"
          placeholder="Type here" :loading="loading"
        ></v-text-field>
            <v-list-item-group color="orange">
                  <v-list-item
                  @click="setUserArea(item.value, item.text)"
                    v-for="(item, i) in filteredItems"
                    :key="i">
                       <v-list-item-icon>
            <v-icon color="grey lighten-2">mdi-map-marker-outline</v-icon>
          </v-list-item-icon>
                         <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
                  </v-list-item>
            </v-list-item-group>
      </v-list>
    </v-card>
   
  </div>
</template>
<style>
#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      search: "",
      display: false,
      loading: true,
      items:[],
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
      ],
      address: "",
      lat: "",
      tags: "",
      long: "",
      disabled: false,
      place_id: "",
    }
  },
  created() {
      var sn = this;
      axios
         .get("/city/areas?id="+sn.$route.params.id)
         .then(function (response) {
             sn.items = response.data.areas
             sn.loading = false
         })
         },
  computed: {
    city() {
      return this.$store.getters.getUser.id;
    },
    filteredItems: function () {
      return this.items.filter((item) => {
        return item.text.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  methods: {
    setUserArea (x, y) {
      this.$router.push('/')
      this.$store.dispatch('setUserArea', {
        area: {
          id: x,
          name: y
        }
      })
    }
  }
};
</script>