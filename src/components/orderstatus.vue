<template>
<div class="container px-8 mt-12">


    <v-card width="100%" class="mt-6" flat tile  color="transparent">
        <v-row justify="space-between">
            <v-flex xs5>
              <p class="overline text-uppercase font-weight-bold grey--text text--darken-2">Order Status</p>  
            </v-flex>
            <v-flex xs5>
              <p  class="caption text-uppercase font-weight-bold deep-orange--text text-right ">invoice: 12a9pd</p>  
            </v-flex>

        </v-row>
        <v-row justify="space-around">
            <v-avatar
            tile class="my-5 elevation-2"
            style="border-radius: 10px"
                size="90"
                color="red"
            >
                <img src="https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="alt">
            </v-avatar>
        </v-row>
         <v-timeline reverse>
        <v-timeline-item
          color="orange"
          small 
        >
          <v-row class="pt-1">
            
            <v-col class="px-0">
<div class="overline grey--text">9 May 2019.</div>

              <strong>Order recieved</strong>
              <div class="caption"><v-icon size="12">mdi-clock</v-icon> 9:10am</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="orange"
          small
          
        >
          <v-row class="pt-1">
            
            <v-col class="px-0" >
                              <div class="overline grey--text">9 may 2019</div>

              <strong>On the way</strong>
              <p class="caption"><v-icon size="12">mdi-clock</v-icon> 9:10am</p>
          <v-btn dark x-small="" color="deep-orange darken-3">tracking <v-icon size="12">mdi-map-marker-radius</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-timeline-item>



        <v-timeline-item
          color="orange"
          small
        >
          <v-row class="pt-1">
            
            <v-col class="px-0">
                             <div class="overline grey--text">9 may 2019</div>

              <strong>Delivered</strong>
              <p class="caption"><v-icon size="12">mdi-clock</v-icon> 9:10am</p>
          </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item
          color="red"
          small
        >
          <v-row class="pt-1">
            
            <v-col class="px-0">
                             <div class="overline grey--text">9 may 2019</div>

              <strong>Order canceled</strong>
              <p class="caption mb-0"><v-icon size="12" color="">mdi-clock</v-icon> 9:10am</p>
              <router-link class="green--text" to='/order/tracking'>
                  <p class="green--text text--lighten-1 mb-0 caption"><v-icon size="17" color="green">mdi-cash</v-icon> Money refunded</p>
                  </router-link>
              <p class="orange--text text--lighten-1 caption"><v-icon size="17" color="orange">mdi-alert-circle</v-icon> <strong>Reason :</strong> we ran out of food, the moment you ordered.</p>
          </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
      <v-row justify="space-around">
          <v-btn to="/order/tracking"  rounded dark class="my-9 px-5" color="orange">confirm delivery</v-btn>
      </v-row>
    </v-card>
        </div>
</template>