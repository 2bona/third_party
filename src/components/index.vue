<template>
  <div>
    <v-app-bar fixed dense background-color="white" hide-on-scroll extension-height="55">
      <!-- <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>-->
      <v-toolbar-title
        class="subtitle-2 ml-0 grey--text text--darken-1 font-weight-regular"
      >What would you like to eat?</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn to="/search" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs
          grow
          show-arrows
          center-active
          color="orange"
          icons-and-text
          height="55"
          background-color="transparent"
        >
          <v-tab class="overline font-weight-medium text-capitalize" v-for="n in 20" :key="n">
            chuks{{n}}
            <v-avatar size="25" tile color="white" style="border-radius:4px" class="pt-1">
              <img
                src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt
              />
            </v-avatar>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-flex xs12 lg9 class style="margin: 6rem 0px 6rem 0px">
      <v-card style="overflow-x:hidden;" flat tile color="transparent">
        <v-card-title class="body-1 px-2 font-weight-bod grey--text text--lighten-1">
          Popular combo
          <div class="flex-grow-1"></div>
        </v-card-title>
        <div class="container pt-0 pb-1 mb-0">
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6 sm4 v-for="n in 4" :key="n">
                <v-card
                  flat
                  color="transparent"
                  style=" border-radius:10px 10px 10px 10px"
                  class="elevation-2 mx-auto pt-1 mb-2"
                  width="95%"
                  max-width="225"
                  height
                >
                  <v-img
                    width="95%"
                    to="/item"
                    style="border-radius: 5px;"
                    class="elevation-9 mx-auto"
                    height="150"
                    src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  >
                    <v-btn x-small color="white" fab absolute right style="right:2px" class="ma-1">
                      <v-icon small color="grey lighten-1" class>mdi-heart</v-icon>
                    </v-btn>
                  </v-img>
                  <v-card-text class="mx-0 py-1 px-5">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <p
                          class="body-2 grey--text text-truncate text--darken-1 font-weight-regular my-0"
                        >Grilled salmonbhhhhhyktdjuduyfh</p>
                      </v-flex>
                      <v-flex xs12>
                        <p class="caption font-weight-regular my-0" style>N1000</p>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-row style="height: 17px;" class="mb-0 px-5" justify="space-between">
                    <v-flex xs11>
                      <v-card-title
                        style="height: 8px;
                        align-items: self-start;"
                        class="py-0 px-0"
                      >
                        <v-rating
                          size="12"
                          :value="4"
                          dense
                          color="orange"
                          hover
                          background-color="grey"
                          class="pa-0"
                          style="
                              line-height: 0;
                          "
                        ></v-rating>

                        <span class="grey--text overline mt-0">(64)</span>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs1>
                      <p class="mb-0 text-right">
                        <span style=";margin-top:;" class>
                          <v-icon small color="green" class="pb-3">mdi-network-strength-4</v-icon>
                        </span>
                      </p>
                    </v-flex>
                  </v-row>
                  <v-card-text class="mx-0 mb-0 mt-0 pt-0 pb-1 px-1">
                    <v-layout>
                      <v-flex xs12>
                        <v-chip
                          x-small
                          color="white"
                          class="elevation-1 mb-0 grey--text text--darken-1 text-truncate"
                        >
                          <v-icon color="green" size="7" class="mr-1">mdi-circle-slice-8</v-icon>mummy's pot filterthis
                        </v-chip>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </div>
      </v-card>

      <v-layout row wrap class="mt-0 mx-0" style="overflow-x:hidden; ">
        <v-card-title class="body-1 pt-0 px-2 mt-0 font-weight-regular grey--text">
          Vendors
          <div class="flex-grow-1"></div>
        </v-card-title>
        <v-flex class="my-2" xs12 sm6 md6 lg6 v-for="n in slides[0].items" :key="n.sn">
          <v-card
            width="95%"
            height="auto"
            max-height
            min-height
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pt-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/item">
                <v-list-item-avatar
                  size="100"
                  tile
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="overflow-y: visible;" class="py-0">
                <v-layout>
                  <v-flex xs9>
                    <router-link style="text-decoration: none;" to="/item/vendor/egusi">
                      <h2
                        style="line-height:1;text-decoration: none;"
                        class="body-1 grey--text text-truncate text--darken-3 font-weight-regular"
                      >{{n.name}}</h2>
                    </router-link>
                  </v-flex>
                  <v-flex style="
    position: absolute;
    right: -9px;
    margin-top: -11px;
">
                    <v-btn icon class="ma-1">
                      <v-icon small color="grey lighten-1">mdi-heart</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <p class="caption font-weight-bold grey--text text--darken-1 mb-0">N1000</p>

                <v-card-title style="height: 12px;" class="mb-0 py-0 px-0">
                  <v-rating
                    :value="4"
                    dense
                    color="orange"
                    hover
                    background-color="grey"
                    size="12"
                    class="mr-2"
                    style="line-height: 0;"
                  ></v-rating>
                  <span class="grey--text overline my-0">(64)</span>
                </v-card-title>
                <p class="mb-1 my-0 px-1">
                  <v-icon small color="orange" class="pb-0">mdi-network-strength-2</v-icon>
                  <span class="ml-2 overline font-weight-medium grey--text"></span>
                </p>
                <v-chip
                  x-small
                  color="white"
                  class="elevation-1 mb-1 grey--text text--darken-1 text-truncate"
                >
                  <v-icon color="green" size="7" class="mr-1">
                    mdi-circle-slice-8</v-icon>mummy's pot filterthis
                </v-chip>
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <navbottom></navbottom>
  </div>
</template>
<style></style>
<script>
import navbottom from "./navbottom";
export default {
  components: {
    navbottom
  },
  data() {
    return {
      rating: 3,
      items: [
        {
          name: "food info",
          link: "/food/id"
        },
        {
          name: "contact seller",
          link: "/vendor/id"
        }
      ],
      slides: [
        {
          cat: "food",
          items: [
            {
              pic:
                "https://images.unsplash.com/photo-1534070189982-818bb5622474?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 0,
              name: "Meat balls"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 1,
              name: "Spaghetti"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 2,
              name: "Baked Burger"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 3,
              name: "Salad"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1539735776517-befcae86494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 4,
              name: "Fried Fritata"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1539735776517-befcae86494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 5,
              name: "Fried Fritata"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1539735776517-befcae86494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 6,
              name: "Fried Fritata"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 7,
              name: "Baked Fish and sauce"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 8,
              name: "Agidi and pepper soup"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 9,
              name: "Jollof rice and chicken with salad"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 10,
              name: "Sea food"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 11,
              name: "Sea food"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 12,
              name: "Sea food"
            }
          ]
        }
      ]
    };
  }
};
</script>
