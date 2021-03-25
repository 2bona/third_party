<template>
  <div>
    <v-row class="pa-3 mb-12 px-6">
      <v-flex xs12 class="mb-3 pt-2 px-0">
        <v-layout row wrap>
          <v-btn
            class="mb-12"
            bottom
            fixed
            right
            @click="dialog = !dialog"
            fab
            small
            color="white"
          >
            <v-icon color="grey darken-1">mdi-camera</v-icon>
          </v-btn>

          <v-flex xs4 class="pl-3">
            <h1 class="title text--darken-2 font-weight-bold  mb-3 grey--text">
              Orders ({{orders.length || 0}}) <br/>
              <span
            v-if="dates.length"
            class="font-weight-bold body-1 text-capitalize"
            >({{
              !dates.length
                ? ""
                : dates.length > 1
                ? "" + sorted_dates[0] + " - " + sorted_dates[1]
                : "on " + sorted_dates[0]
            }})</span
          >
            </h1>
          </v-flex>
          <v-flex xs8 style="display: flex;
    justify-content: flex-end;">
             <v-btn 
              text :loading="loadingHist" @click="showCalender()"   >
          <v-icon>mdi-history</v-icon>history
        </v-btn>
            <v-btn
            :loading="orderLoad"
              @click="start()"
               text
              ><v-icon>mdi-reload</v-icon>reload</v-btn
            >
          </v-flex>
        </v-layout>

        <v-card style="border-radius: 25px" class="mt-4 pb-8">
          <v-card-title>
            <v-text-field
              v-model="search"
              dense
              append-icon="mdi-magnify"
              label="Search by order id"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            
            :mobile-breakpoint="30"
            :headers="headers"
            v-model="selected"
            :items="orders"
            @click:row="clicker($event)"
            :expanded.sync="expanded"
            :search="search"
            disable-pagination
            hide-default-footer
          >
              <template v-slot:item.preorder="{ item, index }">
       <countdown 
        v-if="item.preorder_value && item.preorder"
        v-bind:orderPage="true"
        v-bind:minDate_="minDate_"
        v-bind:index="index"
        v-bind:item="item"
        @startCallBack="startCallBack"
        @endCallBack="endCallBack"
        @checktimer="checktimer"
        />    
    <h2 v-else  class="title text-capitalize"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text text--lighten-1'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "> Instant </h2>    
     </template>
            <template v-slot:item.status="{ item }">
              <h2
                class="title text-capitalize"
               :class="setColor(item.status)"
                v-text="
                  item.status === 1
                    ? 'read'
                    : item.status === 2
                    ? 'served'
                    : item.status === 3
                    ? 'in-transit'
                    : item.status === 4
                    ? 'delivered'
                    : item.status === 5
                    ? 'rejected'
                    : 'unread'
                "
              ></h2>
            </template>
            <template v-slot:item.vendor.name="{ item }">
              <h2
                class="title text-capitalize"
               :class="setColor(item.status)"
                >{{ item.vendor.name }}</h2
              >
            </template>
            <template v-slot:item.created_at="{ item }">
              <h2
                class="title text-capitalize"
               :class="setColor(item.status)"
                >{{ item.created_at | nowDate }}</h2
              >
            </template>
            <template v-slot:item.id="{ item }">
              <h2
                class="title text-capitalize d-flex"
               :class="setColor(item.status)"
                ><v-icon
                  v-if="item.status === 3 || item.status === 1"
                  size="8"
                  class=" mr-2"
                  :color="item.status === 3 ? 'green' : 'orange'"
                  >mdi-circle</v-icon
                >{{ item.id }}</h2
              >
            </template>
            <template v-slot:item.payment_method="{ item }">
              <h2
                class=" title text-capitalize"
               :class="setColor(item.status)"
                >{{ paymentMethod(item.payment_method) }}</h2
              >
            </template>
            <template v-slot:item.tracking_id="{ item }">
              <h2
                class=" title text-capitalize"
               :class="setColor(item.status)"
                >{{ item.tracking_id }}</h2
              >
            </template>
            <template v-slot:item.mark_up="{ item }">
            <h2
                class=" title text-capitalize"
               :class="setColor(item.status)"
                ><v-icon 
                size="16" 
                
                class="pb-1"
                       :color="
                  item.status === 1
                    ? 'blue'
                    : item.status === 2
                    ? 'green'
                    : item.status === 3
                    ? 'orange'
                    : item.status === 4
                    ? 'grey'
                    : item.status === 5
                    ? 'red'
                    : ''
                ">mdi-currency-ngn</v-icon>{{ item.mark_up | price }}</h2
              >
            </template>
            <template v-slot:item.grand_total="{ item }">
            <h2
                class=" title text-capitalize"
               :class="setColor(item.status)"
                ><v-icon 
                size="16" 
                
                class="pb-1"
                       :color="
                  item.status === 1
                    ? 'blue'
                    : item.status === 2
                    ? 'green'
                    : item.status === 3
                    ? 'orange'
                    : item.status === 4
                    ? 'grey'
                    : item.status === 5
                    ? 'red'
                    : ''
                ">mdi-currency-ngn</v-icon>{{ item.grand_total | price }}</h2
              >
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">{{ item }}</td>
            </template>
          </v-data-table>
          <v-progress-linear
            color="orange"
            v-show="loading"
            :indeterminate="loading"
          ></v-progress-linear>
        </v-card>
      </v-flex>
    </v-row>
    <div style="position:fixed;width:100%; bottom:49px">
      <v-progress-linear
        color="grey"
        v-show="orderLoad"
        :indeterminate="orderLoad"
      ></v-progress-linear>
    </div>
    <v-dialog
      v-model="dialog"
      :overlay="false"
      max-width="300px"
      max-height="300px"
      transition="dialog-transition"
    >
      <v-card color="grey" height="300px" width="300px">
        <qrcode-stream
          v-if="dialog"
          @init="onInit"
          @decode="onDecode"
        ></qrcode-stream>
      </v-card>
    </v-dialog>
        <v-dialog
      max-width="450"
      style="background:white;"
      background-color="white"
      class="white pa-"
      v-model="calender"
    >
      <v-row
        style="    height: 100%;
    margin: 0!important;
    background: #b7b7b7;"
        class="mx-auto py-3  "
      >
        <v-expand-transition>
          <v-col cols="12" class="d-flex" v-show="calender">
          <keep-alive>
            <v-date-picker
              v-model="dates"
              range
              class="mx-auto"
              color="orange darken-3"
            ></v-date-picker>
          </keep-alive>
          </v-col>
        </v-expand-transition>
        <v-col cols="12" v-if="calender" class="d-flex">
          <v-btn
            @click="calender = false"
            color="grey lighten-3"
            
            rounded
            v-if="dates.length < 1 && calender"
            class="py-3 mx-auto "
            >close</v-btn
          >
          <v-btn
            @click="setDateAndCloseCalender()"
            
            rounded
            v-if="dates.length > 0 && calender"
            class="py-6 mx-auto"
            >Load record <br />
            {{
              sorted_dates.length > 1
                ? "between " + sorted_dates[0] + " & " + sorted_dates[1]
                : "on " + sorted_dates[0]
            }}</v-btn
          >
        </v-col>
      </v-row>
    </v-dialog>
  </div>
