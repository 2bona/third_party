<template>
  <v-layout row wrap justify-space-around style="overflow-x:hidden;">
    <v-flex xs12 md5>
      <v-card
        tile
        height="100vh"
        width="100%"
        flat
        img="https://images.unsplash.com/photo-1553728880-5ed855a08f58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80"
      >
        <v-card color="transparent" tile flat height="40vh"></v-card>

        <v-card
          tile
          style="background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, #fff 50%);position:absolute;" width="100%" flat
          height="60%"
        >
          <v-layout row wrap justify-space-around>
            <v-flex
              xs9
              style="
    
        position: relative;
    
        bottom: 23px;
    
    "
            >
              <v-card flat  style="    position: relative;
    width: 100%;
    bottom: 20%;border-radius: 20px;background:;" class="text-center elevation-0" color="white" min-height="400px">
                <div style="position:relative;bottom: 60px;">
                  <v-avatar size="100px" class="elevation-24">
                    <img
                      src="https://images.unsplash.com/photo-1555580399-49e780f216b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
                      alt="alt"
                    />
                  </v-avatar></div>
    <router-view>
    </router-view>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>
