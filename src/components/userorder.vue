<template>
  <div>
    <div class="container mt-3" style="margin-bottom: 100px;">
    <v-btn
      fixed @click="$router.go(-1)"
      bottom
      right fab
      color="white" style="z-index:10;margin-bottom: 60px;">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <p class="overline mb-2  font-weight-bold grey--text text--darken-1">order ID: {{order.tracking_id}}</p>
                      <v-layout width="100%" class=" mx-0" style="overflow-x:hidden; ">
              <v-container  class=" px-0 pt-0">
    <v-card class="mx-auto" style="position:relative;display:flex;justify-content: center;" flat tile  color="transparent" max-width="600px"  min-height="116px">
    <v-card  
        width="100%"
        height="110px"
        max-width="450px"
        min-height="100px"
        tile
        color="transparent"
        flat
        style="position:absolute;padding-top: 19px !important; bottom: 0px; border-radius:0px; overflow-x:scroll;"
        class=" mb-0 px-2  pt-2 pb-2 mx-auto">
        <v-list-item  class="pa-0">
        <v-list-item-avatar v-for="(n, i) in order.items" :key="i"
        size="70"
        v-ripple @click="dialogItemBtn(n)"
        class="my-auto elevation-5 mr-2">
        <v-img :src="n.image">
        </v-img>
         <p class="caption grey--text font-weight-bold" style="position:absolute; top: -19px">{{n.pivot.qty}}x</p>
         <p class="caption grey--text font-weight-bold" style="position:absolute; bottom:-36px"><v-icon color="grey" style="padding-bottom:2px" size="11">mdi-currency-ngn</v-icon>{{n.pivot.total | price}}</p>
        </v-list-item-avatar>
                </v-list-item>
            </v-card>
                </v-card> 
             </v-container>
      </v-layout>
      <v-card width="100%" class="px-3" flat tile  color="transparent">

         <v-timeline reverse>
        <v-timeline-item
        v-if="order.status >= 1"
          color="grey"
          small 
        >
          <v-row class="pt-1">
            
            <v-col class="px-0">
            <div class="overline grey--text">vendor</div>
              <strong>Order recieved</strong>
            <p v-if="order.status === 1" class="caption mb-0"><v-icon size="12" color="">mdi-clock</v-icon> {{order.updated_at | nowDate}}</p>

            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item
        v-if="order.status >= 2 && order.status !== 5"
          color="orange"
          small >
          <v-row class="pt-1">
            
            <v-col class="px-0">
            <div class="overline grey--text">vendor</div>
              <strong>Order served</strong>
            <p v-if="order.status === 2" class="caption mb-0"><v-icon size="12" color="">mdi-clock</v-icon> {{order.updated_at | nowDate}}</p>

            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item
        v-if="order.status >= 3 && order.status !== 5 && !(order.payment_method === 4) "
          color="primary"
          small>
          <v-row class="pt-1">
            
            <v-col class="px-0" >
        <div class="overline grey--text">Delivery agent</div>

              <strong>On the way</strong>
              <p v-if="order.status === 3" class="caption mb-0"><v-icon size="12" color="">mdi-clock</v-icon> {{order.updated_at | nowDate}}</p>
              <p class="caption">ETA: <v-icon size="12">mdi-clock</v-icon> 9:10am</p>
          <v-btn v-show="!(order.status === 4)" dark x-small="" color="deep-orange darken-3">tracking <v-icon size="12">mdi-map-marker-radius</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item
        v-if="order.status === 4"
          color="green"
          small>
          <v-row class="pt-1">
            <v-col class="px-0">

            <div v-if="order.payment_method === 4" class="overline grey--text">vendor</div>
            <div v-if="!(order.payment_method === 4)" class="overline grey--text">delivery agent</div>
              <strong>Delivered</strong>
              <p v-if="order.status === 4" class="caption mb-0"><v-icon size="12" color="">mdi-clock</v-icon> {{order.updated_at | nowDate}}</p>
          </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item
        v-if="order.status === 5"
          color="red"
          small
        >
          <v-row class="pt-1">
            
            <v-col class="px-0">
              <strong>Order canceled</strong>
              <p v-if="order.status === 5" class="caption mb-0"><v-icon size="12" color="">mdi-clock</v-icon> {{order.updated_at | nowDate}}</p>
              <router-link class="green--text" to='/order/tracking'>
                  <p class="green--text text--lighten-1 mb-0 caption"><v-icon size="17" color="green">mdi-cash</v-icon> Money refunded</p>
                  </router-link>
              <p class="orange--text text--lighten-1 caption"><v-icon size="17" color="orange">mdi-alert-circle</v-icon> <strong>Reason :</strong> {{order.reject_reason}}</p>
          </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card>
       <span class="overline grey--text  text--darken-3 font-weight-bold">
       delivery
       </span>
    <v-list-item class="my-1" dense two-line>  
      <v-list-item-content v-if="order.address">
        <v-list-item-title v-show="!(order.payment_method === 4)" class="body-1 grey--text text--darken-3 text-wrap font-weight-bold mt-0 pt-0" v-if="order.address.area.name">{{order.address.area.name}}</v-list-item-title>
        <v-list-item-subtitle v-show="!(order.payment_method === 4)" class="caption grey--text text-wrap font-weight-medium mb-0 pb-0" v-if="order.address.name">{{order.address.name}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text font-weight-medium mt-0 pt-0" v-show="!(order.payment_method === 4)"  v-if="order.address.name_2">{{order.address.name_2}}</v-list-item-subtitle>
        <v-list-item-subtitle v-show="!(order.payment_method === 4)" class="caption grey--text text-wrap font-weight-medium mt-0 pt-0" v-if="order.address.company">{{order.address.company}}</v-list-item-subtitle>
        <v-list-item-subtitle v-show="!(order.payment_method === 4)" class="caption grey--text text-wrap font-weight-medium mt-0 pt-0" v-if="order.address.instruction">{{order.address.instruction}}</v-list-item-subtitle>
        <v-list-item-subtitle class="caption grey--text font-weight-medium mt-0 pt-0">{{order.user.phone}} - <span>{{order.user.surname}}</span> <span> {{order.user.middle_name}} </span> <span>{{order.user.first_name}}</span></v-list-item-subtitle>
        <v-list-item-subtitle v-show="!(order.payment_method === 4)" class="overline text--darken-2 grey--text  font-weight-bold mt-0 pt-0">Order to reach customer in {{order.duration | duration}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

      <span class="overline grey--text  text--darken-3 font-weight-bold">
       payment
      </span>
    <v-list-item  class="my-1" dense>
      <v-list-item-content>
        <v-list-item-subtitle class=" text-wrap caption grey--text  font-weight-medium mt-0 pt-0">{{paymentMethod}}  <span v-show="order.change_amount > 1"> <v-icon style="padding-bottom:2px" color="grey" size="12">mdi-currency-ngn</v-icon>{{order.change_amount | price}}</span></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  <v-card flat color="transparent" tile class="mb-12">
      <span class="overline grey--text  text--darken-3 font-weight-bold">
       Summary
      </span>
<v-row  class="px-6 pt-3">
  <v-flex xs6>
    <p class="caption grey--text  mb-1 font-weight-medium">Subtotal</p>
  </v-flex>
  <v-flex xs6>
    <p class="caption grey--text  mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey">mdi-currency-ngn</v-icon>{{order.total | price}}.00</p>
  </v-flex>
</v-row>
      <v-row v-show="!(order.payment_method === 4)"  class="px-6 pt-0">
                  <v-flex xs6>
<p class="caption grey--text  mb-1 font-weight-medium">Delivery
    </p>
    </v-flex>
      <v-flex xs6>
          <p class="caption grey--text  mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey">mdi-currency-ngn</v-icon>{{order.delivery_fee | price}}.00</p>
      </v-flex>      
</v-row>
      <v-row v-show="!(order.payment_method === 4)" justify="space-between" class="px-6 pt-0">
                  <v-flex xs6>
<p class="caption grey--text  mb-1 font-weight-medium">Service charge
    </p>
    </v-flex>
      <v-flex xs6>
          <p class="caption grey--text  mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey">mdi-currency-ngn</v-icon>{{order.service_charge | price}}.00</p>
      </v-flex>
</v-row>
 <v-divider></v-divider>
<v-row justify="space-between" class="px-6 pt-4">
 <v-flex xs6>
<p class="font-weight-black body-1">Total</p>
</v-flex>
<v-flex xs6>
<p class=" font-weight-black body-1 text-right"><v-icon style="padding-bottom:2px" color="black" size="15">mdi-currency-ngn</v-icon>{{order.grand_total | price}}.00</p>
</v-flex>
</v-row>
 <v-divider></v-divider>
  <div>
  </div>
</v-card>
    </div>
        <v-dialog scrollable  
            v-model="dialog" 
            max-width="500px"
            transition="dialog-transition">
      <v-card color="white" v-if="dialogItem">      
      <div v-show="dialogItem">
        <v-card-title class="pb-1 elevation-10" primary-title>
        <span class="pr-1 grey--text text--darken-3 font-weight-black" v-show="dialogItem.pivot.qty > 1">{{dialogItem.pivot.qty +'x'}} </span> {{dialogItem.name +' '}} <span class="pl-1 pb-2 caption grey--text"> <v-icon size="11" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon>{{(dialogItem.pivot.qty * dialogItem.price) | price}}</span>
       <div v-if="dialogComp.length" class="px-0 pb-2">
       <v-chip class="mx-1"  small v-for="(n, p) in dialogComp" :key="p+n.id+n.pivot.type">{{n.name}}</v-chip>
        </div>
        </v-card-title>
       <v-card-text style="max-height:200px;overflow:auto">
       <div v-for="(o, p) in dialogOpt" :key="p+o.id+o.pivot.type">
       <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="padding-left:1px" class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium" v-html="o.name"></v-list-item-title>
            <v-list-item-subtitle class=" grey--text pl-0">
              <span><v-icon size="13" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon></span>{{(o.price * o.pivot.qty) | price}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <div class="d-flex py-3">
    <p  class="pt-1 mx-1 body-1 grey--text text--darken-3 font-weight-black text-center mb-0">{{'x '+o.pivot.qty}}</p> 
        </div>
        </v-list-item>
        <v-divider></v-divider>
       </div>
    </v-card-text>
        
        <v-card-actions class="pl-3 elevation-10">
  
          <div class="flex-grow-1"></div>
          <v-btn  color="grey lighten-1" text @click="dialog = false">close</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn> -->
        </v-card-actions>
      </div>
      </v-card>
</v-dialog>
  </div>
</template>

<style>
.v-tooltip__content{
    padding: 0px 0px!important;
    width: 90%;
}
.v-list-item__avatar:last-of-type:not(:only-child) {
    margin-left: 0px!important;
    margin-right: 10px!important;
}</style>

</style>

<script>
  import axios from 'axios'


export default{
 data() {
    return {
      loading: false, 
      payBtn: false,
      dialog: false,
      dialogItem: '',
      dialogComp: [],
      dialogOpt: [],
      dialogOptions: [],
      reason: '',    
    }
 }, 
 computed: {
    order() {
      return this.$store.getters.getUserOrder;
    },
    paymentMethod() {
      let d = ''
      if (this.order.payment_method === 1) {
        d = 'Online payment with card'
      }
      else if (this.order.payment_method === 2) {
         d = 'Mobile/USSD transfer on delivery'
      }
      else if (this.order.payment_method === 4) {
         d = 'Over the counter or with P.O.S'
      }
      else if (this.order.payment_method === 3) {
        if (this.order.change_amount > 1) {
          d = 'Paying Cash on delivery, expecting change of '
        } else {
          d = 'Paying Cash on delivery'
        }
      }
      return d
    },
 },
 methods: {
    
     dialogItemBtn(n){
         const sn = this
         sn.dialogItem = null
        
         sn.dialog = true
         sn.dialogItem = n
         sn.dialogOptions = sn.order.options.filter((item)=> {
             return item.pivot.tracking_id === n.pivot.tracking_id
         })
         if (sn.dialogOptions.length) {
             
             sn.dialogComp = sn.dialogOptions.filter((item)=> {
                 return item.pivot.type === "compulsory"
             })
             sn.dialogOpt = sn.dialogOptions.filter((item)=> {
                 return item.pivot.type === "optional"
             })
         } else{
            sn.dialogComp = []
            sn.dialogOpt = []
         }
     },
 }
};
</script>