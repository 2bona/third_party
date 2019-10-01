<template>
   <v-card style="overflow-x: hidden;" flat tile class="pb-9">
       <v-row  justify="space-around">
           <v-avatar
               size="90"
               tile
               color="transparent"
               style="border-radius:10px"
               class="mt-6 mb-3 elevation-15"
           >
               <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="profile">
           </v-avatar>
           <v-flex xs12 class="mb-3">
            <h2 class="text-center text-capitalize font-weight-medium">Emeka okolo</h2>
            <p class="text-center blue--text text--lighten-2 caption"><v-icon color="blue lighten-2" size="13">mdi-map-marker</v-icon> Awka, Nigeria</p>
           </v-flex>
           <v-row class="">
              <v-flex xs4>
                  <h3 class="grey--text text--darken-1 font-weight-medium  text-center mb-0">
                      20
                  </h3>
                  <p class=" mt-0 grey--text text-uppercase caption font-weight-regular text--lighten-1  text-center">
                      Orders
                  </p>
           </v-flex>   
              <v-flex xs4>
                    <h3 class="green--text font-weight-medium  text-center mb-0">
                      N2,000
                    </h3>
                  <p class=" mt-0 grey--text text-uppercase caption font-weight-regular text--lighten-1  text-center">
                      Wallet
                  </p>
           </v-flex>   
              <v-flex xs4>
                   <h3 class="grey--text text--darken-1  font-weight-medium  text-center mb-0">
                      5000
                  </h3>
                  <p class=" mt-0 grey--text text-uppercase caption font-weight-regular text--lighten-1  text-center">
                      Points
                  </p>
           </v-flex>   
           </v-row>    
       </v-row>
<v-tabs background-color=" darken-1" color="orange" grow mobile-break-point="90">
        <v-tab class="font-weight-bold">Your Favourites</v-tab>
        <v-tab class="font-weight-bold">Account Setting</v-tab>

        <v-tab-item>
    <div class="container">
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6 sm4 v-for="n in 4" :key="n">
                <v-card flat
                  style=" border-radius:10px 10px 10px 10px"
                  class="elevation-2 mx-auto pt-1 mb-5" width="95%" max-width="225" height="">
                  <v-img width="95%"
                    style="border-radius: 5px;"
                    class=" elevation-9 mx-auto"
                    height="150"
                    src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  >
                    <v-btn x-small color="white" fab absolute right style="right:2px" class="ma-1">
                      <v-icon small color="grey lighten-1" class>mdi-heart</v-icon>
                    </v-btn>
                  </v-img>
                  <v-card-text class="mx-0 py-1 px-5">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <p
                          class=" body-1 grey--text text-truncate text--darken-3 font-weight-regular my-0"
                        >Roasted Bread and tea</p>
                      </v-flex>
                      <v-flex xs12>
                        <p class="caption font-weight-black  my-0" style>N1000</p>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-row class="mb-0 px-5" justify="space-between">
                    <v-flex xs11>
                      <v-card-title
                        style="height: 10px;
    align-items: self-start;"
                        class="py-0 px-0"
                      >
                        <v-rating
                          size="12"
                          :value="4"
                          dense
                          color="orange"
                          hover
                          background-color="grey"
                          class="  pa-0"
                          style="
    line-height: 0;
"
                        ></v-rating>

                        <span class="grey--text overline mt-0">(64)</span>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs1>
                       <p class="mb-0 text-right">
                          <span style=";margin-top:;" class=" "><v-icon small color="green" class="pb-3">mdi-network-strength-4</v-icon></span>
                      </p>
                    </v-flex>
                  </v-row>
                  <v-card-text class="mx-0 mb-0  mt-0 pt-0 pb-2 px-1">
                    <v-layout>
                      <v-flex xs12>
                        <v-chip
                          x-small
                          color="white"
                          class="elevation-1 mb-1 grey--text text--darken-1 text-truncate"
                        ><v-icon color="green" size="7" class="mr-1">mdi-circle-slice-8</v-icon> mummy's pot filterthis</v-chip>
                      </v-flex>
                      
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </div>
        </v-tab-item>

        <v-tab-item class="px-4 pt-4 pb-8">
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="mb-0 subtitle-2"><v-icon color="orange">mdi-account</v-icon> Account Information</p> </v-expansion-panel-header>
  <v-expansion-panel-content class="px-4 py-2">
        <div>
<v-flex xs12>
      
         <v-text-field
            ref="name"
            class="font-weight-bold grey--text text--darken-4"
            label="Name"
            value="Okoli Bona"
            placeholder="Your Full Name"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            ref="email"
            class="font-weight-bold grey--text text--darken-4"
            label="Email"
            value="sayhitobona@gmail.com"
            placeholder="Your Email"
            color="orange"
            required
          ></v-text-field>
   

</v-flex>
   <v-row class="px-3"  justify="space-between">

<v-flex xs12>
         <v-text-field
            ref="phone"
            label="Phone Number"
            class="font-weight-bold grey--text text--darken-4"
            value="08033685498"
            placeholder="Your Phone Number"
            color="orange"
            required
          ></v-text-field>
   
</v-flex>
<v-flex xs12>
            <v-select
            class="font-weight-bold grey--text text--darken-4"
            :items="items"
            attach
            chips
            placeholder="what do you like"
            label="Likes"
            color="orange"
            multiple
          ></v-select>
</v-flex>

   </v-row>

   <v-row class="px-3"  justify="space-between">

<v-flex xs12>

       <v-textarea
          name="bio"
          label="Bio"
          color="orange"
          class="font-weight-bold grey--text text--darken-4"
          placeholder="A little info about you."
          hint="Maximum of 100 words"
        ></v-textarea>
          
          </v-flex>

   </v-row>

      <v-row class="my-5 px-3"  justify="space-around">
