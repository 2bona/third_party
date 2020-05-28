<template>
  <div>
    <v-col class="py-1" cols="12">
      <v-card class="mx-auto" flat tile color="transparent" max-width="600px">
        <v-expansion-panels accordion style="border-radius:25px">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h3 class="grey--text text--darken-1 text-capitalize">
                Main Options
              </h3></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row justify="space-around">
                <v-btn @click="dialog = true" text x-small color="grey"
                  ><v-icon>mdi-plus</v-icon>add item</v-btn
                >
              </v-row>
              <v-divider class="my-4"></v-divider>
              <v-progress-linear
                v-if="dialog45"
                indeterminate
                color="grey lighten-1"
              >
              </v-progress-linear>
              <v-flex
                class="my-2 mb-3"
                xs12
                v-for="n in mainOptions"
                :key="n.id"
              >
                <v-card
                  :disabled="dialog45"
                  width="95%"
                  height="auto"
                  flat
                  color="grey lighten-5"
                  style=" border-radius:25px"
                  class="mx-2 mb-2 py-1 px-2 "
                >
                  <v-list-item class="pa-0">
                    <v-list-item-title
                      @click="n.status = !n.status"
                      style=""
                      class="py-0"
                    >
                      <v-layout>
                        <v-flex xs8>
                          <h2
                            style="text-decoration: none;"
                            class="text-left py-0 body-2 grey--text text-capitalize pl-1  text-truncate text--darken-1 font-weight-medium my-0"
                          >
                            {{ n.name }}
                          </h2>
                          <p class="mb-0 ">
                            <span class="d-flex justify mb-0 mt-0"> </span>
                          </p>
                        </v-flex>
                        <v-slide-x-reverse-transition>
                          <v-flex
                            v-show="n.status"
                            xs5
                            style="
            position: absolute; right: -2px; z-index:99; top: -3px;"
                          >
                            <v-btn
                              @click="
                                editMainOption(
                                  n.id,
                                  n.name,
                                  n.title,
                                  n.option,
                                  n.max
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
                              @click="deleteMainOption(n.id, n.name)"
                              color="grey lighten-2"
                              small
                              class="mt-1 mr-1"
                            >
                              <v-icon>mdi-trash-can</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-slide-x-reverse-transition>
                      </v-layout>
                      <p
                        style="padding-left:10px;"
                        :class="!n.status ? 'text-truncate' : 'text-wrap'"
                        class=" text-left  caption font-weight-regular grey--text mt-1 mb-0"
                      >
                        {{ n.title }}
                      </p>
                      <v-flex xs12>
                        <v-expand-transition>
                          <v-layout
                            v-show="n.status"
                            style="width:100%;padding-left: 13px !important;"
                            row
                            wrap
                            class="py-1"
                          >
                            <v-flex xs12>
                              <p
                                class="overline my-0 py-0 grey--text font-weight-bold text-capitalize"
                              >
                                options
                              </p>
                              <v-divider
                                class=" grey lighten-4 mb-1"
                              ></v-divider>
                              <v-layout row wrap class="pl-3">
                                <v-flex
                                  style="max-width:40px;display: inline-grid;"
                                  class="mb-2 mr-2"
                                  v-for="d in n.option"
                                  :key="d.image"
                                >
                                  <v-avatar
                                    size="25px"
                                    class="mx-auto elevation-2"
                                    color="transparent"
                                    ><img :src="d.image" :alt="d.name" />
                                  </v-avatar>
                                  <p
                                    class="overline grey--text pl-1 mb-0 text-capitalize text-center text-truncate"
                                  >
                                    {{ d.name }}
                                  </p>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-expand-transition>
                      </v-flex>
                    </v-list-item-title>
                  </v-list-item>
                </v-card>
              </v-flex>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" width="500" :persistent="loading">
      <v-card>
        <v-card-title class="body-2 grey lighten-2" primary-title>
          Add Option
        </v-card-title>
        <v-form onSubmit="return false;" ref="form">
          <v-card-text>
            <div class="px-5 pb-5">
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  autofocus
                  @keyup.enter.native="addMainOption"
                  :rules="[rules.required]"
                  validate-on-blur
                  label="Name"
                >
                </v-text-field>
                <v-text-field
                  v-model="title"
                  @keyup.enter.native="addMainOption"
                  :rules="[rules.required]"
                  label="Title"
                >
                </v-text-field>
                <v-select
                  class="font-weight-regular grey--text text--darken-4"
                  :items="list"
                  attach
                  v-model="options"
                  chips
                  :rules="[rules.min]"
                  placeholder="eg. meat, fish, garri, fufu"
                  label="Options"
                  color="orange"
                  multiple
                ></v-select>
              </v-flex>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="orange"
              class="px-3 mx-auto"
              rounded
              dark
              small
              :loading="loading"
              @click="addMainOption()"
              >submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" width="500" :persistent="loading2">
      <v-card>
        <v-card-title class="body-2 grey lighten-2" primary-title>
          Edit {{ editname }}
        </v-card-title>
        <v-form onSubmit="return false;" ref="form2">
          <v-card-text>
            <div class="px-5 pb-5">
              <v-flex xs12>
                <v-text-field
                  v-model="editname"
                  autofocus
                  @keyup.enter.native="editMainOption2"
                  :rules="[rules.required]"
                  validate-on-blur
                  label="Name"
                >
                </v-text-field>
                <v-text-field
                  v-model="edittitle"
                  @keyup.enter.native="editMainOption2"
                  :rules="[rules.required]"
                  validate-on-blur
                  label="Title"
                >
                </v-text-field>
                <v-select
                  :loading="!list.length"
                  class="font-weight-regular grey--text text--darken-4"
                  :items="list"
                  attach
                  v-model="editoptions"
                  chips
                  placeholder="eg. meat, fish, garri, fufu"
                  label="Options"
                  color="orange"
                  :rules="[rules.min]"
                  multiple
                ></v-select>
              </v-flex>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="orange"
              class="px-3 mx-auto"
              rounded
              dark
              small
              :loading="loading2"
              @click="editMainOption2()"
              >edit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" width="200">
      <v-card>
        <v-card-title class="body-2 grey lighten-2" primary-title>
          Delete {{ deletename }} and its Items?
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
            @click="deleteMainOption2(deleteid)"
          >
            sure
          </v-btn>
          <v-btn
            color="red"
            class="px-3 mx-auto"
            rounded
            dark
            small
            @click="dialog3 = false"
          >
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style></style>
<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      loading2: false,
      loading3: false,
      valid: true,
      name: "",
      max: "",
      title: "",
      editname: "",
      deletename: "",
      editid: "",
      deleteid: "",
      editmax: "",
      edittitle: "",
      editoptions: [],
      options: [],
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog45: false,
      rules: {
        required: value => !!value || "Required.",
        min: value => value.length > 0 || "Required."
      },
      numberRules: [v => /^[0-9]*$/.test(v) || "Price must be only numbers"]
    };
  },
  computed: {
    list() {
      return this.$store.getters.getList;
    },
    mainOpt() {
      return this.$store.getters.getOptions;
    },
    mainOptionsList() {
      return this.$store.getters.getMainOptionsList;
    },
    mainOptions() {
      return this.$store.getters.getMainOptions;
    }
  },
  created() {
    this.$store.dispatch("loadMainOptions");
  },
  methods: {
    addMainOption() {
      var sn = this;
      if (sn.$refs.form.validate()) {
        sn.loading = true;
        sn.dialog = false;
        sn.dialog45 = true;
        var opt = [];
        var options = [];
        if (sn.options) {
          var g = sn.options.forEach(element => {
            opt.push(
              sn.mainOpt.find(item => {
                return item.name === element;
              })
            );
          });
          options = opt.map(item => {
            return item.id;
          });
        }
        axios
          .post("/main_option/save", {
            name: sn.name,
            title: sn.title,
            max: sn.max,
            options: JSON.stringify(options)
          })
          .then(function(response) {
            let d = response.data.message;
            sn.$store.dispatch("loadMainOptions");
            sn.loading6 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: d
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    editMainOption(u, v, x, y, z) {
      var sn = this;
      var opt = [];
      var options = [];
      console.log(y);
      if (y.length) {
        var g = y.forEach(element => {
          opt.push(element);
        });
        options = opt.map(item => {
          return item.name;
        });
        console.log(options);
      }
      sn.editoptions = options;
      sn.editid = u;
      sn.editname = v;
      sn.edittitle = x;
      sn.editmax = z;
      sn.dialog2 = true;
    },
    editMainOption2() {
      var sn = this;
      if (sn.$refs.form2.validate()) {
        sn.loading2 = true;
        sn.dialog2 = false;
        sn.dialog45 = true;
        var opt = [];
        var options = [];
        if (sn.editoptions) {
          var g = sn.editoptions.forEach(element => {
            opt.push(
              sn.mainOpt.find(item => {
                return item.name === element;
              })
            );
          });
          options = opt.map(d => {
            return d.id;
          });
        }
        axios
          .post("/main_option/update", {
            name: sn.editname,
            id: sn.editid,
            title: sn.edittitle,
            max: sn.editmax,
            options: JSON.stringify(options)
          })
          .then(function(response) {
            let d = response.data.message;
            sn.$store.dispatch("loadMainOptions");
            sn.loading2 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: d
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading2 = false;
            sn.$store.dispatch("snack", {
              color: "red",
              text: "Error occured"
            });
          });
      }
    },
    deleteMainOption(x, y) {
      this.deleteid = x;
      this.deletename = y;
      this.dialog3 = true;
    },
    deleteMainOption2(x) {
      var sn = this;
      if (x != "") {
        sn.loading3 = true;
        sn.dialog3 = false;
        sn.dialog45 = true;
        axios
          .post("/main_option/delete", {
            id: x
          })
          .then(function(response) {
            sn.$store.dispatch("loadMainOptions");
            sn.loading3 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Item deleted"
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
    }
  }
};
</script>
