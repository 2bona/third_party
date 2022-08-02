<template>
  <v-layout row wrap justify-space-around style="overflow:hidden; overflow-y: hidden;min-height:100vh">
    <v-flex xs12 md5 class=" align-center">
              <v-card
              height="auto"
              width="100%"
              max-width="800px" style="overflow:hidden;"
                class=" d-flex ma-auto pt-6 text-center elevation-0"
                color="transparent"
              >
                <div style="min-width:300px; width:100%;" class="ma-auto mb-3 pt-3 align-self-center">
                  <v-avatar tile size="180px"  flat   class="elevation-0 mb-3">
                    <v-img
                      src="https://res.cloudinary.com/payhospi/image/upload/v1658811037/byc/spaggit_logo_1_ryxsaq.png"
                      alt="alt" width="300px" contain
                    > </v-img>
                  </v-avatar>
                <v-slide-x-reverse-transition leave-absolute>
                  <router-view></router-view>
                </v-slide-x-reverse-transition>
                
               
                </div>   
              </v-card>
    </v-flex>
  </v-layout>
</template>
