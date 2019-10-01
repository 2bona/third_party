<template>

<div>


                  <flickity ref="flickity" :options="flickityOptions" >
                    <v-card
                      v-for="n in statement"
                      :key="n"
                      min-width="100%"
                      class="carousel-cell"
                      tile
                      color="transparent"
                      flat
                    >
                      <v-card-title class="d-block">
                        <p class="mb-0 title text-capitalize grey--text text--darken-2 font-weight-black text-center">{{n.title}}</p>
                      </v-card-title>

                      <v-card-text
                        class="px-12 caption grey--text font-weight-medium"
                      >{{n.text}}
                      </v-card-text>
                      
                    </v-card>
                  </flickity>
                <v-card-text>
                           <v-btn to="/auth/register" dark large block rounded color="" class="body-2 colored font-weight-bold grey--text text--lighten-3  text-capitalize">
                              sign up
                          </v-btn>
                          <v-btn to="/auth/login"  block large  rounded color="white" class="mt-5  body-2 font-weight-bold  orange--text text--darken-3 text-capitalize">
                             <span class="texti">login</span> 
                          </v-btn>
                      </v-card-text>
                      </div>
                      </template>
                      <style>
.flickity-page-dots {
  padding: 0 !important;
  text-align: center;
}
.flickity-page-dots .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 8px;
    /* background: #fff; */
}
.flickity-enabled {
    position: relative;
    bottom: 55px;
}
.flickity-prev-next-button {
  display: none !important;
}
</style>
<script>
import flickity from "vue-flickity";

export default {
  components: {
    flickity
  },
  data() {
    return {
      flickityOptions: {
        contain: true,
        percentPosition: true,
        wrapAround: true,
        autoPlay: 3000,

        // any options from Flickity can be used
      },
      statement: [
          {
              title: 'discover',
              text: 'Find restaurants, eateries and chefs around you.'
          },
          {
              title: 'Order',
              text: 'Order from the comfort of your location for fast delivery of your hot meals'
          },
          {
              title: 'Gift Meals',
              text: 'Buy meals for your loved ones, book from your favourite food vendor and have it delivered to them.'
          }
      ]
    }
  }
};
</script>