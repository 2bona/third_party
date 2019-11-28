<template>
<div>
<v-row justify="space-start" class="pa-3 px-6">
<v-flex xs12 class="my-5"> 
       <v-card>
         <v-card-title class="title font-weight-bold grey--text">
           Saved Replys <v-btn class="ml-3" @click="dialog3 = true"  x-small color="">add</v-btn>
         </v-card-title>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Messages</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 3" :key="n">
          <td class="caption">Thank you for patronizing us</td>
          <td><v-btn @click="dialog3 = true"   x-small color="">edit</v-btn></td>
          <td><v-btn @click="dialog4 = true"  x-small color="">delete</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
       </v-card>
     </v-flex>
     <v-flex xs12 class="mt-5 mb-4 px-0">
        <h1 class="title mb-5 font-weight-bold grey--text">Reviews</h1>
          
       <div class="mt-2" style="max-height:70vh; overflow:auto">
          <v-list class="py-0 my-0" two-line v-for="n in 6" :key="n">
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
      <v-expansion-panel-content class="px-1">
        <v-flex d-flex>
          <span style="line-height: 1;">
            Select Reply  
            </span> 
          
           <v-btn color="blue" @click="dialog=!dialog"  text x-small>add more</v-btn>

        </v-flex>
         <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="Thank you for your kind comments" value="Thank you for your kind comments"></v-radio>
      <v-radio label="I'm sorry for the inconviniences" value="I'm sorry for the inconviniences"></v-radio>
    </v-radio-group>
   <v-textarea
                  class="mx-2 mt-4"
                  style="max-width:400px"
                  solo
                  single-line
                  rounded
                  outline
                  rows="3"
                  :value="radios"
                ></v-textarea>

                <div class="text-center mb-3">
                  <v-btn
                    dark
                    rounded
                    elevation="5"
                    color="orange"
                    class=" mx-auto"
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
     </v-flex>
                  <v-row class="mt-0 mb-12" justify="space-around">
            <v-btn fab color="white"><v-icon>mdi-chevron-left</v-icon></v-btn>
            <v-btn to="/vendorreviews" fab color="white"><v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
    <v-flex xs12 class="my-3 px-0">
        
        <v-card flat tile color="transparent">
        
    <v-container fluid>

        <v-row justify="space-between">
      
          <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
  

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Add Reply
        </v-card-title>

        <v-card-text>
  <v-textarea

    label="Add new reply message"
          ></v-textarea>       
           </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="orange"
            class="px-3"
            rounded
            dark
            @click="dialog=false"
          >
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
       <v-dialog
      v-model="dialog2"
      width="500"
      :persistent="LoadStatus == 1"
    >
  

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Add Category
        </v-card-title>

        <v-card-text>
    <v-form ref="form" v-model="valid">
  <v-text-field
  v-model="content"
  :rules="[rules.required]"
    label="Add new category"
          ></v-text-field>
    </v-form>       
           </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="orange"
            class="px-3"
            rounded
            dark
            :loading="LoadStatus == 1"
            @click="addCategory()"
          >
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog3"
      width="500"
    >
  

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit section        </v-card-title>

        <v-card-text>
          <v-form>
           <v-text-field
  :rules="[rules.required]"
    label="Edit section"
          ></v-text-field>   
          </v-form>
       
           </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="orange"
            class="px-3"
            rounded
            dark
            @click="dialog3=false"
          >
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
        </v-row>
  </v-container>
        </v-card>
        
    </v-flex>
</v-row>
</div>
</template>
<style>

</style>
<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})

export default {
  data() {
    return {
      dialog: false,
      content: '',
      dialog2: false,
      dialog3: false,
      valid: true,
      deleteId: '',
      dialog4: false,
        rules: {
        required: value => !!value || "Required.",
        },
              radios: 'Thank you soo much, we will keep improving',

    }
  },
  computed: {
  vendor() {
      return this.$store.getters.getVendor;
    },
  user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    
  },
  
};
</script>