<template>
  <div>
     <v-card flat min-height="100vh" tile class=" pb-12 pt-2 px-3">
              <v-btn
          fixed @click="$router.go(-1)"
          bottom
          right fab
          color="white" style="z-index:10;margin-bottom: 60px;">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div>
     <v-layout  style="position:fixed; bottom:0px;background: linear-gradient(#fff0 0%, #fff 100%);width: 100%; z-index:9" row wrap class=" pb-2 px-2">
      <v-flex xs6 class="px-2">
      <v-btn @click="$router.go(-1)" rounded color="orange darken-4" class="mt-2 elevation-10" dark block>add more</v-btn>
      </v-flex>
      <v-flex xs6 class="px-2">           
      <v-btn block to="/selectaddress" class="mt-2 elevation-10" rounded="" dark color="primary">proceed</v-btn>
      </v-flex>
  </v-layout>
        </div>

   <span class="overline grey--text  text--darken-1 font-weight-bold">
       Tray
       </span>
             <v-layout row wrap class="mt- mx-0" style="overflow-x:hidden; ">
              <v-container v-if="orders.length"  class=" px-0 pt-0">
        <v-card class="mx-auto" style="position:relative;display:flex;justify-content: center;" flat tile  color="transparent" max-width="600px"  height="135px">
          <v-card v-if="orders.length" 
              width="100%"
              height="auto"
              max-width="450px"
              min-height=""
              tile
              color="transparent"
               flat
              style="position:absolute; bottom: 0px; border-radius:0px; overflow-x:scroll;"
              class=" mb-2 px-2  pt-2 pb-2 mx-auto">
                <v-list-item three-line class="pa-0">

              <v-list-item-avatar v-for="(n, i) in orders" :key="i"
                size="70"
                v-ripple @click="dialogBtn(i)"
                class="my-auto elevation-5 mx-2">
        <v-img :src="n.item[0].image">
        </v-img>
         <p class="caption grey--text font-weight-bold" style="position:absolute; top: -19px">{{n.item[0].qty}}x</p>
         <p class="caption grey--text font-weight-bold" style="position:absolute; bottom:-36px"><v-icon color="grey" style="padding-bottom:2px" size="11">mdi-currency-ngn</v-icon>{{n.total | price}}</p>
        </v-list-item-avatar>
                </v-list-item>
            </v-card>
                </v-card> 
             </v-container>
      </v-layout>
     
          <v-layout row wrap class="px-5 mt-5">
              <v-flex xs6>
                  <v-text-field
              name="promo"
              label="Promo Code"
              hide-details
              single-line disabled
              color="orange"
              class="mt-0"
          ></v-text-field>  
              </v-flex>
              <v-flex xs6>
        <v-btn block disabled class="mt-2 elevation-5" rounded="" color="white">Apply</v-btn>
              </v-flex>
          </v-layout>
          <v-card min-height="48vh" flat color="transparent" tile class="mt-8">
                <span class="overline grey--text  text--darken-1 font-weight-bold">
       Summary
       </span> 
      <v-row  class="px-5 pt-4">
        <v-flex xs4>
          <p class="caption grey--text text--darken-2 mb-1 font-weight-medium">Subtotal</p>
        </v-flex>
        <v-flex xs8>
          <p class="caption grey--text text--darken-2 mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey darken-2">mdi-currency-ngn</v-icon>{{total | price}}.00</p>
        </v-flex>
</v-row>
      <v-row  class="px-5 pt-0">
                  <v-flex xs4>
<p class="caption grey--text text--darken-2 mb-1 font-weight-medium">Delivery
    </p>
    </v-flex>
      <v-flex xs8>
          <p class="caption grey--text text--darken-2 mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey darken-2">mdi-currency-ngn</v-icon>{{deliveryFee | price}}.00</p>
      </v-flex>      
</v-row>
      <v-row justify="space-between" class="px-5 pt-0">
      <v-flex xs4>
<p class="caption grey--text text--darken-2 mb-1 font-weight-medium">Service charge
    </p>
    </v-flex>
      <v-flex xs8>
          <p class="caption grey--text text--darken-2 mb-1 font-weight-medium text-right"><v-icon size="12" style="padding-bottom:3px" color="grey darken-2">mdi-currency-ngn</v-icon>{{serviceCharge | price}}.00</p>
      </v-flex>      
</v-row>
<!-- <v-card flat tile class="mb-3">
     <v-row
          justify="space-around"
          no-gutters>
        <v-col cols="5">
            <v-btn dark block small class="mx-auto" color="orange"><v-icon size="15">mdi-check-decagram</v-icon> Batch <span class="overline font-weight-bold"> (30mins)</span></v-btn>
        </v-col>
        <v-col cols="5">
            <v-btn right   block small class="mx-auto" color=""><v-icon size="15">mdi-check-decagram</v-icon> Express <span class="overline font-weight-bold"> (5mins)</span></v-btn>
        </v-col>
     </v-row>
</v-card>             -->
 <v-divider></v-divider>
<v-row justify="space-between" class="px-5 pt-4">
 <v-flex xs4>
