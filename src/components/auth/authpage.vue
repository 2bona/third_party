<template>
  <v-layout row wrap justify-space-around style="overflow:hidden; overflow-y: auto">
    <v-flex xs12 md5 class="d-flex align-center">
              <v-card
              height="100vh"
              width="100%"
              max-width="800px"
                class=" d-flex ma-auto text-center elevation-0"
                color="transparent"
              >
                <div style="min-width:300px; width:100%; min-height:600px" class="ma-auto pt-3 align-self-center">
                  <v-avatar size="100px" class="elevation-24 mb-9">
                    <img
                      src="https://images.unsplash.com/photo-1555580399-49e780f216b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
                      alt="alt"
                    />
                  </v-avatar>
                <router-view></router-view>
                </div>
              </v-card>
    </v-flex>
  </v-layout>
</template>
