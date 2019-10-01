<template>
  <v-flex xs12>
    <v-flex xs6></v-flex>
    <v-row class="px-3" justify="space-between">
      <v-flex xs12>
<p class="text-center overline orange--text  font-weight-bold">
thank you!
</p> 
<p class="text-center title green--text text-capitalize font-weight-bold"> 
    
    <v-icon color="green lighten-3">mdi-check-decagram</v-icon>
    payment successful</p>  
        </v-flex>
    </v-row>
    <v-row class="my-5 px-3" justify="space-around">
      <v-flex xs5>
        <v-btn to="/order" block color="orange" dark rounded>home</v-btn>
      </v-flex>
      <v-flex xs5>
        <v-btn to="/order" block color="orange" dark rounded>add card</v-btn>
      </v-flex>
    </v-row>
  </v-flex>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go("-1");
    }
  },
  data() {
    return {};
  }
};
</script>