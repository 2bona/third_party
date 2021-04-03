/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <div>
    <v-carousel
      interval="4000"
      height="154px"
      continuous
      cycle class="mt-9"
      :show-arrows="false"
      :hide-delimiters="true">
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

          <v-card-text class="px-12 caption grey--text font-weight-regular">{{
            n.text
          }}</v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <v-card color="transparent" flat tile class="ma-auto" width="300px">

      <v-btn
        to="/auth/login"
        rounded
        color="white"
        class="caption font-weight-black text--darken-4 mx-2 orange--text"
      >
        login
      </v-btn>
    </v-card>
  </div>
</template>
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
          title: "Earn",
          text: "Earn while you are at home."
        },
        {
          title: "Orders",
          text:
            "Recieve orders ftom E Dey App in real time."
        },
        {
          title: "Track",
          text:
            "See your riders location in real time."
        }
      ]
    };
  }
};
</script>
