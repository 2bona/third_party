<template>
  <div>
    <v-flex xs12 class=" pt-0 px-0">
      <v-btn
        v-show="
          !dialog &&
            !dialog1 &&
            !dialog2 &&
            !dialog3 &&
            !dialog4 &&
            !dialog5 &&
            !dialog6 &&
            !dialog45
        "
        fixed
        @click="$router.go(-1)"
        fab
        bottom
        right
        color="white"
        style="z-index:999"
        class="mb-12"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card flat tile color="white">
        <v-container fluid>
          <v-row justify="space-around">
            <input
              v-show="false"
              ref="file81"
              type="file"
              @change="itemFieldChange($event)"
            />
            <v-col class="" cols="12">
              <v-card
                flat
                color="white"
                style="padding-bottom: 300px!important;"
                class="px-4 pt-4 mx-auto"
                max-width="650px"
              >
                <div>
                  <v-skeleton-loader
                    v-show="$route.params.id != items.id"
                    ref="skeleton"
                    width="300"
                    type="heading"
                  ></v-skeleton-loader>
                  <h3
                    v-show="$route.params.id == items.id"
                    class="grey--text text--darken-1 text-capitalize"
                  >
                    {{ items.name }}
                  </h3>
                </div>

                <v-divider class="my-4"></v-divider>
                <v-progress-linear
                  v-if="dialog45"
                  indeterminate
                  color="grey lighten-1"
                ></v-progress-linear>
                <v-skeleton-loader
                  v-for="n in 4"
                  :key="n"
                  v-show="$route.params.id != items.id"
                  ref="skeleton"
                  width="100%"
                  type="list-item-avatar-two-line"
                ></v-skeleton-loader>
                <v-flex
                  v-show="$route.params.id == items.id"
                  class="my-2 px-1"
                  xs12
                  v-for="n in items.items"
                  :key="n.id"
                >
                  <v-card
                    :disabled="dialog45"
                    width="95%"
                    @click="!n.status ? count(n.id, items.id) : ''"
                    height="auto"
                    ripp
                    max-height
                    :ripple="false"
                    min-height
                    flat
                    color="grey lighten-5"
                    style=" border-radius:25px"
                    class="mx-2 mb-2 py-1 px-1"
                  >
                    <v-list-item class="pa-0">
                      <v-list-item-avatar
                        size="40"
                        style="align-self: flex-start; top: 4px;"
                        class="my-0 elevation-10 mr-2"
                      >
                        <v-img
                        contain
                        :src="'https://res.cloudinary.com/dnqw7x4bp/image/upload/c_fit,h_40,w_40/'+n.image.substring(n.image.lastIndexOf('/') + 1,n.image.lastIndexOf('.'))"
                          @click="openItemImageInput(n.id)"
                        ></v-img>
                        <v-overlay
                          absolute
                          opacity="0.3"
                          z-index="1"
                          :value="itemAttach === n.id"
                        >
                        </v-overlay>
                        <v-btn
                          :loading="loading11"
                          style="z-index:7"
                          dark
                          absolute
                          x-small
                          rounded
                          icon
                          v-show="itemAttach === n.id"
                          color="orange"
                          class="mt-0 mb-0 mx-auto"
                          @click="editItemImage(items.id, n.id)"
                        >
                          <v-icon color="orange lighten-4" dark
                            >mdi-cloud-upload</v-icon
                          ></v-btn
                        >
                      </v-list-item-avatar>
                      <v-list-item-title
                        @click="isLoading ? '' : (n.status = !n.status)"
                        style=""
                        class="py-0"
                      >
                        <v-layout>
                          <v-flex xs8>
                            <h2
                              style="text-decoration: none;"
                              class="py-0 body-2 grey--text text-capitalize  text-truncate text--darken-1 font-weight-medium my-0"
                            >
                              <v-icon
                                size="9px"
                                :color="n.available ? 'green' : 'red'"
                                >mdi-circle</v-icon
                              >{{ n.name }}
                            </h2>
                            <vue-countdown-timer
                            v-if="n.preorder"
                            @end_callback="''"
                            :start-time="minDate2"
                            :end-time="getEndTime(n.preorder_value)"
                            :interval="1000"
                            :start-label="'Until start'"
                            label-position="begin"
                            :end-text="'Preorder ended for the day!'"
                            :day-txt="'days'"
                            :hour-txt="'hours'"
                            :minutes-txt="'minutes'"
                            :seconds-txt="'seconds'"
                          >
                            <template slot="countdown" slot-scope="scope">
                              <v-chip
                                class="mt-1 font-weight-bold body-1"
                                :color="
                                  scope.props.minutes <= 1
                                    ? 'red lighten-4'
                                    : scope.props.minutes <= 2
                                    ? 'yellow lighten-4'
                                    : 'grey lighten-2'
                                "
                                :class="
                                  scope.props.minutes <= 1
                                    ? 'red--text text--darken-2'
                                    : scope.props.minutes <= 2
                                    ? 'yellow--text text--darken-4'
                                    : 'grey--text text--darken-2'
                                "
                              >
                                <span>{{ scope.props.days }}: </span>
                                <span>{{ scope.props.hours }}: </span>
                                <span>{{ scope.props.minutes }}: </span>
                                <span>{{ scope.props.seconds }}</span>
                              </v-chip>
                            </template>
                          </vue-countdown-timer>
                                                   </v-flex>
                          <v-slide-x-reverse-transition>
                            <v-flex
                              v-show="!n.status"
                              xs5
                              style="
                                position: absolute; right:0px; z-index:99;"
                            >
                              <v-btn
                                @click.stop="
                                  editCatItem(
                                    items.id,
                                    n.id,
                                    n.name,
                                    n.cost_price,
                                    n.description
                                  )
                                "
                                icon
                                color="grey darken-2"
                                class=" mr-3"
                              >
                                <v-icon>mdi-pencil-outline</v-icon>
                              </v-btn>
                            </v-flex>
                          </v-slide-x-reverse-transition>
                          <v-slide-x-transition>
                            <v-switch
                            :disabled="!n.available"
                              @click.prevent="
                                preorderBtn(n.preorder, n.name, n.id, items.id)
                              "
                              :style="
                                n.status
                                  ? 'position: absolute;transform: rotate(270deg);top: -13px;left: -39px;'
                                  : 'position: absolute;transform: rotate(270deg);left: -39px; top: -13px;'
                              "
                              v-model="n.preorder"
                              :color="n.preorder ? 'orange' : 'grey'"
                              class="mt-2 mb-0 pb-0"
                            ></v-switch>
                          </v-slide-x-transition>
                          <v-slide-x-transition>
                            <v-switch
                              @click.prevent="
                                offFood(n.available, n.name, n.id, items.id)
                              "
                              :style="
                                n.status
                                  ? 'position: absolute;transform: rotate(270deg);top: -13px;right: -49px;'
                                  : 'position: absolute;transform: rotate(270deg);right: -49px; top: -13px;'
                              "
                              v-model="n.available"
                              :color="n.available ? 'green' : 'red'"
                              class="mt-2 mb-0 pb-0"
                            ></v-switch>
                          </v-slide-x-transition>
                        </v-layout>
                        <p
                          v-if="serve"
                          style="padding-left:10px;"
                          class="caption font-weight-regular grey--text text--darken-1 mb-0"
                        >
                          <v-icon
                            size="11.5px"
                            style="width: 4.8px; padding-bottom:1.8px; margin-right:3px"
                            >mdi-currency-ngn</v-icon
                          >{{ n.cost_price | price }}
                        </p>
                        <p class="mb-0 ">
                          <span class="d-flex justify mb-0 mt-0"> </span>
                        </p>
                      </v-list-item-title>
                    </v-list-item>
                  </v-card>
                </v-flex>
              </v-card>
            </v-col>
            <div class="text-center">
              <v-dialog v-model="dialog" width="500" :persistent="loading">
                <v-card>
                  <v-card-title class="body-1 grey lighten-2" primary-title>
                    Add Category
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-card-title>
                  <v-form onSubmit="return false;" ref="form">
                    <v-card-text>
                      <v-text-field
                        v-model="content"
                        autofocus
                        @keyup.enter.native="addCategory"
                        label="Type here"
                      ></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        :disabled="content.length < 2"
                        dark
                        depressed
                        :loading="loading"
                        @click="addCategory()"
                      >
                        submit
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialog1" width="500" :persistent="loading1">
                <v-card>
                  <v-card-title class="body-1 grey lighten-2" primary-title>
                    Edit category
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog1 = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-card-title>
                  <v-form onSubmit="return false;" ref="form2">
                    <v-card-text>
                      <v-text-field
                        v-model="editContent"
                        autofocus
                        @keyup.enter.native="editCategory(editContent, editId)"
                      ></v-text-field>
                    </v-card-text>
                    <v-flex>
                      <div style="width:100%; " class="py-2 text-center">
                        <span>Tag this category</span>
                        <v-layout
                          style="padding: 0 0px;overflow: visible;width:100%;height:;position: relative;"
                        >
                          <div
                            style="top: 0;bottom: 0;
                left: 10px; display: flex;overflow-y: hidden; height:100%;
                  flex-wrap: wrap;box-sizing:content;overflow-x: scroll !important;width:100%; padding: 0 19px 12px 19px !important;"
                            xs12
                          >
                            <v-chip
                              v-for="n in tags"
                              :key="n.id"
                              style="flex: 0 0 auto;"
                              class=" px-5 text-capitalize mx-2 my-2  text--lighten-0
                     font-weight-bold body-1"
                              :color="
                                taggedText == n.text ? 'lighten-2 orange' : ''
                              "
                              @click="tagged(n.text)"
                              >{{ n.text }}</v-chip
                            >
                          </div></v-layout
                        >
                      </div>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        depressed
                        :disabled="editContent.length < 2"
                        :loading="loading1"
                        @click="editCategory(editContent, editId)"
                      >
                        edit
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog4" fullscreen>
                <v-card>
                  <v-card-title class=" grey lighten-2" primary-title>
                     Pre Order settings
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog4 = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-row flat class="px-8" v-if="preOrd" justify="center">
                    <div style="width: 100%;" class="my-6" v-if="preorderAns === null">
                    <h3 class="my-2 grey--text text-center">Will it be available today?</h3>
                    <v-card-actions style="justify-content: center;">
                      <v-btn
                        class="px-3 mx-1"
                        rounded
                        dark
                        depressed
                        color="grey"
                        :loading="loading3"
                        @click="preorderAns = false"
                      >
                        no
                      </v-btn>
                      <v-btn
                        color="blue"
                        class="px-3 mx-1"
                        rounded
                        dark
                        depressed
                        
                        @click="preorderAns = true"
                      >
                        yes
                      </v-btn>
                    </v-card-actions>
                    </div>
                    
                    <div class="mx-auto text-center"> 
                      <h2 v-if="preorderAns === true" class="my-4 grey--text">What time will it be available? </h2>
                      <h2 v-if="preorderAns === false" class="my-4 grey--text">Which day will it be available? </h2>
                      <v-time-picker
                        v-show="preorderAns === true"
                        width="230"
                        format="ampm"
                        v-model="timepicker"
                      ></v-time-picker>
                      <v-date-picker
                        :min="minDate"
                        :max="maxDate"
                        v-show="preorderAns === false"
                        width="100%"
                        v-model="picker"
                      ></v-date-picker>
                      <v-card-actions style="justify-content: center;" v-show="preorderAns !== null"> 
                        <v-btn
                          class="px-3 mx-1"
                          rounded
                          dark
                          depressed
                          
                          color="grey"
                          :loading="loading3"
                          @click="preorderAns = null"
                        >
                          back
                        </v-btn>
                        <v-btn
                          color="blue"
                          class="px-3 white--text mx-1"
                          rounded
                          depressed
                          :disabled="!disabBtn"
                          :loading="loading3"
                          @click=" preorder()"
                        >
                          Set
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </v-row>
                  <v-card-actions v-if="!preOrd">
                    <v-btn
                      color="blue"
                      class="px-3 mx-auto"
                      rounded
                      dark
                      depressed
                      :loading="loading3"
                      @click="preOrd ? preorder() : offItem()"
                    >
                      sure
                    </v-btn>
                    <v-btn
                      color="grey"
                      class="px-3 mx-auto"
                      rounded
                      dark
                      depressed
                      @click="dialog3 = false"
                    >
                      cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog3" width="500">
                <v-card>
                  <v-card-title class=" grey lighten-2" primary-title>
                    Turn {{ setDialogName }}
                    <v-spacer></v-spacer>

                    <v-btn icon @click="dialog3 = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-card-title>
                  <v-divider></v-divider>
            
                  <v-card-actions>
                    <v-btn
                      color="blue"
                      class="px-3 mx-auto"
                      rounded
                      dark
                      depressed
                      :loading="loading3"
                      @click="preOrd ? preorder() : offItem()"
                    >
                      sure
                    </v-btn>
                    <v-btn
                      color="grey"
                      class="px-3 mx-auto"
                      rounded
                      dark
                      depressed
                      @click="dialog3 = false"
                    >
                      cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog6" width="500">
                <v-card flat tile>
                  <v-form onSubmit="return false;" ref="form45">
                    <v-card-title
                      primary-title
                      class=" grey lighten-2 body-1 mb-3"
                    >
                      Edit item
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog6 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <div class="px-5 pb-5">
                      <v-flex xs12>
                        <v-text-field
                          class="font-weight-regular grey--text text--darken-4"
                          label="Name"
                          :placeholder="
                            serve && !type
                              ? 'eg. Jollof Rice'
                              : !serve
                              ? 'Name of business'
                              : 'eg. Shirt'
                          "
                          color="orange"
                          v-model="editCatItemName"
                          disabled
                          :rules="[rules.required, rules.required2]"
                        ></v-text-field>
                        <v-text-field
                          v-if="!serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Phone number"
                          v-model="editCatItemTel"
                          placeholder="08033685498"
                          hint="put only valid number eg '08033685498' not '+234803323455'"
                          color="orange"
                          required
                          :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                          v-if="!serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Instagram handle"
                          v-model="editCatItemIg"
                          placeholder="app_money_1"
                          hint="put only valid instagram handle without '@'"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-if="!serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Address"
                          v-model="editCatItemAddress"
                          placeholder="No 5 ben oranusim Ifite Awka."
                          hint="Enter Service persons' address"
                          color="orange"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-if="serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Cost price"
                          v-model="editCatItemCostPrice"
                          placeholder="0"
                          hint="put only number eg '1000' not '1,000'"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                          required
                          :rules="numberRules"
                        ></v-text-field>
                      </v-flex>
                      <v-row class="px-3" justify="space-between">
                        <v-flex xs12>
                          <v-textarea
                            name="description"
                            label="Description (optional)"
                            color="orange"
                            v-model="editCatItemDescription"
                            class="font-weight-regular grey--text text--darken-4"
                            :placeholder="
                              serve && !type
                                ? 'eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more.'
                                : !serve
                                ? 'A little info about the service person'
                                : 'A little info on the laundry process'
                            "
                          ></v-textarea>
                        </v-flex>
                      </v-row>

                      <v-row class="px-3" justify="space-around">
                        <v-btn
                          :loading="loading6"
                          @click="editCategoryItem()"
                          class="px-6"
                          depressed
                          color="orange"
                          dark
                          rounded
                          >edit</v-btn
                        >
                      </v-row>
                    </div>
                  </v-form>
                </v-card>
              </v-dialog>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </div>