</template>
<style></style>
<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";
import { QrcodeStream } from "vue-qrcode-reader";
import countdown from "./countdown"

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});

export default {
  components: {
    QrcodeStream,
    countdown
  },
  data() {
    return {
      dates: [],
      minDate2: new Date(),
      minDate: new Date().toISOString(),
      dialogLoad: false,
      dialog: false,
      calender: false,
      dialog: false,
      orderLoad: false,
      content: "",
      expanded: [],
      loadingHist: false,
      dialog2: false,
      selected: [],
      minDate_: new Date(),
      pageClose: false,
      dialog3: false,
      valid: true,
      deleteId: "",
      intervalId: null,
      search: "",
      headers: [
        {
          text: "S/N",
          align: "left",
          value: "id"
        },
        { text: "Vendor", value: "vendor.name" },
        { text: "", value: "preorder" },
        { text: "When  ", value: "created_at" },
        { text: "stats", value: "status" },
        { text: "Methd", value: "payment_method" },
        { text: "Total", value: "grand_total" },
        { text: "MKU-P", value: "mark_up" }
      ],
      dialog4: false,
      rules: {
        required: value => !!value || "Required."
      },
      radios: "Thank you soo much, we will keep improving"
    };
  },
  computed: {
    orders() {
      return this.$store.getters.getAdminOrderList;
    },
       sorted_dates() {
      return this.dates.sort();
    },
    loading() {
      return this.$store.getters.getVendorLoadStatus;
    },
    vendor() {
      return this.$store.getters.getVendor;
    },
    user() {
      return this.$store.getters.getUser;
    },
    replys() {
      return this.$store.getters.getReplys;
    }
  },
  mounted() {
    const sn = this;
    sn.pageClose = true;
        this.orderLoad = true; 
    if(!sn.orders.length){
        sn.$store.dispatch("setAdminOrderList");
        this.orderLoad = false; 
    }else{
        this.orderLoad = false; 

    }
  },
  methods: {
        setDateAndCloseCalender() {
      this.calender = false;
      this.loadOrders();
    },
      loadOrders() {
      const sn = this;
      sn.orderLoad = true
      sn.loadingHist = true
        const when_date =
          this.sorted_dates.length > 1
              ? "?type=range&from=" +
                this.sorted_dates[0] +
                "&to=" +
                this.sorted_dates[1]
              : "?type=single&on=" + this.sorted_dates[0]
          var url = "/order/adminorderlist"+when_date
    http({
      url: url,
        method: 'get'
      })
      .then( (response) =>{
        sn.orderLoad = false
        sn.loadingHist = false
        this.$store.dispatch("setAdminDatedOrderList", response.data.orders)
      }).catch((err)=>{
        sn.orderLoad = false
        sn.loadingHist = false
        console.log(err)
          sn.$store.dispatch("snack", {
            color: "green",
            text: "An error occured. Error : "+err
          });
      })
    },
    reload(){
        this.dates = []
      this.orderLoad = true
          var url = "/order/adminorderlist?type=single&on=" + new Date().toISOString()
    http({
      url: url,
        method: 'get'
      })
      .then( (response) => {
      this.orderLoad = false
        this.$store.dispatch("setAdminDatedOrderList", response.data.orders)
      })
    },
    setColor(x){
      return  x === 1
                    ? 'blue--text'
                    : x === 2
                    ? 'green--text'
                    : x === 3
                    ? 'orange--text'
                    : x === 4
                    ? 'grey--text'
                    : x === 5
                    ? 'red--text'
                    : ''
    },
        showCalender() {
      this.dates = []
      this.calender = true;
    },

       paymentMethod(x) {
      let d = "";
      if (x === 1) {
        d = "App Paid";
      } else if (x === 2) {
        d = "Transfer";
      } else if (x === 4) {
        d = "Over the counter or use P.O.S";
      } else if (x === 6) {
        d = "App Paid";
      } else if (x === 3) {
          d = "Cash";
        }
      return d;
    },
      startCallBack: function(x) {
      console.log(x);
      this
    },
    endCallBack: function(x) {
      console.log(x);
    },
     checktimer(x, y) {
      return !x && !y;
    },
    start() {
      const sn = this;
     sn.reload()
    },
    navb() {
        if(!this.orders.length){
     sn.reload()
        }
    },
    clicker(e) {
    console.log(e)
    OrderSound.stop()
        if (!this.orderLoad) {
            this.orderLoad = true; 
            if (this.user.vendor_id !== e.vendor.id) {
      
    axios.post('/auth_user2', {
        vendor_id: e.vendor.id
    })
    .then(res => {
        this.orderLoad = false; 
        var t = res.data.success.user
        t.vendor_id = e.vendor.id
        this.$store.dispatch("setUser", t);
        this.$store.dispatch("setToken", res.data.success.token);
        this.b(e)
        }).catch((err)=>{
              this.$store.dispatch("snack", {
            color: "green",
            text: "An error occured. Error : "+err
          });
              this.b(e)
        })
            }else{
              this.b(e)
            }
  
    }
    },
    b(e){
          this.$store.dispatch("order", {
              id: e.id,
          action: null
        });
      
    this.orderLoad = false;
    }
  }
};
</script>
