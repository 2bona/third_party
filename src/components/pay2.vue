<template>

<v-flex xs12>
<v-flex xs6>

         <v-text-field 
                     class="font-weight-bold grey--text text--darken-4"

            ref="cardpin"
            label="Card Pin"
            placeholder="***"
            color="orange"
            type="password"
            required max="4"
          ></v-text-field>
         <v-text-field 
                     class="font-weight-bold grey--text text--darken-4"

            ref="pin"
            label="Phone Number"
            placeholder="***"
            color="orange"
            type="text"
            required max="4"
          ></v-text-field>
         <v-text-field 
                     class="font-weight-bold grey--text text--darken-4"

            ref="otp"
            label="OTP Code"
            placeholder="***"
            color="orange"
            type="password"
            required max="4"
          ></v-text-field>
         <v-text-field 
                     class="font-weight-bold grey--text text--darken-4"

            ref="3ds"
            label="3DS Code"
            placeholder="***"
            color="orange"
            type="password"
            required max="4"
          ></v-text-field>
          
          </v-flex>
      


   <v-row class="px-3"  justify="space-between">

<v-flex xs6>

         <v-text-field 

            label="Total Amount"
            value="N6,000"
            disabled 
            class=" font-weight-black"           
          ></v-text-field>
          
          </v-flex>

   </v-row>
      <v-row class="my-5 px-3"  justify="space-around">
<v-btn  to="success" class="px-10" color="orange" dark rounded>complete payment</v-btn>
      </v-row>
</v-flex>

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