<template>
<div>
<v-row justify="space-around" class="pa-3 px-6">
    <v-flex xs12 class>
            <h1 class="title mb-5 font-weight-bold grey--text">Summary</h1>
    </v-flex>
    <v-flex xs6>

  <v-card
    class="mx-auto"
    color="green lighten-2"
    dark max-width="96%"
  >
  <v-card-title class="title green--text text--lighten-4">
      Sales today
  </v-card-title>
  <p  class="ml-4 mb-0 green--text text--lighten-5">N2000</p>
    

 

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn to="/vendortables" block depressed color="green lighten-1">full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
    <v-flex xs6>
  <v-card
    class="mx-auto"
    color="blue "
    dark max-width="96%"
  >
  <v-card-title class="title blue--text text--lighten-4">
      Orders today
  </v-card-title>
  <p  class="ml-4 mb-0 font-weight-bold blue--text text--lighten-5">300</p>
    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn to="/vendorforms" block color="blue lighten-1" depressed>full Report</v-btn>
    </v-card-actions>
  </v-card>
    </v-flex>
    <v-flex xs12 class="my-5 px-0">
        <h1 class="title mb-5 font-weight-bold grey--text">Orders</h1>
          <v-simple-table height="40vh">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">Type</th>
          <th class="text-left">Amount</th>
          <th class="text-left">When</th>
          <th class="text-left">Status</th>
         



        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 8" :key="item">
                 <td class="text-left overline">{{item}}</td>

            <td>
              <p class="mb-0 primary--text">Batch</p>
              <p class="mb-0 warning--text">Express</p>
          </td>
          <td>N1000</td>
          <td class="overline">3mins ago</td>
           <td class="text-left"><v-btn x-small color="blue">
              <v-icon size="15" color="orange lighten-2">mdi-cancel</v-icon>
              <v-icon size="15" color="white">mdi-check</v-icon>
              </v-btn></td>
        

         
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-flex>
    <v-flex xs12 class="my-3 px-0">
         <v-card-title class="title font-weight-bold px-0 grey--text">
             Menu <span><v-btn text color="primary"><v-icon>mdi-plus</v-icon>add new section</v-btn></span>
         </v-card-title>
        <v-card flat tile color="transparent">
        
            <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :footer-props="{ itemsPerPageOptions }">
      <template v-slot:default="props">
        <v-row>
          <v-col
          class="px-0"
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3">
            <v-card>
                  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header><h4 class="grey--text text--darken-1">{{ item.name }} </h4></v-expansion-panel-header>
      <v-expansion-panel-content>  
          <span class>
           <v-btn  text small color="grey"><v-icon>mdi-pencil-outline</v-icon> edit</v-btn>
           <v-btn  text small><v-icon>mdi-plus</v-icon>add </v-btn>
           <v-btn  text small color="red"><v-icon>mdi-trash-can</v-icon>delete</v-btn>
           </span>   
           <v-divider class="my-4"></v-divider>
                    <v-flex class="my-2" xs12 v-for="n in 3" :key="n">
          <v-card
            width="95%"
            height="80px"
            max-height
            min-height
            
            
            color="transparent"
            style=" border-radius:10px 10px 10px 10px"
            class="mx-2 mb-2 px-1 "
          >
            <v-list-item three-line class="pa-0">
              <router-link to="/item">
                <v-list-item-avatar
                  size="50"
                  tile
                  style="border-radius: 10px;"
                  class="my-0 elevation-7 mr-2"
                >
                  <v-img :src="n.pic"></v-img>
                </v-list-item-avatar>
              </router-link>
              <v-list-item-title style="" class="py-0">
                <v-layout>
                  <v-flex xs6>
                    <router-link style="text-decoration: none;" to="/item/vendor/egusi">
                      <h2
                        style="text-decoration: none;"
                        class="body-1 grey--text text-truncate text--darken-3 font-weight-regular"
                      >emynownfdjdjuuu</h2>
                    </router-link>
                  </v-flex>
                  <v-flex xs5 style="
    position: absolute;
    right: -9px;
    margin-top: -11px;
">
                    <v-btn icon small color="grey lighten-1" class="mt-2">
                        <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <v-btn icon text color="red" small class="mt-2 mr-3">

                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <p class="caption font-weight-bold grey--text text--darken-1 mb-0">N1000</p>

                <v-card-title
                  style=""
                  class="mb-0 py-0 px-0"
                >
                  <v-rating
                    
                    :value="4"
                    dense
                    color="orange"
                    hover
                    background-color="grey"
                    size="12"
                    class="mr-2 "
                    style="line-height: 0;"
                  ></v-rating>

                  <span class="grey--text overline my-0">(64)</span>
                </v-card-title>
         

          
      
              </v-list-item-title>
            </v-list-item>
          </v-card>
                     </v-flex>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
              
       
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
        </v-card>
        
    </v-flex>
</v-row>
</div>
</template>
<style>

</style>
<script>

export default {
  data() {
    return {
        itemsPerPageOptions: [4, 8, 12],
      itemsPerPage: 4,
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
        },
      ],
            value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    name: '',
    email: '',
    password: '',
    c_password: '',
    }
  },
};
</script>