<template>
<div>
<v-flex xs12>
      
         <v-text-field
            ref="cardnum"
            class="font-weight-bold grey--text text--darken-4"
            label="Card Number"
            placeholder="1234 **** **** 5678"
            color="orange"
            required
          ></v-text-field>
   

</v-flex>
   <v-row class="px-3"  justify="space-between">

<v-flex xs6>
         <v-text-field
            ref="expire"
            label="Expiration Date"
            class="font-weight-bold grey--text text--darken-4"
            placeholder="January"
            color="orange"
            required
          ></v-text-field>
   
</v-flex>
<v-flex xs5>
          <v-text-field
            ref="address"
        
            class="font-weight-bold grey--text text--darken-4"
            placeholder="2019"
            color="orange"
            required
          ></v-text-field> 
</v-flex>
   </v-row>

   <v-row class="px-3"  justify="space-between">

<v-flex xs6>

         <v-text-field
            ref="expire"
            label="CVV/CVC"
            class="font-weight-bold grey--text text--darken-4"
            placeholder="***"
            color="orange"
            type="password"
            required max="4"
          ></v-text-field></v-flex><v-flex xs6>
   <v-tooltip class="mx-0 px-0"  top>
      <template v-slot:activator="{ on }">
        <v-icon class="ml-4" color="grey" size="15" dark v-on="on">mdi-information-outline</v-icon>
      </template>
       <v-card-text class="py-1">This is a 3 or 4 digit code at the back of your card.</v-card-text>
        

    </v-tooltip>
</v-flex>

   </v-row>
   <v-row class="px-3"  justify="space-between">

<v-flex xs6>

         <v-text-field
            ref="expire"
            label="Total Amount"
            value="N6,000"
            disabled 
            class=" font-weight-black"           
          ></v-text-field></v-flex>

   </v-row>
      <v-row class="my-5 px-3"  justify="space-around">
<v-btn  to="/pay/pin" class="px-10" color="orange" dark rounded>Proceed</v-btn>
      </v-row>

</div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.go("-1");
    }
  },
 data() {
    return {
           
    }
 }
};
</script>