<p class="font-weight-black headline">Total</p>
</v-flex>
<v-flex xs8>
<p class=" font-weight-black headline text-right"><v-icon style="padding-bottom:5px" color="black" size="22">mdi-currency-ngn</v-icon>{{grandTotal | price}}.00</p>
</v-flex>
</v-row>   
 <v-divider></v-divider>
 
</v-card> 
</v-card>
    <v-dialog scrollable  
            v-model="dialog" 
            max-width="500px" persistent
            transition="dialog-transition">
      <v-card color="white" v-if="orders.length >= 0">      
      <div  v-for="(l, p) in orders" :key="l.item.id">
      <div v-show="p === dialogItem">
        <v-card-title class="pb-1 elevation-10" primary-title>
          <span class="grey--text pr-1" v-show="l.item[0].qty > 1">{{l.item[0].qty +'x'}} </span> {{l.item[0].name +' '}} <span class="pl-1 pb-2 caption grey--text"> <v-icon size="11" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon>{{l.total | price}}</span>
          <v-btn @click="dialog3=true" style="right:3px; top:3px" class="" absolute right x-small icon color="grey lighten-2"><v-icon size="18">mdi-trash-can-outline</v-icon></v-btn>
       <div v-if="l.compulsory.length" class="px-0 pb-2">
       <v-chip class="mx-1"  small v-for="n in l.compulsory" :key="p+n.id">{{n.name}}</v-chip>
        </div>
        </v-card-title>
       <v-card-text style="max-height:200px;overflow:auto">
       <div v-for="(o) in l.optional" :key="p+o.id">
       <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="padding-left:1px" class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium" v-html="o.name"></v-list-item-title>
            <v-list-item-subtitle class=" grey--text pl-0">
              <span><v-icon size="13" color="grey" style="padding-bottom:3px">mdi-currency-ngn</v-icon></span>{{o.price * (o.qty === 0 ? 1 : o.qty) | price}}
            </v-list-item-subtitle>
          </v-list-item-content>
          <div class="d-flex py-3">
    <p  color="grey lighten-2"  class="pt-1 mx-1 grey--text text--darken-1 text-center mb-0">{{'x '+o.qty}}</p> 
        </div>
        </v-list-item>
        <v-divider></v-divider>
       </div>
    </v-card-text>
        
        <v-card-actions class="pl-3 elevation-10">
            <div class="d-flex py-3">
       <v-btn x-small @click="minusItem"  fab  color="white"  class="my-0 grey--text elevation-4">
           <v-icon>mdi-minus</v-icon>
           </v-btn>
    <p  color="grey lighten-2"  class="pt-1 mx-1 grey--text text--darken-1 text-center mb-0">{{l.item[0].qty}}</p> 
    <v-btn x-small @click="addItem" fab  color="white"  class="my-0 grey--text elevation-4">
        <v-icon>mdi-plus</v-icon>
        </v-btn>
        </div>
          <div class="flex-grow-1"></div>
          <v-btn  color="grey lighten-1" text @click="dialog = false">close</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn> -->
        </v-card-actions>
      </div>
      </div>
      </v-card>
</v-dialog>

<v-dialog
      v-model="dialog3"
      max-width="290"
    >
      <v-card>
        <v-card-title class="body-1">Delete item from tray</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text
            @click="dialog3 = false"
          >
            cancel
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            @click="removeOrder()">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
 data() {
    return {
      date: null,
      fav: true,
      menu: false,
      dialogLeave: false,
      leave: false,
      dialog: false,
      dialog3: false,      
      reviews: false,
      popular: true,
      nearest: false,
    }
    },
  computed: {
     userArea() {
      return this.$store.getters.getUserArea;
    },
    orders() {
      return this.$store.getters.getOrder;
    },
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
    orderStatus() {
      return this.$store.getters.getOrderStatus.status;
    },
    dialogItem() {
      return this.$store.getters.getOrderStatus.item;
    },
    deliveryFee() {
      return this.$store.getters.getDeliveryParams.fee;
    },
  },
    methods: {
        addItem(){
    const sn = this

    sn.$store.dispatch('addItemCount', {
      orderI : sn.dialogItem
    })

  },
  minusItem(){
    const sn = this
    sn.$store.dispatch('minusItemCount', {
      orderI : sn.dialogItem
    })

  },
    trayBtn(x){
      this.$store.dispatch('setOrderStatus', {
      orderStatus: {
        item: null,
        status: x
      }
    })
  },
  dialogBtn(x){
    const sn = this
    sn.$store.dispatch('setOrderStatus', {
        orderStatus: {
          item: x,
          status: true
        }
      })
      sn.getTotal(x)
    
      sn.dialog = true
  },
  getTotal(x){
  const sn = this
  var item = sn.orders[x].item[0]
      var sum = sn.orders[x].optional.reduce((currentTotal, item) => {
        return item.price + currentTotal
      }, 0)
      sn.total = (item.price * item.qty) + sum
  },
 removeOrder(){
  const sn = this
    sn.$store.dispatch('removeOrder', {
        order: sn.dialogItem
      }).then(()=>{

        sn.dialog = false
        sn.dialog3 = false
      }).then(()=>{
        if (!sn.orders.length) {
          sn.$router.go(-1);
        }
      })
    },
  },

};
</script>