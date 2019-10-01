<template>
  <v-card tile elevation="20" style="overflow-y:hidden" height="100vh" width="100vw">
    <iframe
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJU-eUi72CQxARU0e9iuuRI88&key=AIzaSyAxr9nMrLhiCl-smUP-tmuclQ_i7n3DmI0"
      allowfullscreen
    ></iframe>

    <v-card
      style="position: absolute;z-index: 99;
bottom: 0;"
      absolute
      height="180px"
      width="100%"
      color="white"
    >
    <v-row justify="space-around">
        <v-col class="pb-0 mb-0">
            <p class="grey--text text--darken-1 text-center mb-2 text-uppercase font-weight-bold title">Tracking Order</p>
            <p class="text-center mb-1  grey--text text--darken-1 caption text-uppercase">invoice: 2do9pis</p>
            <p class="text-center grey--text mb-1 font-weight-regular body-2">Arriving in: 9 mins</p>
        </v-col>

    </v-row>
    <v-row class="pt-0" justify="space-around">
     
      
      <v-flex xs6>
                    <v-btn to="/cart" small block color="orange" class="caption font-weight-black"  dark rounded>order details</v-btn>

        </v-flex>  
    </v-row>
    <v-row justify="space-around">
           <v-flex xs9  class="text-center pt-1">
                    <v-btn  right icon class="mr-2" rounded color="success"><v-icon>mdi-whatsapp</v-icon></v-btn>

      
                    <v-btn icon  rounded color="info"><v-icon>mdi-phone</v-icon></v-btn>

        </v-flex>
  </v-row>
    </v-card>
  </v-card>
</template>