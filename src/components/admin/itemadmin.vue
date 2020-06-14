<template>
  <div>
    <v-row class="py-3 mt-5 mb-12 px-3">
      <v-flex xs12 class="mb-3 pt-0 px-0">
        <v-card-title
          class="pt-0 body-1 text-right font-weight-medium px-0 grey--text"
        >
          <v-btn
            depressed
            rounded
            class="mx-auto elevation-5 caption font-weight-black white--text "
            dark
            @click="dialog = true"
            color="orange darken-4"
          >
            add category <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card flat tile color="white">
          <v-container fluid>
            <v-row justify="space-around">
              <v-col v-if="!type" class="text-center pa-0" cols="12">
                <mainOptions />
              </v-col>
              <v-col v-if="!type" class="px-3 text-center py-1" cols="12">
                <v-card
                  color="transparent"
                  flat
                  tile
                  class="mx-auto"
                  max-width="600px"
                >
                  <v-expansion-panels
                    accordion
                    class="elevation-0"
                    style="border-radius:25px"
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <h3 class="grey--text text--darken-1 text-capitalize">
                          Options
                        </h3>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-row justify="space-around">
                          <v-btn
                            @click="dialog5 = true"
                            text
                            x-small
                            color="grey"
                            ><v-icon>mdi-plus</v-icon>add option</v-btn
                          >
                        </v-row>
                        <v-divider class="my-4"></v-divider>
                        <v-progress-linear
                          v-if="dialog45"
                          indeterminate
                          color="grey lighten-1"
                        ></v-progress-linear>
                        <v-flex
                          class="my-2 px-1"
                          xs12
                          v-for="(n, i) in options"
                          :key="n.id"
                        >
                          <v-card
                            :disabled="dialog45"
                            width="90%"
                            height="auto"
                            flat
                            color="grey lighten-5"
                            style=" border-radius:30px"
                            class="mx-auto mb-2 py-1 px-2"
                          >
                            <v-list-item class="pa-0">
                              <v-list-item-avatar
                                size="30"
                                class="my-0 elevation-1 mr-2"
                              >
                                <v-img
                                  @click="openImageInput(i)"
                                  :src="n.image"
                                ></v-img>
                                <v-overlay
                                  absolute
                                  opacity="0.3"
                                  z-index="1"
                                  :value="attach === i"
                                ></v-overlay>
                                <v-btn
                                  :loading="loading8"
                                  style="z-index:7"
                                  dark
                                  absolute
                                  x-small
                                  rounded
                                  icon
                                  v-show="attach === i"
                                  color="orange"
                                  class="mt-0 mb-0 mx-4"
                                  @click="editOptionImage(n.id, i)"
                                >
                                  <v-icon color="orange lighten-4" dark
                                    >mdi-cloud-upload</v-icon
                                  >
                                </v-btn>
                              </v-list-item-avatar>
                              <input
                                v-show="false"
                                ref="file8"
                                type="file"
                                @change="optionFieldChange($event, i)"
                              />
                              <v-list-item-title
                                @blur="n.status === false"
                                @click="n.status = !n.status"
                                style
                                class="py-0"
                              >
                                <v-layout row wrap>
                                  <v-flex xs8>
                                    <h2
                                      style="text-decoration: none;"
                                      class="py-0 text-left px-3 body-2 grey--text text-capitalize text-truncate text--darken-1 font-weight-bold my-0"
                                    >
                                      <v-icon
                                        size="9px"
                                        :color="n.available ? 'green' : 'red'"
                                        >mdi-circle</v-icon
                                      >
                                      {{ n.name }}
                                    </h2>
                                  </v-flex>
                                  <v-slide-x-reverse-transition>
                                    <v-flex
                                      v-show="!n.status"
                                      style="
            position: absolute; right: -2px; z-index:99; top: -3px;"
                                    >
                                      <v-btn
                                        @click="
                                          editOption(
                                            n.id,
                                            n.name,
                                            n.cost_price,
                                            n.mark_up_price
                                          )
                                        "
                                        icon
                                        text
                                        color="grey lighten-2"
                                        small
                                        class="mt-1 mr-1"
                                      >
                                        <v-icon>mdi-pencil-outline</v-icon>
                                      </v-btn>
                                      <v-btn
                                        icon
                                        text
                                        @click="deleteOption(n.id, n.name)"
                                        color="grey lighten-2"
                                        small
                                        class="mt-1 mr-1"
                                      >
                                        <v-icon>mdi-trash-can</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-slide-x-reverse-transition>
                                  <v-slide-x-transition>
                                    <v-switch
                                      v-show="!n.status"
                                      @click.prevent="
                                        offOption(n.available, n.id, n.name)
                                      "
                                      style="position: absolute;transform: rotate(270deg);top: 15px;right: -25px;"
                                      v-model="n.available"
                                      color="grey lighten-4"
                                      class="mt-2 mb-0 pb-0"
                                    ></v-switch>
                                  </v-slide-x-transition>
                                </v-layout>
                                <p
                                  style="padding-left:10px;"
                                  class="text-left caption font-weight-regular grey--text text--darken-1 mb-0"
                                >
                                  <v-icon
                                    size="11.5px"
                                    style="width: 4.8px; padding-bottom:1.8px; margin-left:7px"
                                    >mdi-currency-ngn</v-icon
                                  >
                                  {{ n.price | price }}
                                </p>
                                <p class="mb-0">
                                  <span class="d-flex justify mb-0 mt-0"></span>
                                </p>
                              </v-list-item-title>
                            </v-list-item>
                          </v-card>
                        </v-flex>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
              <input
                v-show="false"
                ref="file81"
                type="file"
                @change="itemFieldChange($event)"
              />
              <v-col
                class="px-3 py-1"
                v-for="category in menu"
                :key="category.id"
                cols="12"
              >
                <router-link
                  style="text-decoration:none;"
                  :to="'/item/' + category.id"
                >
                  <v-card
                    flat
                    color="grey lighten-5"
                    style="border-radius:25px"
                    class="mx-auto py-3 px-6"
                    max-width="600px"
                  >
                    <h4
                      class="grey--text font-weight-medium text--darken-1 text-capitalize"
                    >
                      {{ category.name }}
                    </h4>
                  </v-card>
                </router-link>
              </v-col>
              <div class="text-center">
                <v-dialog v-model="dialog" width="500" :persistent="loading">
                  <v-card>
                    <v-card-title class="body-1 grey lighten-2" primary-title
                      >Add Category <v-spacer></v-spacer>
                      <v-btn icon @click="dialog = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      ></v-card-title
                    >
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
                          small
                          :loading="loading"
                          @click="addCategory()"
                          >submit</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog5" width="500" :persistent="loading5">
                  <v-card>
                    <v-card-title class="body-1 grey lighten-2" primary-title
                      >Add Option <v-spacer></v-spacer>
                      <v-btn icon @click="dialog5 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      ></v-card-title
                    >
                    <v-form onSubmit="return false;" ref="form5">
                      <v-card-text>
                        <v-text-field
                          v-model="optionname"
                          autofocus
                          @keyup.enter.native="addExtra"
                          :rules="[rules.required]"
                          validate-on-blur
                          label="Name"
                        ></v-text-field>
                        <v-text-field
                          class="font-weight-regular grey--text text--darken-4"
                          label="Cost Price"
                          v-model="optioncostprice"
                          placeholder="10000"
                          :rules="numberRules"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                        ></v-text-field>
                        <v-text-field
                          class="font-weight-regular grey--text text--darken-4"
                          label="Mark up"
                          v-model="optionmarkupprice"
                          placeholder="10000"
                          :rules="numberRules"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                        ></v-text-field>
                        <v-flex xs12>
                          <v-file-input
                            class="font-weight-regular grey--text text--darken-4"
                            ref="file"
                            multiple
                            @change="fieldChange"
                            prepend-icon="mdi-camera"
                            placeholder="Item picture"
                            label="Image"
                          ></v-file-input>
                        </v-flex>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="orange"
                          class="px-3 mx-auto"
                          rounded
                          dark
                          small
                          :loading="loading5"
                          @click="addOptionItem()"
                          >submit</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog6" width="500" :persistent="loading6">
                  <v-card>
                    <v-card-title class="body-1 grey lighten-2" primary-title
                      >Edit option <v-spacer></v-spacer>
                      <v-btn icon @click="dialog6 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      ></v-card-title
                    >
                    <v-form onSubmit="return false;" ref="form5">
                      <v-card-text>
                        <v-text-field
                          v-model="editoptionname"
                          autofocus
                          @keyup.enter.native="editOptionItem"
                          :rules="[rules.required]"
                          validate-on-blur
                          label="Name"
                        ></v-text-field>
                        <v-text-field
                          @keyup.enter.native="editOptionItem"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Cost price"
                          v-model="editoptioncostprice"
                          :rules="numberRules"
                          placeholder="0"
                          hint="put only number eg '1000' not '1,000'"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                        ></v-text-field>
                        <v-text-field
                          @keyup.enter.native="editOptionItem"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Mark up"
                          v-model="editoptionmarkupprice"
                          :rules="numberRules"
                          placeholder="0"
                          hint="put only number eg '1000' not '1,000'"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                        ></v-text-field>
                        <v-flex xs12></v-flex>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="orange"
                          class="px-3 mx-auto"
                          rounded
                          dark
                          depressed=""
                          :loading="loading6"
                          @click="editOptionItem()"
                          >edit</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog2" width="500" :persistent="loading2">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title
                      >Edit category <v-spacer></v-spacer>
                      <v-btn icon @click="dialog2 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <v-form onSubmit="return false;" ref="form2">
                      <v-card-text>
                        <v-text-field
                          v-model="editContent"
                          autofocus
                          @keyup.enter.native="
                            editCategory(editContent, editId)
                          "
                        ></v-text-field>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="orange"
                          class="px-3 mx-auto"
                          rounded
                          dark
                          small
                          :disabled="editContent.length < 2"
                          :loading="loading2"
                          @click="editCategory(editContent, editId)"
                          >edit</v-btn
                        >
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" width="500">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title
                      >Delete category and its Items?
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog3 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        :loading="loading3"
                        @click="deleteCategory(deleteId)"
                        >sure</v-btn
                      >
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog3 = false"
                        >cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog35" width="500">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title
                      >Turn {{ offName }}? <v-spacer></v-spacer>
                      <v-btn icon @click="dialog35 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        :loading="loading35"
                        @click="offItem()"
                        >sure</v-btn
                      >
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog35 = false"
                        >cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog355" width="500">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title
                      >Turn {{ offoptionName }}?
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog355 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      ></v-card-title
                    >
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="blue"
                        class="px-3 mx-auto"
                        rounded
                        depressed
                        dark
                        small
                        :loading="loading355"
                        @click="offOptionMain()"
                        >sure</v-btn
                      ><v-btn
                        color="grey"
                        class="px-3 mx-auto"
                        rounded
                        depressed
                        dark
                        small
                        @click="dialog355 = false"
                        >cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog7" width="500">
                  <v-card>
                    <v-card-title class="body-1 grey lighten-2" primary-title
                      >Delete option?
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog7 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn
                        color="blue"
                        class="px-3 mx-auto"
                        rounded
                        depressed
                        dark
                        small
                        :loading="loading7"
                        @click="optionDelete(deleteOptionId)"
                        >sure</v-btn
                      ><v-btn
                        color="grey"
                        class="px-3 mx-auto"
                        rounded
                        depressed
                        dark
                        small
                        @click="dialog7 = false"
                        >cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog9" width="500">
                  <v-card>
                    <v-card-title class="body-1 grey lighten-2" primary-title
                      >Remove option?

                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog9 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      ></v-card-title
                    >
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        :loading="loading9"
                        @click="optionDetach(detachOptionId)"
                        >sure</v-btn
                      >
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog9 = false"
                        >cancel</v-btn
                      >
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
<script>
import axios from "axios";
import mainOptions from "./options.vue";

