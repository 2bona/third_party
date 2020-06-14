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

                  <v-row justify="space-around" class="mt-3">
                    <v-btn
                      :disabled="$route.params.id != items.id"
                      @click="editCat(items.name, items.id)"
                      text
                      x-small
                      color="grey"
                      ><v-icon>mdi-pencil-outline</v-icon> edit</v-btn
                    >
                    <v-btn
                      :disabled="$route.params.id != items.id"
                      @click="addCat(items.name, items.id)"
                      text
                      x-small
                      color="grey"
                      ><v-icon>mdi-plus</v-icon>add item</v-btn
                    >
                    <v-btn
                      :disabled="$route.params.id != items.id"
                      @click="deleteCat(items.name, items.id)"
                      text
                      x-small
                      color="grey"
                      ><v-icon>mdi-trash-can</v-icon>delete</v-btn
                    >
                  </v-row>
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
                          @click="openItemImageInput(n.id)"
                          :src="n.image"
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
                          </v-flex>
                          <v-slide-x-reverse-transition>
                            <v-flex
                              v-show="!n.status"
                              xs5
                              style="
            position: absolute; right: -2px; z-index:99; top: -3px;"
                            >
                              <v-btn
                                @click="
                                  editCatItem(
                                    items.id,
                                    n.id,
                                    n.name,
                                    n.cost_price,
                                    n.description,
                                    n.main_option,
                                    n.mark_up_price,
                                    n.tel,
                                    n.address,
                                    n.ig
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
                                @click="deleteCatItem(items.id, n.id, n.name)"
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
                                offFood(n.available, n.name, n.id, items.id)
                              "
                              :style="
                                n.status
                                  ? 'position: absolute;transform: rotate(270deg);top: 15px;right: -25px;'
                                  : 'position: absolute;transform: rotate(270deg);right: -25px; top: 15px;'
                              "
                              v-model="n.available"
                              color="grey lighten-4"
                              class="mt-2 mb-0 pb-0"
                            ></v-switch>
                          </v-slide-x-transition>
                        </v-layout>
                        <p v-if="serve"
                          style="padding-left:10px;"
                          class="caption font-weight-regular grey--text text--darken-1 mb-0"
                        >
                          <v-icon
                            size="11.5px"
                            style="width: 4.8px; padding-bottom:1.8px; margin-right:3px"
                            >mdi-currency-ngn</v-icon
                          >{{ n.price | price }}
                        </p>
                        <p class="mb-0 ">
                          <span class="d-flex justify mb-0 mt-0"> </span>
                        </p>
                        <v-flex xs12>
                          <v-expand-transition>
                            <v-layout
                              v-show="!n.status"
                              style="width:100%;padding-left: 13px !important;"
                              row
                              wrap
                              class="py-1"
                            >
                              <v-flex
                                v-show="!type"
                                v-if="n.main_option.length"
                                xs12
                              >
                                <p
                                  class="overline my-0 py-0 grey--text font-weight-bold text-capitalize"
                                >
                                  Cumpolsory
                                </p>
                                <v-divider
                                  class=" grey lighten-4 mb-1"
                                ></v-divider>
                                <v-layout row wrap class="pl-3">
                                  <div
                                    style="max-width:150px;display: inline-grid;"
                                    v-show="img.pivot.type === 'compulsory'"
                                    v-for="img in n.main_option"
                                    :key="img.id + img.pivot.type"
                                  >
                                    <v-chip class="ma-1" x-small>
                                      {{ img.name }}
                                    </v-chip>
                                  </div>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                v-show="!type"
                                xs12
                                v-if="n.main_option.length"
                              >
                                <p
                                  class="overline my-0 py-0 grey--text font-weight-bold text-capitalize"
                                >
                                  Optional
                                </p>
                                <v-divider
                                  class="grey lighten-4 mb-1"
                                ></v-divider>
                                <v-layout row wrap class="pl-3">
                                  <div
                                    style="max-width:150px;display: inline-grid;"
                                    v-show="img.pivot.type === 'optional'"
                                    v-for="img in n.main_option"
                                    :key="img.id + img.pivot.type"
                                  >
                                    <v-chip
                                      class="ma-1 text-center text-truncate"
                                      x-small
                                    >
                                      {{ img.name }}
                                    </v-chip>
                                  </div>
                                </v-layout>
                              </v-flex>
                              <v-flex v-if="serve" xs12>
                                <p
                                  class="overline my-0 py-0 grey--text font-weight-bold text-capitalize"
                                >
                                  Sold
                                </p>
                                <v-progress-linear
                                  color="grey lighten-1"
                                  v-show="isLoading && countId === n.id"
                                  :indeterminate="isLoading"
                                ></v-progress-linear>
                                <v-divider
                                  class="grey lighten-4 mb-1"
                                ></v-divider>
                                <div
                                  style="width:40px;display: inline-grid;"
                                  class="mb-0 mr-2"
                                >
                                  <v-avatar
                                    size="25px"
                                    class=" mx-auto elevation-2"
                                    color="green"
                                  >
                                    <v-icon small dark>mdi-cart-outline</v-icon>
                                  </v-avatar>
                                  <p
                                    class="caption mb-0 text-capitalize text-center grey--text"
                                  >
                                    {{ counterValue(n.id) }}
                                  </p>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-expand-transition>
                        </v-flex>
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
                    Edit items
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
              <v-dialog v-model="dialog2" width="500">
                <v-card>
                  <v-card-title class="body-1 grey lighten-2" primary-title>
                    Delete category and its Items?
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog2 = false"
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
                      :loading="loading2"
                      @click="deleteCategory(deleteId)"
                    >
                      sure
                    </v-btn>
                    <v-btn
                      color="grey"
                      class="px-3 mx-auto"
                      rounded
                      dark
                      depressed
                      @click="dialog2 = false"
                    >
                      cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog3" width="500">
                <v-card>
                  <v-card-title class="body-1 grey lighten-2" primary-title>
                    Turn {{ offName }}?
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
                      @click="offItem()"
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
              <v-dialog v-model="dialog4" width="500">
                <v-card>
                  <v-card-title
                    class="body-1 item-truncate grey lighten-2"
                    primary-title
                  >
                    Delete item?
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog4 = false"
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
                      :loading="loading4"
                      @click="deleteItem(deleteCatId, deleteCatItemId)"
                    >
                      sure
                    </v-btn>
                    <v-btn
                      color="grey"
                      class="px-3 mx-auto"
                      rounded
                      dark
                      depressed
                      @click="dialog4 = false"
                    >
                      cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog5" width="500">
                <v-card flat tile class=" pb-9">
                  <v-form onSubmit="return false;" ref="form4">
                    <v-card-title
                      primary-title
                      class=" grey lighten-2 body-1 mb-3"
                    >
                      Add new item
                      <v-spacer></v-spacer>
                      <v-btn icon @click="dialog5 = false"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-card-title>
                    <div class="px-5 pb-9">
                      <v-flex xs12>
                        <v-text-field
                          class="font-weight-regular grey--text text--darken-4"
                          label="Name"
                          :placeholder="
                            serve ? 'eg. Jollof Rice' : 'Name of business'
                          "
                          color="orange"
                          v-model="name"
                          required
                          :rules="[rules.required, rules.required2]"
                        ></v-text-field>
                        <v-text-field
                          v-if="!serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Phone number"
                          v-model="tel"
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
                          v-model="ig"
                          placeholder="app_money_1"
                          hint="put only valid instagram handle without '@'"
                          color="orange"
                        ></v-text-field>
                        <v-text-field
                          v-if="!serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Address"
                          v-model="address"
                          placeholder="No 5 ben oranusim Ifite Awka."
                          hint="Enter Service persons' address"
                          color="orange"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-if="serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Cost price"
                          v-model="cost_price"
                          placeholder="0"
                          hint="put only number eg '1000' not '1,000'"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                          required
                          :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field
                          v-if="serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Mark up"
                          v-model="mark_up_price"
                          placeholder="0"
                          hint="put only number eg '1000' not '1,000'"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                          :rules="markRules"
                        ></v-text-field>
                      </v-flex>
                      <v-row class="px-3" justify="space-between">
                        <v-flex xs12>
                          <v-file-input
                            ref="file2"
                            @change="fieldChanges"
                            class="font-weight-regular grey--text text--darken-4"
                            prepend-icon="mdi-camera"
                            placeholder="Picture"
                            label="Image"
                          ></v-file-input>
                        </v-flex>
                        <v-flex xs12>
                          <v-textarea
                            name="description"
                            label="Description (optional)"
                            color="orange"
                            v-model="description"
                            class="font-weight-regular grey--text text--darken-4"
                            :placeholder="
                              serve
                                ? 'eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more.'
                                : 'A little info about the service person'
                            "
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs12 v-if="!type">
                          <v-select
                            class="font-weight-regular grey--text text--darken-4"
                            :items="mainOptionsList"
                            attach
                            v-model="compulsory"
                            chips
                            placeholder="eg. meat, fish, garri, fufu"
                            label="Compulsory extras (optional)"
                            color="orange"
                            multiple
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 v-if="!type">
                          <v-select
                            class="font-weight-regular grey--text text--darken-4"
                            :items="mainOptionsList"
                            attach
                            v-model="optional"
                            chips
                            placeholder="eg. plantain, eggs, coleslaw, moi-moi"
                            label="Optional extras (optional)"
                            color="orange"
                            multiple
                          ></v-select>
                        </v-flex>
                      </v-row>

                      <v-row class="my-5 px-3" justify="space-around">
                        <v-btn
                          :loading="loading5"
                          @click="addCategoryItem(addId)"
                          class="px-6"
                          color="orange"
                          dark
                          depressed=""
                          rounded
                          >add</v-btn
                        >
                      </v-row>
                    </div>
                  </v-form>
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
                          placeholder="eg. Jollof Rice"
                          color="orange"
                          v-model="editCatItemName"
                          required
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
                          placeholder="08033685498"
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
                        <v-text-field
                          v-if="serve"
                          class="font-weight-regular grey--text text--darken-4"
                          label="Mark up"
                          v-model="editCatItemMarkUp"
                          placeholder="0"
                          hint="put only number eg '1000' not '1,000'"
                          color="orange"
                          prepend-inner-icon="mdi-currency-ngn"
                          :rules="markRules"
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
                              serve
                                ? 'eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more.'
                                : 'A little info about the service person'
                            "
                          ></v-textarea>
                        </v-flex>
                        <v-flex v-if="!type" xs12>
                          <v-select
                            class="font-weight-regular grey--text text--darken-4"
                            :items="mainOptionsList"
                            attach
                            v-model="compValue"
                            chips
                            placeholder="eg. meat, fish, garri, fufu"
                            label="Compulsory extras (optional)"
                            color="orange"
                            multiple
                          ></v-select>
                        </v-flex>
                        <v-flex v-if="!type" xs12>
                          <v-select
                            class="font-weight-regular grey--text text--darken-4"
                            :items="mainOptionsList"
                            attach
                            v-model="optValue"
                            chips
                            placeholder="eg. plantain, eggs, coleslaw, moi-moi"
                            label="Optional extras (optional)"
                            color="orange"
                            multiple
                          ></v-select>
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
      ig: "",
      mark_up_price: "",
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
      offName: "",
      offId: "",
      offCat: "",
      offAvailable: "",
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
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading11: false,
      countId: "",
      counter: [],
      valid: true,
      rules: {
        required: value => !!value || "Required.",
        required2: value =>
          !/[^a-zA-Z0-9&()\s]/.test(value) ||
          "Only letters, numbers, & and bracket are allowed."
      },
      markRules: [v => /^[0-9]*$/.test(v) || "Price must be only numbers"],
      numberRules: [
        value => !!value || "Required.",
        v => /^[0-9]*$/.test(v) || "Price must be only numbers"
      ],
      radios: "Thank you soo much, we will keep improving"
    };
  },
  computed: {
    vendor() {
      return this.$store.getters.getVendor;
    },
    type() {
      return !(this.vendor.type.toLowerCase() === "food");
    },
    cost_price() {
      return this.serve ? "" : 0;
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
    }
  },
  mounted() {
    this.$store.dispatch("loadOptions");
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let n = to;
      // access to component instance via `vm`
      vm.$store.dispatch("loadItems", {
        id: n.params.id
      });
    });
  },
  methods: {
    counterValue(x) {
      const sn = this;
      var item = sn.counter.find(element => {
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
        sn.isLoading = true;
        axios.get("/item/count_orders?id=" + x + "&cat_id=" + y).then(res => {
          d.id = x;
          d.count = res.data.count;
          sn.counter.push(d);
          setTimeout(() => {
            sn.isLoading = false;
          }, 1000);
        });
      } else {
        var isCounted = sn.counter.find(element => {
          return element.id === x;
        });
        setTimeout(() => {
          if (isCounted && !sn.isLoading) {
            return;
          } else {
            sn.isLoading = true;
            var d = {};
            axios
              .get("/item/count_orders?id=" + x + "&cat_id=" + y)
              .then(res => {
                d.id = x;
                d.count = res.data.count;
                sn.counter.push(d);
                setTimeout(() => {
                  sn.isLoading = false;
                }, 1000);
              });
            return;
          }
        }, 1000);
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
            vendor_name: sn.vendor.name
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id
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
        sn.loading1 = true;
        axios
          .post("/category/update", {
            id: y,
            content: x
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id
            });
            sn.loading1 = false;
            sn.dialog1 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category edited"
            });
          })
          .catch(function(error) {
            sn.dialog1 = false;
            sn.loading1 = false;
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
        sn.loading6 = true;
        sn.dialog45 = true;
        sn.dialog6 = false;
        axios
          .post("/item/update", {
            cat_id: sn.editCatId,
            item_id: sn.editCatItemId,
            name: sn.editCatItemName,
            compulsory: JSON.stringify(compa),
            optional: JSON.stringify(opta),
            cost_price: sn.editCatItemCostPrice,
            mark_up_price: sn.editCatItemMarkUp,
            description: sn.editCatItemDescription,
            tel: sn.editCatItemTel,
            ig: sn.editCatItemIg,
            address: sn.editCatItemAddress
          })
          .then(function(response) {
            console.log(response.data);
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id
            });
            sn.loading6 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Item edited"
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
    deleteCategory(x) {
      const sn = this;
      if (sn.deleteId != "") {
        sn.loading2 = true;
        sn.dialog2 = false;
        sn.dialog45 = true;
        axios
          .post("/category/delete", {
            id: x
          })
          .then(function(response) {
            console.log(response.data);
            sn.loading2 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Category deleted"
            });
            sn.$router.push("/");
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
    deleteItem(x, y) {
      var sn = this;
      if (sn.deleteCatItemId != "") {
        sn.loading4 = true;
        sn.dialog4 = false;
        sn.dialog45 = true;
        axios
          .post("/item/delete", {
            cat_id: x,
            item_id: y
          })
          .then(function(response) {
            var d = response.data.message;
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id
            });
            sn.loading4 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: d
            });
          })
          .catch(function(error) {
            sn.dialog45 = false;
            sn.loading4 = false;
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
      sn.dialog1 = true;
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
      sn.dialog3 = true;
    },
    offItem() {
      var sn = this;
      sn.loading3 = true;
      sn.dialog3 = false;
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
          sn.$store.dispatch("loadItems", {
            id: sn.$route.params.id
          });
          sn.loading3 = false;
          sn.dialog45 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: d
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
    },
    editCatItem(u, v, x, y, z, a, b, c, d, e) {
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
      console.log(sn.list);
      console.log(sn.optValue);
      sn.editCatItemId = v;
      sn.editCatItemName = x;
      sn.editCatItemCostPrice = y;
      sn.editCatItemMarkUp = b;
      sn.editCatItemDescription = z;
      sn.editCatItemTel = c;
      sn.editCatItemIg = e;
      sn.editCatItemAddress = d;
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
        if (sn.optional) {
          var h = sn.optional.forEach(element => {
            opt.push(
              sn.options.find(item => {
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
        fd.append("cost_price", sn.cost_price);
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
              id: sn.$route.params.id
            });
            sn.attachments = [];
            sn.loading5 = false;
            sn.dialog45 = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Item added successfully"
            });
          })
          .catch(() => {
            sn.attachments = [];
            sn.$store.dispatch("snack", {
              color: "red",
              text: "An error occured"
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
          .then(res => {
            var d = res.data;
            sn.$store.dispatch("loadItems", {
              id: sn.$route.params.id
            });
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
