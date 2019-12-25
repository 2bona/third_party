<template>
    

<v-app-bar bottom dense color="white" fixed short elevate-on-scroll>
      <!-- <div class="flex-grow-1">2</div> -->

      <v-btn to="/vendoradmin/items" icon class="mx-auto">
        <v-icon>mdi-food</v-icon>
      </v-btn>

      <v-btn to="/vendoradmin/orders" icon class="mx-auto">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn to="/vendoradmin/summary" icon class="mx-auto">
        <v-icon>mdi-poll</v-icon>
      </v-btn>
      <v-btn to="/vendoradmin/reviews" icon class="mx-auto">
        <v-icon>mdi-message-reply</v-icon>
      </v-btn>
      <v-btn to="/vendoradmin/adminedit" icon class="mx-auto">
        <v-icon>mdi-account</v-icon>
      </v-btn>
     
    
     
    </v-app-bar>
    </template>