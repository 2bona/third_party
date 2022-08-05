<template>
  <v-card
    min-height="100vh"
    color="grey lighten-3"
    style="overflow-x: hidden;"
    flat
    tile
    class="pb-9 px-3"
  >
     <div>
    <v-flex class="d-flex" style="justify-content:center">
        <v-switch
          @change="changeDeliveryStatus"
          class=""
          :loading="statusLoad"
          v-model="deliveryAgent.status"
          hide-details
        >
          <template v-slot:prepend>
            <span class="pt-1 red--text font-weight-bold" v-if="!deliveryAgent.status"
              >Closed</span>
            <span
              class="pt-1 success--text text--darken-2 font-weight-bold"
              v-if="deliveryAgent.status"
              >Open</span
            >
          </template></v-switch
        >
      </v-flex>
     </div>
    <v-row style="    max-width: 567px;
    margin: auto;" justify="space-around" >
      <v-avatar size="80"  color="transparent" class="mt-6 mb-3 elevation-0">
        <v-img
          :src="deliveryAgent.image"
          @click="openImageInput"
          alt="profile"
        ></v-img>
        <v-overlay
          absolute
          opacity="0.3" class="mx-auto"
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
        <v-flex xs12>
          <h3
            class="grey--text text--darken-1 font-weight-regular  text-center mb-0"
          >
            {{ deliveryAgent.orders_number | price }}
          </h3>
          <p
            class=" mt-0 grey--text text-capitalize body-2 font-weight-regular text--lighten-1  text-center"
          >
            Orders
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
                label="Full name" readonly
                v-model="deliveryAgent.name"
                placeholder="Your first name"
                :rules="[rules.required, rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
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
                
                :disabled="editBtn"
                @click.prevent="edit"
                :loading="loading"
                class="px-6"
                
                
                color=""
              
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
            <v-icon class="mr-2" color="grey lighten-3">mdi-credit-card</v-icon>
            Payment
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <p
              class="px-2 mb-0 py-0 mt-0 caption grey--text text--lighten-1 text-center"
            >
              SET ACCOUNT DETAILS.
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
                  
                                  dense
                  color="grey"
                  label="Bank Name"
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
                  
                                  dense
                  color="grey"
                  label="Account name"
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
                  :disabled="payLoad"
                  :loading="payLoad"
                  
                  
                  dense
                  color="grey"
                  label="Account number"
                  placeholder="Account number"
                  v-model="deliveryAgent.account_number"
                >
                </v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-row class="mb-7 mt-0 px-3" justify="space-around">
                      <div class="text-center">

            <v-btn
              
              @click.prevent="paySet"
              :loading="payLoad"
              class="px-6"
              rounded
              >set</v-btn
            >
                          <p class="mt-5 grey--text body-2">This is the account to Remit your Payments at the end of the day.</p>
                      </div>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
            <v-expansion-panel>
        <v-expansion-panel-header class="px-3"
          ><p class="grey--text   text--darken-1 mb-0 title">
            <v-icon class="mr-2" color="grey lighten-3">mdi-account-plus</v-icon>
            Add A New Rider 
          </p>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="position: relative" class="px-4 py-2">
  <v-form onSubmit="return false;" ref="formAdd">
    <v-container>
        <div>Personal Information</div>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Fist name" 
                persistent-hint
                hint="Please be careful, you cannot edit this."
                v-model="first_name"
                placeholder="Rider's first name"
                :rules="[rules.required, rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
         
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Surname" 
                persistent-hint
                hint="Please be careful, you cannot edit this."
                v-model="surname"
                placeholder="Rider surname"
                :rules="[rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
         
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
            <v-text-field
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Other Name" 
              persistent-hint
                hint="Please be careful, you cannot edit this."
                v-model="middle_name"
                placeholder="Rider's other name"
                :rules="[rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
         
        </v-col>
        <v-col
          cols="12"
          md="12"
        >
            <v-text-field
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Address"  persistent-hint
                hint="Please be careful, you cannot edit this."
                v-model="address"
                placeholder="Rider's Address"
                :rules="[rules.required, rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
         
        </v-col>
      </v-row>
           <div>Account Information</div>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
            <v-text-field
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Phone" 
                v-model="phone"
                placeholder="Phone number" persistent-hint
                hint="Please be careful, you cannot edit this."
                :rules="[rules.required, rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
         
        </v-col>
   
        <v-col
          cols="12"
          md="6"
        >
            <v-text-field
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Password" 
                v-model="password"
                placeholder="Account Password"
                :rules="[rules.required, rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-text-field>
         
        </v-col>
             <v-col
          cols="12"
          md="12"
        >
            <v-textarea
                validate-on-blur
                @keyup.enter.native="addNewRider"
                label="Bio" 
                v-model="bio"
                placeholder="Account Bio"
                :rules="[rules.min]"
                color="grey"
                :loading="loading"
                :disabled="loading"
                required
              ></v-textarea>
         
        </v-col>
      </v-row>
        <v-row class="my-5 px-3" justify="space-around">
          <div class="text-center">

              <v-btn
                :disabled="loading"
                @click.prevent="addNewRider"
                :loading="loading"
                class="px-6"
                large
                dark
                rounded
                >Submit</v-btn
              >
              <p class="mt-5 grey--text body-2">By clicking submit you are saying this Rider has the State's Rider's License and is qualified by the State Government to deliver goods in the State.</p>
          </div>
            </v-row>
    </v-container>
  </v-form>
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
            <p class="grey--text text--darken-0 body-2 text-wrap px-9">Chat us on whatsapp, contact us on any issue you have on this app.</p>
          </v-list-item-title>
          <v-btn
            
            rounded
            small
            color=""
            :href="
              'https://wa.me/+234' +
                8033685498 +
                '?text=Hello,%20this%20is%20' +
                deliveryAgent.name
            "
            class="px-3 font-weight-bold"
            target="_blank"
            ><v-icon size="18" class="px-2 mt-0"
              >mdi-whatsapp</v-icon
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
    statusLoad: false,
    fundDialog: false,
    overlay: true,
    phone: "",
    password: "",
    bio: "",
    address: "",
    surname: "",
    middle_name: "",
    first_name: "",
    fundAmnt: "",
    RiderPassword: "",
    fundPhone: "",
    editBtn: true,
    visible: true,
    rules: {
      required: (value) => !!value || "Required.",
      min: (value) => (value == '' ||  value.length >= 3) || "Min 3 characters",
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
    logistic_id() {
      return this.$store.getters.getLogisticId;
    },
    deliveryAgent() {
      return this.$store.getters.getDeliveryAgent;
    },
  },
  created() {
    var sn = this;
    sn.$store.dispatch("loadDeliveryAgent").then(() => {
      var l = [];
      var n = sn.deliveryAgent.vendors;
      sn.vendor = n;

      sn.editBtn = false;
      const e = sn.$store.getters.getDeliveryAgent.areas;
      sn.area = e.map((item) => {
        return item.id;
      });
    });
  },
  methods: {
    addNewRider(){
            if (this.$refs.formAdd.validate()) {
              this.loading = true
       axios
          .post("/delivery/addNewRider", {
            middle_name: this.middle_name,
            first_name: this.first_name,
            surname: this.surname,
            city: this.deliveryAgent.city,
            address: this.address,
            logistic_id: this.logistic_id,
            phone: this.phone,
            password: this.password,
            bio: this.bio,
          }).then((res)=>{
            console.log(res)
              this.loading = false
            this.$store.dispatch("snack", {
              color: "green darken-4",
              text: "Rider Added",
            });
         })
          .catch((error) => {
            this.loading = false
            console.log(error);
            this.$store.dispatch("snack", {
              color: "red",
              text: "An error occured :"+ error,
            })
            });
            }
    },
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
        changeDeliveryStatus() {
      const sn = this;
      sn.statusLoad = true;
      const url = "/delivery/changeStatus";
      axios.post(url,{
          status: sn.deliveryAgent.status ? 1 : 0,
            delivery_id: sn.deliveryAgent.id
        })
        .then(() => {
          sn.statusLoad = false;
          sn.$store.dispatch("loadDeliveryAgent");
          sn.$store.dispatch("snack", {
            color: "green",
            text: "Your Status has been Updated"
          });
        })
        .catch(err => {
          sn.statusLoad = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: err
          });
        });
    },
    paySet() {
      const sn = this;
      sn.payLoad = true;
      const url = "/delivery/payset";
      axios.post(url, {
          bank_name: sn.deliveryAgent.bank_name,
          account_name: sn.deliveryAgent.account_name,
          account_number: sn.deliveryAgent.account_number,
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
            axios.post(url,{
                name: sn.deliveryAgent.name,
                bio: sn.deliveryAgent.bio,
                phone: sn.deliveryAgent.phone,
                areas: [],
                vendors: [],
                duration: [],
                distance: [],
                token: sn.fcm || "",
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
          
        
      } else {
        sn.loading = false;
      }
    },
  },
};
</script>
