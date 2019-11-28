<template>
<v-container>

        

        
   <v-flex xs12 sm12 md7 lg7 class="mb-0">
            <v-card class flat tile  height>
              <v-card-text class="pt-4 px-1">
              

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
                            <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header><span><v-icon>mdi-message-reply-text</v-icon></span></v-expansion-panel-header>
      <v-expansion-panel-content>
   <v-textarea
                  class="mx-2 mt-4"
                  style="max-width:400px"
                  solo
                  single-line
                  rounded
                  outline
                  rows="5"
                  label="Write your reply here"
                ></v-textarea>

                <div class="text-center mb-3">
                  <v-btn
                    
                    rounded
                    elevation="5"
                    color="deep-orange"
                    class="font-weight-black text-capitalize white--text mx-auto"
                  >Reply</v-btn>
                </div>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
                         
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
</v-container>
</template>