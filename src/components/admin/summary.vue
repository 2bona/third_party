<template>
  <div style="min-height:100vh">
    <v-row style="min-height:" class="pa-3 px-4  pb-12 my-auto">
      <v-flex xs12>
        <h1 class="text--darken-2 title mb-1 px-3  grey--text">Analysis</h1>
      </v-flex>
      <v-flex class="my-2" xs6 sm4>
        <v-card
          style="border-radius: 25px"
          class="ma-auto d-flex elevation-9"
          color="orange darken-3"
          @click="setCat('sales', 'Amount sold in Naira', 'Amount')"
          dark
          height="108px"
          max-width="200px"
          width="91%"
        >
          <v-card-title
            class="px-2 ma-auto headline font-weight-black orange--text text--lighten-4"
          >
            Sales
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex class="my-2" xs6 sm4>
        <v-card
          style="border-radius: 25px"
          class="ma-auto d-flex elevation-9"
          color="blue "
          dark
          height="108px"
          @click="setCat('orders', 'No of orders delivered', 'No of orders')"
          max-width="200px"
          width="91%"
        >
          <v-card-title
            class="px-2 headline ma-auto font-weight-black blue--text text--lighten-4"
          >
            Orders
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex class="my-2" xs6 sm4>
        <v-card
          style="border-radius: 25px"
          class="d-flex ma-auto elevation-9"
          color="teal lighten-2"
          dark
          @click="setCat('payments', 'Withdrawals', 'Amount')"
          height="108px"
          max-width="200px"
          width="91%"
        >
          <v-card-title
            class="px-2 ma-auto headline font-weight-black teal--text text--lighten-4"
          >
            Payment
          </v-card-title>

          <!-- <v-card-actions class="justify-center">
            <v-btn
              rounded
              class="caption font-weight-black grey--text text--lighten-2"
              block
              
              depressed
              color="teal lighten-1"
              >full Report</v-btn
            >
          </v-card-actions> -->
        </v-card>
      </v-flex>
      <v-flex class="my-2" xs6 sm4>
        <v-card
          style="border-radius: 25px"
          class="ma-auto d-flex elevation-9"
          color="blue-grey lighten-2"
          dark
          height="108px"
          max-width="200px"
          width="91%"
          @click="setCat('visits', 'Engagement', 'No of visitors')"
        >
          <v-card-title
            class="px-2 ma-auto headline font-weight-black blue-grey--text text--lighten-4"
          >
            Visits
          </v-card-title>
        </v-card>
      </v-flex>
    </v-row>
    <v-dialog v-model="dialog" fullscreen>
      <div>
        <v-card>
          <div
            style="position: sticky; top:0;
                  background: #f7f7f7;
                  z-index: 9;"
          >
            <v-card-title class="text-capitalize" primary-title>
              {{ category }}
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false" style="" color="" icon
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-card-title>

            <div class="text-center py-3 px-1">
              <v-btn
                x-small
                @click="loadBar(1)"
                rounded
                :disabled="disBtn === 1 || disBtn === 5"
                text
                depressed
                color=""
                ><v-icon>mdi-calendar-today</v-icon> today</v-btn
              >
              <v-btn
                x-small
                @click="loadBar(2)"
                rounded
                :disabled="disBtn === 2 || disBtn === 5"
                text
                depressed
                ><v-icon>mdi-calendar-week</v-icon> week</v-btn
              >
              <v-btn
                x-small
                @click="loadBar(3)"
                rounded
                :disabled="disBtn === 3 || disBtn === 5"
                text
                depressed
                ><v-icon>mdi-calendar-month</v-icon> month</v-btn
              >
              <v-btn
                x-small
                @click="loadBar(4)"
                rounded
                :disabled="disBtn === 4 || disBtn === 5"
                text
                depressed
                ><v-icon>mdi-calendar-blank</v-icon> year</v-btn
              >
            </div>
          </div>
          <div
            class="text-center"
          >
            <h3 class="mb-3 font-weight-light grey--text mt-5">{{ desc }}</h3>
            <div class="py-4 d-flex" style="min-height: 400px; max-width: 400">
              <v-progress-circular
                indeterminate
                v-show="loading"
                class="ma-auto"
                color="primary"
              ></v-progress-circular>

              <la-cartesian
                v-show="!loading"
                :width="300"
                :height="400"
                class="ma-auto"
                :bound="[0]"
                :data="summary"
              >
                <la-bar :width="8" prop="value"></la-bar>
                <la-x-axis font-size="10" prop="title"></la-x-axis>
                <la-tooltip></la-tooltip>
              </la-cartesian>
            </div>
            <div class="p2-2 mx-auto" style="max-width: 400px;width:80%">
              <v-data-table
                v-show="!loading"
                :headers="headers"
                :mobile-breakpoint="30"
                :items="summary"
                hide-default-footer
              >
                <template v-slot:item.value="{ item }">
                  <span
                    ><v-icon
                      v-show="category == 'sales' || category == 'payments'"
                      size="13"
                      style="padding-bottom:2px"
                      >mdi-currency-ngn</v-icon
                    >
                    <span
                      v-if="category == 'sales' || category == 'payments'"
                      >{{ item.value | price }}</span
                    >
                    <span v-else> {{ item.value }}</span>
                  </span>
                </template>
              </v-data-table>
            </div>
            <h3
              v-if="pie.length"
              class="mt-5 font-weight-light grey--text"
              style="position:relative;top:40px"
            >
              General Information
            </h3>
            <div
              v-if="!loading && pie.length"
              class="py-2 mx-auto d-flex"
              style="min-height: 400px; max-width: 500px; width:100%"
            >
              <la-polar :width="320" class="ma-auto" :data="pie">
                <la-pie
                  show-label
                  font-size="13"
                  label-prop="title"
                  prop="value"
                ></la-pie>
              </la-polar>
            </div>
            <div
              class="pb-12 pt-3 mx-auto"
              style="position: relative;
    top: -51px;max-width: 400px;width:80%"
            >
              <v-data-table
                v-if="!loading && pie.length"
                :headers="headers2"
                :mobile-breakpoint="30"
                :items="pie"
                hide-default-footer
              >
                <template v-slot:item.value="{ item }">
                  <span
                    ><v-icon
                      v-if="category == 'sales' || category == 'payments'"
                      size="13"
                      style="padding-bottom:2px"
                      >mdi-currency-ngn</v-icon
                    >
                    <span
                      v-if="category == 'sales' || category == 'payments'"
                      >{{ item.value | price }}</span
                    >
                    <span v-else> {{ item.value }}</span>
                  </span>
                </template>
              </v-data-table>
            </div>
          </div>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
