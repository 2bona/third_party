<template>
  <div>
    <v-app-bar
      style="background: linear-gradient(to bottom, #000000b8 0%,#0d0d0d6e 50%, rgba(0, 0, 0, 0) 100%);"
      dark
      color="transparent"
      fixed
      flat
    >
      <v-btn @click="back()" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <div class="flex-grow-1"></div>
      <v-btn to="/cart" icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <div>
      <v-carousel
        :continuous="false"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="300"
      >
        <v-carousel-item v-for="i in 3" :key="i">
          <v-parallax
            height="300"
            src="https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          ></v-parallax>
        </v-carousel-item>
      </v-carousel>
      <v-card-text class="pb-1 pt-0" style=" position: relative">
        <!-- <v-btn absolute dark fab top right color="white">
          <v-icon color="red darken-2">mdi-heart</v-icon>
        </v-btn> -->
<v-row justify="space-around">
               
                  <v-flex xs6>
                <v-btn  block depressed  tile  class="mx-auto">
                  <v-icon color="grey">mdi-share-variant</v-icon>
                  </v-btn>
                  </v-flex>
                  <v-flex xs6>
                <v-btn  block depressed  tile  class="mx-auto"><v-icon color="grey">mdi-heart-outline</v-icon></v-btn>
                  </v-flex>
                </v-row>
        <v-card-title
          class="pa-0 title grey--text text--darken-3 pt-3 ma-0 font-weight-medium"
        >Egusi Soup with round-about and shaki</v-card-title>
        <v-layout row wrap class="px-3">
          <v-flex class="grey--text">
            by
            <v-chip
              to="/vendor"
              small
              color="grey lighten-2"
              class="grey--text text--darken-1"
            >Mummy's Pot</v-chip>
          </v-flex>
          <div class="flex-grow-1"></div>
          <v-flex>
            <p class="subtitle-1 text-right grey--text text--darken-2 font-weight-medium">
              N1,200.00
              <span class="caption grey--text"></span>
            </p>
          </v-flex>
        </v-layout>
      </v-card-text>
     
                   <span class="d-flex justify-center mb-3 mt-0">
             

          <v-btn fab class="elevation-2" color="white" small >
              <v-icon color="orange"  style="font-size:11px">fas fa-minus fa-1x</v-icon>
          </v-btn>
          <span class="title mx-2 grey--text text--darken-1 font-weight-medium" style="line-height:2;">20</span>
            <v-btn fab class="elevation-2" color="white" small >
              <v-icon color="orange" style="font-size:11px">fas fa-plus</v-icon>
          </v-btn>
          </span>
                   <span class="d-flex justify-center mb-8 mt-0">
             

          <v-btn rounded dark color="orange"  >
              add to cart
          </v-btn>
         
          </span>
        
      <v-tabs background-color=" darken-1" color="orange" grow mobile-break-point="90">
        <v-tab class="font-weight-bold  ">Details</v-tab>
        <v-tab class="font-weight-bold  ">Reviews (30)</v-tab>

        <v-tab-item>
          <v-card flat tile  color="transparent">
            <v-flex xs12 sm12 md5 lg5 class="mb-3">
              <v-card flat max-width="" class color="grey lighten-4" height>
                <v-card-text>
                  <p class="overline  font-weight-bold">basic info</p>

                <v-row justify="space-around">
                  <v-flex xs3>
                <p class="text-center mb-1 white--text"><v-icon  color="blue darken-3">mdi-clock</v-icon></p>
<p class="text-center  caption">8am-5pm</p>
                  </v-flex>
                  <v-flex xs3>
                <p class="text-center mb-1"><v-icon color="green">mdi-crosshairs-gps</v-icon></p>
<p class="text-center caption">34km</p>
                  </v-flex>
                  <v-flex xs3>
                <p class="text-center mb-1"><v-icon color="deep-orange darken-3">mdi-moped</v-icon></p>
<p class="text-center caption">Delivery</p>
                  </v-flex>
                  <v-flex xs3>
                <p class="text-center mb-1"><v-icon color="orange">mdi-check-decagram</v-icon></p>
