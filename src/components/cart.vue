<template>
  <div>
    <div class="mt-0">
     <v-card flat tile color="transparent" class="pb-12 pt-0 ">
   <!-- <span class="overline grey--text  text--darken-1 font-weight-bold">
       Cart
       </span>  -->
        <v-tabs grow centered  color="orange"  mobile-break-point="900">
        <v-tab class="text-capitalize">cart</v-tab>
        <v-tab class="text-capitalize">track</v-tab>
        <v-tab class="text-capitalize">orders</v-tab>

        <v-tab-item class="px-3 pb-2" style="background-color:transparent" >
          <v-card flat tile color="transparent" min-height="80vh">
            
         
        <v-flex class="mx-auto my-4" xs12 sm6 md6 lg6 v-for="n in slides[0].items" :key="n.sn">
          <v-card
            width="95%"
            height="89px"
            max-height
            min-height
            
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pt-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
                <v-list-item-avatar
                  size="81"
                  tile
                  color="transparent"
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              <v-list-item-title style="overflow-y: visible;" class="py-0 px-1">
                <v-layout>
                  <v-flex xs9>
                      <h2
                        style="line-height:1;text-decoration: none;"
                          class="py-1 body-2 grey--text  text-truncate text--darken-2 font-weight-regular my-0"
                      >{{n.name}}</h2>
                  </v-flex>
                  <v-flex style="
    position: absolute;
    right: -9px;
    margin-top: -17px;
">
                    <v-btn icon class="ma-1">
                      <v-icon small color="grey lighten-1">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <p style="padding-left:2px;" class="caption font-weight-regular grey--text text--darken-1 mb-0"><v-icon size="11.5px" style="width: 4.8px; padding-bottom:1.8px; margin-right:3px">mdi-currency-ngn</v-icon>1000</p>
             
              <p class="mb-0 ">
                         <span class="d-flex justify mb-0 mt-0">
             

          <v-btn fab class="elevation-2" color="white" x-small >
              <v-icon color="orange"  style="font-size:11px">fas fa-minus fa-1x</v-icon>
          </v-btn>
          <span class=" mx-2 grey--text text--darken-1 font-weight-medium" style="line-height:2.4;">20</span>
            <v-btn fab class="elevation-2" color="white" x-small >
              <v-icon color="orange" style="font-size:11px">fas fa-plus</v-icon>
          </v-btn>
          </span>
                        </p>
 </v-list-item-title>
            </v-list-item>
             
   
          </v-card>
      
        </v-flex>
         <v-layout row wrap justify-space-around class="px-5 mt-8 mb-12">
          
             
              <v-flex xs12 >
                <v-row>
                <v-btn to="/user"  class="mx-auto" rounded="" dark color="orange"><v-icon>mdi-cart-outline</v-icon> checkout</v-btn>
                </v-row>
              </v-flex>
          </v-layout>
           </v-card>
        </v-tab-item>

      

        <v-tab-item class="px-3">
      <v-card flat tile color="transparent" min-height="80vh">
        <v-flex class="mx-auto my-4" xs12 sm6 md6 lg6 v-for="n in slides[0].items" :key="n.sn">
          <v-card
            width="95%"
            height="89px"
            max-height
            min-height
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pt-1 pb-1">
            <v-list-item three-line class="pa-0">
                <v-list-item-avatar
                  size="81"
                  tile
                  color="transparent"
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              <v-list-item-title style="overflow-y: visible;" class="py-0 px-1">
                <v-layout>
                  <v-flex xs9>
                      <h2
                        style="line-height:1;text-decoration: none;"
                          class="py-1 body-2 grey--text  text-truncate text--darken-2 font-weight-regular my-0"
                      >{{n.name}}</h2>
                  </v-flex>
            
                </v-layout>
                <p style="padding-left:2px;" class="caption font-weight-regular grey--text text--darken-1 mb-0"><v-icon size="11.5px" style="width: 4.8px; padding-bottom:1.8px; margin-right:3px">mdi-currency-ngn</v-icon>1000</p>
             
              <v-btn @click="overlay2 = !overlay2" flat depressed color="orange lighten-4" x-small class="mb-2">
                view detail
                        </v-btn>
 </v-list-item-title>
            </v-list-item>
             
   
          </v-card>
      
        </v-flex>
         <v-layout row wrap justify-space-around class="px-5 mt-8 mb-12">
          
             
              <v-flex xs6>
 <v-btn   class="mt-0 "  rounded="" dark color="orange"><v-icon>mdi-crosshairs-gps</v-icon> track order</v-btn>
              </v-flex>
          </v-layout>
      </v-card>
        </v-tab-item>
        <v-tab-item class="px-3">
        <v-card flat tile color="transparent" min-height="80vh">
        <v-flex class="mx-auto my-3" xs12 sm6 md6 lg6 v-for="n in slides[0].items" :key="n.sn">
          <v-card
            width="95%"
            height="89px"
            max-height
            min-height
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/item">
                <v-list-item-avatar
                  size="81"
                  tile
                  color="transparent"
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="overflow-y: visible;" class="py-0 px-1">
                <v-layout>
                  <v-flex xs9>
                    <router-link style="text-decoration: none;" to="/item/vendor/egusi">
                      <h2
                        style="line-height:1;text-decoration: none;"
                          class="py-1 body-2 grey--text  text-truncate text--darken-2 font-weight-regular my-0"
                      >{{n.name}}</h2>
                    </router-link>
                  </v-flex>
            
                </v-layout>
                <p style="padding-left:2px;" class="caption font-weight-regular grey--text text--darken-1 mb-0"><v-icon size="11.5px" style="width: 4.8px; padding-bottom:1.8px; margin-right:3px">mdi-currency-ngn</v-icon>1000</p>
             
            <v-btn @click="overlay1=!overlay1" flat depressed color="orange lighten-4" x-small class="mb-2">
                give your review
                        </v-btn>
 </v-list-item-title>
            </v-list-item>
             
   
          </v-card>
      
        </v-flex>
     
        </v-card>
        </v-tab-item>

      


      
      </v-tabs>        
