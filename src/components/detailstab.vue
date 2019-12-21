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