<p class="text-center caption">verified</p>
                  </v-flex>
                </v-row>

                  <p></p>

                  <v-divider class="red--text"></v-divider>
                  <p class="overline mt-3 font-weight-bold">description</p>

                  <p
                    class="font-weight-medium  text-capitalize"
                  >Lorem ipsum dolor sit amet consect
                  etur adipisicing elit. Eos aliquam facili
                  s.</p>

                  <p></p>

                  <v-divider class="red--text"></v-divider>

                  <p class="overline mt-3  font-weight-bold">Extras</p>

    <v-chip-group multiple column active-class="grey" class="mb-2">
                    <v-chip
                      color="white"
                      small
                      class="text-capitalize elevation-2 font-weight-bold  white--text"
                      v-for="n in ['kpomo', 'okporoko', 'snail', 'serviette', 'truffles', 'edible spoon']"
                      :key="n"
                      :value="n"
                    >{{ n }}</v-chip>

 
                  </v-chip-group>
                  <v-divider></v-divider>

                  <p class="overline mt-3  font-weight-bold">tags</p>

                  <v-chip-group multiple column active-class="grey" class="mb-2">
                    <v-chip
                      color="white"
                      small
                      class="text-capitalize elevation-2 font-weight-bold  "
                      v-for="n in ['egusi', 'soup', 'local', 'igbo']"
                      :key="n"
                      :value="n"
                    >{{ n }}</v-chip>

 
                  </v-chip-group>

                  <p></p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-flex xs12 sm12 md7 lg7 class="mb-0">
            <v-card class flat tile  height>
              <v-card-text class="pt-4 px-1">
                <!-- <v-textarea
                  class="mx-2 mt-4"
                  style="max-width:400px"
                  solo
                  single-line
                  rounded
                  outline
                  rows="2"
                  label="Write your review here"
                ></v-textarea>

                <v-rating
                  
                  :value="5"
                  dense
                  size="25"
                  background-color="grey"
                  hover
                  class="text-center texti mb-3"
                ></v-rating>

                <div class="text-center mb-3">
                  <v-btn
                    
                    rounded
                    elevation="5"
                    color="deep-orange"
                    class="font-weight-black text-capitalize white--text mx-auto"
                  >submit</v-btn>
                </div>-->

                <v-card flat tile style="">
                  <v-menu  v-model="menu" :close-on-content-click="false" :nudge-width="300" offset-x>
        <template v-slot:activator="{ on }">
          <v-btn absolute right class="caption font-weight-bold grey--text text--darken-1" color="white" v-on="on">filter
            <v-icon small>mdi-filter-variant</v-icon>
          </v-btn>
        </template>

        <v-card class="">
          <div class="pa-2 grey--text">Filter reviews by</div>
          <v-divider></v-divider>
          <v-list>
            <v-list-item >
                 <v-list-item-title>
                Ratings
                <span class="caption"><v-icon>mdi-sort-ascending</v-icon></span>
              </v-list-item-title>
              <v-list-item-action>
                <v-switch v-model="ratinglow" color="orange"></v-switch>
              </v-list-item-action>
             
            </v-list-item>
            <v-list-item >
             
              <v-list-item-title>
                Ratings
                <span class="caption"><v-icon>mdi-sort-descending</v-icon></span>
              </v-list-item-title> <v-list-item-action>
                <v-switch v-model="ratinghigh" color="orange"></v-switch>
              </v-list-item-action>
            </v-list-item>
            <v-list-item >
             
              <v-list-item-title>
                Date
                    <span class="caption"><v-icon>mdi-sort-ascending</v-icon></span>
              </v-list-item-title> <v-list-item-action>
                <v-switch v-model="ratinghigh" color="orange"></v-switch>
              </v-list-item-action>
            </v-list-item>
            <v-list-item >
             
              <v-list-item-title>
                Date
                    <span class="caption"><v-icon>mdi-sort-descending</v-icon></span>
              </v-list-item-title> <v-list-item-action>
                <v-switch v-model="ratinghigh" color="orange"></v-switch>
              </v-list-item-action>
            </v-list-item>
       
          </v-list>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn text class=""  @click="menu = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <div class="pt-9 mt-2">

 
                  <v-list class="py-0 my-0" two-line v-for="n in 5" :key="n">
                    <v-list-item>
                      <v-list-item-avatar style="position: relative;

top: -15px;" class="mt-0 mr-2" size="26">
                        <v-img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-flex d-flex align-center class="pl-1">
                          <div class="font-weight-bold caption pt-1 text-capitalize">
                            emeka okolo
                            <br />
                            <p class="overline mb-0 grey--text text--darken-2">20th Mar. 2019</p>
                          </div>

                          <div class="flex-grow-1"></div>

                          <v-rating
                            size="15"
                            dense
                            :value="3"
                            color="orange"
                            style="position: relative;

top: -7px;"
                            background-color="grey lighten-2"
                            v-model="rating"
                          ></v-rating>
                        </v-flex>
                        <v-list-item-subtitle
                        style="line-height:1.3;"
                          class="text-wrap px-1 caption grey--text text--darken-1"
                        >This was the best Rice i have ever ate This was the best
                         Rice i e best Rice i have ever ahave ever ate n, i 
                          loved it and still do.</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-icon-text></v-list-item-icon-text>
                    </v-list-item>

                    <v-divider></v-divider>
                  </v-list>
                       </div>
                </v-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-tab-item>
      </v-tabs>
    </div>
    
  </div>
</template>

<style></style>
<script>
export default {
  methods: {
    back() {
      this.$router.go("-1");
    }
  },
  data() {
    return {};
  }
};
</script>