<template>
  <div class="px-3">
    <v-card
        class=" my-5 mx-auto"
      max-width="400" width="100%"
      tile :loading="loading"
    >
      <v-list>
          <v-subheader>Cities</v-subheader>
            <v-list-item-group color="primary">
              <div  v-for="(item, i) in items"
                    :key="i">
            <v-list-item dense @click="setCity(item.id, item.name)" :to="'/userarea/'+item.id+'/'+item.name">
                <v-list-item-icon>
                <v-icon size="15px" color="grey lighten-2">mdi-city</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="caption">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
              </div>
                
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
      .get("/city/all")
      .then(function (response) {
        sn.loading = false
        sn.items = response.data.city
      }).catch((err)=>{
        sn.loading = false
        console.log(err)
      })
  },
  computed: {
    city() {
      return this.$store.getters.getUser.id;
    }
  },
  methods: {
    setCity (x, y) {
      this.$store.dispatch('setUserCity', {
        city: {
          id: x,
          name: y
        }
      })
    }
  }
};
</script>