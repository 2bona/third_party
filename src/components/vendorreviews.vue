<template>
<v-card color="transparent" flat tile>
    <v-card color="transparent" class="mx-2 px-2 my-2 py-3">
         <p>Type: <span class="font-weight-bold">Batch</span></p>
    <p>Time of order: <span class="font-weight-bold">12:03am</span></p>
    <p>Distance from your restaurant: <span class="font-weight-bold">12km</span></p>
       
    </v-card>
       <v-flex class="my-2" xs12 v-for="n in 3" :key="n">
          <v-card
            width="95%"
            height="auto"
            max-height
            min-height
            
            
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 "
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/item">
                <v-list-item-avatar
                  size="50"
                  tile
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="" class="py-0">
                <v-layout>
                  <v-flex xs11>
                      <h2
                        style="text-decoration: none;"
                        class="body-1 text-capitalize black--text text-wrap text--darken-3 font-weight-regular"
                      >Egusi soup with kpomo and shaki </h2>
                  </v-flex>
                </v-layout>
              </v-list-item-title>
             <span class="display-2 font-weight-black pr-2">19</span>
            </v-list-item>
          
          </v-card>
                     </v-flex>
    <v-row justify="space-around">
        <v-btn color="success">Serve</v-btn>
        <v-btn color="red">Reject</v-btn>
    </v-row>

</v-card>
</template>