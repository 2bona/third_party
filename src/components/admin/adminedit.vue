<template>
  <v-card
    min-height="95vh"
    color="grey lighten-3"
    style="overflow-x: hidden;"
    flat
    tile
    class="pb-9 px-3"
  >
    <v-row style="    max-width: 567px;
    margin: auto;" justify="space-around">
      <v-avatar size="80" color="transparent" class="mt-6 mb-3 elevation-15">
        <v-img
          :src="deliveryAgent.image"
          @click="openImageInput"
          alt="profile"
        ></v-img>
        <v-overlay
          absolute
          opacity="0.3"
          z-index="1"
          :value="attachments.length"
        >
        </v-overlay>
        <v-btn
          :loading="loading2"
          style="z-index:7"
          dark
          absolute
          x-small
          rounded
          fab
          v-show="attachments.length"
          color="orange"
          class="mt-0 mb-0 mx-auto"
          @click="uploadFile"
        >
          <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon></v-btn
        >
      </v-avatar>
      <v-flex xs12 class=" px-6 mb-3">
        <h3
          class="text-center text-truncate headline mb-0 text-capitalize grey--text text--darken-1 font-weight-bold"
        >
          <span>{{ deliveryAgent.name }}</span>
        </h3>
      </v-flex>
      <input
        v-show="false"
        ref="file"
        type="file"
        @change="fieldChange"
        class="v-input"
      />
      <v-row class="">
        <v-flex xs6>
          <h3
            class="grey--text text--darken-1 font-weight-regular  text-center mb-0"
          >
            {{ deliveryAgent.orders_count | price }}
          </h3>
          <p
            class=" mt-0 grey--text text-capitalize body-2 font-weight-regular text--lighten-1  text-center"
          >
            Orders
          </p>
        </v-flex>
        <v-flex xs6>
          <h3
            class="grey--text text--darken-1 font-weight-regular  text-center mb-0"
          >
            <v-icon class="pb-1" size="19">mdi-currency-ngn</v-icon
            >{{ deliveryAgent.funds_collected | price }}
          </h3>
          <p
            class=" mt-0 grey--text text-capitalize body-2 font-weight-regular text--lighten-1  text-center"
          >
            Funds Collected
          </p>
        </v-flex>
      </v-row>
    </v-row>
    <v-expansion-panels style="    max-width: 567px;
    margin: auto;border-radius: 25px 25px 0 0 ;" accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-3"
          ><p class="grey--text   text--darken-1 mb-0 title">
            <v-icon class="mr-2" color="grey lighten-3">mdi-account</v-icon>
            Account Information
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="position: relative" class="px-4 py-2">
          <v-form onSubmit="return false;" ref="form">
            <v-flex xs12>
              <v-text-field
                validate-on-blur
                @keyup.enter.native="edit"
                label="Token"
                v-model="deliveryAgent.token"
                readonly
                color="grey"
                disabled
                :hint="fcm"
                persistent-hint
              ></v-text-field>
              <v-text-field
                validate-on-blur
                @keyup.enter.native="edit"
                label="Full name"
                v-model="deliveryAgent.name"
                placeholder="Your first name"
                :rules="[rules.required, rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
              <v-select
                :items="vendors"
                attach
                :rules="[rules.minVendor]"
                chips
                :loading="loading"
                :disabled="loading"
                v-model="vendor"
                placeholder
                cache-items
                label="Vendors you deliver for"
                color="grey"
                multiple
              ></v-select>
              <v-text-field
                validate-on-blur
                label="Address"
                disabled
                :loading="loading"
                :rules="[rules.required]"
                v-model="deliveryAgent.address"
                placeholder="Address"
                color="grey"
                required
              ></v-text-field>
              <v-text-field
                label="Phone number"
                validate-on-blur
                :loading="loading"
                :disabled="loading"
                v-model="deliveryAgent.phone"
                :rules="numberRules"
                placeholder="Your phone number"
                color="grey"
                required
              ></v-text-field>
              <v-select
                :items="areas"
                attach
                :rules="[rules.minArea]"
                chips
                cache-items
                :loading="loading"
                :disabled="loading"
                v-model="area"
                label="Areas you cover"
                color="grey"
                multiple
              ></v-select>
              <v-textarea
                name="bio"
                :loading="loading"
                :disabled="loading"
                v-model="deliveryAgent.bio"
                label="Bio"
                color="grey"
                placeholder="A little info about your business."
                hint="Maximum of 100 words"
              ></v-textarea>
            </v-flex>
            <v-row class="px-3" justify="space-between">
              <v-flex xs12> </v-flex>
            </v-row>
            <v-row class="my-5 px-3" justify="space-around">
              <v-btn
                depressed
                :disabled="editBtn"
                @click.prevent="edit"
                :loading="loading"
                class="px-6"
                small
                outlined
                color="primary"
                dark
                rounded
                >Edit</v-btn
              >
            </v-row>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-3"
          ><p class="grey--text   text--darken-1 mb-0 title">
            <v-icon class="mr-2" color="grey lighten-3">mdi-map-marker</v-icon>
            Areas
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list class="pt-0">
            <p
              class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center"
            >
              AREAS YOU COVER
            </p>
            <v-divider class="mt-2 mb-9 grey lighten-3"></v-divider>
            <div v-for="(item, i) in deliveryAgent.areas" :key="item.lat">
              <v-list-item class="my-2 mt-2" style="max-height: 38px!important">
                <v-list-item-content v-show="!show[i]">
                  <v-list-item-title
                    class="body-2 grey--text font-weight-medium text--darken-1 pb-0"
                    >{{ item.name }}</v-list-item-title
                  >
                  <v-list-item-title
                    class="overline text-lowercase grey--text mb-7"
                    >{{ item.pivot.distance | distance }}-{{
                      item.pivot.duration | duration
                    }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-3"
          ><p class="grey--text   text--darken-1 mb-0 title">
            <v-icon class="mr-2" color="grey lighten-3">mdi-credit-card</v-icon>
            Payment
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <p
              class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center"
            >
              SET ACCOUNT DETAILS FOR SALARY AND TIPS
            </p>

            <v-divider class="mt-2 mb-9 grey lighten-3"></v-divider>
            <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
              <v-list-item-icon class=" mt-0 mr-2">
                <v-icon color="grey lighten-2">mdi-bank</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2 grey--text text--darken-1 pb-6"
                  >Bank Name</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content class="pl-4 pr-1">
                <v-text-field
                  :disabled="payLoad"
                  :loading="payLoad"
                  solo
                  rounded
                  dense
                  color="grey"
                  placeholder="Bank Name"
                  v-model="deliveryAgent.bank_name"
                >
                </v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
              <v-list-item-icon class=" mt-0 mr-2">
                <v-icon color="grey lighten-2">mdi-account-card-details</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2 grey--text text--darken-1 pb-6"
                  >Account name</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content class="pl-4 pr-1">
                <v-text-field
                  :disabled="payLoad"
                  :loading="payLoad"
                  solo
                  rounded
                  dense
                  color="grey"
                  placeholder="Account name"
                  v-model="deliveryAgent.account_name"
                >
                </v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="mt-3 mb-1" style="max-height: 38px!important">
              <v-list-item-icon class=" mt-0 mr-2">
                <v-icon color="grey lighten-2">mdi-numeric-0-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="body-2 grey--text text--darken-1 pb-6"
                  >Account number</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content class="pl-4 pr-1">
                <v-text-field
                  :rules="minRule"
                  :disabled="payLoad"
                  :loading="payLoad"
                  solo
                  rounded=""
                  dense
                  color="grey"
                  placeholder="Account number"
                  v-model="deliveryAgent.account_number"
                >
                </v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-row class="mb-7 mt-0 px-3" justify="space-around">
            <v-btn
              depressed
              @click.prevent="paySet"
              :loading="payLoad"
              class="px-6"
              small
              outlined
              color="primary"
              dark
              rounded
              >set</v-btn
            >
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-card style="    max-width: 567px;
    margin: auto;border-radius: 0 0 25px 25px;" flat tile class="mb-7">
      <v-list>
        <v-list-item class="px-3">
          <v-list-item-title class="title px-1 grey--text   text--darken-1">
            <v-icon size="19" class="mr-2" color="grey lighten-3"
              >mdi-information</v-icon
            >
            Support
          </v-list-item-title>
          <v-btn
            outlined
            rounded
            small
            color="grey darken-1"
            :href="
              'https://wa.me/+234' +
                8033685498 +
                '?text=Hello,%20this%20is%20' +
                deliveryAgent.name
            "
            class="px-3 font-weight-bold"
            target="_blank"
            ><v-icon size="18" class="px-2 mt-0"
              >mdi-information-outline</v-icon
            ></v-btn
          >
        </v-list-item>
        <v-list-item class="px-3">
          <v-btn
            dark
            @click="logout"
            depressed
            class="mx-auto caption font-weight-bold px-8 red--text text--lighten-1"
            rounded
            color="red lighten-5"
            >Logout</v-btn
          >
        </v-list-item>
      </v-list>
    </v-card>
  </v-card>
</template>
<style>
.v-expansion-panel-content__wrap {
  padding: 0px 0px;
}
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 8px;
}
</style>
<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true, // should headers be ignored in cache key, helpful for ignoring tracking headers
});

