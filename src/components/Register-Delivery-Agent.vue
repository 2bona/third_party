<template>
<div>
    <v-card class="pb-12" flat tile>
        <v-card-title class="text-center pb-0 font-weight-black grey--text text--darken-1">
            Delivery Agent Registration
        </v-card-title>
        <span class="px-6 pt-0 font-weight-bold caption grey--text text--lighten-2">Delivering bundle of joy to people.</span>
    <v-card-text class="px-6 pb-5">
                      <v-text-field
    class="font-weight-bold grey--text text--darken-4"
       autofocus
       v-model="name"
      color="orange"
      label="Full Name"
      required
    ></v-text-field>
                      <v-text-field
    class="font-weight-bold grey--text text--darken-4"
      
      color="orange"
      label="Phone Number"
      type="text"
      v-model="phone"
      required
    ></v-text-field>
                      <v-text-field
    class="font-weight-bold grey--text text--darken-4"
      
      color="orange"
      label="Facebook"
      type="facebook"
      v-model="facebook"
      required
    > </v-text-field>
                      <v-text-field
    class="font-weight-bold grey--text text--darken-4"
      
      color="orange"
      label="Instagram"
      v-model="instagram"
      type="text"
      required
    > </v-text-field>
        <v-text-field
          name="address"
          label="Address"
          color="orange"
          class="font-weight-bold grey--text text--darken-4"
          placeholder="Your home address."
        ></v-text-field>
        <v-textarea
          name="bio"
          label="Bio"
          color="orange"
          class="mb-3 font-weight-bold grey--text text--darken-4"
          placeholder="A little info about your business."
          hint="Maximum of 100 words"
        ></v-textarea>
             <v-row>
                  <v-btn @click="register()" dark large  rounded color="orange" class="px-5 mx-auto colored font-weight-bold grey--text text--lighten-3 ">
                              Register
                          </v-btn>
             </v-row>
                         
                         
                      </v-card-text>
                       </v-card>
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