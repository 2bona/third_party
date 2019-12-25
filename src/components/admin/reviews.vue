<template>
<div>
<v-row justify="space-start" class="pa-3 px-6">
<v-flex xs12 class="my-5"> 

        <v-card class=" pb-3"  :loading="load">
         <v-card-title class="body-1 font-weight-medium grey--text">
           Delivery agents
         </v-card-title>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-right"></th>
          <th class="text-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in agents" :key="n">
          <td class="caption ">{{n.name}}</td>
          <td class="text-right"><a style="text-decoration:none" :href="'tel:'+n.phone"><v-btn fab dark  x-small color="primary"><v-icon>mdi-phone</v-icon> </v-btn></a></td>
          <td class="text-right"><a style="text-decoration:none" :href="'https://wa.me/+234'+n.phone.substring(1)+'?text=Hello,%20this%20is%20'+vendor.name+'%20,%20I%20just%20want%20to%20confirm%20your%20location%20for%20a%20food%20delivery.'" target="_blank">
          <v-btn fab dark x-small color="green">
            <v-icon>mdi-whatsapp</v-icon>
             </v-btn>
             </a>
             </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
       </v-card>
       <v-card class=" my-3" :loading="load">
         <v-card-title class="body-1 font-weight-medium grey--text">
           Reasons for cancellation  <v-btn class="ml-3" @click="dialog= true"  x-small color="">add</v-btn>
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
        <tr v-for="n in replys" :key="n">
          <td class="caption ">{{n.content}}</td>
          <td><v-btn @click="editBtn(n.content, n.id)"   x-small color="">edit</v-btn></td>
          <td><v-btn @click="deleteBtn(n.id)"  x-small color="">delete</v-btn></td>
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
                            style="position: relative;top: -7px;"
                            background-color="grey lighten-2"
                            v-model="rating"
                          ></v-rating>
                        </v-flex>
                        <v-list-item-subtitle
                        style="line-height:1.3;"
                          class="text-wrap px-1 caption grey--text text--darken-1"
                        >This was the best Rice i have ever ate This was the best
                         Rice i e best Rice.</v-list-item-subtitle>
    
                      </v-list-item-content>

                      <v-list-item-icon-text></v-list-item-icon-text>
                    </v-list-item>

                    <v-divider></v-divider>
                  </v-list>
                       </div>
     </v-flex>
    <v-flex xs12 class="my-3 px-0">
        
        <v-card flat tile color="transparent">
        
    <v-container fluid>

        <v-row justify="space-between">
      
          <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title>
          Add message
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
               <v-text-field
        v-model="reply"
        :rules="[rules.required]"
        label="Type here">
        </v-text-field> 
          </v-form>
           
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
           color="primary"
            class="px-3 font-weight-bold caption"
            rounded text
            dark :loading="loading"
            @click="saveReply()">
            submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
       <v-dialog
      v-model="dialog3"
      width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Delete message
        </v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="grey" text
            class="px-3 font-weight-bold caption"
            rounded
            dark
            @click="dialog3 = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="primary"
            class="px-3 font-weight-bold caption"
            rounded text
            dark
            :loading="loading3"
            @click="deleteReply()"
          >
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog2"
      width="500"
    >
  

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Edit message </v-card-title>

        <v-card-text>
          <v-form ref="form2">
           <v-text-field
  :rules="[rules.required]"
    label="Type here"
    v-model="replyEdit"
          ></v-text-field>   
          </v-form>
           </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn 
          color="primary"
            class="px-3 font-weight-bold caption"
            rounded
            dark text
            :loading="loading2"
            @click="editReply"
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
      content: '',
      load: false,
      loading: false,
      loading2: false,
      loading3: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      valid: true,
      deleteId: '',
      reply: '',
      replyEdit: '',
      replyEditId: '',
      replyDeleteId: '',
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
  replys() {
      return this.$store.getters.getReplys;
    },
  agents() {
      return this.$store.getters.getAgents;
    },
  },
  mounted(){
    this.navb()
    this.getAgents()
  },
   methods: {
    saveReply(){
       const sn = this
  if (sn.$refs.form.validate()){
      sn.loading = true
     let url = "/reply/save"
      http({
      url: url,
      method: 'post',
      params: {
        content: sn.reply,
        type: 'reply'
      }
    })
      .then((response) => {
        sn.navb()
        sn.dialog = false
        sn.loading = false
      })
      .catch(function (error) {
        sn.dialog = false
        sn.loading = false
        console.log(error)
      })
  } else{
    return
  }
    },
    editBtn(x, y){
      const sn = this
      sn.replyEdit = x 
      sn.replyEditId = y
      sn.dialog2 = true
    },
    deleteBtn(x){
      const sn = this
      sn.replyDeleteId = x 
      sn.dialog3 = true
    },
    editReply(){
       const sn = this
  if (sn.$refs.form2.validate()){
      sn.loading2 = true
     let url = "/reply/edit"
      http({
      url: url,
      method: 'post',
      params: {
        content: sn.replyEdit,
        type: 'reply',
        id: sn.replyEditId
      }
    })
      .then((response) => {
        sn.navb()
        sn.dialog2 = false
        sn.loading2 = false
      })
      .catch(function (error) {
        sn.dialog2 = false
        sn.loading2 = false
        console.log(error)
      })
  } else{
    return
  }
    },
    deleteReply(){
       const sn = this
      sn.loading3 = true
     let url = "/reply/delete"
      http({
      url: url,
      method: 'get',
      params: {
        id: sn.replyDeleteId
      }
    })
      .then((response) => {
        sn.navb()
        sn.dialog3 = false
        sn.loading3 = false
      })
      .catch(function (error) {
        sn.dialog3 = false
        sn.loading3 = false
        console.log(error)
      })
 
    },
    navb(){
      const sn = this
      sn.load = true
     let url = "/reply/all"
      http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        sn.load = false
        sn.$store.dispatch('setReplys', {
          replys: response.data.replys
      })
      })
      .catch(function (error) {
        sn.load = false
        console.log(error)
      })
    },
    getAgents(){
      const sn = this
      sn.load = true
     let url = "/delivery/agents"
      http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        sn.load = false
        sn.$store.dispatch('setAgents', {
          agents: response.data.agents
      })
      })
      .catch(function (error) {
        sn.load = false
        console.log(error)
      })
    },
  },
  
};
</script>