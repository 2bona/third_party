<template>
<div>
  <v-card-text class="px-6 py-0">
           
                      <v-text-field
       autofocus
      color="orange darken-3"
      label="Email"
      type="email"
      required
      v-model="email"

    ></v-text-field>
      <v-text-field
      v-model="password"
      color="orange darken-3"
      label="Password"
      type="password"
      required
    ></v-text-field>
                          <v-btn @click="login()" :loading='isLoggedIn' dark large block rounded color="white darken-3" class=" font-weight-bold orange--text text--darken-3  text-capitalize">
                              <span class="texti">login</span>
                          </v-btn>
                         <v-btn to="/auth/reset" text class="mt-5 overline text-capitalize font-weight-black">forgot password</v-btn>
                      </v-card-text>
           </div>
</template>
<style>
.colored{
      background: linear-gradient(to right,#ff8a00,#da1b60)!important;
}
</style>
<script>

export default {
  data() {
    return {
     email: '',
     password: '',
    }
  }, 
  computed : {
      user(){return this.$store.getters.getUser;},
      isLoggedIn(){ return this.$store.getters.getIsLoggedIn},
      loginStatus(){ return this.$store.getters.getUserLoginStatus},
      loginError(){ return this.$store.getters.getLoginError},
    },
    methods: {
     login(){
    this.$store.dispatch( 'login', {
        email: this.email,
        password: this.password,
    })}
    }
};
</script>