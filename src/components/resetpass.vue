<template>
<div><v-card-text class="px-6 py-0">
           
                      <v-text-field
       autofocus
      color="orange darken-3"
      label="New Password"
      type="password"
      required
    ></v-text-field>
                      <v-text-field
      
      color="orange darken-3"
      label="Repeat Password"
      type="password"
      required
    ></v-text-field>
                     
                          <v-btn dark large block rounded color="white darken-3" class="body-2 font-weight-bold orange--text text--darken-3  text-capitalize">
                             <span class="texti">reset password</span> 
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
     
    }
  }
};
</script>