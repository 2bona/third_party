<template>
  <v-card>
    <v-toolbar color="deep-red darken-1" dark flat>
      <v-btn icon>
        <v-icon @click="$router.push('/details')">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="text-capitalize">{{tab}}</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs  v-model="tab" grow slider-color="yellow" background-color="transparent">
          <v-tab  class="ml-0" to="login" href="#login">Login</v-tab>
          <v-tab  to="register" href="#register">Register</v-tab>
          <v-tab  to="reset" href="#register">Fogot Password</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in forms" :key="i" :value="item">
        <v-card flat class="pa-3">
<v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
        class="mb-2"
        v-if="tab==='register'"
        
      ></v-text-field>
   

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        class="mb-2"
      ></v-text-field>
   <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        class="mb-2"
        v-if="tab=== 'login'"
      ></v-text-field>
   <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
        class="mb-2"
        v-if="tab=== 'register'"
      ></v-text-field>
         <v-text-field
        v-model="c_password"
        label="Confirm Password"
        required
        class="mb-2"
        v-if="tab==='register'"
      ></v-text-field>

      <v-btn
        color="primary"
        small rounded
        class="mr-4"
        v-if="tab==='login'"
       @click="login()"

      >
        Login
      </v-btn>
      <v-btn
      small rounded
      dark
    v-if="tab==='register'"
        color="deep-orange darken-3"
        class="mr-4"
        @click="register()"
      >
        Register
      </v-btn>
{{user}} {{isLoggedIn}} {{token}}  {{registerStatus}} {{registerError}}
      <v-btn
        color="default"
        class="mr-4"
        small rounded
        @click="details()"
    v-if="tab==='reset'"
        to="reset"
      >
        Reset Password
      </v-btn>

      
    </v-form>        </v-card>
      </v-tab-item>
    
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
        forms: ['login', 'register', 'reset'],
        valid: true,
          name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      c_password: '',
      tab: null,
      reset:false,
      pageTitle: "",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
    computed : {
       user(){
        return this.$store.getters.getUser;
      },
      isLoggedIn : function(){ return this.$store.getters.getIsLoggedIn},
      loginError : function(){ return this.$store.getters.getLoginError},
      registerError : function(){ return this.$store.getters.getRegisterError},
      registerStatus : function(){ return this.$store.getters.getUserRegisteredStatus},
      userload : function(){ return this.$store.getters.getUserLoadStatus},
      token : function(){ return this.$store.getters.getToken}
    },
    
  methods: {
    tabone() {
      this.tab = 0;
    },

    tabtwo() {
      this.tab = 1;
    },
   register(){
    this.$store.dispatch( 'addUser', {
        name: this.name,
        email: this.email,
        c_password: this.c_password,
        password: this.password,
    });
      // .then(() => {
      //     this.$router.push('/');
      //   })
},
   details(){
    this.$store.dispatch( 'user');
      // .then(() => {
      //     this.$router.push('/');
      //   })
},
   login(){
    this.$store.dispatch( 'login', {
        email: this.email,
        password: this.password,
    })
      .then(() => {
        if(this.$store.getters.getIsLoggedIn){
          this.$router.push('/');}else{return}
        })
}
  },
  created() {
    this.tab = this.$route.params.action;
  }
};
</script>