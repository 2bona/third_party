<template>
  <div>
    <v-row class=" px-6">
      <v-flex xs12 class="mb-0">
        <v-card-title class="title  pb-3 pl-0 text--darken-2 pb-2 grey--text">
          Delivery agents
        </v-card-title>
        <v-card
          style="border-radius: 25px;max-height:50vh;overflow-y:auto"
          class="elevation-2 pb-3"
          :loading="load"
        >
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-right"></th>
                  <th class="text-left grey--text">Names</th>
                  <th class="text-right"></th>
                  <th class="text-right"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(n, i) in agents" :key="n.id">
                  <td
                    class="caption font-wight-bold grey--text text--lighten-1 "
                  >
                    {{ i + 1 }}
                  </td>
                  <td class="caption ">{{ n.name }}</td>
                  <td class="text-right">
                    <a style="text-decoration:none" :href="'tel:' + n.phone">
                      <v-btn depressed fab dark icon x-small color="primary"
                        ><v-icon>mdi-phone</v-icon>
                      </v-btn></a
                    >
                  </td>
                  <td class="text-right">
                    <a
                      style="text-decoration:none"
                      :href="
                        'https://wa.me/+234' +
                          n.phone.substring(1) +
                          '?text=Hello,%20this%20is%20' +
                          vendor.name +
                          '%20,%20I%20just%20want%20to%20confirm%20your%20location%20for%20a%20food%20delivery.'
                      "
                      target="_blank"
                    >
                      <v-btn depressed fab dark icon="" x-small color="green">
                        <v-icon>mdi-whatsapp</v-icon>
                      </v-btn>
                    </a>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <v-card-title
          class="title my-3 pt-2 pl-0 text--darken-2 pb-3 grey--text"
        >
          <span> Reasons for cancellation </span> <v-spacer></v-spacer>
          <v-btn
            rounded
            depressed
            class="ml-1 font-weight-bold  white--text"
            @click="dialog = true"
            small
            color="grey darken-2"
            >add</v-btn
          >
        </v-card-title>
        <v-card
          style="border-radius: 25px;max-height:50vh;overflow-y:auto"
          class=" elevation-2 pb-4 my-3"
          :loading="load"
        >
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left grey--text">Messages</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(n, i) in replys" :key="n.id">
                  <td
                    class="caption font-wight-bold grey--text text--lighten-1 "
                  >
                    {{ i + 1 }}
                  </td>
                  <td class="caption ">{{ n.content }}</td>
                  <td class="text-right">
                    <v-btn
                      depressed
                      rounded
                      class="grey--text mr-2"
                      @click="editBtn(n.content, n.id)"
                      x-small
                      color=""
                      >edit</v-btn
                    ><v-btn
                      depressed
                      rounded
                      class="grey--text"
                      @click="deleteBtn(n.id)"
                      x-small
                      color=""
                      >delete</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-0 mb-4 px-0">
        <v-card-title class="title pt-2 px-0 text--darken-2 pb-3 grey--text">
          <span>Reviews({{ vendor.reviews_count }})</span> <v-spacer></v-spacer>

          <v-menu
            style="border-radius: 25px;"
            z-index="99999"
            max-height="300"
            nudge-bottom="5"
            allow-overflow
            max-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                :disabled="loadingR"
                color="grey darken-2"
                depressed
                small
                rounded
                class=" mt-1 font-weight-bold  white--text"
                v-on="on"
              >
                {{ filter }}<v-icon class="">mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list style="border-radius:25px">
              <v-list-item-group
                active-class="orange--text"
                color="orange darken-4"
              >
                <v-list-item
                  :disabled="reviewSettings.method === 'latest'"
                  dense
                  @click="getReviews(latest)"
                >
                  <v-list-item-title class="grey--text"
                    >Latest</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  dense
                  :disabled="reviewSettings.method === 'oldest'"
                  @click="getReviews(oldest)"
                >
                  <v-list-item-title class="grey--text"
                    >Oldest</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  dense
                  :disabled="reviewSettings.method === 'best'"
                  @click="getReviews(best)"
                >
                  <v-list-item-title class="grey--text">Best</v-list-item-title>
                </v-list-item>
                <v-list-item
                  dense
                  :disabled="reviewSettings.method === 'worst'"
                  @click="getReviews(worst)"
                >
                  <v-list-item-title class="grey--text"
                    >Worst</v-list-item-title
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-card-title>
        <div
          ref="reviewContainer"
          class="elevation-2 mt-2"
          style="max-height:50vh; border-radius:25px; overflow:auto"
        >
          <div v-show="loadingRTop" class="py-7 text-center">
            <v-progress-circular
              indeterminate
              v-show="loadingRTop"
              color="primary"
            ></v-progress-circular>
          </div>
          <v-list class="py-0 my-0" two-line v-for="n in reviews" :key="n.id">
            <v-list-item :ripple="false" @click="getOrder(n.order.id)">
              <v-list-item-avatar
                style="position: relative;
                      top: 0px;"
                class="mt-0 mb-0 mr-2"
                size="26"
              >
                <v-img :src="n.user.image"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-flex d-flex align-center class="pl-1">
                  <div class="font-weight-bold caption  text-capitalize">
                    {{
                      n.user.surname +
                        " " +
                        n.user.middle_name +
                        " " +
                        n.user.first_name
                    }}
                    <br />
                    <p class="overline mb-0 grey--text text--darken-2">
                      {{ n.created_at | myDate }}
                    </p>
                  </div>

                  <div class="flex-grow-1"></div>

                  <v-rating
                    size="15"
                    dense
                    readonly
                    :value="3"
                    color="orange darken-4"
                    style="position: relative;top: -7px;"
                    background-color="grey lighten-2"
                    v-model="n.rating"
                  ></v-rating>
                </v-flex>
                <v-list-item-subtitle
                  style="line-height:1.3;"
                  class=" px-1 caption grey--text text--darken-1"
                  >{{ n.content }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
          <div class="py-7 text-center">
            <v-progress-circular
              indeterminate
              v-show="loadingR && !loadingRTop"
              color="primary"
            ></v-progress-circular>
            <p v-show="!next_page && !loadingRTop" class="overline text-center">
              the end
            </p>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 class="my-3 px-0">
        <v-card flat tile color="transparent">
          <v-container fluid>
            <v-row justify="space-between">
              <div class="text-center">
                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Add message
                    </v-card-title>

                    <v-card-text>
                      <v-form ref="form">
                        <v-text-field
                          v-model="reply"
                          :rules="[rules.required]"
                          label="Type here"
                        >
                        </v-text-field>
                      </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        color="primary"
                        class="px-3 font-weight-bold caption"
                        rounded
                        text
                        dark
                        :loading="loading"
                        @click="saveReply()"
                      >
                        submit
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Delete message
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        color="grey"
                        text
                        class="px-3 font-weight-bold caption"
                        rounded
                        dark
                        @click="dialog3 = false"
                      >
                        cancel
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="px-3 font-weight-bold caption"
                        rounded
                        text
                        dark
                        :loading="loading3"
                        @click="deleteReply()"
                      >
                        sure
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog2" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Edit message
                    </v-card-title>

                    <v-card-text>
                      <v-form ref="form2">
                        <v-text-field
                          :rules="[rules.required]"
                          label="Type here"
                          v-model="replyEdit"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        color="primary"
                        class="px-3 font-weight-bold caption"
                        rounded
                        dark
                        text
                        :loading="loading2"
                        @click="editReply"
                      >
                        submit
                      </v-btn>
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
<style>
.v-menu__content--fixed {
  border-radius: 25px !important;
}
</style>
<style>
.v-menu__content {
  border-radius: 25px;
}
/* as e dey hot.com
tv show
 */
</style>
<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});

