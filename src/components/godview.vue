<template>
  <div style="    margin: auto;
    max-width: ;">
    <v-row class="pa-3 mb-12 px-5">
      <v-flex xs12 class="my-3 px-0">
        <h1
          style="    text-shadow: -3px 3px 5px #d8d8d8;position:fixed; z-index:1;
"
          class=" title text-uppercase mb-4 font-weight-black  grey--text"
        >
               <v-avatar
              class="mr-0 mb-1 elevation-9"
              size="25"
              color="orange darken-4"
            >
              <v-img
                :lazy-src="
                  'https://res.cloudinary.com/dnqw7x4bp/image/upload/c_scale,w_5/v1582290476/e_dey_e_only_2.png'
                "
                src="https://res.cloudinary.com/dnqw7x4bp/image/upload/c_scale,w_80/v1582290476/e_dey_e_only_2.png"
              ></v-img>
            </v-avatar>
          Admin vendor dashboard ({{users.length}})
        </h1>
        <v-btn absolute right @click="flushCache" color="red">flush cache</v-btn>
        <v-fade-transition>

       
        <v-card
        v-if="defer(2)"
          min-height="80vh"
          style="    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff !important;border-radius: 25px; top: 48px; z-index:2;    margin-bottom: 180px;"
          class="elevation-2 pt-1 pb-8"
        ><div class="px-5 my-5">

              <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        </div>
          <v-data-table
            :mobile-breakpoint="30"
            :headers="headers"
            v-model="selected"
            :items="users"
            dense
            :expanded.sync="expanded"
            :no-data-text="users.length ? 'The end' : ''"
            :search="search"
            item-key="tracking_id"
            disable-pagination
            hide-default-footer
          >
           <template v-slot:item.updated_at="{ item }">
              <!-- <v-btn disabled color="red" @click="del(item.user.id)" icon>

              <v-icon>mdi-trash-can</v-icon>
              </v-btn>
              <v-btn  disabled color="red" @click="wallet(item.user.id)" icon>

              <v-icon>mdi-wallet</v-icon>
              </v-btn> -->
              <v-btn  color="blue" @click="clearOrders(item.id)" icon>
              <v-icon>mdi-cart-off</v-icon>
              </v-btn>
              <v-btn  color="blue" @click="getLastOrder(item.id)" icon>
              <v-icon>mdi-cart</v-icon>
              </v-btn>
              <v-btn  color="blue" @click="auth(item.user.phone)" icon>
              <v-icon>mdi-login</v-icon>
              </v-btn>
           </template>
           <template v-slot:item.orders_count="{ item }">{{item.orders_count | price}}
           </template>
           <template v-slot:item.orders_sum="{ item }">
              <v-icon size="12">mdi-currency-ngn</v-icon>{{item.orders_sum | price}}
           </template>
           <template v-slot:item.created_at="{ item }">
              {{item.created_at | myDate}}
           </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">{{ item }}</td>
            </template>
          </v-data-table>
          <div 
            v-if="loading"
          style="
    height: 30vh;
    display: flex;
    justify-content: space-around;
">
          <v-progress-circular
            color="grey lighten-1"
            class="ma-auto"
            size="80"
            width="15"
            indeterminate
          ></v-progress-circular>
            
          </div>
        </v-card>
         </v-fade-transition>
      </v-flex>
    </v-row>
    <!-- <div style="position:fixed;width:100%; bottom:49px">
     <v-progress-linear color="grey" v-show="orderLoad" :indeterminate="orderLoad"></v-progress-linear>

</div> -->
     
         <div
          
          style="     position: fixed;
    margin: auto;
    bottom: 45px;
    width: 100%;
    z-index: 10;
    max-width: 1090px;">

    <v-scale-transition origin="center center">
      <v-btn
        absolute
        to="/"
        bottom
       v-if="defer(3)"
        right
        fab
        color="white"
        class="elevation-24"
        style="background: linear-gradient(315deg, #ffffff, #e6e6e6);z-index:10;margin-bottom: 60px;"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-scale-transition>
             </div>

    <v-dialog v-model="delDialog" max-width="290">
      <v-card :loading="delLoader">
        <v-card-title class="title red--text">Delete user from System</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey lighten-1" text @click="delDialog = false">
            cancel
          </v-btn>

          <v-btn color="red darken-1" text @click="deluser()">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
         <v-overlay
                  
                  opacity="0.3"
                  z-index="999"
                  :value="loadingNow"
                >
                    <v-progress-circular
            color=""
            class="ma-auto"
            size="80"
            width="15"
            indeterminate
          ></v-progress-circular>
                </v-overlay>
  </div>