export default {
  data: () => ({
    loading: false,
    loadingFee: false,
    loading2: false,
    fundLoad: false,
    payLoad: false,
    load: true,
    attachments: [],
    deliveryAgentTags: [],
    areas: [],
    results: [],
    distance: [],
    vendors: [],
    vendor: [],
    duration: [],
    area: [],
    show: [],
    show1: true,
    fundDialog: false,
    overlay: true,
    fundAmnt: "",
    RiderPassword: "",
    fundPhone: "",
    editBtn: true,
    visible: true,
    rules: {
      required: (value) => !!value || "Required.",
      min: (value) => value.length >= 3 || "Min 3 characters",
      minVendor: (value) => value.length > 0 || "Minimum of 1 vendor",
      minArea: (value) => value.length > 0 || "Minimum of 1 area",
      c_password: (value) =>
        this.password === this.c_password || "does not match passoword",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    fundRules: [
      (v) => /^[0-9]*$/.test(v) || "Only numbers are allowed",
      (v) => v >= 50 || "Min 50",
    ],
    numberRules: [
      (v) => (v != null && v.length >= 11) || "Min 11 characters",
      (v) => !!v || "Phone number is required",
      (v) => v[0] === "0" || 'Phone number must start with "0"',
      (v) => /^[0-9]*$/.test(v) || "Number must be valid",
    ],
    minRule: [
      (v) => !!v || "Phone number is required",
      (v) => /^[0-9]*$/.test(v) || "Number must be valid",
    ],
  }),
  computed: {
    fcm() {
      return localStorage.getItem("fcm");
    },
    user() {
      return this.$store.getters.getUser;
    },
    deliveryAgent() {
      return this.$store.getters.getDeliveryAgent;
    },
  },
  created() {
    var sn = this;
    sn.loading = true;
    sn.$store.dispatch("loadDeliveryAgent").then(() => {
      var l = [];
      var n = sn.deliveryAgent.vendors;
      sn.vendor = n;
      axios
        .get("/city/delivery?city=" + sn.deliveryAgent.city)
        .then(function(response) {
          sn.areas = response.data.areas;
          sn.results = response.data.result;
          sn.load = false;
          axios
            .get("/delivery/allvendors?id=" + sn.deliveryAgent.city)
            .then(function(response) {
              var d = response.data.vendors;
              sn.loading = false;
              sn.vendors = d;
            });
        });
      sn.editBtn = false;
      const e = sn.$store.getters.getDeliveryAgent.areas;
      sn.area = e.map((item) => {
        return item.id;
      });
    });
  },
  methods: {
    fundAccnt() {
      if (this.$refs.form2.validate()) {
        this.fundLoad = true;
        axios
          .post("/delivery/fund2", {
            user_phone: this.fundPhone,
            rider_password: this.RiderPassword,
            amount: this.fundAmnt,
          })
          .then((res) => {
            if (res.data.blocked) {
              this.$store.dispatch("snack", {
                color: "red",
                text:
                  "Wrong password!!!, ACCOUNT BLOCKED CALL THE OFFICE TO UNBOLOCK IT NOW!!",
              });
              this.$store.dispatch("logout");
            } else {
              this.fundDialog = false;
              this.fundLoad = false;
              this.$store.dispatch("snack", {
                color: "green",
                text: "User Account has been funded successfully",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.dispatch("snack", {
              color: "red",
              text: "An error occured",
            });
            this.fundLoad = false;
            this.fundDialog = false;
          });
      }
    },
    fund() {
      this.fundDialog = true;
      this.fundAmnt = "";
      this.RiderPassword = "";
      this.fundPhone = "";
    },
    paySet() {
      const sn = this;
      sn.payLoad = true;
      const url = "/delivery/payset";
      http({
        url: url,
        method: "post",
        params: {
          bank_name: sn.deliveryAgent.bank_name,
          account_name: sn.deliveryAgent.account_name,
          account_number: sn.deliveryAgent.account_number,
        },
      })
        .then((response) => {
          sn.payLoad = false;
          sn.$store.dispatch("loadDeliveryAgent");
          sn.$store.dispatch("snack", {
            color: "green",
            text: "Your account details has been set successfully",
          });
        })
        .catch(function(error) {
          sn.payLoad = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: error,
          });
        });
    },
    logout() {
      this.$store.dispatch("logout");
    },
    openImageInput() {
      this.attachments = [];
      this.$refs.file.click();
    },
    text(val) {
      this.form.description = val;
    },
    fieldChange(e) {
      this.attachments = [];
      let selectedFiles = e.target.files;
      if (!selectedFiles.length) {
        return false;
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.attachments.push(selectedFiles[i]);
      }
    },
    uploadFile() {
      var sn = this;
      sn.loading2 = true;
      const fd = new FormData();
      for (var i = 0; i < sn.$refs.file.files.length; i++) {
        let file = sn.$refs.file.files[i];
        fd.append("files[" + i + "]", file);
      }
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      axios
        .post("/delivery/upload", fd, config)
        .then((res) => {
          var d = res.data.success;
          sn.$store.dispatch("loadDeliveryAgent");
          sn.loading2 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: d.message,
          });
          sn.attachments = [];
        })
        .catch((err) => {
          sn.attachments = [];
          sn.$store.dispatch("snack", {
            color: "red",
            text: err,
          });
          sn.loading2 = false;
        });
    },
    edit() {
      const sn = this;
      if (this.$refs.form.validate()) {
        this.loading = true;
        const url = "/delivery/update";
        var d = sn.results;
        var e = [];
        sn.area.forEach((element) => {
          e.push(
            d.find((item) => {
              return item.id === element;
            })
          );
        });
        const origin = [];
        var set = [];
        e.forEach((item) => {
          set = new google.maps.LatLng(item.lat, item.lng);
          origin.push(set);
        });

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [
              new google.maps.LatLng(
                sn.deliveryAgent.lat,
                sn.deliveryAgent.lng
              ),
            ],
            destinations: origin,
            travelMode: "DRIVING",
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          },
          function(response, status) {
            const duration = [];
            const distance = [];
            if (status !== "OK") {
              alert("Error was: " + status);
            } else {
              var answer = response.rows[0].elements;
              answer.forEach((element) => {
                distance.push(element.distance.value);
                duration.push(element.duration.value);
              });
            }

            http({
              url: url,
              method: "post",
              params: {
                name: sn.deliveryAgent.name,
                bio: sn.deliveryAgent.bio,
                phone: sn.deliveryAgent.phone,
                areas: sn.area,
                vendors: sn.vendor[0].value
                  ? sn.vendor.map((n) => {
                      return n.value;
                    })
                  : sn.vendor,
                duration: duration,
                distance: distance,
                token: sn.fcm || "",
              },
            })
              .then(() => {
                sn.loading = false;
                sn.$store.dispatch("loadDeliveryAgent");
                sn.$store.dispatch("snack", {
                  color: "green",
                  text: "Your profile has been successfully updated",
                });
              })
              .catch(function(error) {
                sn.$store.dispatch("snack", {
                  color: "red",
                  text: error,
                });
                sn.loading = false;
              });
          }
        );
      } else {
        sn.loading = false;
      }
    },
  },
};
</script>