export default {
  components: {
    mainOptions
  },
  data() {
    return {
      content: "",
      name: "",
      description: "",
      category_name: "",
      generic: "",
      price: "",
      editoptioncostprice: "",
      editoptionmarkupprice: "",
      editoptionname: "",
      editoptionid: "",
      editCatId: "",
      editCatitemId: "",
      editCatItemName: "",
      editCatItemDescription: "",
      editCatItemCostPrice: "",
      editCatItemMarkUp: "",
      editContent: "",
      editId: "",
      optionname: "",
      optional: [],
      optionmarkupprice: "",
      optioncostprice: "",
      compulsory: [],
      deleteId: "",
      deleteCatId: "",
      deleteCatItemId: "",
      deleteOptionId: "",
      detachOptionId: "",
      deleteName: "",
      offName: "",
      offoptionName: "",
      offoptionName2: "",
      offId: "",
      offoptionId: "",
      offCat: "",
      offAvailable: "",
      offoptionAvailable: "",
      deleteCatItemName: "",
      deleteOptionName: "",
      detachOptionName: "",
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
      dialog2: false,
      dialog3: false,
      dialog35: false,
      dialog355: false,
      dialog4: false,
      dialog45: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog9: false,
      dialog8: false,
      dialog10: false,
      loading: false,
      loading2: false,
      loading3: false,
      loading35: false,
      loading355: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading81: false,
      loading8: false,
      loading9: false,
      loading10: false,
      loading11: false,
      valid: true,
      rules: {
        required: value => !!value || "Required.",
      },
      numberRules: [v => /^[0-9]*$/.test(v) || "Price must be only numbers"],
      radios: "Thank you soo much, we will keep improving"
    };
  },
  computed: {
    vendor() {
      return this.$store.getters.getVendor;
    },
    menu() {
      return this.$store.getters.getMenu;
    },
    options() {
      return this.$store.getters.getOptions;
    },
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
    type() {
      return !(this.vendor.type.toLowerCase() === "food");
    }
  },
  created() {
    this.$store.dispatch("loadPage");
  },
  methods: {
    addCategory() {
      var sn = this;
      if (sn.$refs.form.validate()) {
        sn.loading = true;
        axios
          .post("/category/save", {
            content: sn.content,
            vendor_id: sn.vendor.id,
            vendor_name: sn.vendor.name
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadCategories");
            sn.dialog = false;
            sn.loading = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category added"
            });
          })
          .catch(function(error) {
            sn.loading = false;
            sn.dialog = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    editCategory(x, y) {
      var sn = this;
      if (sn.$refs.form2.validate()) {
        sn.loading2 = true;
        axios
          .post("/category/update", {
            id: y,
            content: x
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              name: sn.vendor.name
            });
            sn.loading2 = false;
            sn.dialog2 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category edited"
            });
          })
          .catch(function(error) {
            sn.dialog2 = false;
            sn.loading2 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
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
          var g = sn.compValue.forEach(element => {
            comp.push(
              sn.mainOptions.find(item => {
                return item.name === element;
              })
            );
          });
          compa = comp.map(item => {
            return item.id;
          });
        }
        var opt = [];
        var opta = [];
        if (sn.optValue) {
          var h = sn.optValue.forEach(element => {
            opt.push(
              sn.mainOptions.find(item => {
                return item.name === element;
              })
            );
          });
          opta = opt.map(item => {
            return item.id;
          });
        }
        sn.loading81 = true;
        sn.dialog45 = true;
        sn.dialog8 = false;
        axios
          .post("/item/update", {
            cat_id: sn.editCatId,
            item_id: sn.editCatItemId,
            name: sn.editCatItemName,
            compulsory: JSON.stringify(compa),
            optional: JSON.stringify(opta),
            cost_price: sn.editCatItemCostPrice,
            mark_up_price: sn.editCatItemMarkUp,
            description: sn.editCatItemDescription
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems");
            sn.loading81 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Item edited"
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading81 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    deleteCategory(x) {
      var sn = this;
      if (sn.deleteId != "") {
        sn.loading3 = true;
        sn.dialog3 = false;
        sn.dialog45 = true;
        axios
          .post("/category/delete", {
            id: x
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadCategories", {
              name: sn.vendor.name
            });
            sn.loading3 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category deleted"
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading3 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    deleteItem(x, y) {
      var sn = this;
      if (sn.deleteCatItemId != "") {
        sn.loading10 = true;
        sn.dialog10 = false;
        sn.dialog45 = true;
        axios
          .post("/item/delete", {
            cat_id: x,
            item_id: y
          })
          .then(function(response) {
            var d = response.data.message;
            sn.$store.dispatch("loadItems");
            sn.loading10 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: d
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading10 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    optionDelete(x) {
      var sn = this;
      if (sn.deleteOptionId != "") {
        sn.loading7 = true;
        sn.dialog7 = false;
        sn.dialog45 = true;
        axios
          .post("/options/delete", {
            id: x
          })
          .then(() => {
            sn.$store.dispatch("loadOptions");
            sn.loading7 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Option deleted"
            });
          })
          .catch(() => {
            sn.dialog45 = false;
            sn.loading7 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    editOptionItem() {
      var sn = this;
      if (sn.$refs.form5.validate()) {
        sn.loading6 = true;
        sn.dialog6 = false;
        sn.dialog45 = true;
        axios
          .post("/options/update", {
            name: sn.editoptionname,
            cost_price: sn.editoptioncostprice,
            mark_up_price: sn.editoptionmarkupprice,
            id: sn.editoptionid
          })
          .then(function(response) {
            let d = response.data.message;
            sn.$store.dispatch("loadOptions");
            sn.loading6 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: d
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading6 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    editCat(x, y) {
      var sn = this;
      sn.editContent = x;
      sn.editId = y;
      sn.dialog2 = true;
    },
    offFood(e, i, o, u) {
      var sn = this;
      if (e) {
        sn.offName = "Off";
      } else {
        sn.offName = "On";
      }
      sn.offAvailable = !e;
      sn.offId = o;
      sn.offCat = u;
      sn.dialog35 = true;
    },
    offOption(e, o, r) {
      var sn = this;
      if (e) {
        sn.offoptionName = "Off";
      } else {
        sn.offoptionName = "On";
      }
      sn.offoptionAvailable = !e;
      sn.offoptionId = o;
      sn.offoptionName2 = r;
      sn.dialog355 = true;
    },
    offItem() {
      var sn = this;
      sn.loading35 = true;
      sn.dialog35 = false;
      sn.dialog45 = true;
      axios
        .post("/item/available", {
          item_id: sn.offId,
          cat_id: sn.offCat,
          availability: sn.offAvailable
        })
        .then(function(response) {
          let d = response.data.message;
          // sn.$store.dispatch("loadOptions");
          sn.$store.dispatch("loadItems");
          sn.loading35 = false;
          sn.dialog45 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: d
          });
        })
        .catch(function(error) {
          sn.dialog45 = false;
          sn.loading35 = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: "Error occured"
          });
        });
    },
    offOptionMain() {
      var sn = this;
      sn.loading355 = true;
      sn.dialog355 = false;
      sn.dialog45 = true;
      axios
        .post("/options/available", {
          id: sn.offoptionId,
          availability: sn.offoptionAvailable
        })
        .then(function(response) {
          let d = response.data.message;
          sn.$store.dispatch("loadOptions");
          // sn.$store.dispatch("loadItems");
          sn.loading355 = false;
          sn.dialog45 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: d
          });
        })
        .catch(function(error) {
          sn.dialog45 = false;
          sn.loading355 = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: "Error occured"
          });
        });
    },

    editOption(x, y, z) {
      var sn = this;
      sn.editoptionid = x;
      sn.editoptionname = y;
      if (z === null) {
        sn.editoptioncostprice = 0;
        sn.editoptionmarkupprice = 0;
      } else {
        sn.editoptioncostprice = z;
      }
      sn.dialog6 = true;
    },
    deleteOption(x, y) {
      this.deleteOptionId = x;
      this.deleteOptionName = y;
      this.dialog7 = true;
    },
    detachOption(x, y) {
      this.detachOptionId = x;
      this.detachOptionName = y;
      this.dialog9 = true;
    },
    addCat(x, y) {
      var sn = this;
      sn.addContent = x;
      sn.addId = y;
      sn.dialog4 = true;
    },
    deleteCat(x, y) {
      this.deleteId = y;
      this.deleteName = x;
      this.dialog3 = true;
    },
    deleteCatItem(x, y, z) {
      this.deleteCatId = x;
      this.deleteCatItemId = y;
      this.deleteCatItemName = z;
      this.dialog10 = true;
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
        sn.loading4 = true;
        sn.dialog45 = true;
        var comp = [];
        var compa = [];
        if (sn.compulsory) {
          compa = comp.map(item => {
            return item.id;
          });
        }
        var opt = [];
        var opta = [];

        opta = opt.map(item => {
          return item.id;
        });
      }
      const fd = new FormData();
      fd.append("name", sn.name);
      fd.append("cost_price", sn.cost_price);
      fd.append("mark_up_price", sn.mark_up_price);
      fd.append("description", sn.description);
      fd.append("compulsory", JSON.stringify(compa));
      fd.append("optional", JSON.stringify(opta));
      fd.append("generic", sn.name);
      fd.append("category_id", sn.addId);
      fd.append("category_name", sn.addContent);
      for (var i = 0; i < sn.$refs.file2.$refs.input.files.length; i++) {
        let file = sn.$refs.file2.$refs.input.files[i];
        fd.append("files[" + i + "]", file);
      }
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      sn.dialog4 = false;
      axios
        .post("/item/save", fd, config)
        .then(res => {
          sn.$store.dispatch("loadItems");
          sn.attachments = [];
          sn.loading4 = false;
          sn.dialog45 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: "Item added successfully"
          });
        })
        .catch(err => {
          sn.attachments = [];
          sn.$store.dispatch("snack", {
            color: "red",
            text: err
          });
          sn.loading4 = false;
          sn.dialog4 = false;
          sn.dialog45 = false;
        });
    },
    addOptionItem() {
      const sn = this;
      if (sn.$refs.form5.validate()) {
        sn.loading5 = true;
        sn.dialog5 = false;
        sn.dialog45 = true;
        const fd = new FormData();
        fd.append("name", sn.optionname);
        fd.append("cost_price", sn.optioncostprice);
        fd.append("mark_up_price", sn.optionmarkupprice);
        if (sn.$refs.file.$refs.input.files.length) {
          for (var i = 0; i < sn.$refs.file.$refs.input.files.length; i++) {
            let file = sn.$refs.file.$refs.input.files[i];
            fd.append("files[" + i + "]", file);
          }
        }
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post("/options/save", fd, config)
          .then(() => {
            sn.$store.dispatch("loadOptions");
            sn.attachments = [];
            sn.loading5 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Option item added"
            });
          })
          .catch(err => {
            sn.attachments = [];
            sn.$store.dispatch("snack", {
              color: "red",
              text: err
            });
            sn.loading5 = false;
            sn.dialog45 = false;
          });
      }
    },
    editOptionImage(x, i) {
      var sn = this;
      if (smain_Attachments.length) {
        sn.loading8 = true;
        const fd = new FormData();
        fd.append("id", x);
        var file = sn.$refs.file8[i].files[0];
        fd.append("files[" + i + "]", file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post("/options/image", fd, config)
          .then(res => {
            var d = res.data;
            sn.$store.dispatch("loadOptions");
            smain_Attachments = [];
            sn.loading8 = false;
            sn.attach = null;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Image edited"
            });
          })
          .catch(err => {
            smain_Attachments = [];
            sn.attach = null;
            sn.$store.dispatch("snack", {
              color: "red",
              text: err
            });
            sn.loading8 = false;
          });
      } else {
        sn.attach = null;
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
          .then(res => {
            var d = res.data;
            sn.$store.dispatch("loadItems");
            sn.itemAttachments = [];
            sn.loading11 = false;
            sn.itemAttach = null;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Image edited"
            });
          })
          .catch(err => {
            sn.itemAttachments = [];
            sn.itemAttach = null;
            sn.$store.dispatch("snack", {
              color: "red",
              text: err
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
    }
  }
};
</script>