<v-btn  to="/pay/pin" class="px-6" small color="orange" dark rounded>Edit</v-btn>
      </v-row>

</div>
  </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="mb-0 subtitle-2"><v-icon color="orange">mdi-map-marker</v-icon> Locations</p> </v-expansion-panel-header>
  <v-expansion-panel-content class="px-0 py-2">
         <v-carousel show-arrows-on-hover
 height="290px" :show-arrows="false">
    <v-carousel-item  v-for="n in 4" :key="n">
      <v-card color="transparent" style="border-radius:10px;" class="mx-auto mb-4 elevation-8" height="150px" width="250px">          
            <iframe
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJU-eUi72CQxARU0e9iuuRI88&key=AIzaSyAxr9nMrLhiCl-smUP-tmuclQ_i7n3DmI0"
      allowfullscreen
    ></iframe>
      </v-card>
      <v-row>
        <v-btn rounded small class="mx-auto mt-2" color="red lighten-1">delete</v-btn>
  
      </v-row>
    </v-carousel-item>
   </v-carousel>
   <p class="overline px-3 pt-3 grey--text"> these are places you have ordered from. <strong class="blue--text text--lighten-1">read our privacy statement.</strong></p>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="px-3"><p class="mb-0 subtitle-2"><v-icon color="orange">mdi-credit-card</v-icon> Payment</p> </v-expansion-panel-header>
          <v-expansion-panel-content class="px-0 py-2 pb-1">
   <v-carousel show-arrows-on-hover
 height="250px" :show-arrows="false">
    <v-carousel-item  v-for="n in 4" :key="n">
 <v-card color="blue-grey darken-3" elevation="8" width="250px" style="border-radius: 10px" height="130px" class="mx-auto pt-2 pb-1 pl-5 pr-6">
     <v-row class="px-0" justify="">
         
         <v-flex xs12 class="text-right">
             <v-avatar
              tile class=""
                 size="50"
             >
<v-icon size="50" color="blue-grey lighten-4">fab fa-cc-mastercard</v-icon>
             </v-avatar>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">4***</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">****</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">****</p>
         </v-flex>
         <v-flex xs2 class="mr-3">
             <p class="font-weight-bold  blue-grey--text text--lighten-3 ">***9</p>
         </v-flex>
<v-flex xs12 class="px-3">
   <v-row justify-space-between>
<v-flex xs9>
   <p class="caption font-weight-black blue-grey--text text--lighten-3  text-truncate"> Okoli Bonaventure Udechukwu </p>
</v-flex>
<v-flex xs3>
       <p class="caption text-right font-weight-black blue-grey--text text--lighten-3 "> 4/30 </p>

</v-flex>

</v-row> 
</v-flex>
     </v-row>
    </v-card>
      <v-row class="my-5 px-3"  justify="space-around">
<v-btn  to="/pay/pin" class="" small color="red lighten-1" dark rounded>delete</v-btn>
      </v-row>
    </v-carousel-item>
   </v-carousel>
   <p class="overline px-3 pt-3 grey--text"> we do not store your credit card details. <strong class="blue--text text--lighten-1">read our privacy statement.</strong></p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card>
 
          <v-list>
            <v-list-item class="px-4 pr-6">
                 <v-list-item-title class=" pl-0 subtitle-2">
                Location Tracking
                <span class="caption"></span>
              </v-list-item-title>
              <v-list-item-action>
                <v-switch  color="orange"></v-switch>
              </v-list-item-action>
             
            </v-list-item>
                <v-list-item>
                 <v-list-item-title class="subtitle-2">
                Fund your wallet
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark small color="green" rounded class="px-8 font-weight-bold green--text text--lighten-4"><v-icon size="15" class="pr-2 mt-0">mdi-cash-refund</v-icon>fund</v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
                 <v-list-item-title class="subtitle-2">
                Become a Vendor
              </v-list-item-title>
              <v-list-item-action>
                <v-btn to="/Regvendor" dark rounded small color="grey" class="px-10 font-weight-bold grey--text text--lighten-4"><v-icon size="15" class="pr-1 mt-0">mdi-chef-hat</v-icon>register</v-btn>
              </v-list-item-action>
             
            </v-list-item>
        
            <v-list-item>
                 <v-list-item-title class="subtitle-2">
                Become a Delivery Agent
              </v-list-item-title>
              <v-list-item-action>
                <v-btn to="/Regagent" dark rounded small color="grey" class="px-10 font-weight-bold grey--text text--lighten-4 "><v-icon size="15" class="pr-1 mt-0">mdi-bike-fast</v-icon>register</v-btn>
              </v-list-item-action>
             
            </v-list-item>
            <v-list-item>
                 <v-list-item-title class="subtitle-2">
              </v-list-item-title>
              <v-list-item-action>
                <v-btn dark   rounded color="red"  small  class="px-7 font-weight-bold red--text text--lighten-4"><v-icon size="15" class="pr-1 mt-0">mdi-close-circle-outline</v-icon> Logout</v-btn>
              </v-list-item-action>
             
            </v-list-item>

          </v-list>
         
</v-card> 
        </v-tab-item>
      </v-tabs>
    <navbottom></navbottom>
   </v-card>
</template>

<style>
.v-expansion-panel-content__wrap {
    padding: 10px 0px;
}
</style>
<script>
export default {
  components: {
    navbottom: () => import('./navbottom'),
  },
    data: () => ({
      items: ['peppery food', 'chicken', 'turkey', 'fish', 'soup', 'rice', 'fries', 'street bites'],
      value: ['peppery food', 'chicken', 'turkey', 'fish', 'soup', 'rice', 'fries', 'street bites'],
    }),
}
</script>