</template>
<style></style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      name: "",
      description: "",
      category_name: "",
      generic: "",
      address: "",
      tel: "",
      preorderAns: null,
      ig: "",
      timepicker: null,
      minDate2: new Date(),
      minDate: new Date().toISOString(),
      picker: null,
      maxDate: new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
      cost_price: "",
      mark_up_price: "",
      taggedText: "",
      editCatId: "",
      editCatitemId: "",
      editCatItemName: "",
      editCatItemDescription: "",
      editCatItemCostPrice: "",
      editCatItemMarkUp: "",
      editCatItemTel: "",
      editCatItemIg: "",
      editCatItemAddress: "",
      editContent: "",
      editId: "",
      optionname: "",
      optional: [],
      optionprice: "",
      compulsory: [],
      deleteId: "",
      deleteCatId: "",
      deleteCatItemId: "",
      deleteName: "",
      setDialogName: "",
      selectedId: "",
      selectedCat: "",
      selectedAvailable: "",
      deleteCatItemName: "",
      attachments: [],
      attach: "",
      itemAttach: "",
      optionAttachments: [],
      itemAttachments: [],
      overlay: true,
      visible: true,
      addId: "",
      compValue: [],
      optValue: [],
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog45: false,
      dialog5: false,
      dialog6: false,
      loading: false,
      isLoading: false,
      loading1: false,
      loading2: false,
      loading2: false,
      preOrd: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading11: false,
      countId: "",
      counter: [],
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        required2: (value) =>
          !/[^a-zA-Z0-9&()\s]/.test(value) ||
          "Only letters, numbers, & and bracket are allowed.",
      },
      markRules: [(v) => /^[0-9]*$/.test(v) || "Price must be only numbers"],
      numberRules: [
        (value) => !!value || "Required.",
        (v) => /^[0-9]*$/.test(v) || "Price must be only numbers",
      ],
      radios: "Thank you soo much, we will keep improving",
    };
  },
  computed: {
    vendor() {
      return this.$store.getters.getVendor;
    },
    preorder_time(){
      return this.minDate.substr(0, 10)+' '+this.timepicker
    },
    disabBtn() {
    if (this.preorderAns !== null) {
      return this.preorderAns? this.timepicker != null: this.picker != null
    }else{
      return false
    }
    },
    tagsList() {
      return this.$store.getters.getTags;
    },
    tags() {
      const sn = this;
      var tags = sn.tagsList.filter((item) => {
        return item.type.toLowerCase() === sn.vendor.type.toLowerCase();
      });
      return tags;
    },
    type() {
      return !(this.vendor.type.toLowerCase() === "food");
    },

    serve() {
      return !(this.vendor.type.toLowerCase() === "services");
    },
    menu() {
      return this.$store.getters.getMenu;
    },
    options() {
      return this.$store.getters.getOptions;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    filtered() {},
    list() {
      return this.$store.getters.getList;
    },
    mainOptionsList() {
      return this.$store.getters.getMainOptionsList;
    },
    mainOptions() {
      return this.$store.getters.getMainOptions;
    },
    items() {
      return this.$store.getters.getItems;
    },
  },
  mounted() {
    this.$store.dispatch("loadOptions");
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let n = to;
      // access to component instance via `vm`
      vm.$store.dispatch("loadItems", {
        id: n.params.id,
      });
    });
  },
  methods: {
            getEndTime(x){
     return this.minDate.substr(0, 10)+' '+ x
    },
    tagged(x) {
      this.taggedText = x;
    },
    counterValue(x) {
      const sn = this;
      var item = sn.counter.find((element) => {
        return element.id === x;
      });
      if (item) {
        return item.count;
      } else {
        return 0;
      }
    },
    count(x, y) {
      const sn = this;
      sn.countId = x;
      if (!sn.counter.length && !sn.isloading) {
        var d = {};
        sn.isLoading = false;
        // axios.get("/item/count_orders?id=" + x + "&cat_id=" + y).then(res => {
        //   d.id = x;
        //   d.count = res.data.count;
        //   sn.counter.push(d);
        //   setTimeout(() => {
        //     sn.isLoading = false;
        //   }, 1000);
        // });
      } else {
        var isCounted = sn.counter.find((element) => {
          return element.id === x;
        });
        if (isCounted && !sn.isLoading) {
          return;
        } else {
          sn.isLoading = false;
          var d = {};
          // axios
          //   .get("/item/count_orders?id=" + x + "&cat_id=" + y)
          //   .then(res => {
          //     d.id = x;
          //     d.count = res.data.count;
          //     sn.counter.push(d);
          //     setTimeout(() => {
          //       sn.isLoading = false;
          //     }, 1000);
          //   });
          return;
        }
      }
    },
    addCategory() {
      var sn = this;
      if (sn.$refs.form.validate()) {
        sn.loading = true;
        axios
          .post("/category/save", {
            content: sn.content,
            vendor_id: sn.vendor.id,
            vendor_name: sn.vendor.name,
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id,
            });
            sn.dialog = false;
            sn.loading = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category added",
            });
          })
          .catch(function(error) {
            sn.loading = false;
            sn.dialog = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured",
            });
          });
      }
    },
    editCategory(x, y) {
      var sn = this;
      if (sn.$refs.form2.validate()) {
        sn.loading1 = true;
        axios
          .post("/category/update", {
            id: y,
            content: x,
            tag: sn.taggedText,
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id,
            });
            sn.loading1 = false;
            sn.dialog1 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category edited",
            });
          })
          .catch(function(error) {
            sn.dialog1 = false;
            sn.loading1 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured",
            });
          });
      }
    },
    editCategoryItem() {
      var sn = this;
      if (sn.$refs.form45.validate()) {
        var comp = [];
        var compa = [];
        if (sn.compValue) {
          var g = sn.compValue.forEach((element) => {
            comp.push(
              sn.mainOptions.find((item) => {
                return item.name === element;
              })
            );
          });
          compa = comp.map((item) => {
            return item.id;
          });
        }
        var opt = [];
        var opta = [];
        if (sn.optValue) {
          var h = sn.optValue.forEach((element) => {
            opt.push(
              sn.mainOptions.find((item) => {
                return item.name === element;
              })
            );
          });
          opta = opt.map((item) => {
            return item.id;
          });
        }
        sn.loading6 = true;
        sn.dialog45 = true;
        sn.dialog6 = false;
        axios
          .post("/item/update", {
            cat_id: sn.editCatId,
            name: sn.editCatItemName,
            item_id: sn.editCatItemId,
            cost_price: sn.editCatItemCostPrice,
            description: sn.editCatItemDescription,
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id,
            });
            sn.loading6 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Item edited",
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading6 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured",
            });
          });
      }
    },
    deleteCategory(x) {
      const sn = this;
      if (sn.deleteId != "") {
        sn.loading2 = true;
        sn.dialog2 = false;
        sn.dialog45 = true;
        axios
          .post("/category/delete", {
            id: x,
          })
          .then(function(response) {
            console.log(response.data);
            sn.loading2 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category deleted",
            });
            sn.$router.push("/");
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading2 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured",
            });
          });
      }
    },
    deleteItem(x, y) {
      var sn = this;
      if (sn.deleteCatItemId != "") {
        sn.loading4 = true;
        sn.dialog4 = false;
        sn.dialog45 = true;
        axios
          .post("/item/delete", {
            cat_id: x,
            item_id: y,
          })
          .then(function(response) {
            var d = response.data.message;
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id,
            });
            sn.loading4 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: d,
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading4 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured",
            });
          });
      }
    },
    editCat(x, y) {
      var sn = this;
      this.taggedText = null;
      sn.editContent = x;
      sn.editId = y;
      sn.dialog1 = true;
    },
    preorderBtnDirect(e, i, o, u) {
      var sn = this;
      sn.selectedAvailable = !e;
      sn.preOrd = true;
      sn.selectedId = o;
      sn.selectedCat = u;
      sn.timepicker = null
      sn.picker = null
      sn.preorderAns = null
     sn.preorder()

    },
    preorderBtn(e, i, o, u) {
      var sn = this;
      sn.selectedAvailable = !e;
      sn.preOrd = true;
      sn.selectedId = o;
      sn.selectedCat = u;
      sn.timepicker = null
      sn.picker = null
      sn.preorderAns = null
      if (e) {
        sn.setDialogName = "Preorder Off";
        sn.dialog3 = true;
      } else {
        sn.setDialogName = "Preorder On";
        sn.dialog4 = true;
      }

    },
    offFood(e, i, o, u) {
      var sn = this;
      sn.preOrd = false;
      if (e) {
        sn.setDialogName = "Off";
      } else {
        sn.setDialogName = "On";
      }
      sn.selectedAvailable = !e;
      sn.selectedId = o;
      sn.selectedCat = u;
      sn.dialog3 = true;
    },
    preorder() {
      var sn = this;
      sn.loading3 = true;
      sn.dialog4 = false;
      sn.dialog3 = false;
      sn.dialog45 = true;
      var value_preorder = sn.preorderAns? sn.timepicker : sn.picker
      var type_preorder = sn.preorderAns? 'time' : 'day'
      axios
        .post("/item/preorder", {
          item_id: sn.selectedId,
          cat_id: sn.selectedCat,
          preorder: sn.selectedAvailable,
          preorder_type: sn.selectedAvailable? type_preorder : null,
          preorder_value: sn.selectedAvailable? value_preorder : null
        })
        .then(function(response) {
          let d = response.data.message;
          // sn.$store.dispatch("loadOptions");
          sn.$store.dispatch("loadItems", {
            id: sn.$route.params.id,
          });
          sn.loading3 = false;
          sn.dialog45 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: d,
          });
        })
        .catch(function(error) {
          sn.dialog45 = false;
          sn.loading3 = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: "Error occured",
          });
        });
    },
    offItem() {
      var sn = this;
      sn.loading3 = true;
      sn.dialog3 = false;
      sn.dialog45 = true;
      axios
        .post("/item/available", {
          item_id: sn.selectedId,
          cat_id: sn.selectedCat,
          availability: sn.selectedAvailable,
        })
        .then(function(response) {
          let d = response.data.message;
          // sn.$store.dispatch("loadOptions");
          sn.$store.dispatch("loadItems", {
            id: sn.$route.params.id,
          });
          sn.loading3 = false;
          sn.dialog45 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: d,
          });
        })
        .catch(function(error) {
          sn.dialog45 = false;
          sn.loading3 = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: "Error occured",
          });
        });
    },
    editCatItem(a, b, c, d, e) {
      var sn = this;
      sn.editCatId = a;
      sn.editCatItemId = b;
      sn.editCatItemName = c;
      sn.editCatItemCostPrice = d;
      sn.editCatItemDescription = e;
      sn.dialog6 = true;
    },
    addCat(x, y) {
      var sn = this;
      sn.addContent = x;
      sn.addId = y;
      sn.dialog5 = true;
    },
    deleteCat(x, y) {
      this.deleteId = y;
      this.deleteName = x;
      this.dialog2 = true;
    },
    deleteCatItem(x, y, z) {
      this.deleteCatId = x;
      this.deleteCatItemId = y;
      this.deleteCatItemName = z;
      this.dialog4 = true;
    },
    fieldChange(e) {
      this.attachments = [];
      let selectedFile = e;
      if (!selectedFile.length) {
        return false;
      }
      for (let i = 0; i < selectedFile.length; i++) {
        this.attachments.push(selectedFile[i]);
      }
    },
    optionFieldChange(e, i) {
      this.attach = i;
      this.optionAttachments = [];
      let selectedFile = e.target.files;
      if (!selectedFile.length) {
        return false;
      }
      for (let i = 0; i < selectedFile.length; i++) {
        this.optionAttachments.push(selectedFile[i]);
      }
    },
    itemFieldChange(e) {
      this.itemAttachments = [];
      let selectedFile = e.target.files;
      if (!selectedFile.length) {
        return false;
      }
      for (let i = 0; i < selectedFile.length; i++) {
        this.itemAttachments.push(selectedFile[i]);
      }
    },
    fieldChanges(e) {
      this.attachments = [];
      let selectedFile = e;
      if (!selectedFile.length) {
        return false;
      }
      for (let i = 0; i < selectedFile.length; i++) {
        this.attachments.push(selectedFile[i]);
      }
    },
    addCategoryItem(x) {
      var sn = this;
      if (sn.$refs.form4.validate()) {
        sn.loading5 = true;
        sn.dialog45 = true;
        var comp = [];
        var compa = [];
        if (sn.compulsory) {
          var g = sn.compulsory.forEach((element) => {
            comp.push(
              sn.mainOptions.find((item) => {
                return item.name === element;
              })
            );
          });
          compa = comp.map((item) => {
            return item.id;
          });
        }
        var opt = [];
        var opta = [];
        if (sn.optional) {
          var h = sn.optional.forEach((element) => {
            opt.push(
              sn.mainOptions.find((item) => {
                return item.name === element;
              })
            );
          });
          opta = opt.map((item) => {
            return item.id;
          });
        }
        var cost = !sn.serve ? 0 : sn.cost_price;
        const fd = new FormData();
        fd.append("name", sn.name);
        fd.append("cost_price", cost);
        fd.append("mark_up_price", sn.mark_up_price);
        fd.append("description", sn.description);
        fd.append("compulsory", JSON.stringify(compa));
        fd.append("optional", JSON.stringify(opta));
        fd.append("generic", sn.name);
        fd.append("tel", sn.tel);
        fd.append("ig", sn.ig);
        fd.append("address", sn.address);
        fd.append("category_id", sn.addId);
        fd.append("category_name", sn.addContent);
        if (sn.$refs.file2.$refs.input.files.length) {
          for (var i = 0; i < sn.$refs.file2.$refs.input.files.length; i++) {
            let file = sn.$refs.file2.$refs.input.files[i];
            fd.append("files[" + i + "]", file);
          }
        }
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        sn.dialog5 = false;
        axios
          .post("/item/save", fd, config)
          .then(() => {
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id,
            });
            sn.attachments = [];
            sn.loading5 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Item added successfully",
            });
          })
          .catch(() => {
            sn.attachments = [];
            sn.$store.dispatch("snack", {
              color: "red",
              text: "An error occured",
            });
            sn.loading5 = false;
            sn.dialog5 = false;
            sn.dialog45 = false;
          });
      }
    },
    editItemImage(x, y) {
      var sn = this;
      if (sn.itemAttachments.length) {
        sn.loading11 = true;
        const fd = new FormData();
        fd.append("cat_id", x);
        fd.append("item_id", y);
        var file = sn.$refs.file81.files[0];
        fd.append("files[" + 0 + "]", file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post("/item/image", fd, config)
          .then((res) => {
            var d = res.data;
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id,
            });
            sn.itemAttachments = [];
            sn.loading11 = false;
            sn.itemAttach = null;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Image edited",
            });
          })
          .catch((err) => {
            sn.itemAttachments = [];
            sn.itemAttach = null;
            sn.$store.dispatch("snack", {
              color: "red",
              text: err,
            });
            sn.loading11 = false;
          });
      } else {
        sn.itemAttach = null;
      }
    },
    openImageInput(i) {
      this.optionAttachments = [];
      this.$refs.file8[i].click();
    },
    openItemImageInput(d) {
      this.itemAttach = d;
      this.itemAttachments = [];
      this.$refs.file81.click();
    },
  },
};
</script>