</template>
<style>
.v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
    font-size: 16px!important;
    text-transform: uppercase;
}
.v-data-table-header th.sortable:first-child{
      padding: 0px 0px 0px 14px!important;
}
.v-data-table-header th.sortable{
      padding: 0 5px!important;
}
.v-data-table-header{
      position: sticky;
      top: 0;
}
</style>
<script>
import axios from "axios";

import Defer from "../mixins/Defer.js";


export default {
  mixins: [Defer()],
  data() {
    return {
      dialog: false,
      orderLoad: false,
      content: "",
      expanded: [],
      loadingNow: false,
      dialog2: false,
      selected: [],
      loading: true,
      delLoader: false,
      dialog3: false,
      btn: false,
      pageClose: false,
      valid: true,
      delDialog: false,
      clickedId: "",
      listener: "",
      search: "",
      headers: [
        { align: "left", text: "Name", value: "name" },
        { align: "center", text: "Phone", value: "phone" },
        { align: "center", text: "Wallet", value: "orders_sum" },
        // { text: 'When  ', value: 'created_at' },
        { align: "right", text: "Orders", value: "orders_count" },
        { align: "right", text: "Joined", value: "created_at" },
        { align: "right", text: "", value: "updated_at" }
      ],
      dialog4: false,
      rules: {
        required: value => !!value || "Required."
      }, 
      radios: "Thank you soo much, we will keep improving"
    };
  },
   computed: {
    users() {
      return this.$store.getters.getVendorList;
    },
  },
  destroyed(){
    // this.listener.remove();
  },
  mounted() {
    // App.removeAllListeners();
    // this.listener = App.addListener("backButton", () => {
    //     this.$router.go(-1);
    //     return;
    // });
    const sn = this;
        sn.navb();
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    },
    clearOrders(x){
      this.loadingNow = true
        axios.get('/vendor/clear_order?id='+x).then((res)=>{
          this.loadingNow = false
           this.$store
          .dispatch("setVendorList", [])
          this.navb()
        })
    },
    getLastOrder(x){
      this.loadingNow = true
        axios.get('/vendor/last_order?id='+x).then((res)=>{
          this.loadingNow = false
           this.$store
          .dispatch("order", {
            id: res.data.order,
            action: null
          })
        })
    },
    flushCache(){
      this.loadingNow = true
        // this.delDialog = true
        axios.get('/flushCache').then(()=>{

          this.loadingNow = false
        })
    },
    auth(x){
      this.loadingNow = true
      // this.delDialog = true
        axios.post('/auth_user', {
          phone: x
        })
        .then(res => {
      this.loadingNow = false
            this.$store.dispatch("setUser", res.data.success.user);
            this.$store.dispatch("setToken", res.data.success.token);
            this.navb()
            this.$store.dispatch("snack", {
                color: "red",
              text: "Now Logged in as "+ res.data.success.user.first_name
            });
this.$store.dispatch("loadVendor")
this.$store.dispatch("loadTags");
        })
        .catch(()=>{
        this.delDialog = false
            this.loadingNow = false
            this.delLoader = false
            alert('Something went wrong')
        })
    },
    wallet(x){
      this.loadingNow = false
        // this.delDialog = true
        this.clickedId = x
        this.emptywallet()
    },
    del(x){
      // this.delDialog = true
        this.clickedId = x
        this.deluser()
    },
    emptywallet(){
        this.delLoader = true
        axios.post('/empty_wallet', {
            id: this.clickedId
        })
        .then(res => {
            this.delDialog = false
            this.delLoader = false
            this.navb()
        })
        .catch(()=>{
        this.delDialog = false
            this.delLoader = false
            alert('Something went wrong')

        })
    },
    deluser(){
        this.delLoader = true
        axios.post('/del_user', {
            id: this.clickedId
        })
        .then(res => {
            this.delDialog = false
            this.delLoader = false
            this.navb()
        })
        .catch(()=>{
        this.delDialog = false
            this.delLoader = false
            alert('Something went wrong')

        })
    },
    navb() {
        this.loading = true
        if (this.users.length) {
          this.loading = false
        }else{
      axios
        .get("/get_vendors")
        .then(res => {
          this.$store.dispatch('setVendorList', res.data.users);
          this.loading = false
        })
        }
    },
    clicker(e) {
      if (this.orderLoad) {
        return;
      } else {
        this.orderLoad = true;
      }
    }
  }
};
</script>