</v-card>   
    </div>

   <v-overlay light :value="overlay1">
     <v-card height="" class="pt-12 pa-5" color="" width="70vw">
       <p class="caption mt-4 text-center text-uppercase">how was the food/service?</p>
       <v-row>
      <v-rating class="mx-auto" color="orange" background-color="grey"></v-rating>
       </v-row>
      <v-textarea
        label="Tell others what you think"
        name="review" 
      ></v-textarea>
      <v-row>
          <v-btn color="orange"  small depressed class="mx-auto">submit</v-btn>

      </v-row>
     </v-card>
      <v-btn
        icon
        absolute top right
        @click="overlay1 = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
   <v-overlay light :value="overlay2">
     <v-card height="" class="pt-12 pa-5" color="" width="70vw">
        <v-flex class="my-2" xs12 sm6 md6 lg6 v-for="n in slides[0].items" :key="n.sn">
          <v-card
            width="95%"
            height="62px"
            max-height
            min-height
            
            
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 elevation-24 mb-2 px-1 pt-0 pb-1"
          >
            <v-list-item two-line class="pa-0">
              <router-link to="/item">
                <v-list-item-avatar
                  size="50"
                  tile
                  color="transparent"
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="overflow-y: visible;" class="py-0 px-1">
                <v-layout>
                  <v-flex xs9>
                      <h2
                        style="line-height:1;text-decoration: none;"
                        class="body-1 white--text text-truncate text--darken-3 font-weight-regular"
                      >{{n.name}}</h2>
                  </v-flex>
            
                </v-layout>
                <p class="caption font-weight-bold grey--text text--lightenen-3 mb-0">N1000</p>
                <p class="caption font-weight-bold grey--text text--lightenen-3 mb-0">Qty: 8</p>
             
           
 </v-list-item-title>
            </v-list-item>
             
   
          </v-card>
      
        </v-flex>
     </v-card>
      <v-btn
        icon
        absolute top right
        @click="overlay2 = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-overlay>
        <navbottom></navbottom>

  </div>
</template>

<style>
.v-tooltip__content{
    padding: 0px 0px!important;
    width: 90%;
}
.theme--light.v-tabs-items {
    background-color: #FFF0;
}
</style>
<script>
import  navbottom from "./navbottom";
export default {
  components: {
    navbottom,
  },
  methods: {
    back() {
      this.$router.go("-1");
    }
  },
 data() {
    return {
           date: null,
           overlay1: false,
           overlay2: false,
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Equador', 'France'],
  
      fav: true,
      menu: false,
      reviews: false,
      popular: true,
      nearest: false,
      pricelow: false,
      pricehigh: false,
      hints: true,
      rating: 3,
      items: [
        {
          name: "food info",
          link: "/food/id"
        },
        {
          name: "contact seller",
          link: "/vendor/id"
        }
      ],
      slides: [
        {
          cat: "food",
          items: [
            {
              pic:
                "https://images.unsplash.com/photo-1534070189982-818bb5622474?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 0,
              name: "Meat balls"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 1,
              name: "Spaghetti"
            },
            {
              pic:
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
              show: true,
              sn: 2,
              name: "Baked Burger,hgdkgkgjgdmjgcmjgcmjgcmjgcmjgcmj"
            },
            
          ]
        }
      ]
    };
  }
};
</script>