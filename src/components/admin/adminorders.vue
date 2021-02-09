<template>
  <div>
    <v-row class="pa-3 mb-12 px-6">
      <v-flex xs12 class="mb-3 px-0">
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

          <v-flex xs6 class="pl-3">
            <h1 class="title text--darken-2  mb-3 grey--text">
              Orders
            </h1>
          </v-flex>
          <v-flex xs6>
            <v-btn
              absolute
              @click="start()"
              depressed
              icon
              right
              dark
              style="top:8px"
              fab
              small
              class="mb-2"
              ><v-icon color="grey">mdi-reload</v-icon></v-btn
            >
          </v-flex>
        </v-layout>

        <v-card style="border-radius: 25px" class="pb-8">
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
            <template v-slot:item.status="{ item }">
              <span
                class="overline"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
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
              ></span>
            </template>
            <template v-slot:item.created_at="{ item }">
              <span
                class="overline"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                >{{ item.created_at | nowDate }}</span
              >
            </template>
            <template v-slot:item.id="{ item }">
              <span
                class="overline d-flex"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                ><v-icon
                  v-if="item.status === 3 || item.status === 1"
                  size="8"
                  class=" mr-2"
                  :color="item.status === 3 ? 'green' : 'orange'"
                  >mdi-circle</v-icon
                >{{ item.id }}</span
              >
            </template>
            <template v-slot:item.tracking_id="{ item }">
              <span
                class=" overline"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                >{{ item.tracking_id }}</span
              >
            </template>
            <template v-slot:item.payment_method="{ item }">
              <v-icon
                size="16"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                v-if="item.payment_method === 6"
                >mdi-wallet-outline
              </v-icon>
              <v-icon
                size="16"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                v-if="item.payment_method === 1"
                >mdi-credit-card-outline
              </v-icon>
              <v-icon
                size="16"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                v-if="item.payment_method === 2"
                >mdi-cellphone-wireless
              </v-icon>
              <v-icon
                size="16"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                v-if="item.payment_method === 3"
                >{{ item.offline ? "mdi-cash" : "mdi-cash-marker" }}
              </v-icon>
              <v-icon
                size="16"
                :class="
                  item.status === 1
                    ? 'blue--text'
                    : item.status === 2
                    ? 'green--text'
                    : item.status === 3
                    ? 'orange--text'
                    : item.status === 4
                    ? 'grey--text'
                    : item.status === 5
                    ? 'red--text'
                    : ''
                "
                v-if="item.payment_method === 4 || item.payment_method === 5"
                >mdi-table-chair
              </v-icon>
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
  </div>
</template>
<style></style>
<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";
import { QrcodeStream } from "vue-qrcode-reader";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});

export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      dialog: false,
      orderLoad: false,
      content: "",
      expanded: [],
      dialog2: false,
      selected: [],
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
        { text: "When  ", value: "created_at" },
        { text: "Status", value: "status" }
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
    loading() {
      return this.$store.getters.getVendorLoadStatus;
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
    start() {
      const sn = this;
        this.orderLoad = true; 
        this.$store.dispatch("setAdminOrderList").then(()=>{
            this.orderLoad = false; 
        })
    },
    navb() {
        this.orderLoad = true; 
        if(!this.orders.length){
            this.$store.dispatch("setAdminOrderList").then(()=>{
            this.orderLoad = false; 
            });
        }
    },
    clicker(e) {
    console.log(e)
    OrderSound.stop()
        if (!this.orderLoad) {
            this.orderLoad = true; 
    axios.post('/auth_user2', {
        vendor_id: e.vendor.id
    })
    .then(res => {
        this.orderLoad = false; 
        this.$store.dispatch("setUser", res.data.success.user);
        this.$store.dispatch("setToken", res.data.success.token);
      if (!e.status) {
          this.$store.dispatch("order", {
              id: e.id,
          action: "read"
        });
      } else {
          this.$store.dispatch("order", {
              id: e.id,
          action: null
        });
      }
    this.orderLoad = false;
        })
    }
    }
  }
};
</script>
