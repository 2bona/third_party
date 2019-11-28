<template>
  <v-card tile style class="text-left d-flex align-center" height="auto">
    <v-container
      fluid
      style="height:100%;width:100vw; ">
      <v-layout row wrap fill-height height="100vh" class="ma-auto py-12">
        <v-flex xs12 class="mb-10">
          <v-card
            class="d-flex ma-auto"
            max-width="600px"
            width="100%"
            flat
            tile
            color="transparent"
          >
            <v-card class="text-center" flat tile color="transparent">
              <div
                class="overline pl-1 mb-5 centeritem font-weight-black grey--text text--darken-1"
              ></div>

              <div class="centeritem my-3">
                <v-avatar class="elevation-20" size="150">
                  <v-img :src="vendor.image"></v-img>
                </v-avatar>
              </div>

              <div
                class="display-1 text-center hidden-sm-and-up font-weight-black text-capitalize text-capitalize"
              >{{vendor.name}}</div>

              <div
                class="display-1 centeritem hidden-xs-only font-weight-black text-capitalize"
              >{{vendor.name}}</div>
              <div
                class="mb-5 centeritem pt-5 pl-1 body-2 grey--text font-weight-regular"
              >{{vendor.bio}}</div>
              <div class="caption centeritem pl-1 grey--text text--darken-2">
                <span class="font-weight-bold">Member since:</span>
                <span style="font-family:monospace;">{{vendor.created_at}}</span>
              </div>
              <div class="caption centeritem pl-1 grey--text text--darken-2">
                <span class="font-weight-bold">Successful sales:</span>
                <span style="font-family:monospace;">1000+</span>
              </div>
              <div class="caption centeritem pb-5 pl-1 grey--text text--darken-2">
                <span class="font-weight-bold">State of origin:</span>
                <span style="font-family:monospace;">Akwa Ibom</span>
              </div>

              <v-card-title class="pa-0">
                <v-layout class="justify-space-around">
                  <div>
                    <v-btn
                      target="_blank"
                      :href="'https://facebook.com/'+vendor.facebook"
                      v-if="vendor.facebook"
                      icon
                      fab
                      small
                      color="primary"
                    >
                      <v-icon>fab fa-facebook</v-icon>
                    </v-btn>

                    <v-btn
                      target="_blank"
                      :href="'https://instagram.com/'+vendor.instagram"
                      v-if="vendor.instagram"
                      icon
                      fab
                      small
                      color="deep-orange darken-3"
                    >
                      <v-icon>fab fa-instagram</v-icon>
                    </v-btn>
                    <v-btn
                      target="_blank"
                      :href="'https://twitter.com/'+vendor.twitter"
                      v-if="vendor.twitter"
                      icon
                      fab
                      small
                      color="blue lighten-3"
                    >
                      <v-icon>fab fa-twitter</v-icon>
                    </v-btn>
                  </div>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-card>
        </v-flex>

        <v-flex xs12 md8>
          <v-card tile flat color="transparent" width="100%" height="100%" class="d-flex">
            <v-card class="mb-5" width="100%" flat tile color="transparent">
              <p
                class="text-center my-10 hidden-sm-and-up overline grey--text font-weight-black text--lighten-1 mb-12"
              >popular demand</p>

              <p
                class="hidden-xs-only centeritem overline grey--text font-weight-black text--lighten-1 mb-12"
              >popular demand</p>

              <flickity style v-if="sliding" ref="flickity" :options="flickityOptions">
                <div style v-for="(n, key) in slides" :key="n.sn">
                  <v-card
                    width="300px"
                    height="390px"
                    min-height="390px"
                    max-height="390px"
                    tile
                    style="border-radius:10px 10px 30px 30px"
                    color="grey lighten-5"
                    class="carousel-cell mx-2"
                  >
                    <v-img class :height="n.show? '65%': '80%'" :src="n.pic" @click="showimg(key)"></v-img>

                    <v-btn
                      absolute
                      right
                      bottom
                      fab
                      large
                      @click="details"
                      color="orange darken-4"
                      class="btnflt orange--text text--lighten-5 mb-12"
                      dark
                    >
                      <v-icon class dark>fas fa-plus-circle</v-icon>
                    </v-btn>

                    <v-card-text class="py-1">
                      <h2
                        class="headline hidden-xs-only text-truncate grey--text text--darken-3 font-weight-black"
                      >{{n.name}}</h2>

                      <h2
                        class="title hidden-sm-and-up grey--text text-truncate text--darken-3 font-weight-black"
                      >{{n.name}}</h2>

                      <v-card-title v-show="n.show" class="hidden-sm-and-up py-0 px-0">
                        <v-rating
                          small
                          :value="4"
                          dense
                          color="orange"
                          background-color="orange"
                          hover
                          class="mr-2"
                        ></v-rating>

                        <span class="primary--text subtitle-2 mt-2">(64)</span>
                      </v-card-title>

                      <v-card-title v-show="n.show" class="hidden-xs-only py-0 px-0">
                        <v-rating
                          small
                          :value="4"
                          dense
                          color="orange"
                          background-color="orange"
                          hover
                          class="mr-2"
                        ></v-rating>

                        <span class="primary--text subtitle-2 mt-2">64 Reviews</span>
                      </v-card-title>
                    </v-card-text>
                  </v-card>
                </div>
              </flickity>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<style>
@media only screen and (max-width: 700px) {
  .centeritem {
    text-align: center;
  }
  .justifycenter {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
}

@media only screen and (min-width: 450px) {
}
</style>
<script>
import flickity from "vue-flickity";

export default {
  created() {
    // this.$store.dispatch("loadCategories");
    this.$store.dispatch("loadCategories", {
      name: "mummy's pots"
    });
  },
  computed: {
    /*
        Gets the  load status
      */
    LoadStatus() {
      return this.$store.getters.getVendorLoadStatus;
    },
    /*
        Gets the Vendor
      */
    vendor() {
      return this.$store.getters.getVendor;
    },
    vendorLoadStatus() {
      return this.$store.getters.getVendorLoadStatus;
    },
  },
  name: 'vendor',
  components: { flickity },
  props: ["restaurant", "slides", "sliding"],
  data() {
    return {
      rating: 4,
      flickityOptions: {
        contain: true,
        pageDots: false,
        percentPosition: false,
        wrapAround: true,
        freeScroll: true
      },
      newone: process.env.VUE_APP_NEW
    };
  }
};
</script>