<template>
  <v-container align-center justify-center class="mt-2 pb-0">
    <h1 class="display-1 font-weight-bold grey--text text--darken-1 mb-0 mt-5 text-capitalize">
      Stories from talented writers around the country
      <br />
    </h1>
    <div>
      <v-layout row justify-space-between class="mb-3">
        <v-flex xs8 class="text-wrap">
          <p class="caption grey--text mt-0">
            Updated {{latestPost.created_at | nowDate}}
            <br />
            <a :href="'/blog/show/'+latestPost.id">
              <span class="blue--text text--darken-2 text-capitalize">{{latestPost.title |title}}</span>
            </a>
            <span>
              in
              <span class="orange--text text-capitalize">{{latestPost.category}}</span>
            </span>
          </p>
        </v-flex>
        <v-flex xs4>
          <v-spacer></v-spacer>
          <v-btn
            small
            round
            to="/blog/main"
            color="orange lighten-1"
            outline
            class="elevation-2 title"
            style="float:right; text-transform:lowercase;"
          >
            <i class="fas fa-long-arrow-alt-right"></i>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-flex xs12>
        <flickity v-if="blogs" ref="flickity" :options="flickityOptions" class="marginbottom">
          <div style="width: min-content" v-for="n in blogs" :key="n.id">
            <v-card flat class="carousel-cell mx-2" :to="'/blog/show/'+n.id">
              <v-img
                src="https://images.unsplash.com/photo-1520242279429-1f64b18816ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                class="elevation-2 carousel-cells"
              >
                <v-layout class="btm px-2">
                  <v-flex xs6>
                    <p class="caption mb-0 white--text font-weight-bold">
                      <i class="fas fa-eye mr-1"></i>
                      {{n.views}}
                    </p>
                  </v-flex>
                  <v-flex xs6>
                    <p class="text-xs-right caption mb-0 white--text font-weight-bold">
                      <i class="fas fa-clock mr-1"></i>
                      {{n.readtime}} read
                    </p>
                  </v-flex>
                </v-layout>
              </v-img>
              <v-card-title primary-title class="px-0" style="positon: absolute">
                <div class="px-1">
                  <v-flex xs12 class="mb-1">
                    <v-layout>
                      <v-flex
                        xs12
                        class="text-capitalize caption grey--text text--lighten-1 font-weight-light"
                      >{{n.category}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex
                        xs12
                        class="text-capitalize title grey--text text--darken-2 font-weight-bold"
                      >{{n.title | title}}</v-flex>

                      <v-flex
                        xs6
                        class="text-capitalize caption pt-1 grey--text font-weight-light"
                      >By {{n.authorname}}</v-flex>

                      <v-flex xs6>
                        <p
                          class="caption mb-0 grey--text font-weight-light text-xs-right pt-1"
                        >{{n.created_at | myDate}}.</p>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-layout>
                    <span
                      class="subheader text--darken-1 grey--text"
                      style="text-align: justify"
                    >{{n.description | desc}}</span>
                  </v-layout>
                </div>
              </v-card-title>
            </v-card>
          </div>
        </flickity>
      </v-flex>
    </div>
  </v-container>
</template>


<script>
import flickity from "vue-flickity";
export default {
  components: {
    flickity
  },
  data() {
    return {
      flickityOptions: {
        contain: true,
        pageDots: false,
        percentPosition: false,
        wrapAround: false,
        freeScroll: true

        // any options from Flickity can be used
      },
      dark: false
    };
  },
  props: ["latestPost", "blogs"],
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    previous() {
      this.$refs.flickity.previous();
    }
  }
};
</script>
<style>
a {
  text-decoration-line: none;
}
.btm {
  position: absolute;
  width: 100%;
  bottom: 1px;
  text-shadow: 0px 2px 6px black;
}
</style>

<style scoped>
.marginbottom {
  margin-bottom: 50px;
}

.carousel-cell {
  width: 35%;
  min-width: 254px;
  height: 350px;
  background: transparent;
  border-radius: 10px;
  counter-increment: carousel-cell;
}
.carousel-cells {
  max-width: 253px;
  height: 186px;
  border-radius: 10px;
  counter-increment: carousel-cell;
}

/* /* cell number */
.carousel-cell p {
  bottom: 0;
}
</style>