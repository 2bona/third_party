<template>
  <div>
    <v-carousel touch interval="4000" height="150px" continuous cycle :show-arrows="false"
        :hide-delimiters="true">
    <v-carousel-item   
v-for="n in statement" :key="n">
      <v-card 
        width="400px"
        class="ma-auto text-grey text-center"
        tile
        color="transparent"
        flat
      >
        <v-card-title class="d-block">
          <p class="grey--text text--darken-3 mb-0 title text-capitalize font-weight-black text-center">{{n.title}}</p>
        </v-card-title>

        <v-card-text class="px-12 caption grey--text font-weight-regular">{{n.text}}</v-card-text>
      </v-card>
    </v-carousel-item>
    </v-carousel> 
    <v-card color="transparent" flat tile class="ma-auto" width="300px">
    
     <v-btn to="/auth/register"  dark  rounded color="orange" class>sign up</v-btn>

    </v-card>
    <v-card color="transparent" flat tile class="ma-auto" width="300px">
      <v-btn to="/auth/login"   rounded color="white" class="mt-5 orange--text">
        <span class="orange--text">login</span>
      </v-btn>
    </v-card>
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
        freeScroll: true

        // any options from Flickity can be used
      },
      statement: [
        {
          title: "discover",
          text: "Find restaurants, eateries and chefs around you."
        },
        {
          title: "Order",
          text:
            "Order from the comfort of your location for fast delivery of your hot meals"
        },
        {
          title: "Gift Meals",
          text:
            "Buy meals for your loved ones, book from your favourite food vendor and have it delivered to them."
        }
      ]
    };
  }
};
</script>
