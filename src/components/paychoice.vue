<template>
    <div class="container mt-0">
          <v-btn
          fixed @click="$router.go(-1)"
          bottom
          right fab
          color="white" style="z-index:10" class="mb-12">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
    <p class="overline pt-3 font-weight-bold grey--text text--darken-1">Payment method</p>
    <v-row>
    <v-flex v-for="(n, i) in payment" :key="i" class="my-1" xs12 sm6 md6 lg6 >
    <v-card
    @click="payChoice(n.value)"
      width="95%" outlined
      height="auto" v-if="n.available"
       flat tile :disabled="n.points > userpoints"
      style=" border-radius:10px 10px 10px 10px"
      class="mx-2 mb-1 px-1 pt-1 pb-1">
  <v-list-item  class="pa-0">
      <v-list-item-avatar
        size="40"
        tile
        style="border-radius: 10px;"
        class="my-1 elevation-7 mr-2">
        <v-icon color="grey lighten-2">{{n.icon}}</v-icon>
      </v-list-item-avatar>
    <v-list-item-title style="overflow-y: visible;" class="py-0">
            <h2
              stsyle="line-height:1;text-decoration: none;"
              class="body-2 grey--text text-truncate text--darken-1 font-weight-medium"
            >{{n.name}}</h2>
            <p style="font-size: 10px" v-show="(n.points > userpoints) || (n.value === 4)" class="orange--text my-0">{{n.hint}} <v-icon color="orange" v-if="(n.value === 4)" size="9" style="padding-bottom: 2px">mdi-currency-ngn</v-icon>{{(grandTotal - (serviceCharge + deliveryFee)) | price}}</p>
 </v-list-item-title>
            </v-list-item>
          </v-card>
    </v-flex>       
    </v-row>
    
    <v-dialog
      v-model="dialog"
      max-width="290">
      <v-card class="px-2 pb-2">
        <p class="my-0 pt-2 overline font-weight-bold grey--text p">Total : <v-icon size="9" style="padding-bottom: 2px">mdi-currency-ngn</v-icon>{{ grandTotal | price}}<span v-show="(change - grandTotal) > 1" class="pl-3">change: <v-icon size="9" style="padding-bottom: 2px">mdi-currency-ngn</v-icon>{{ Math.round((change - grandTotal)/5)*5 | price}}</span></p>
        <v-card-title class="body-1 pl-3 mt-0 pt-0 mb-0 pb-0 grey--text text--darken-1">Change for how much?</v-card-title>
        <v-form ref="form">
                <v-text-field 
         :rules="numberRules" validate-on-blur
        autofocus hint="How much cash will you give the delivery agent?"
         prepend-inner-icon="mdi-currency-ngn"
         solo  v-model="change"></v-text-field>
        </v-form>
    
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text small
            @click="noChangeReg()"
          >
            No change
          </v-btn>

          <v-btn
            color="blue darken-1"
            text small
            @click="changeReg()">
            continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
import axios from 'axios'
 export default {
    data() {
    return {
        loading: true,
        dialog: false,
        change: 0,
        error: '',
        hint: '',
        choice: 3,
 
    }
    },
    computed: {
        userpoints() {
            return this.$store.getters.getUser.points
        },
        orders() {
            return this.$store.getters.getOrder;
        },
        numberRules(){
           return [
                (v) => /^[0-9]*$/.test(v) || 'Number must be valid',
                (v) => (v - this.grandTotal) <= 1000 || "Change must not be greater than N1,000",
                (v) => v >= this.grandTotal || "Number must be greater than order total"
            ] 
        } ,
    total(){
     return this.$store.getters.getOrder.reduce((currentTotal, item)=>{
       return item.total + currentTotal
      }, 0)
    },
    serviceCharge(){
     if (this.total < 2500) {
        return Math.round((this.total * 0.015) + 50)
     } else {
       return Math.round((this.total * 0.015) + 200)
     }
    },
    grandTotal(){
      return this.total + this.deliveryFee + this.serviceCharge
    },
    deliveryFee() {
      return this.$store.getters.getDeliveryParams.fee;
    },
        deliveryParams() {
            return this.$store.getters.getDeliveryParams
        },
            payment(){

        return  [
            {
                icon: 'mdi-credit-card-outline',
                name: 'Credit/Debit Card',
                value: 1,
                points: 0,
                available: true
            },
            {
                icon: 'mdi-cash-marker',
                name: 'Pay Cash On Delivery',
                value: 3,
                points: 20,
                available: this.$store.getters.getDeliveryParams.payOnDelivery,
                hint: 'You need atleast 2 orders to qualify'
            },
            {
                icon: 'mdi-bank',
                name: 'Mobile/USSD Transfer On Delivery',
                value: 2,
                points: 20,
                available: this.$store.getters.getDeliveryParams.transferOnDelivery,  
                hint: 'You need atleast 2 orders to qualify'
            },
            {
                icon: 'mdi-table-chair',
                name: 'I am in the Restaurant',
                value: 4,
                points: 20,
                available: true,
                hint: 'All charges are removed, you will now pay '
            },
        ]   }
    },
 methods: {
    payChoice(x){
        if (x === 3) {
            this.choice = x
            this.dialog = true
        } else { 
        var d ={}
        d.choice = x  
        this.$store.dispatch("payChoice", d)
        .then(()=>{
            this.$router.push("/ordersummary")
        })
        }
        },
    noChangeReg(){
        const sn = this
        var d = {}
        d.change = 0
        d.choice = sn.choice
        sn.$store.dispatch("payChoice", d)
        .then(()=>{
            sn.$router.push("/ordersummary")
        })
    },
    changeReg(){
        const sn = this
if (sn.$refs.form.validate()) {
        sn.dialog = false
        let d ={}
        d.change = sn.change
        d.choice = sn.choice
        sn.$store.dispatch("payChoice", d)
        .then(()=>{
            sn.$router.push("/ordersummary")
        })
        } else {
            return
        }
    }
 }
    }
    </script>