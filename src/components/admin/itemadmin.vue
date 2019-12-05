<template>
  <div>
    <v-row class="py-3 mb-12 px-3">
      <v-flex xs12 class="mb-3 pt-0 px-0">
        <v-card-title class="pt-0 body-1 text-right font-weight-medium px-0 grey--text">
          <v-btn class="mx-auto" @click="dialog=true" x-small text color="primary">
            <v-icon>mdi-plus</v-icon>add category
          </v-btn>
          <v-btn class="mx-auto" @click="dialog5 =true" x-small text color="warning">
            <v-icon>mdi-plus</v-icon>add option
          </v-btn>
        </v-card-title>
        <v-card flat tile color="transparent">
          <v-container fluid>
            <v-row justify="space-around">
              <v-col class="text-center pa-0" cols="12">
                <mainOptions />
              </v-col>
              <v-col class="px-3 text-center" cols="12">
                <v-card class="mx-auto" max-width="600px">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <h3 class="grey--text text--darken-1 text-capitalize">Options</h3>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-divider class="mb-1"></v-divider>
                        <v-progress-linear v-if="dialog45" indeterminate color="grey lighten-1"></v-progress-linear>
                        <v-flex class="my-2 px-5" xs12 v-for="(n, i) in options" :key="n.id">
                          <v-card
                            :disabled="dialog45"
                            width="95%"
                            height="50px"
                            color="transparent"
                            style="border-radius:4px"
                            class="mx-auto mb-2 py-1 px-1"
                          >
                            <v-list-item class="pa-0">
                              <v-list-item-avatar
                                size="30"
                                tile
                                style="border-radius: 4px;"
                                class="my-0 elevation-1 mr-2"
                              >
                                <v-img @click="openImageInput(i)" :src="n.image"></v-img>
                                <v-overlay absolute opacity="0.3" z-index="1" :value="attach === i"></v-overlay>
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
                                  <v-icon color="orange lighten-4" dark>mdi-cloud-upload</v-icon>
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
                                      >mdi-circle</v-icon>
                                      {{n.name}}
                                    </h2>
                                  </v-flex>
                                  <v-slide-x-reverse-transition>
                                    <v-flex
                                      v-show="!n.status"
                                      style="
            position: absolute; right: -2px; z-index:99; top: -3px;"
                                    >
                                      <v-btn
                                        @click="editOption(n.id, n.name, n.price)"
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
                                      @click.prevent="offOption(n.available, n.id)"
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
                                    style="width: 4.8px; padding-bottom:1.8px; margin-right:3px"
                                  >mdi-currency-ngn</v-icon>
                                  {{n.price | price}}
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
              <input v-show="false" ref="file81" type="file" @change="itemFieldChange($event)" />
              <v-col class="px-3" v-for="category in menu" :key="category.id" cols="12">
                <router-link style="text-decoration:none;" :to="'/vendoradmin/item/'+category.id">
                  <v-card class="mx-auto py-3 px-6" max-width="600px">
                    <h4
                      class="grey--text font-weight-medium text--darken-1 text-capitalize"
                    >{{ category.name }}</h4>
                  </v-card>
                </router-link>
              </v-col>
              <div class="text-center">
                <v-dialog v-model="dialog" width="500" :persistent="loading">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title>Add Category</v-card-title>
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
                        >submit</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog5" width="500" :persistent="loading5">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title>Add Option</v-card-title>
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
                          label="Price"
                          v-model="optionprice"
                          placeholder="10000"
                          :rules="numberRules"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                        ></v-text-field>
                        <v-flex xs12>
                          <v-file-input
                            :rules="[rules.required]"
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
                        >submit</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog6" width="500" :persistent="loading6">
                  <v-card>
                    <v-card-title
                      class="body-2 grey lighten-2"
                      primary-title
                    >Edit {{editoptionname}}</v-card-title>
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
                          label="Price"
                          v-model="editoptionprice"
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
                          small
                          :loading="loading6"
                          @click="editOptionItem()"
                        >edit</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog2" width="500" :persistent="loading2">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title>Edit category</v-card-title>
                    <v-form onSubmit="return false;" ref="form2">
                      <v-card-text>
                        <v-text-field
                          v-model="editContent"
                          autofocus
                          @keyup.enter.native="editCategory(editContent, editId)"
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
                        >edit</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" width="200">
                  <v-card>
                    <v-card-title
                      class="body-2 grey lighten-2"
                      primary-title
                    >Delete {{deleteName}} and its Items?</v-card-title>
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
                      >sure</v-btn>
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog3=false"
                      >cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog35" width="200">
                  <v-card>
                    <v-card-title class="body-2 grey lighten-2" primary-title>Turn {{offName}}?</v-card-title>
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
                      >sure</v-btn>
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog35=false"
                      >cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog355" width="200">
                  <v-card>
                    <v-card-title
                      class="body-2 grey lighten-2"
                      primary-title
                    >Turn {{offoptionName}}?</v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        :loading="loading355"
                        @click="offOptionMain()"
                      >sure</v-btn>
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog355=false"
                      >cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog7" width="200">
                  <v-card>
                    <v-card-title
                      class="body-2 grey lighten-2"
                      primary-title
                    >Delete {{deleteOptionName}}?</v-card-title>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        :loading="loading7"
                        @click="optionDelete(deleteOptionId)"
                      >sure</v-btn>
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog7=false"
                      >cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog9" width="200">
                  <v-card>
                    <v-card-title
                      class="body-2 grey lighten-2"
                      primary-title
                    >Remove {{detachOptionName}}?</v-card-title>
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
                      >sure</v-btn>
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog9=false"
                      >cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog10" width="200">
                  <v-card>
                    <v-card-title
                      class="body-2 item-truncate grey lighten-2"
                      primary-title
                    >Delete {{deleteCatItemName}}?</v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        color="orange"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        :loading="loading10"
                        @click="deleteItem(deleteCatId, deleteCatItemId)"
                      >sure</v-btn>
                      <v-btn
                        color="red"
                        class="px-3 mx-auto"
                        rounded
                        dark
                        small
                        @click="dialog10=false"
                      >cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog4" width="500">
                  <v-card flat tile class="pb-9">
                    <v-form onSubmit="return false;" ref="form4">
                      <v-card-title
                        primary-title
                        class="grey lighten-2 body-2 mb-3"
                      >Add new item to category</v-card-title>
                      <div class="px-5 pb-9">
                        <v-flex xs12>
                          <v-text-field
                            class="font-weight-regular grey--text text--darken-4"
                            label="Name"
                            placeholder="eg. Jollof Rice"
                            color="orange"
                            v-model="name"
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                            class="font-weight-regular grey--text text--darken-4"
                            label="Price"
                            v-model="price"
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
                            <v-file-input
                              ref="file2"
                              @change="fieldChanges"
                              class="font-weight-regular grey--text text--darken-4"
                              prepend-icon="mdi-camera"
                              placeholder="Item picture"
                              label="Image"
                              :rules="[rules.required]"
                            ></v-file-input>
                          </v-flex>
                          <v-flex xs12>
                            <v-textarea
                              name="description"
                              label="Description (optional)"
                              color="orange"
                              v-model="description"
                              class="font-weight-regular grey--text text--darken-4"
                              placeholder="eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more."
                            ></v-textarea>
                          </v-flex>
                          <v-flex xs12>
                            <v-select
                              class="font-weight-regular grey--text text--darken-4"
                              :items="mainOptionsList"
                              attach
                              v-model="compulsory"
                              chips
                              label="Compulsory extras"
                              color="orange"
                              multiple
                            ></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select
                              class="font-weight-regular grey--text text--darken-4"
                              :items="mainOptionsList"
                              attach
                              v-model="optional"
                              chips
                              placeholder="eg. plantain, eggs, coleslaw, moi-moi"
                              label="Optional extras"
                              color="orange"
                              multiple
                            ></v-select>
                          </v-flex>
                        </v-row>

                        <v-row class="my-5 px-3" justify="space-around">
                          <v-btn
                            :loading="loading4"
                            @click="addCategoryItem(addId)"
                            class="px-6"
                            color="orange"
                            dark
                            small
                            rounded
                          >add</v-btn>
                        </v-row>
                      </div>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog8" width="500">
                  <v-card flat tile>
                    <v-form onSubmit="return false;" ref="form45">
                      <v-card-title
                        primary-title
                        class="grey lighten-2 body-2 mb-3"
                      >Edit {{editCatItemName}}</v-card-title>
                      <div class="px-5 pb-5">
                        <v-flex xs12>
                          <v-text-field
                            class="font-weight-regular grey--text text--darken-4"
                            label="Name"
                            placeholder="eg. Jollof Rice"
                            color="orange"
                            v-model="editCatItemName"
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                            class="font-weight-regular grey--text text--darken-4"
                            label="Price"
                            v-model="editCatItemPrice"
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
                              placeholder="eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more."
                            ></v-textarea>
                          </v-flex>
                          <v-flex xs12>
                            <v-select
                              :loading="!mainOptionsList.length"
                              class="font-weight-regular grey--text text--darken-4"
                              :items="mainOptionsList"
                              attach
                              v-model="compValue"
                              chips
                              placeholder="eg. meat, fish, garri, fufu"
                              label="Compulsory extras"
                              color="orange"
                              multiple
                            ></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-select
                              class="font-weight-regular grey--text text--darken-4"
                              :items="mainOptionsList"
                              :loading="!mainOptionsList.length"
                              attach
                              v-model="optValue"
                              chips
                              placeholder="eg. plantain, eggs, coleslaw, moi-moi"
                              label="Optional extras"
                              color="orange"
                              multiple
                            ></v-select>
                          </v-flex>
                        </v-row>

                        <v-row class="px-3" justify="space-around">
                          <v-btn
                            :loading="loading81"
                            @click="editCategoryItem()"
                            class="px-6"
                            color="orange"
                            dark
                            small
                            rounded
                          >edit</v-btn>
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
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";
import mainOptions from "./options.vue";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});

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
      editoptionprice: "",
      editoptionname: "",
      editoptionid: "",
      editCatId: "",
      editCatitemId: "",
      editCatItemName: "",
      editCatItemDescription: "",
      editCatItemPrice: "",
      editContent: "",
      editId: "",
      optionname: "",
      optional: [],
      optionprice: "",
      compulsory: [],
      deleteId: "",
      deleteCatId: "",
      deleteCatItemId: "",
      deleteOptionId: "",
      detachOptionId: "",
      deleteName: "",
      offName: "",
      offoptionName: "",
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
        required: value => !!value || "Required."
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
            sn.$store.dispatch("loadItems", {
              name: sn.vendor.name
            });
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
            price: sn.editCatItemPrice,
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
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadOptions");
            sn.$store.dispatch("loadItems");
            sn.loading7 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Option deleted"
            });
          })
          .catch(function(error) {
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
            price: sn.editoptionprice,
            id: sn.editoptionid
          })
          .then(function(response) {
            let d = response.data.message;
            sn.$store.dispatch("loadOptions");
            sn.$store.dispatch("loadItems");
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
    offOption(e, o) {
      var sn = this;
      if (e) {
        sn.offoptionName = "Off";
      } else {
        sn.offoptionName = "On";
      }
      sn.offoptionAvailable = !e;
      sn.offoptionId = o;
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
    editCatItem(u, v, x, y, z, a) {
      var sn = this;
      sn.compValue = [];
      sn.optValue = [];
      sn.editCatId = u;
      if (a.length) {
        var compItems = [];
        var optItems = [];
        a.forEach(elem => {
          if (elem.pivot.type === "compulsory") {
            compItems.push(elem);
          } else {
            optItems.push(elem);
          }
        });
        sn.compValue = compItems.map(item => {
          return item.name;
        });
        sn.optValue = optItems.map(item => {
          return item.name;
        });
      }
      sn.editCatItemId = v;
      sn.editCatItemName = x;
      sn.editCatItemPrice = y;
      sn.editCatItemDescription = z;
      sn.dialog8 = true;
    },
    editOption(x, y, z) {
      var sn = this;
      sn.editoptionid = x;
      sn.editoptionname = y;
      if (z === null) {
        sn.editoptionprice = 0;
      } else {
        sn.editoptionprice = z;
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
          var g = sn.compulsory.forEach(element => {
            comp.push(
              smain_s.find(item => {
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
        if (smain_al) {
          var h = smain_al.forEach(element => {
            opt.push(
              smain_s.find(item => {
                return item.name === element;
              })
            );
          });
          opta = opt.map(item => {
            return item.id;
          });
        }
        const fd = new FormData();
        fd.append("name", sn.name);
        fd.append("price", sn.price);
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
      }
    },
    addOptionItem() {
      var sn = this;
      if (sn.$refs.form5.validate()) {
        sn.loading5 = true;
        sn.dialog5 = false;
        sn.dialog45 = true;
        const fd = new FormData();
        fd.append("name", smain_name);
        fd.append("price", smain_price);
        for (var i = 0; i < sn.$refs.file.$refs.input.files.length; i++) {
          let file = sn.$refs.file.$refs.input.files[i];
          fd.append("files[" + i + "]", file);
        }
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        axios
          .post("/options/save", fd, config)
          .then(res => {
            var d = res.data;
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
