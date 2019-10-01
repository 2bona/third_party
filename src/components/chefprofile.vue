<template>
  <v-card max-width="600" color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Chef</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat color="basil">
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<style>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
@media only screen and (max-width: 600px) {
    .centeritem {
        text-align: center;
    }
    .justifycenter {
        -webkit-box-pack: center !important;
        -ms-flex-pack: center !important;
        justify-content: center !important;
    }
}

@media only screen and (min-width: 450px) {}
</style>
<script>

export default {
  name: "chef",
 
  computed: {
   
  },

  data() {
    return {
      tab: null,
      rating: 4,
      items: ["Profile", "Popular", "Menu", "Contact"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>