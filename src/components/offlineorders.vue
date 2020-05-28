<template>
  <v-app>
    <v-container fluid class="pa-0">
      <v-btn
        fixed
        @click="$router.push('/adminedit')"
        bottom
        right
        fab
        color="grey"
        class="elevation-20"
        style="z-index:99;margin-bottom: 60px;"
      >
        <v-icon color="black">mdi-arrow-left</v-icon>
      </v-btn>
      <v-content>
        <v-card
          tile
          class="pa-2 pb-12 text-center"
          min-height="100vh"
          dark
          color="grey darken-2"
        >
          <h1
            class="body-2 font-weight-bold mt-4 text--darken-3 text-uppercase grey--text"
          >
            saved orders ({{ orders.length }})
          </h1>
          <v-progress-linear
            color="grey"
            v-if="loadOrders"
            class="my-4"
            :indeterminate="true"
          ></v-progress-linear>
          <div style=" width:100%;" class="ma-auto mb-3 pb-12 pt-3">
            <div>
              <v-card
                class="mx-auto mb-3"
                max-width="344"
                style="z-index: 8;border-radius: 25px;"
                outlined
                :ripple="false"
                @click="$router.push('/offlinepage/' + i)"
                :key="i"
                v-for="(n, i) in orders"
              >
                <p
                  v-if="n.n"
                  style="position: absolute;
    width: 100%;
    text-align: center;
    display: flex;
    margin: 0;
    z-index: -1;
    padding: 18px;
    height: 100%;
    justify-content: center;"
                  class="display-4 font-weight-black grey--text text--darken-4"
                >
                  {{ n.n }}
                </p>
                <v-list-item two-line>
                  <v-list-item-content>
                    <div
                      :class="
                        !n.p && n.s
                          ? 'red--text text--lighten-1'
                          : !n.s && !n.p
                          ? 'yellow--text text--lighten-1'
                          : !n.s && n.p
                          ? 'blue--text text--lighten-1'
                          : 'grey--text text--lighten-1  '
                      "
                      class="text-left d-flex overline mb-4"
                    >
                      Order {{  i }}
                      <v-spacer></v-spacer>
                      <span>{{ n.d | myDate }}</span>
                    </div>
                    <v-list-item-subtitle class="text-left"
                      ><span :key="p" v-for="(o, p) in n.i">{{
                        o.name + (n.i.length != p + 1 ? ", " : ".")
                      }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <p class="body-1 grey--text text--lighten-3 pl-0">
                    <span
                      ><v-icon
                        size="14"
                        color="grey lighten-3"
                        style="padding-bottom:3px"
                        >mdi-currency-ngn</v-icon
                      >{{ n.t | price }}
                    </span>
                    <span class="caption" v-if="n.m && n.c > 1"
                      >- Change
                      <v-icon
                        size="11"
                        color="grey lighten-3"
                        style="padding-bottom:3px"
                        >mdi-currency-ngn</v-icon
                      >{{ n.c | price }}</span
                    >
                  </p>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    class="grey--text text--darken-1"
                    @click.stop="delBtn(i)"
                    text
                    >delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
            <p>{{ message2 }}</p>
          </div>
        </v-card>
      </v-content>
      <v-dialog v-model="delDialog" max-width="290">
        <v-card>
          <v-card-title class="title">Delete order?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="grey lighten-1" text @click="delDialog = false">
              cancel
            </v-btn>

            <v-btn color="grey darken-1" text @click="deleteOrder()">
              sure
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
<style>
.texti {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff8a00),
    to(#da1b60)
  );
  background: linear-gradient(to right, #ff8a00, #da1b60);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  text-shadow: none;
}
.v-toolbar__content,
.v-toolbar__extension {
  padding: 4px 9px !important;
  justify-content: space-around !important;
}
body,
html {
  overflow-x: hidden;
}
</style>
<script>
import localforage from "localforage";
import LZString from "lz-string";
export default {
  name: "App",
  components: {},
  data() {
    return {
      orders: [],
      message: "",
      message2: "",
      delIndex: "",
      delDialog: false,
      loadOrders: true,
      timeout: 6000,
      callagent: "08033685498"
    };
  },
  mounted() {
    const sn = this;
    localforage.ready().then(function() {
      localforage
        .getItem("orders")
        .then(val => {
          sn.loadOrders = false;
          var o = LZString.decompress(val);
          var p = JSON.parse(o);
          sn.orders = p;
        })
        .catch(() => {
          sn.loadOrders = false;
          sn.message2 = "You have not accepted any offline order. ";
        });
    });
  },
  computed: {},
  methods: {
    delBtn(i) {
      this.delIndex = i;
      this.delDialog = true;
    },
    deleteOrder() {
      const sn = this;
      localforage
        .getItem("orders")
        .then(val => {
          var o = LZString.decompress(val);
          var p = JSON.parse(o);
          var y = p.filter((el, i) => {
            return i != sn.delIndex;
          });
          sn.orders = y;
          var i = JSON.stringify(y);
          var o = LZString.compress(i);
          localforage.removeItem("orders");
          localforage.setItem("orders", o);
          this.delDialog = false;
        })
        .catch(() => {
          sn.$store.dispatch("snack", {
            color: "black",
            text: "An error occured"
          });
          this.delDialog = false;
        });
    }
  }
};
</script>
