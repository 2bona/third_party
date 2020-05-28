<template>
  <div>
    <div>
      <v-scale-transition>
        <v-btn
          fixed
          @click="backBtn()"
          bottom
          v-if="btn"
          left
          fab
          color="grey"
          class="elevation-20"
          style="z-index:99;margin-bottom: 60px;"
        >
          <v-icon color="black">mdi-arrow-left</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-scale-transition>
        <v-btn
          fixed
          @click="dialogQR = !dialogQR"
          bottom
          v-if="btn"
          right
          fab
          color="grey"
          class="elevation-20"
          style="z-index:99;margin-bottom: 60px;"
        >
          <v-icon color="black">mdi-camera</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-card
        color="grey"
        v-if="vendorItems.items.length"
        class="mx-auto"
        max-width="770"
        flat
        tile
      >
        <div
          style="background-color: #acacac;position: fixed;width: 100%;max-width: 770px;"
        >
          <v-tooltip max-width="120" left>
            <template v-slot:activator="{ on }">
              <v-btn
                :disabled="vendorLoad"
                v-on="on"
                @click="dialogVendor = true"
                style="right: 0;"
                icon
                fab
                absolute
                right
              >
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <p class="pa-2 mb-0 caption font-weight-medium">Vendor info</p>
          </v-tooltip>
          <v-row justify="space-around">
            <v-flex xs12 class="mb-1 py-2 m text-center">
              <h2
                class="text-center mb-1 text-capitalize grey--text text--darken-1 font-weight-bold"
              >
                {{ vendor.name }}
              </h2>
            </v-flex>
          </v-row>
          <!-- {{vendorItems.items}} -->
        </div>
        <div style="position: absolute;top:60px;z-index:5;width: 100%;">
          <v-tabs
            dark
            v-if="!vendorLoad"
            class="h elevation-3 grey"
            style="z-index:2;position: -webkit-sticky;top:0;position: sticky;'"
            center-active
            grow
            mobile-break-point="2000"
            slider-color="grey lighten-4"
            active-class="body-2 grey--text text--lighten-4"
            color="grey lighten-4"
          >
            <v-tab
              dark
              v-show="vendorItems.items.length"
              v-for="n in vendorItems.items"
              :key="n.name"
              v-text="n.name"
              class="caption  font-weight-bold"
            ></v-tab>

            <v-tab-item
              dark
              class="pb-12"
              style="min-height:100vh;
    background-color: black;"
              :key="n.id"
              v-for="(n, l) in vendorItems.items"
            >
              <p
                class="px-1 body-2 grey--text text--lighten-1 text-center py-8"
                v-if="!n.items.length"
              >
                This category was not loaded before you added
                {{ vendor.name }} to your favourites, when next you are online,
                load all the categories you want to see offline then remove
                {{ vendor.name }} from your favourites and add them back, now
                whenever you are offline you can access them, thank you.
              </p>
              <div v-if="n.items.length">
                <div class="pt-0 mb-8 pb-12">
                  <div class="pt-0" v-for="(item, p) in n.items" :key="item.id">
                    <v-expansion-panels
                      tile
                      flat
                      dark
                      v-if="item.main_option_count > 0"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header
                          class="title black mb-0 py-0 px-4 grey--text text--darken-1 text-capitalize font-weight-bold"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              class="title mb-0 grey--text text--darken-1 text-capitalize font-weight-bold"
                              v-html="item.name"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="font-weight-bold body-1 grey--text text--lighten-1"
                            >
                              <span
                                ><v-icon
                                  size="13"
                                  color="grey lighten-1"
                                  style="padding-bottom:2px"
                                  >mdi-currency-ngn</v-icon
                                ></span
                              >{{ item.price | price }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <div
                            v-for="(n, m) in item.main_option"
                            :key="n.id + n.pivot.type"
                          >
                            <div v-if="n.pivot.type === 'compulsory'">
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-subtitle
                                    style=""
                                    class="text-center overline  mt-4 font-weight-medium grey--text text-wrap"
                                    v-html="n.title"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                              <div v-for="o in n.option" :key="o.name + o.id">
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      class="body-2 mb-0 grey--text text--lighten-1 text-capitalize font-weight-bold"
                                      v-html="o.name"
                                    ></v-list-item-title>
                                  </v-list-item-content>
                                  <div class="d-flex py-0">
                                    <v-switch
                                      color="grey lighten-2"
                                      :disabled="
                                        !checkItemOpt(o.id, n.id, item.id, p) &&
                                          checkChecked(l, p, m)
                                      "
                                      v-model="o.available_qty"
                                      @change="
                                        addItem(
                                          o,
                                          item.id + n.id,
                                          l,
                                          p,
                                          item.id,
                                          n.id
                                        )
                                      "
                                      class=""
                                    ></v-switch>
                                  </div>
                                </v-list-item>
                                <v-divider></v-divider>
                              </div>
                            </div>
                            <div v-else>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-subtitle
                                    style=""
                                    class="overline mt-4  text-center font-weight-medium grey--text text-wrap"
                                    v-html="n.title"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>
                              </v-list-item>
                              <div v-for="(o, i) in n.option" :key="o.name + i">
                                <v-list-item>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      style="padding-left:1px"
                                      class="body-2 mb-0 grey--text text--lighten-1 text-capitalize font-weight-bold"
                                      v-html="o.name"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                      class=" grey--text pl-0"
                                    >
                                      <span
                                        ><v-icon
                                          size="13"
                                          color="grey"
                                          style="padding-bottom:3px"
                                          >mdi-currency-ngn</v-icon
                                        ></span
                                      >{{
                                        (o.price *
                                          (o.total_qty === 0
                                            ? 1
                                            : o.total_qty))
                                          | price
                                      }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                  <div class="d-flex py-5">
                                    <v-btn
                                      x-small
                                      @click="
                                        o.total_qty >= 1 ? o.total_qty-- : ''
                                      "
                                      fab
                                      color="grey lighten-2"
                                      class="my-0 grey--text elevation-4"
                                    >
                                      <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                    <p
                                      color="grey lighten-2"
                                      class="pt-1 mx-1 grey--text text--lighten-2 text-center mb-0"
                                    >
                                      {{ o.total_qty }}
                                    </p>
                                    <v-btn
                                      x-small
                                      @click="o.total_qty++"
                                      fab
                                      color="grey lighten-2"
                                      class="my-0 grey--text elevation-4"
                                    >
                                      <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                  </div>
                                </v-list-item>
                                <v-divider></v-divider>
                              </div>
                            </div>
                          </div>
                          <div class="text-center py-3">
                            <v-btn
                              @click="addIt(item)"
                              :disabled="
                                item.avg_rating != getCompOptionsCount(item)
                              "
                              rounded
                              class="grey--text mx-auto text--lighten-2"
                              color="grey darken-4"
                              >add</v-btn
                            >
                          </div>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-list-item
                      @click="
                        statusId === item.id
                          ? changeStatus(null)
                          : changeStatus(item.id)
                      "
                      v-else
                      dark
                      class="py-0"
                      :ripple="false"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          class="title mb-0 grey--text text--darken-1 text-capitalize font-weight-bold"
                          v-html="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle
                          class="font-weight-bold body-1 grey--text text--lighten-1"
                        >
                          <span
                            ><v-icon
                              size="13"
                              color="grey lighten-1"
                              style="padding-bottom:2px"
                              >mdi-currency-ngn</v-icon
                            ></span
                          >{{ (item.price * getQty(item.id)) | price }}
                          <div
                            class="d-flex"
                            style="   
                             position: absolute;
                              right: 11px;
                              bottom: 11px;"
                          >
                            <v-scale-transition>
                              <v-btn
                                v-if="
                                  statusId === item.id && checkItemCart(item.id)
                                "
                                x-small
                                @click.stop="minusItemDyn(item.id)"
                                fab
                                color="grey lighten-2"
                                class="my-0 grey--text elevation-4"
                              >
                                <v-icon>mdi-minus</v-icon>
                              </v-btn>
                            </v-scale-transition>
                            <v-scale-transition>
                              <p
                                v-if="
                                  statusId === item.id && checkItemCart(item.id)
                                "
                                color="grey lighten-2"
                                class="pt-1 mx-1 grey--text text--lighten-2 text-center mb-0"
                              >
                                {{ orderqty(item.id) }}
                              </p>
                            </v-scale-transition>
                            <v-scale-transition>
                              <v-btn
                                v-if="
                                  statusId === item.id && checkItemCart(item.id)
                                "
                                x-small
                                @click.stop="addItemDyn(item.id)"
                                fab
                                color="grey lighten-2"
                                class="my-0 grey--text elevation-4"
                              >
                                <v-icon>mdi-plus</v-icon>
                              </v-btn>
                            </v-scale-transition>
                          </div>
                          <v-scale-transition>
                            <v-btn
                              @click.stop="addIt(item)"
                              v-if="
                                statusId === item.id && !checkItemCart(item.id)
                              "
                              class="mr-1 elevation-3 caption font-weight-black grey--text text--darken-4"
                              absolute
                              right
                              small
                              color="grey lighten-2"
                              rounded
                              >add</v-btn
                            >
                          </v-scale-transition>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                  </div>
                </div>
              </div>
            </v-tab-item>
          </v-tabs>
        </div>
      </v-card>
    </div>
    <v-layout
      style="z-index: 9;position:fixed; bottom:0px;background: linear-gradient(#fff0 0%, #fff 100%);width: 100%"
      row
      wrap
      class="mx-auto pb-2 px-1"
    >
      <v-flex xs6>
        <v-text-field
          name="item"
          label="Total"
          :value="totalOrder | price"
          @input="0"
          hide-details
          disabled
          single-line
          color="orange"
          class="mt-0 font-weight-bold headline"
          prepend-inner-icon="mdi-currency-ngn"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-btn
          block
          large
          :disabled="!orderedItems.length"
          @click="dialogOrder = !dialogOrder"
          class="mt-0 elevation-10 caption font-weight-black grey--text text--lighten-2"
          color="grey darken-2"
          rounded=""
          dark
          >done</v-btn
        >
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialogOrder"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card
        v-if="orderedItems.length"
        tile
        flat
        class="black"
        style="padding-bottom: 111px !important;"
      >
        <v-toolbar
          style="z-index:2;position: -webkit-sticky;top:0;position: sticky;'"
          fixed
          dark
          color="grey lighten-1"
        >
          <span class="title"
            >Total -
            <v-icon size="17" style="padding-bottom: 3px"
              >mdi-currency-ngn</v-icon
            >{{ totalOrder | price }}</span
          >
          <span
            v-if="!choice"
            class="caption ml-2 font-weight-bold  text--darken-3"
          >
            + P.O.S Charge</span
          >
          <span
            v-if="changeP > 1 && choice"
            class="caption ml-2 font-weight-bold  text--darken-3"
          >
            Change -
            <v-icon size="10" style="padding-bottom: 2px"
              >mdi-currency-ngn</v-icon
            >{{ changeP | price }}</span
          >

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn fab icon dark @click="dialogOrder = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card color="transparent" flat tile class="ma-auto py-4 text-center">
          <v-card
            color="transparent"
            flat
            tile
            class="d-flex ma-auto pa-4 pb-0 text-center"
          >
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-switch
                    dark
                    class="px-2 pl-4 mt-0"
                    v-model="choice"
                    color="grey"
                  >
                    <template v-slot:label>
                      <span class="body-2 grey--text" v-if="!choice"
                        ><strong>P.O.S</strong>
                      </span>
                      <span class="body-2 grey--text" v-if="choice">
                        <strong>Cash</strong></span
                      >
                    </template>
                  </v-switch>
                </v-flex>
                <v-flex xs6>
                  <v-switch
                    dark
                    class="px-2 mt-0"
                    v-model="where"
                    @change="changeTable()"
                    color="grey"
                  >
                    <template v-slot:label>
                      <span class="body-2 grey--text" v-if="where"
                        ><strong>In-house</strong>
                      </span>
                      <span class="body-2 grey--text" v-if="!where"
                        ><strong>Take away</strong>
                      </span>
                    </template></v-switch
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
          <v-card
            color="transparent"
            flat
            tile
            class="d-flex ma-auto pa-4 pt-0 text-center"
          >
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-switch
                    dark
                    class="px-2 pl-4 mt-0"
                    v-model="served"
                    color="yellow darken-3"
                  >
                    <template v-slot:label>
                      <span v-if="!served" class="body-2 grey--text"
                        ><strong>Not served</strong>
                      </span>
                      <span v-if="served" class="body-2 grey--text"
                        ><strong>Served</strong>
                      </span>
                    </template></v-switch
                  ></v-flex
                >
                <v-flex xs6>
                  <v-switch
                    dark
                    class="px-2 mt-0 "
                    v-model="paid"
                    color="green"
                  >
                    <template v-slot:label>
                      <span v-if="!paid" class="body-2 grey--text"
                        ><strong>Not paid</strong>
                      </span>
                      <span v-if="paid" class="body-2 grey--text"
                        ><strong>Paid</strong>
                      </span>
                    </template></v-switch
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
          <v-form class="pb-3" ref="form1" style="width: 40%;margin: auto;">
            <v-text-field
              v-if="where"
              name="change"
              dark
              placeholder="Table No"
              v-model="table"
              type="numeric"
              persistent-hint
              color="grey"
              :rules="numberRules"
              hint="Customer table number?."
              class="mt-0 pt-0 font-weight-bold headline"
              prepend-inner-icon="mdi-pound"
            ></v-text-field>
            <v-text-field
              v-if="choice"
              name="change"
              dark
              placeholder="Cash Amt"
              v-model="change"
              type="numeric"
              :rules="changeRules"
              hint="Change for how much?."
              color="grey"
              persistent-hint
              class="mt-0  pt-0 font-weight-bold headline"
              prepend-inner-icon="mdi-currency-ngn"
            ></v-text-field>
          </v-form>
          <v-btn
            @click.prevent="noOrderChange()"
            dark
            v-if="choice"
            rounded
            color="white"
            class="mt-0 mx-1 caption font-weight-black text--darken-4 grey--text"
            >i don't need change</v-btn
          >
          <v-btn
            @click="OrderChange()"
            dark
            v-if="choice"
            rounded
            color="white"
            class="mt-0 mx-1 caption font-weight-black text--darken-4 grey--text"
            >continue</v-btn
          >
          <v-btn
            @click="saveOrder()"
            dark
            v-if="!choice"
            rounded
            color="white"
            class="mt-0 caption font-weight-black text--darken-4 grey--text"
            >done</v-btn
          >
        </v-card>

        <div v-for="(item, i) in orderedItems" :key="item.name + i">
          <v-expansion-panels
            tile
            dark
            v-if="
              item.options.compulsory.length > 0 ||
                item.options.optional.length > 0
            "
          >
            <v-expansion-panel>
              <v-expansion-panel-header
                class="title black mb-0 py-0 px-4 grey--text text--darken-1 text-capitalize font-weight-bold"
              >
                <v-list-item-content>
                  <v-list-item-title
                    class="title text-wrap mb-0 grey--text text--darken-1 text-capitalize font-weight-bold"
                  >
                    {{ item.name
                    }}<v-chip
                      small
                      v-for="o in item.options.compulsory"
                      :key="o.name"
                      class=" mb-0 mx-1 grey--text text--lighten-1 text-capitalize font-weight-medium"
                      v-html="o.name"
                    ></v-chip>
                  </v-list-item-title>

                  <v-list-item-subtitle
                    class="font-weight-bold body-1 grey--text text--lighten-1"
                  >
                    <span
                      ><v-icon
                        size="13"
                        color="grey lighten-1"
                        style="padding-bottom:2px"
                        >mdi-currency-ngn</v-icon
                      ></span
                    >{{ getTotal(item) | price }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div v-for="(o, p) in item.options.optional" :key="o.name + p">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        style="padding-left:1px"
                        class="body-2 mb-0 grey--text text--lighten-1 text-capitalize font-weight-bold"
                        v-html="o.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle class=" grey--text pl-0">
                        <span
                          ><v-icon
                            size="13"
                            color="grey"
                            style="padding-bottom:3px"
                            >mdi-currency-ngn</v-icon
                          ></span
                        >{{ (o.price * (o.qty === 0 ? 1 : o.qty)) | price }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <div class="d-flex py-5">
                      <v-btn
                        x-small
                        @click="o.qty >= 1 ? o.qty-- : ''"
                        fab
                        color="grey lighten-2"
                        class="my-0 grey--text elevation-4"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                      <p
                        color="grey lighten-2"
                        class="pt-1 mx-1 grey--text text--lighten-2 text-center mb-0"
                      >
                        {{ o.qty }}
                      </p>
                      <v-btn
                        x-small
                        @click="o.qty++"
                        fab
                        color="grey lighten-2"
                        class="my-0 grey--text elevation-4"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </v-list-item>
                  <v-divider></v-divider>
                </div>
                <div class="text-center pt-3">
                  <div class="d-flex px-2 py-5">
                    <v-btn
                      x-small
                      @click="
                        () => {
                          item.qty > 1 ? item.qty-- : '';
                          item.total = getTotal(item);
                        }
                      "
                      fab
                      color="grey lighten-2"
                      class="my-0 grey--text elevation-4"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <p
                      color="grey lighten-2"
                      class="pt-1 mx-1 grey--text text--lighten-2 text-center mb-0"
                    >
                      {{ item.qty }}
                    </p>
                    <v-btn
                      x-small
                      @click="
                        () => {
                          item.qty++;
                          item.total = getTotal(item);
                        }
                      "
                      fab
                      color="grey lighten-2"
                      class="my-0 grey--text elevation-4"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                      x-small
                      @click="removeOrder(i)"
                      fab
                      color="grey darken-3"
                      class="my-0 grey--text text--lighten-3 elevation-10"
                    >
                      <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-list-item v-else dark class="py-0" :ripple="false">
            <v-list-item-content>
              <v-list-item-title
                class="title mb-0 grey--text text--darken-1 text-capitalize font-weight-bold"
                v-html="item.name"
              ></v-list-item-title>
              <v-list-item-subtitle
                class="font-weight-bold body-1 grey--text text--lighten-1"
              >
                <span
                  ><v-icon
                    size="13"
                    color="grey lighten-1"
                    style="padding-bottom:2px"
                    >mdi-currency-ngn</v-icon
                  ></span
                >{{ (item.price * item.qty) | price }}

                <div class="d-flex text-right py-2">
                  <v-btn
                    x-small
                    fab
                    @click="
                      () => {
                        item.qty > 1 ? item.qty-- : '';
                        item.total = item.price * item.qty;
                      }
                    "
                    color="grey lighten-2"
                    class="my-0 grey--text elevation-4"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <p
                    color="grey lighten-2"
                    class="pt-1 mx-1 grey--text text--lighten-2 text-center mb-0"
                  >
                    {{ item.qty }}
                  </p>
                  <v-btn
                    x-small
                    @click="
                      () => {
                        item.qty++;
                        item.total = item.price * item.qty;
                      }
                    "
                    fab
                    color="grey lighten-2"
                    class="my-0 grey--text elevation-4"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    x-small
                    @click="removeOrder(i)"
                    fab
                    color="grey darken-3"
                    class="my-0 grey--text text--lighten-3 elevation-10"
                  >
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-btn
          fixed
          @click="backToOrders()"
          bottom
          v-if="$route.params.id"
          right
          fab
          color="grey"
          class="elevation-20 mb-6"
          style="z-index:99;"
        >
          <v-icon color="black">mdi-arrow-left</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogVendor"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card v-if="vendor" tile flat class="">
        <v-toolbar
          style="z-index:2;position: -webkit-sticky;top:0;position: sticky;'"
          fixed
          dark
          color="grey lighten-1"
        >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn fab icon dark @click="dialogVendor = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="px-3 pt-3">
          <span
            class="overline pt-3 grey--text  text--darken-1 font-weight-bold"
          >
            Description
          </span>
          <v-list-item class="my-1 " dense>
            <v-list-item-content>
              <v-list-item-subtitle
                class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0"
              >
                {{ vendor.bio }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider></v-divider>
        <div class="px-3 pt-3">
          <span
            class="overline pt-3 grey--text  text--darken-1 font-weight-bold"
          >
            Payment methods
          </span>
          <v-list-item class="my-1 " dense>
            <v-list-item-content>
              <v-list-item-subtitle
                class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0"
              >
                Card payment online
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="vendor.card_on_delivery"
                class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0"
              >
                Mobile / USSD Transfer on delivery
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="vendor.cash_on_delivery"
                class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0"
              >
                Cash Payment on delivery
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider></v-divider>
        <div class="px-3 pt-3">
          <span
            class="overline pt-3 grey--text  text--darken-1 font-weight-bold"
          >
            Address
          </span>
          <v-list-item class="my-1 " dense>
            <v-list-item-content>
              <v-list-item-subtitle
                class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0"
              >
                {{ vendor.address }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogLoad" persistent max-width="290">
      <v-card flat color="transparent">
        <v-progress-linear
          color="grey darken-4"
          :indeterminate="true"
        ></v-progress-linear>
        <p class="text-center mt-3 font-weight-bold grey--text text--lighten-3">
          please wait...
        </p>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogQR"
      :overlay="false"
      max-width="300px"
      max-height="300px"
      transition="dialog-transition"
    >
      <v-card color="grey" height="300px" width="300px">
        <qrcode-stream
          v-if="dialogQR"
          @init="onInit"
          @decode="onDecode"
        ></qrcode-stream>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSave" max-width="290">
      <v-card>
        <v-card-title class="title">Save changes to order?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey lighten-1" text @click.stop="dialogSave = false">
            cancel
          </v-btn>

          <v-btn
            color="grey darken-1"
            text
            :loading="saveLoad"
            @click="replaceOrder()"
          >
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style>
.theme--dark.v-tabs > .v-tabs-bar {
  z-index: 2;
  position: sticky;
  top: 0px;
}
.v-list-item__avatar:last-of-type:not(:only-child) {
  margin-left: 0px !important;
  margin-right: 10px !important;
}
.v-tabs-bar.v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows):not(.v-slide-group--has-affixes)
  .v-slide-group__prev {
  display: none;
}
.gy.v-input input {
  text-align: center;
}
</style>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import localforage from "localforage";
import LZString from "lz-string";

export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      items: [],
      vendorItems: {
        items: []
      },
      itemOpt: [],
      bucket: "",
      tabm: null,
      num: 0,
      distance: "",
      stick: false,
      stickLoad: false,
      saveLoad: false,
      where: true,
      oldWhere: null,
      loadavatar: "",
      estTime: "",
      table_no: "",
      deliveryFee: "",
      total: Number,
      dialogLeave: false,
      served: false,
      paid: false,
      table: null,
      dialogLoad: false,
      dialogQR: false,
      dialogSave: false,
      dialogVendor: false,
      dialogOrder: false,
      leave: false,
      btn: false,
      choice: true,
      checked: Number,
      scroller: true,
      params: {},
      next_page: "",
      reviews: "",
      reviewSettings: {},
      filter: "",
      oldOrder: "",
      statusId: "",
      changeQR: null,
      change: null,
      totalAmt: 0,
      user_id: Number,
      order: {
        item: [],
        compulsory: [],
        optional: [],
        total: Number
      },
      compId: new Object(),
      tray: [],
      orderedItems: [],
      dialog: false,
      vendorLoad: true,
      isIntersecting: false,
      dialog3: false,
      pageClose: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      loadFav: false,
      loadingR: false,
      loadingRTop: false,
      loadingInhouse: false,
      loadingItems: true,
      loadingItemsMain: true,
      numberRules: [
        v => !!v || "Table number is required",
        v => /^[0-9]*$/.test(v) || "Number must be valid"
      ]
    };
  },
  mounted() {
    const sn = this;
    sn.vendorLoad = true;
    localforage.ready().then(function() {
      if (sn.$route.params.id && sn.thisOrder >= 0) {
        localforage
          .getItem("orders")
          .then(val => {
            var o = LZString.decompress(val);
            var p = JSON.parse(o);
            var t = p.find((el, i) => {
              return i === sn.thisOrder;
            });
            sn.oldOrder = t;
            sn.orderedItems = t.i;
            sn.served = t.s;
            sn.paid = t.p;
            sn.choice = t.m;
            sn.table = t.n ? t.n : null;
            sn.where = !t.n ? false : true;
            sn.oldWhere = !t.n ? false : true;

            if (t.m) {
              sn.changeQR = t.c;
              sn.change = !t.c ? 0 : t.c + t.t;
            }
            sn.dialogOrder = true;
          })
          .catch(() => {
            sn.message2 = "Invalid order.";
            sn.$router.push("/offlineorders");
          });
      }
      localforage
        .getItem("vendorItems")
        .then(val => {
          sn.vendorItems.items = val;
          val.forEach(el => {
            el.items.forEach(el2 => {
              sn.items.push(el2);
            });
          });
          sn.vendorLoad = false;
          sn.message = "There is no vendor in your favourites currently.";
        })
        .catch(() => {
          sn.vendorLoad = false;
          sn.message =
            "You have not added any vendor to your favourites, when next you are try adding some vendors to your favourites and gain access their items for easy offline purchase when you call in.";
        });
    });
    setTimeout(() => {
      sn.btn = true;
    }, 50);
  },
  beforeRouteLeave(to, from, next) {
    this.btn = false;
    setTimeout(() => {
      next();
    }, 50);
  },
  watch: {
    change(val) {
      this.changeQR = null;
    }
  },
  computed: {
    thisOrder() {
      return parseFloat(this.$route.params.id);
    },
    changeP() {
      return this.changeQR > 1 && this.change === null
        ? this.changeQR
        : this.change - this.totalOrder;
    },
    changeRules() {
      return [
        v => /^[0-9]*$/.test(v) || "Number must be valid",
        v =>
          v - this.totalOrder <= 1000 ||
          "Change must not be greater than N1,000",
        v => v > this.totalOrder || "Amount must be greater than order total",
        v =>
          (v - this.totalOrder) % 5 === 0 ||
          "Change must be valid, eg 5, 10, 20 etc."
      ];
    },
    vendor() {
      return this.$store.getters.getVendor;
    },
    user() {
      return this.$store.getters.getUser;
    },
    saver() {
      let u = {
        i: this.orderedItems,
        s: this.served,
        o: Math.floor(100000 + Math.random() * 900000),
        p: this.paid,
        u: this.user_id ? this.user_id : null,
        m: this.choice,
        t: this.totalOrder,
        d: new Date(),
        n: this.where ? this.table : null
      };
      if (this.choice && this.changeP > 1) {
        u.c = this.changeP;
      }

      return u;
    },
    totalOrder() {
      var i = 0;
      var k = 0;
      this.orderedItems.forEach(el => {
        k = 0;
        if (el.options.optional.length === 0) {
          k += el.price * el.qty;
        } else {
          k += el.price;
          el.options.optional.forEach(el2 => {
            k += el2.price * el2.qty;
          });
          k *= el.qty;
        }
        i += k;
      });
      return !this.choice ? i + this.vendor.pos_charge : i;
    }
  },
  methods: {
    getQty(x) {
      if (this.it(x)) {
        var t = this.orderedItems.find(el => {
          return el.id === x;
        });
        return t.qty;
      } else {
        return 1;
      }
    },
    orderqty(x) {
      var t = this.orderedItems.find(el => {
        return el.id === x;
      });
      return t.qty;
    },
    it(x) {
      return this.orderedItems.find(el => {
        return el.id === x;
      });
    },
    minusItemDyn(x) {
      var t = this.orderedItems.filter(el => {
        return el.id !== x;
      });
      var i = this.it(x);
      if (i.qty > 1) {
        i.qty--;
        i.total = i.price * i.qty;
        t.push(i);
      }
      this.orderedItems = t;
    },
    addItemDyn(x) {
      var t = this.orderedItems.filter(el => {
        return el.id !== x;
      });
      var i = this.it(x);
      i.qty++;
      i.total = i.price * i.qty;
      t.push(i);
      this.orderedItems = t;
    },
    checkItemCart(x) {
      return this.orderedItems.some(el => {
        return el.id === x;
      });
    },
    replaceOrder() {
      this.saveLoad = true;
      localforage.getItem("orders").then(val => {
        var r = LZString.decompress(val);
        var t = JSON.parse(r);
        t[this.thisOrder] = this.saver;
        var i = JSON.stringify(t);
        var o = LZString.compress(i);
        localforage.removeItem("orders");
        localforage.setItem("orders", o);
        this.dialogSave = false;
        this.$store.dispatch("snack", {
          color: "green",
          text: "Order has been saved successfully"
        });

        this.saveLoad = false;
        this.$router.push("/offlineorders");
      });
    },
    changeTable() {
      this.table = null;
    },
    backToOrders() {
      const sn = this;
      var t = sn.saver;
      var y = sn.oldOrder;
      console.log(sn.objectsAreEqual(t, y));
      if (sn.objectsAreEqual(t, y)) {
        if (sn.where === sn.oldWhere) {
          sn.$router.push("/offlineorders");
        } else {
          if (sn.where) {
            if (!sn.table) {
              this.$store.dispatch("snack", {
                color: "green",
                text: "Please enter Table number"
              });
              return;
            }
          } else {
            sn.dialogSave = true;
            return;
          }
        }
      } else {
        if (sn.where) {
          if (!sn.table) {
            this.$store.dispatch("snack", {
              color: "green",
              text: "Please enter Table number"
            });
            return;
          } else {
            sn.dialogSave = true;
            return;
          }
        } else {
          sn.dialogSave = true;
          return;
        }
        // eslint-disable-next-line no-unreachable
        if (!(sn.choice && (sn.change > sn.totalOrder || !sn.change))) {
          sn.$refs.form1.validate();
          return;
        } else {
          sn.dialogSave = true;
          return;
        }
        sn.dialogSave = true;
      }
    },
    OrderChange() {
      if (this.$refs.form1.validate() && this.change > this.totalOrder) {
        this.saveOrder();
      }
    },
    noOrderChange() {
      this.change = null;
      if (this.$route.params.id) {
        this.backToOrders();
        return;
      } else {
        if (this.where && this.table) {
          this.saveOrder();
        } else if (!this.where && !this.table) {
          this.saveOrder();
        } else {
          this.$store.dispatch("snack", {
            color: "green",
            text: "Please enter Table number"
          });
        }
      }
    },
    saveOrder() {
      const sn = this;
      if (this.$route.params.id) {
        var t = sn.saver;
        var y = sn.oldOrder;
        if (sn.objectsAreEqual(t, y)) {
          sn.backToOrders();
        } else {
          sn.dialogSave = true;
        }
      } else {
        localforage
          .getItem("orders")
          .then(val => {
            var r = LZString.decompress(val);
            var t = JSON.parse(r);
            t.push(this.saver);
            var i = JSON.stringify(t);
            var o = LZString.compress(i);
            localforage.removeItem("orders");
            localforage.setItem("orders", o);

            this.dialogQr = false;
            this.$store.dispatch("snack", {
              color: "green",
              text: "Order has been saved successfully"
            });

            this.$router.push("/offlineorders");
          })
          .catch(() => {
            var o = [];
            o.push(this.saver);
            var i = JSON.stringify(o);
            var l = LZString.compress(i);
            localforage.setItem("orders", l);
            this.$router.push("/offlineorders").catch(() => {
              this.$store.dispatch("snack", {
                color: "black",
                text: "An error occured"
              });
            });
            this.dialogQr = false;
          });
      }
    },
    getItem(x, c) {
      var f = this.items.find(el => {
        return el.id === x;
      });
      this.decryptOrderToItem(f, c);
    },
    async onDecode(decodedString) {
      const sn = this;
      sn.dialogQR = false;
      sn.dialogLoad = true;
      var dec = LZString.decompress(decodedString);
      console.log(dec);
      const order = JSON.parse(dec);
      if (decodedString != null && order[0].v === sn.vendor.id) {
        sn.orderedItems = [];
        order.forEach((enc, i) => {
          if (i === 0) {
            if (enc.v === sn.vendor.id) {
              sn.user_id = enc.u;
              sn.choice = enc.m === 1 ? 0 : 1;
              if (sn.choice) {
                sn.changeQR = enc.c;
              } else {
                sn.change = null;
              }
            }
          } else {
            sn.getItem(enc.i, enc);
          }
        });
        sn.dialogLoad = false;
        sn.dialogOrder = true;
      } else {
        sn.dialogLoad = false;
        sn.$store.dispatch("snack", {
          color: "black",
          text:
            "Invalid QR code, Scan a valid E Dey App offline companion QR code for " +
            sn.vendor.name
        });
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    },
    removeOrder(x) {
      var newCart = this.orderedItems.filter((el, i) => {
        return i != x;
      });
      if (newCart.length === 0) {
        this.dialogOrder = false;
        this.orderedItems = newCart;
      } else {
        this.orderedItems = newCart;
      }
    },
    getTotal(x) {
      var i = 0;
      var k = 0;
      k += x.price;

      x.options.optional.forEach(el2 => {
        k += el2.price * el2.qty;
      });

      i = k * x.qty;
      return i;
    },
    getTotal2(x) {
      var i = 0;
      let k = 0;
      k += x.price;
      if (x.main_option_count > 0) {
        const opt = x.main_option.filter(el1 => {
          return el1.pivot.type === "optional";
        });
        opt.forEach(el => {
          el.option.forEach(el2 => {
            k += el2.price * el2.qty;
          });
        });
      }
      i = k * x.qty;
      return i;
    },
    objectsAreEqual(a, b) {
      const sn = this;
      for (var prop in a) {
        if (a.hasOwnProperty(prop)) {
          if (b.hasOwnProperty(prop)) {
            if (typeof a[prop] === "object") {
              if (!sn.objectsAreEqual(a[prop], b[prop])) return false;
            } else {
              if (a[prop] !== b[prop]) return false;
            }
          } else {
            return false;
          }
        }
      }
      return true;
    },
    backBtn() {
      const sn = this;
      sn.$router.go(-1);
    },
    gt(x) {
      console.log(JSON.parse(JSON.stringify(x)));
    },
    decryptOrderToItem(itm, enc) {
      const sn = this;
      const item = {
        name: itm.name,
        id: itm.id,
        price: itm.price,
        total: itm.total,
        qty: enc.q,
        options: {
          compulsory: [],
          optional: []
        }
      };
      if (enc.c || enc.o) {
        if (enc.c) {
          const compa = itm.main_option.filter(el => {
            return el.pivot.type === "compulsory";
          });
          // eslint-disable-next-line no-inner-declarations
          function b(x) {
            return item.options.compulsory.some(it => {
              return it.id === x;
            });
          }
          enc.c.forEach(el => {
            var m = "";
            let t = b(el);
            if (!t) {
              compa.forEach(el2 => {
                m = el2.option.find(el3 => {
                  return el3.id === el;
                });
                if (m && !b(el)) {
                  let opt = {
                    name: m.name,
                    id: m.id,
                    price: m.price
                  };
                  item.options.compulsory.push(opt);
                }
              });
            }
          });
        }
        if (enc.o) {
          const opta = itm.main_option.filter(el => {
            return el.pivot.type === "optional";
          });
          enc.o.forEach(elm => {
            var n = elm.split(".");
            var m = "";
            opta.forEach(el2 => {
              m = el2.option.find(el3 => {
                return el3.id === parseFloat(n[0]);
              });
            });
            let opt = {
              name: m.name,
              id: m.id,
              price: m.price,
              qty: parseFloat(n[1])
            };
            item.options.optional.push(opt);
          });
        }
        sn.orderedItems.push(item);
      } else {
        sn.orderedItems.push(item);
      }
    },
    addIt(x) {
      const sn = this;
      let g = x.main_option_count > 0 ? sn.getTotal2(x) : x.price;
      const item = {
        name: String,
        id: Number,
        price: Number,
        qty: Number,
        total: g,
        options: {
          compulsory: [],
          optional: []
        }
      };
      item.name = x.name;
      item.id = x.id;
      item.price = x.price;
      item.qty = 1;
      if (x.main_option_count > 0) {
        //save item with their total add single item and add item with options dynamic total on add or minus
        x.main_option.forEach(el => {
          if (el.pivot.type === "compulsory") {
            el.option.forEach(elm => {
              let opt = {
                name: String,
                id: Number,
                price: Number
              };
              if (elm.available_qty === true) {
                opt.name = elm.name;
                opt.id = elm.id;
                item.options.compulsory.push(opt);
              }
            });
          } else {
            el.option.forEach(elm => {
              let opt = {
                name: String,
                id: Number,
                qty: Number,
                price: Number,
                total: Number
              };
              if (elm.total_qty > 0) {
                opt.name = elm.name;
                opt.id = elm.id;
                opt.price = elm.price;
                opt.qty = elm.total_qty;
                opt.total = elm.total_qty * elm.price;
                item.options.optional.push(opt);
              }
            });
          }
        });
        sn.orderedItems.push(item);
        var compText = "";
        var optText = "";
        g = item.options.compulsory.length;
        var o = item.options.optional.length;
        if (g) {
          item.options.compulsory.forEach((el, i) => {
            compText +=
              (i === 0 ? "with " : i === g - 1 ? "and " : ", ") + el.name + " ";
          });
        }
        if (o) {
          item.options.optional.forEach((el, i) => {
            optText +=
              (i === 0 ? "plus additional " : i === o - 1 ? "and " : "") +
              el.qty +
              "x" +
              el.name +
              (i === o - 2 ? " " : i === o - 1 ? " " : ", ");
          });
        }
        var text =
          item.name + " " + compText + optText + "has been added to your order";
        sn.$store.dispatch("snack", {
          color: "black",
          text: text
        });
      } else {
        sn.orderedItems.push(item);
        text = item.name + " has been added to your order";
        sn.$store.dispatch("snack", {
          color: "black",
          text: text
        });
      }
    },
    changeStatus(x) {
      this.statusId = x;
    },
    checkCart(x) {
      const sn = this;
      if (sn.orderedItems.length) {
        sn.orderedItems.forEach((el, i) => {
          if (el.id === x.id) {
            if (x === sn.orderedItems[i]) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        });
      } else {
        return true;
      }
    },
    getCompOptionsCount(x) {
      var t = 0;
      x.main_option.forEach(el => {
        if (el.pivot.type === "compulsory") {
          t++;
        }
      });
      return t;
    },
    addItem(x, y, w, z, a, b) {
      const sn = this;
      console.log(y.toString());
      console.log(sn.compId);
      var t = y.toString();
      if (x.available_qty) {
        sn.compId[t] = x.name;
        var t = {};
        t.item = a;
        t.option = x.id;
        t.main = b;
        t.index = z;
        sn.itemOpt.push(t);
        sn.vendorItems.items[w].items[z].avg_rating++;
      } else {
        var newOpt = sn.itemOpt.filter(el => {
          return el.option != x.id;
        });
        sn.itemOpt = newOpt;
        sn.vendorItems.items[w].items[z].avg_rating--;
        sn.compId[t] = null;
      }
    },
    checkItemOpt(x, y, z, a) {
      return this.itemOpt.some(el => {
        return (
          el.option === x && el.item === z && el.main === y && el.index === a
        );
      });
    },
    checkChecked(x, y, z) {
      return this.vendorItems.items[x].items[y].main_option[z].option.some(
        el => {
          return el.available_qty === true;
        }
      );
    }
  }
};
</script>
