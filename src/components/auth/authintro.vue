/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <div>
    <v-carousel
      interval="4000"
      height="154px"
      continuous
      cycle class="caro mt-9"
      :show-arrows="false" hide-delimiter-background
      :hide-delimiters="false">
      <v-carousel-item v-for="n in statement" :key="n.title">
        <v-card
          width="400px"
          class="ma-auto text-grey text-center"
          tile
          color="transparent"
          flat
        >
          <v-card-title class="d-block">
            <p class="grey--text text--darken-3 mb-0 headline text-capitalize font-weight-black text-center">
              {{ n.title }}
            </p>
          </v-card-title>

          <v-card-text class="px-12 body-2 grey--text font-weight-regular">{{
            n.text
          }}</v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <v-card color="transparent" flat tile class="ma-auto" width="300px">

      <v-btn
        to="/auth/login" depressed
        style="border-radius:10px"
       block x-large 
        class=" font-weight-black mt-4 text--darken-4 mx-2 "
      >
        login
      </v-btn>
    </v-card>
  </div>
</template>
<style>
.caro .v-btn--round .v-btn__content .v-icon {
    color: #b7b7b7;
}
</style>
<script>
export default {
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
          title: "Orders",
          text:
            "Recieve orders from Vendors in real time."
        },
        {
          title: "Manage Riders",
          text: "Assign riders to orders, and update customers automatically."
        },
        {
          title: "Accounting",
          text: "Easily calculate your earning and access past records."
        },
        // {
        //   title: "Track",
        //   text:
        //     "See your riders location in real time."
        // }
      ]
    };
  }
};
</script>
