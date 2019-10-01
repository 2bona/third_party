<template>
  <div>
    <v-app-bar
      style="background: linear-gradient(to bottom, #000000b8 0%,#0d0d0d6e 50%, rgba(0, 0, 0, 0) 100%);"
      dark
      color="transparent"
      fixed
      flat
    >
      <v-btn @click="back()" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        Checkout
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn to="/cart" icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <div class="mt-12">
     <v-card flat tile class="mt-12 pt-6 px-3">
   <span class="overline grey--text  text--darken-1 font-weight-bold">
       Cart
       </span> 
             <v-layout row wrap class="mt- mx-0" style="overflow-x:hidden; ">
        <v-flex class="my-2" xs12 sm6 md6 lg6 v-for="n in slides[0].items" :key="n.sn">
          <v-card
            width="95%"
            height="95px"
            max-height
            min-height
            
            
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pt-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/item">
                <v-list-item-avatar
                  size="82"
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
                        class="body-1 grey--text text-truncate text--darken-3 font-weight-regular"
                      >{{n.name}}</h2>
                    </router-link>
                  </v-flex>
                  <v-flex style="
    position: absolute;
    right: -9px;
    margin-top: -11px;
">
                    <v-btn icon class="ma-1">
                      <v-icon small color="grey darken-1">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <p class="caption font-weight-bold grey--text text--darken-3 mb-0">N1000</p>
             
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
          <v-divider
            class="mt-4"
            style="background:#fdfdfd;
    border-color: rgba(172, 172, 172, 0.12);"
            color="grey "
          ></v-divider>
        </v-flex>
      </v-layout>
      <div>
          <v-layout row wrap class="px-5">
              <v-flex xs6>
                  <v-text-field
              name="promo"
              label="Promo Code"
              hide-details
              single-line
              color="orange"
              class="mt-0"
          ></v-text-field>  
              </v-flex>
              <v-flex xs6>
 <v-btn block class="mt-2" rounded="" dark color="orange">Apply</v-btn>
              </v-flex>
          </v-layout>
          <v-card flat color="transparent" tile class="my-8">
                <span class="overline grey--text  text--darken-1 font-weight-bold">
       Summary
       </span> 
      <v-row justify="space-between" class="px-5 pt-4">
                  <v-flex xs4>
<p class="font-weight-bold">Subtotal</p>
                  </v-flex>
                  <v-flex xs8>
<p class="body-2 font-weight-bold text-right">N2,000.00</p>
                  </v-flex>
</v-row>    
 <v-divider></v-divider>
      <v-row justify="space-between" class="px-5 pt-4">
                  <v-flex xs4>
<p class="font-weight-bold">Delivery
    <v-tooltip class="mx-0 px-0"  top>
      <template v-slot:activator="{ on }">
        <v-icon color="grey" size="15" dark v-on="on">mdi-information-outline</v-icon>
      </template>
      <v-card  dark flat tile color="transparent">
        <v-card-text class="py-1 caption"><strong>Express delivery</strong>  means that your delivery will be prioritized and can be more expensive</v-card-text>
        <v-divider></v-divider>
        <v-card-text class="py-1 caption"><strong>Batch delivery</strong>  means that your food will be delivered in batch (<strong>9am</strong>,<strong> 12pm</strong>, <strong>3pm</strong>, <strong>5pm</strong>) depending on when you order and it is cheaper</v-card-text>
                <v-divider></v-divider>

      </v-card>
    </v-tooltip></p></v-flex>
      <v-flex xs8>
<p class="body-2 font-weight-bold text-right">N500.00</p>
                  </v-flex>
                         
                
</v-row>
<v-card flat tile class="mb-3">
     <v-row
          justify="space-around"
          no-gutters
        >
     
        <v-col cols="5">
            <v-btn dark block small class="mx-auto" color="orange"><v-icon size="15">mdi-check-decagram</v-icon> Batch <span class="overline font-weight-bold"> (30mins)</span></v-btn>
        </v-col>
        <v-col cols="5">
            <v-btn right   block small class="mx-auto" color=""><v-icon size="15">mdi-check-decagram</v-icon> Express <span class="overline font-weight-bold"> (5mins)</span></v-btn>
        </v-col>
     </v-row>
</v-card>
               
 <v-divider></v-divider>
<v-row justify="space-between" class="px-5 pt-4">
 <v-flex xs4>
<p class="font-weight-black headline">Total</p>
</v-flex>
<v-flex xs8>
<p class=" font-weight-black headline text-right">N2000.00</p>
</v-flex>
</v-row>    
 <v-divider></v-divider>

          </v-card>
    
         
      </div>
      <p class="overline pt-4 grey--text text--darken-1 font-weight-bold">
       Payment Method
       </p> 
   
             <v-layout row wrap class="mt- mx-0" style="overflow-x:hidden; ">
        <v-flex class="my-2" xs12 sm6 md6 lg6 >
          <v-card
            width="95%"
            height="auto"
            max-height
            min-height
            
            
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pt-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/pay">
                <v-list-item-avatar
                  size="60"
                  tile
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-icon color="primary">mdi-credit-card-outline</v-icon>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="overflow-y: visible;" class="py-0">
                <v-layout>
                  <v-flex xs9>
                    <router-link style="text-decoration: none;" to="/pay">
                      <h2
                        style="line-height:1;text-decoration: none;"
                        class="body-1 grey--text text-truncate text--darken-1 font-weight-bold"
                      >Credit/Debit Card</h2>
                    </router-link>
                  </v-flex>
                  
                </v-layout>
         
  
 </v-list-item-title>
            </v-list-item>
             
   
          </v-card>
        </v-flex>
        <v-flex class="my-2" xs12 sm6 md6 lg6 >
          <v-card
            width="95%"
            height="auto"
            max-height
            min-height
            
            
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 pt-1 pb-1"
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/pay">
                <v-list-item-avatar
                  size="60"
                  tile
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-icon color="brown">mdi-bank</v-icon>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="overflow-y: visible;" class="py-0">
                <v-layout>
                  <v-flex xs9>
                    <router-link style="text-decoration: none;" to="/pay">
                      <h2
                        style="line-height:1;text-decoration: none;"
                        class="body-1 grey--text text-truncate text--darken-1 font-weight-bold"
                      >Mobile/USSD Transfer</h2>
                    </router-link>
                  </v-flex>
                  
                </v-layout>
         
  
 </v-list-item-title>
            </v-list-item>
             
   
          </v-card>
        </v-flex>
             </v-layout>
</v-card>   
    </div>

  
    
  </div>
</template>

<style>
.v-tooltip__content{
    padding: 0px 0px!important;
    width: 90%;
}
</style>
<script>
export default {
  methods: {
    back() {
      this.$router.go("-1");
    }
  },
 data() {
    return {
           date: null,
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