export default {
  data() {
    return {
      content: "",
      load: false,
      filter: "",
      loading: false,
      loadingR: false,
      loadingRTop: false,
      loading2: false,
      loading3: false,
      dialog: false,
      dialog2: false,
      pageClose: false,
      dialog3: false,
      reviewSettings: {},
      valid: true,
      deleteId: "",
      reply: "",
      reviews: "",
      replyEdit: "",
      replyEditId: "",
      replyDeleteId: "",
      next_page: "",
      per_page: "",
      isLoading: false,

      dialog4: false,
      rules: {
        required: value => !!value || "Required."
      },
      radios: "Thank you soo much, we will keep improving"
    };
  },
  computed: {
    vendor() {
      return this.$store.getters.getVendor;
    },
    replys() {
      return this.$store.getters.getReplys;
    },
    agents() {
      return this.$store.getters.getAgents;
    },
    latest() {
      return {
        name: this.vendor.name,
        filter: "created_at",
        direction: "desc",
        method: "latest"
      };
    },
    oldest() {
      return {
        name: this.vendor.name,
        filter: "created_at",
        direction: "asc",
        method: "oldest"
      };
    },
    best() {
      return {
        name: this.vendor.name,
        filter: "rating",
        direction: "desc",
        method: "best"
      };
    },
    worst() {
      return {
        name: this.vendor.name,
        filter: "rating",
        direction: "asc",
        method: "worst"
      };
    }
  },
  beforeDestroy() {
    this.pageClose = false;
  },
  beforeRouteLeave(to, from, next) {
    this.pageClose = false;
    setTimeout(() => {
      next();
    }, 50);
  },
  mounted() {
    const sn = this;
    sn.pageClose = true;
    sn.navb();
    sn.navb2();
    sn.getAgents();
    sn.getReviews({
      name: sn.vendor.name,
      filter: "created_at",
      direction: "desc",
      method: "latest"
    });
  },
  methods: {
    getOrder(x) {
      this.$store.dispatch("order", {
        id: x,
        action: null
      });
    },
    scrollTop() {
      this.$refs.reviewContainer.scrollTo(0, 0);
    },
    navb2() {
      const sn = this;
      sn.$refs.reviewContainer.onscroll = () => {
        let bottomOfWindow =
          sn.$refs.reviewContainer.scrollTop >=
          sn.$refs.reviewContainer.offsetHeight - 280;
        if (bottomOfWindow && sn.next_page && !sn.loadingR && sn.pageClose) {
          sn.scrollReviews(sn.reviewSettings);
          console.log("true");
        }
      };
    },
    saveReply() {
      const sn = this;
      if (sn.$refs.form.validate()) {
        sn.loading = true;
        let url = "/reply/save";
        http({
          url: url,
          method: "post",
          params: {
            content: sn.reply,
            type: "reply"
          }
        })
          .then(response => {
            sn.navb();
            sn.dialog = false;
            sn.loading = false;
          })
          .catch(function(error) {
            sn.dialog = false;
            sn.loading = false;
            console.log(error);
          });
      } else {
        return;
      }
    },
    editBtn(x, y) {
      const sn = this;
      sn.replyEdit = x;
      sn.replyEditId = y;
      sn.dialog2 = true;
    },
    deleteBtn(x) {
      const sn = this;
      sn.replyDeleteId = x;
      sn.dialog3 = true;
    },
    scrollReviews(x) {
      const sn = this;
      sn.loadingR = true;
      sn.filter = x.method;
      let url = sn.next_page;
      http({
        url: url,
        method: "get",
        params: {
          name: x.name,
          filter: x.filter,
          direction: x.direction
        }
      })
        .then(response => {
          response.data.reviews.data.forEach(element => {
            sn.reviews.push(element);
          });
          sn.next_page = response.data.reviews.next_page;
          sn.loadingR = false;
        })
        .catch(function(error) {
          sn.loadingR = false;
          console.log(error);
        });
    },
    getReviews(x) {
      this.$refs.reviewContainer.scrollTo(0, 0);
      const sn = this;
      sn.loadingR = true;
      sn.loadingRTop = true;
      sn.filter = x.method;
      sn.reviewSettings = x;
      let url = "/review/all";
      http({
        url: url,
        method: "get",
        params: {
          name: x.name,
          filter: x.filter,
          direction: x.direction
        }
      })
        .then(response => {
          sn.reviews = response.data.reviews.data;
          sn.next_page = response.data.reviews.next_page_url;
          sn.loadingR = false;
          sn.loadingRTop = false;
        })
        .catch(function(error) {
          sn.loadingR = false;
          sn.loadingRTop = false;
          console.log(error);
        });
    },
    editReply() {
      const sn = this;
      if (sn.$refs.form2.validate()) {
        sn.loading2 = true;
        let url = "/reply/edit";
        http({
          url: url,
          method: "post",
          params: {
            content: sn.replyEdit,
            type: "reply",
            id: sn.replyEditId
          }
        })
          .then(response => {
            sn.navb();
            sn.dialog2 = false;
            sn.loading2 = false;
          })
          .catch(function(error) {
            sn.dialog2 = false;
            sn.loading2 = false;
            console.log(error);
          });
      } else {
        return;
      }
    },
    deleteReply() {
      const sn = this;
      sn.loading3 = true;
      let url = "/reply/delete";
      http({
        url: url,
        method: "get",
        params: {
          id: sn.replyDeleteId
        }
      })
        .then(response => {
          sn.navb();
          sn.dialog3 = false;
          sn.loading3 = false;
        })
        .catch(function(error) {
          sn.dialog3 = false;
          sn.loading3 = false;
          console.log(error);
        });
    },
    navb() {
      const sn = this;
      sn.load = true;
      let url = "/reply/all";
      http({
        url: url,
        method: "get"
      })
        .then(response => {
          sn.load = false;
          sn.$store.dispatch("setReplys", {
            replys: response.data.replys
          });
        })
        .catch(function(error) {
          sn.load = false;
          console.log(error);
        });
    },
    getAgents() {
      const sn = this;
      sn.load = true;
      let url = "/delivery/agents";
      http({
        url: url,
        method: "get"
      })
        .then(response => {
          sn.load = false;
          sn.$store.dispatch("setAgents", {
            agents: response.data.agents
          });
        })
        .catch(function(error) {
          sn.load = false;
          console.log(error);
        });
    }
  }
};
</script>
