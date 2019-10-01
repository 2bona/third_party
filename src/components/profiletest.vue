<template>
  <v-card tile>
    <v-card
      tile
      color="grey"
      :img="restaurant[0].img"
      class="text-left d-flex align-center"
      height="100%"
    >
      <v-container
        fluid
        style="background-color: black; height:100%;width:100vw; background: #C04848;
    
    background: -moz-linear-gradient(left, #C04848 0%, #000000 100%);
    
    background: -webkit-linear-gradient(left, #C04848 0%, #000000 100%);
    
    background:linear-gradient(to right, rgb(0, 0, 0)0%, rgba(255, 36, 0, 0.54) 100%);
    
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#C04848', endColorstr='#000000',GradientType=1 );
    
                                    "
      >
        <v-layout
          row
          wrap
          fill-height
          height="100vh"
          class="ma-auto py-12"
          style="max-width:1300px"
        >
          <v-flex xs12 md6>
            <v-card class="d-flex ma-auto" width="100%" flat tile color="transparent">
              <v-card class flat tile color="transparent">
                <div
                  class="overline pl-1 mb-5 centeritem font-weight-black grey--text text--lighten-1"
                >{{restaurant[0].type}}</div>

                <div class="centeritem my-3">
                  <v-avatar size="200">
                    <v-img :src="restaurant[0].avatar"></v-img>
                  </v-avatar>
                </div>

                <div
                  class="display-3 text-center hidden-sm-and-up font-weight-black white--text text-capitalize text--darken-4"
                >{{restaurant[0].name}}</div>

                <div
                  style="max-width: 620px"
                  class="display-4 hidden-xs-only font-weight-black white--text text--darken-4"
                >{{restaurant[0].name}}</div>

                <div
                  style="max-width: 620px"
                  class="centeritem pt-4 pl-1 body-2 grey--text text--lighten-2 font-weight-bold text--lighten-2"
                >{{restaurant[0].description}}</div>

                <v-card-title class="py-0 px-0 text-sm-center">
                  <v-layout justify-space-around>
                    <p class="hidden-xs-only mb-1" style="display:inherit; width:100%">
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
                    </p>

                    <p class="hidden-sm-and-up mb-1" style="display:inherit">
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
                    </p>
                  </v-layout>
                </v-card-title>

                <v-card-title class="pa-0">
                  <v-layout class="justifycenter">
                    <v-btn icon fab small color="primary">
                      <v-icon>fab fa-facebook</v-icon>
                    </v-btn>

                    <v-btn icon fab small color="primary">
                      <v-icon>fab fa-instagram</v-icon>
                    </v-btn>
                  </v-layout>
                </v-card-title>
              </v-card>
            </v-card>
          </v-flex>

          <v-flex xs12 md6>
            <v-card tile flat color="transparent" width="100%" height="100%" class="d-flex">
              <v-card class="mb-5" width="100%" flat tile color="transparent">
                <p
                  class="text-center my-10 hidden-sm-and-up overline grey--text font-weight-black text--lighten-1 mb-12"
                >popular demand</p>

                <p
                  class="hidden-xs-only overline grey--text font-weight-black text--lighten-1 mb-12"
                >popular demand</p>

                <flickity v-if="sliding" ref="flickity" :options="flickityOptions">
                  <div v-for="(n, key) in slides" :key="n.sn">
                    <v-card
                      width="300px"
                      height="240px"
                      min-height="240px"
                      max-height="240px"
                      tile
                      style="border-radius:0px 0px 30px 30px"
                      color="grey lighten-5"
                      class="carousel-cell mx-2"
                    >
                      <v-img
                        class
                        :height="n.show? '55%': '80%'"
                        :src="n.pic"
                        @click="showimg(key)"
                      ></v-img>

                      <v-btn
                        absolute
                        right
                        center
                        fab
                        large
                        @click="details"
                        color="orange darken-4"
                        class="btnflt orange--text text--lighten-5"
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

                          <span class="primary--text subtitle-2 mt-2">64 Reviews</span>
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

    <v-card>
      <v-container fluid>
        <v-layout justify-space-between row wrap class="ma-auto py-12" style="max-width:1300px">
          <v-flex xs12 sm12 md5 lg5 class="mb-3">
            <v-card max-width="500px" class color="grey lighten-4" height>
              <v-card tile elevation="20" height="30vh" width="100%">
                <iframe
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border:0"
                  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJU-eUi72CQxARU0e9iuuRI88&key=AIzaSyAxr9nMrLhiCl-smUP-tmuclQ_i7n3DmI0"
                  allowfullscreen
                ></iframe>
              </v-card>

              <v-card-text>
                <p class="overline grey--text font-weight-bold">Address</p>

                <p
                  class="font-weight-bold text-capitalize"
                >No 5 ben oranusi street iyiowa odekpe onitsha, iyiowa odekpe, ogbaru local government, anambra state.</p>

                <p></p>

                <v-divider class="red--text"></v-divider>

                <p class="overline mt-3 grey--text font-weight-bold">kitchen hours</p>

                <p class="font-weight-bold text-capitalize">9:00am to 10:00pm</p>

                <v-divider></v-divider>

                <p class="overline mt-3 grey--text font-weight-bold">Specialty</p>

                <v-chip-group multiple column active-class="grey" class="mb-2">
                  <v-chip
                    color="white"
                    small
                    class="text-capitalize elevation-2 font-weight-bold hidden-xs-only white--text"
                    v-for="n in tags"
                    :key="n"
                    :value="n"
                  >{{ n }}</v-chip>

                  <v-chip
                    color="white"
                    small
                    @click="ko(n)"
                    class="text-capitalizefont-weight-bold white--text text--lighten-4 hidden-sm-and-up elevation-2"
                    v-for="n in tags"
                    :key="n"
                    :value="n"
                  >{{ n }}</v-chip>
                </v-chip-group>

                <p></p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 md7 lg7 class="mb-3">
            <v-card flat max-width class color="white" height="100%">
              <v-card-text class="pt-4 px-1">
                <h3
                  class="pl-4 grey--text text--darken-1 font-weight-medium my-auto headline"
                >Reviews (109)</h3>

                <v-rating
                  background-color="grey lighten-2"
                  class="px-2 mb-2 pt-0"
                  color="deep-orange "
                  v-model="rating"
                ></v-rating>

                <v-card flat tile max-height="45vh" style="overflow-y:scroll; ">
                  <v-list two-line v-for="n in 7" :key="n">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">
                          <v-flex d-flex>
                            Egusi soup
                            <v-spacer></v-spacer>
                            <span class="overline">20th August, 2019.</span>
                          </v-flex>
                        </v-list-item-title>

                        <v-flex d-flex align-center class="py-0 pl-1">
                          <div class="grey--text caption pt-1">By emeka okolo</div>

                          <div class="flex-grow-1"></div>

                          <v-rating
                            size="15"
                            background-color="grey lighten-2"
                            color="deep-orange lighten-3"
                            v-model="rating"
                          ></v-rating>
                        </v-flex>

                        <v-list-item-subtitle
                          class="text-wrap px-1"
                        >This was the best Rice i have ever ate This was the best Rice i have ever ate This was the best Rice i have ever ate n, i loved it and still do.</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-icon-text></v-list-item-icon-text>
                    </v-list-item>

                    <v-card-text class="py-0 px-5">
                      <v-divider></v-divider>
                    </v-card-text>
                  </v-list>
                </v-card>

                <v-textarea
                  class="mx-auto mt-4"
                  style="max-width:400px"
                  solo
                  single-line
                  rounded
                  outline
                  rows="2"
                  label="Write your review here"
                ></v-textarea>

                <v-rating
                  large
                  :value="5"
                  dense
                  color="deep-orange "
                  background-color="grey"
                  hover
                  class="text-center mb-5"
                ></v-rating>

                <div class="text-center mb-3">
                  <v-btn
                    large
                    rounded
                    elevation="5"
                    color="deep-orange"
                    class="font-weight-black text-capitalize white--text mx-auto"
                  >submit</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 md4 lg4>
            <v-card max-width="600" class>
              <v-card-title class="grey--text text--darken-1 font-weight-medium">Info</v-card-title>

              <v-divider></v-divider>

              <v-card-text class="pb-0">
                Member since:
                <span class="grey--text text--darken-1 font-weight-bold">6 months ago</span>
              </v-card-text>

              <v-card-text class="py-0">
                Successful sales:
                <span class="grey--text text--darken-1 font-weight-bold">1000+</span>
              </v-card-text>

              <v-card-text class="pt-0">
                Country of origin:
                <span class="grey--text text--darken-1 font-weight-bold">Nigeria</span>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 md lg4>
            <v-card>
              <v-card-title class="grey--text text--darken-1">Results</v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <v-list avatar>
                  <v-list-item-group v-model="item" color="deep-orange darken-4">
                    <v-list-item v-for="i in options" :key="i">
                      <v-list-item-avatar>
                        <v-img :src="i.img"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="text-capitalize" v-html="i.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card class="mx-auto my-7" color="grey lighten-3" max-width="400" flat tile height="100%">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">San Francisco</v-list-item-title>

          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">23&deg;C</v-col>

          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>

      <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider>

      <v-list class="transparent">
        <v-list-item v-for="item in forecast" :key="item.day">
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">{{ item.temp }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>Full Report</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>
<style lang="stylus" scoped></style>
<script>
import flickity from "vue-flickity";

export default {
  name: "profile",
  components: { flickity },
  props: ["restaurant", "slides", "options", "sliding", "tags"],
  data() {
    return {
      items: 3,
      rating: 4,
      flickityOptions: {
        contain: true,
        pageDots: false,
        percentPosition: false,
        wrapAround: true,
        freeScroll: true
      },
      labels: ["SU", "MO", "TU", "WED", "TH", "FR", "SA"],
      time: 0,
      forecast: [
        {
          day: "This week",
          icon: "mdi-white-balance-sunny",
          temp: "24\xB0/12\xB0"
        },
        {
          day: "This Month",
          icon: "mdi-white-balance-sunny",
          temp: "22\xB0/14\xB0"
        },
        { day: "This year", icon: "mdi-cloud", temp: "25\xB0/15\xB0" }
      ]
    };
  },
  methods: {
    loadData() {
      this.slides = this.assets[0].items;
      this.show3d = true;
      this.sliding = true;
    },
    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    }
  }
};
</script>