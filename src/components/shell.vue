
<template>
    <v-app>               
    <v-container fluid class="pa-0">
    <v-content>
        <v-slide-x-reverse-transition>      <router-view></router-view>
        </v-slide-x-reverse-transition>

    </v-content>   </v-container>

  </v-app>
</template>
<script>
export default {
    name: "App",
    components: {
        
    },
    data() {
        return {
          vendor: 'chuks world kitchen',
      timeout: 6000
        }
    }

}
</script>