<style></style>
<script>
import axios from "axios";
import Vue from "vue";
import { Cartesian, Polar, Pie, Bar, XAxis, Tooltip } from "laue";

import Bars from "vuebars";
Vue.use(Bars);

export default {
  components: {
    LaCartesian: Cartesian,
    LaXAxis: XAxis,
    LaBar: Bar,
    LaPolar: Polar,
    LaPie: Pie,
    LaTooltip: Tooltip
  },
  data() {
    return {
      dialog: false,
      loading: false,
      content: "",
      tag: "",
      val: "",
      category: "sales",
      desc: "",

      dialog2: false,
      summary: [],
      pie: [],
      dialog3: false,
      disBtn: null,
      valid: true,
      deleteId: "",
      dialog4: false,
      rules: {
        required: value => !!value || "Required."
      },
      radios: "Thank you soo much, we will keep improving"
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.tag,
          align: "center",
          sortable: false,
          value: "title"
        },
        { text: this.val, align: "center", value: "value" }
      ];
    },
    headers2() {
      return [
        {
          text: "Type",
          align: "center",
          sortable: false,
          value: "title"
        },
        { text: this.val, align: "center", value: "value" }
      ];
    },
    vendor() {
      return this.$store.getters.getVendor;
    }
  },
  mounted() {},
  methods: {
    setCat(x, y, z) {
      this.category = x;
      this.desc = y;
      this.val = z;
      this.dialog = true;
      this.loadBar(1);
    },
    loadBar(x) {
      const sn = this;

      x === 1
        ? (sn.tag = "Time")
        : x === 2
        ? (sn.tag = "Day")
        : x === 3
        ? (sn.tag = "Week")
        : x === 4
        ? (sn.tag = "Month")
        : (sn.tag = "Name");

      if (!sn.loading) {
        sn.loading = true;
        sn.disBtn = x;
        var url =
          "/summary?category=" + sn.category.toLowerCase() + "&type=" + x;
        axios
          .get(url)
          .then(res => {
            sn.summary = [];
            sn.summary = res.data.data;
            sn.pie = res.data.extra.filter(el => {
              return el.value > 0;
            });
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    }
  }
};
</script>
