<template>
<v-container>

           <v-flex xs12 class="my-5 px-0">
        <h1 class="title mb-5 font-weight-bold grey--text">Sales</h1>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Info</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>Sales today</td>
          <td>200</td>
        </tr>
       <tr>
          <td>Sales this week</td>
          <td>200</td>
        </tr>
         <tr>
          <td>Sales this month</td>
          <td>200</td>
        </tr>
        
        <tr>
          <td>Sales this year</td>
          <td>200</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
   </v-flex>
   <v-flex xs12 class="my-5 px-0">
        <h1 class="title mb-5 font-weight-bold grey--text">Orders</h1>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Info</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>Orders today</td>
          <td>200</td>
        </tr>
       <tr >
          <td>Orders this week</td>
          <td>200</td>
        </tr>
         <tr >
          <td>Orders this month</td>
          <td>200</td>
        </tr>
        
        <tr>
          <td>Orders this year</td>
          <td>200</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
   </v-flex>
        
   <v-flex xs12 class="my-5 px-0">
        <h1 class="title mb-5 font-weight-bold grey--text">List of orders</h1>
          <v-simple-table dense>
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
        <tr v-for="item in 15" :key="item">
                 <td class="text-left overline">{{item}}</td>

            <td>
              <p class="mb-0 primary--text">Batch</p>
              <!-- <p class="mb-0 warning--text">Express</p> -->
          </td>
          <td>N1000</td>
          <td class="overline">3mins ago</td>
           <td class="text-left"><v-btn x-small color="blue">
              <!-- <v-icon size="15" color="white">mdi-cancel</v-icon> -->
              <v-icon size="15" color="white">mdi-check</v-icon>
              </v-btn></td>
        

         
        </tr>
        
      </tbody>
    </template>
  </v-simple-table>
    </v-flex>
        <v-row class="mt-3" justify="space-around">
            <v-btn fab color="white"><v-icon>mdi-chevron-left</v-icon></v-btn>
            <v-btn fab color="white"><v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
</v-container>
</template>