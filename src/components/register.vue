<template>
<div><v-card-text class="px-6 pb-5">
                      <v-text-field
       autofocus
       v-model="name"
      color="orange darken-3"
      label="Name"
      required
    ></v-text-field>
                      <v-text-field
      
      color="orange darken-3"
      label="Email"
      type="email"
      v-model="email"
      required
    ></v-text-field>
                      <v-text-field
      
      color="orange darken-3"
      label="Password"
      type="password"
      v-model="password"
      required
    > </v-text-field>
                      <v-text-field
      
      color="orange darken-3"
      label="Repeat Password"
      v-model="c_password"
      type="password"
      required
    > </v-text-field>
                          <v-btn @click="register()" dark large  rounded color="orange" class="px-5  colored font-weight-bold grey--text text--lighten-3 ">
                              sign up
                          </v-btn>
                         
                      </v-card-text>
         </div>
</template>
<style>

</style>
<script>

export default {
  data() {
    return {
    name: '',
    email: '',
    password: '',
    c_password: '',
    }
  },
   computed : {
      user(){return this.$store.getters.getUser;},
      registerStatus(){ return this.$store.getters.getUserRegisterStatus},
    },
    methods: {
     register(){
    this.$store.dispatch( 'addUser', {
        name: this.name,
        email: this.email,
        password: this.password,
        c_password: this.c_password,
    })
    
}
    }
};
</script>