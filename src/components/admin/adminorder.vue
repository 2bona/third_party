<template>
  <div class="grey lighten-5" style="width:100%; height: 100%">
    <keep-alive>

   
    <div class="grey lighten-5 container-fluid mt-0" style="margin-bottom: 100px;">
      <div class="d-flex " style="justify-content: flex-start"> 
<div></div>
<v-layout style="
    position: relative;
" justify-space-between  wrap>


      

<v-spacer></v-spacer>

   <v-btn fixed right color="grey darken-1"
          class="elevation-24 pr-0 mb-2"
              @click="reload(order)"
               fab dark small top
               :loading="orderLoad"
              ><v-icon>mdi-reload</v-icon></v-btn
            >
              </v-layout>
      </div>
 
      <v-btn
        fixed
        @click="$router.go(-1)"
        top
        left
        fab x-small
        color="white"
        style="margin-bottom: 60px;"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
   
        <v-layout class="mb-12 px-7" wrap>

  
      <v-flex md6 sm12 xs12>
      
      <v-layout row wrap class="mt-12 pt-3 px-2">
        <v-flex style="justify-content: left;
    display: flex;" xs6>
          <p 
          
           style="font-family: monospace!important;"
          class="pr-1-2  mb-0 body-1 font-weight-bold grey--text text--lighten-1">
          {{orderErrand ? 'ERRND': 'ORDR'}} ID: {{ order.tracking_id }}
          </p>
        </v-flex>
        <v-flex style="justify-content: flex-end;
    display: flex;" xs6>
          <p
           style="font-family: monospace!important; padding-top:1px"
            class="body-2 pl-2 mb-0 text-truncate text-uppercase text-right font-weight-bold grey--text text--lighten-1"
          >
            {{ order.created_at | myDate }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout v-if="!orderErrand" width="100%" class=" mx-0" style="overflow-x:hidden; ">
        <v-container class=" px-0 pt-2 pb-0">
          <v-card
            class=" mx-auto"
            style="position:relative;display:flex;justify-content: center;"
            flat
            tile
            color="transparent"
            max-width="600px"
            min-height="100px"
          >
            <v-card
              width="100%"
              height="90px"
              min-height="130px"
              tile
              color="transparent"
              flat
              style="position:absolute;padding-top: 19px !important; bottom: 0px; border-radius:0px; overflow-x:scroll;"
              class="d-flex mb-0 px-2  pt-7 pb-0 mx-auto"
            >
              <v-list-item class="pa-0">
                <v-list-item-avatar
                  v-for="(n, i) in order.items"
                  :key="i"
                  size="50" :ripple="false"
                  
                  @click="dialogItemBtn(n, i)"
                  class="my-auto elevation-5 mx-2"
                  style="border-radius:;overflow:inherit;justify-content: center"
                >
                  <v-img contain
                          :src="'https://res.cloudinary.com/dnqw7x4bp/image/upload/c_fit,h_70,w_70/'+n.image.substring(n.image.lastIndexOf('/') + 1,n.image.lastIndexOf('.'))"> </v-img>
                  <p
                    class="body-2 grey--text font-weight-bold"
                    style="position:absolute; top: -19px"
                  >
                    {{ n.pivot.qty }}x
                  </p>
                  <p
                    class="body-2 grey--text font-weight-bold"
                    style="justify-content:center;display:flex;width:60px;position:absolute; bottom:-36px"
                  >
                  <span>

                    <v-icon color="grey" style="padding-bottom:1px" size="12">
                      mdi-currency-ngn
                    </v-icon>{{ n.pivot.total | price }}
                  </span>
                  </p>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-card>
        </v-container>
      </v-layout>
       <div v-if="orderErrand">
       <keep-alive>
          <v-card
            width="100%"
            max-width="490px"
            class="py-3 mx-auto px-2 mb-4 mt-2"
            flat
            tile
            color="transparent"
          >
       <keep-alive>
            <v-timeline align-top dense>
              <v-timeline-item
                :color="order.errand.address[0].pivot.status ? 'green' : 'red'"
                small
              >
                <v-row class="pt-1">
                  <v-col class="grey--text text--darken-2 pa-1">
                    <strong class="text-capitalize" v-if="order.errand.address[0].lat && !order.errand.address[0].name">
                      Current location
                    </strong>
                    <strong class="text-capitalize" v-if="order.errand.address[0].name">{{
                      order.errand.address[0].name
                    }}</strong>
                    <div class="body-1 mb-0">
                      {{ order.errand.address[0].address_person_name }}
                    </div>
                    <div class="body-1 mb-0">
                      {{ order.errand.address[0].phone }}
                    </div>
                        <strong class="text-capitalize" v-if="order.errand.address[0].pivot.task">{{
                      order.errand.address[0].pivot.task
                    }}</strong>
                  </v-col>
                  <v-col
                    style="
                        display: flex;
                        align-items: center;
                            justify-content: flex-end;
                    "
                    class="pa-1"
                    cols="4"
                  >
                    <strong class="grey--text">   
                      {{ order.errand.address[0].pivot.type }}
</strong>
  <v-btn class="mx-1" x-small 
                    dark                     v-show="!(order.status === 4 )"
                    :loading="taskLoading"
                    @click="markTask(order.errand, 0)"
                   :color="order.errand.address[0].pivot.status ? 'green' : 'red'"
                    fab>
                      <v-icon>
                       mdi-check
                      </v-icon>
                       </v-btn>
                  </v-col>
                </v-row>
              </v-timeline-item>
            
              <v-timeline-item
                v-if="order.errand.address.length == 3"
                :color="order.errand.address[2].pivot.status ? 'green' : 'red'"
                small
              >
                <v-row class="pt-1">
                  <v-col class="grey--text text--darken-2 pa-1">
                    <strong class="text-capitalize" v-if="order.errand.address[2].lat && !order.errand.address[2].name">
                      Current location
                    </strong>
                    <strong class="text-capitalize" v-if="order.errand.address[2].name">{{
                      order.errand.address[2].name
                    }}</strong>
                    <div class="body-1 mb-0">
                      {{ order.errand.address[2].address_person_name }}
                    </div>
                    <div class="body-1 mb-0">
                      {{ order.errand.address[2].phone }}
                    </div>
                          <strong class="text-capitalize" v-if="order.errand.address[2].pivot.task">
                            {{order.errand.address[2].pivot.task}}</strong>
                  </v-col>
                  <v-col
                  style="
                  display: flex;
                  align-items: center;    justify-content: flex-end;"
                  class="px-1"
                  cols="4"
                  >
                    <strong class="grey--text">
                      {{ order.errand.address[2].pivot.type }}
                    </strong>
                      <v-btn class="mx-1" x-small 
                    dark
                                        v-show="!(order.status === 4 )"

                    :loading="taskLoading"
                    @click="markTask(order.errand, 2)"
                   :color="order.errand.address[2].pivot.status ? 'green' : 'red'"
                    fab>
                      <v-icon>
                       mdi-check
                      </v-icon>
                       </v-btn>
                  </v-col>
                </v-row>
              </v-timeline-item>
              
              <v-timeline-item
              v-if="order.errand.address.length > 1"
                :color="order.errand.address[1].pivot.status ? 'green' : 'red'"
                small
              >
                <v-row class="pt-1">
                  <v-col class="grey--text text--darken-2 pa-1">
                    <strong class="text-capitalize" v-if="order.errand.address[1].lat && !order.errand.address[1].name">
                      Current location
                    </strong>
                    <strong class="text-capitalize" v-if="order.errand.address[1].name">{{
                      order.errand.address[1].name
                    }}</strong>
                    <div class="body-1 mb-0">
                      {{ order.errand.address[1].address_person_name }}
                    </div>
                    <div class="body-1 mb-2">
                      {{ order.errand.address[1].phone }}
                    </div>
                  </v-col>
                  <v-col
                    style="
            display: flex;
            align-items: center;
                justify-content: flex-end;
        "
                    class="px-1"
                    cols="4"
                  >
                    <strong class="grey--text">
                        {{ order.errand.address[1].pivot.type }}
                    </strong>
                    <v-btn class="mx-1" x-small 
                    dark
                    v-show="!(order.status === 4 )"
                    :loading="taskLoading"
                    @click="markTask(order.errand, 1)"
                   :color="order.errand.address[1].pivot.status ? 'green' : 'red'"
                    fab>
                      <v-icon>
                       mdi-check
                      </v-icon>
                       </v-btn>
                  </v-col>
                </v-row>
              </v-timeline-item>
              
              <v-timeline-item v-if="order.status === 5" color="red" small>
                <v-row class="pt-1">
                  <v-col class="px-0">
                    <div class="overline  text-truncate grey--text">
                      {{ order.vendor.name | vendorname }}
                    </div>
                    <strong class="grey--text text--darken-2"
                      >Errand canceled</strong
                    >
                    <p v-if="order.rejected_time" class="caption mb-0">
                      <v-icon size="12" color="">mdi-clock</v-icon>
                      {{ order.rejected_time | trackDate }}
                    </p>
                    <p
                      v-if="order.paid"
                      class="green--text text--lighten-1 mb-0 caption"
                    >
                      <v-icon size="17" color="green">mdi-cash</v-icon> Money
                      refunded
                    </p>
                    <p class="orange--text text--lighten-1 caption">
                      <v-icon size="12" color="orange">mdi-alert-circle</v-icon>
                      <span class="pl-1" style="position:absolute">
                        {{ order.reject_reason }}
                      </span>
                    </p>
                  </v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
       </keep-alive>
          </v-card>
           </keep-alive>
        </div>
      <div
        v-if="order.reviews"
        class="elevation-2 mx-auto my-2"
        style="max-width:400px;max-height:70vh; border-radius:25px; overflow:auto"
      >
        <v-list class="py-0 my-0" three-line>
          <v-list-item>
            <v-list-item-avatar
              style="position: relative;
                      top: 17px;"
              class="mt-0 mb-0 mr-2"
              size="26"
            >
              <v-img 
               :src="'https://res.cloudinary.com/dnqw7x4bp/image/upload/c_fit,h_26,w_26/'+order.user.image.substring(order.user.image.lastIndexOf('/') + 1,order.user.image.lastIndexOf('.'))"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-flex d-flex align-center class="pl-1">
                <div class="font-weight-bold caption  text-capitalize">
                  {{
                    order.user.surname +
                      " " +
                      order.user.middle_name +
                      " " +
                      order.user.first_name
                  }}
                  <br />
                  <p class="overline mb-0 grey--text text--darken-2">
                    {{ order.reviews.created_at | myDate }}
                  </p>
                </div>

                <div class="flex-grow-1"></div>

                <v-rating
                  size="15"
                  dense
                  readonly
                  :value="order.reviews.rating"
                  color="orange darken-4"
                  style="position: relative;top: -7px;"
                  background-color="grey lighten-2"
                ></v-rating>
              </v-flex>
              <v-list-item-subtitle
                style="line-height:1.3;"
                class=" px-1 caption grey--text text--darken-1"
                >{{ order.reviews.content }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      
        <v-layout class="mb-3" wrap>

   
      <v-flex v-if="order.status < 4" md6 sm6 xs12>
      <span
        class="body-2 font-weight-bold grey--text text--lighten-1"
      >
        VENDOR
      </span>
          <v-list-item v-if="order.vendor.name" class="" two-line>
        <v-list-item-content class="py-1">
          <v-list-item-title
            class="body-1 pb-0 font-weight-medium  grey--text text--darken-3 text-wrap"
            >{{ order.vendor.name }}
              
            </v-list-item-title
          >
          <v-flex>
    
        <v-btn
        small
        right 
  class="my-1 elevation-0 px-3 text-left blue--text text--darkeen-4"    
        color="grey lighten-4" rounded
        style="height:45px;width:233px;max-width:233px;    display: ;
    justify-content: start;"
      >
      <span  class="font-weight-bold ml-0 mr-2" >  <v-icon>mdi-phone</v-icon> </span>
      <a style="text-decoration:none" :href="'tel:' + order.vendor.phone">
      <span>
      <span class="blue--text text--lighten-3">
       vendor </span>
       <br> 
       <span class="body-1 font-weight-black">
        {{order.vendor.phone}}
         </span>
       </span> 
              </a>
                 <v-btn absolute style="right:-4px" @click.stop="sendNotifyBtn('vendor')" fab x-small class="ml-2 mr-0 font-weight-bold">  <v-icon color="blue lighten-1">mdi-message-outline</v-icon> </v-btn>
      </v-btn>

<v-flex>


        <v-btn
        small
        right 
  class="my-1 elevation-0 px-3 text-left blue--text text--darkeen-4"    
        color="grey lighten-4" rounded
        style="height:45px;width:233px;max-width:233px;    display: ;
    justify-content: start;"
      >
      <span  class="font-weight-bold ml-0 mr-2" >  <v-icon>mdi-phone</v-icon> </span>
      <a style="text-decoration:none" :href="'tel:' + order.user.phone">
      <span>
      <span class="blue--text text--lighten-3">
       User </span>
       <br> 
       <span class="body-1 font-weight-black">
        {{order.user.phone}}
         </span>
       </span> 
      </a>
    <v-btn absolute style="right:-4px" @click.stop="sendNotifyBtn('user')" fab x-small class="ml-2 mr-0 font-weight-bold">  <v-icon color="blue lighten-1">mdi-message-outline</v-icon> </v-btn>
      </v-btn>
</v-flex>
      </v-flex>
        </v-list-item-content>
          </v-list-item>
          </v-flex> 
          
         <v-flex
   
        v-if="(order.delivery != null || order.status === 5 )"
    md6 sm6 xs12>
      <span
        class=" grey--text body-2 text--lighten-1  font-weight-bold"
      >
        DISPATCH TIMELINE
      </span>
      <v-card-text
        style="margin-left:-30px"
        v-if="(order.delivery != null || order.status === 5)"
        class="pa-0 my-3"
      >
        <v-timeline align-top dense>
          <v-timeline-item color="blue" v-if="order.delivery != null" small>
            <span class="caption grey--text  text--darken-1 font-weight-medium">
              Delivered by
            </span>
            <v-list-item-content class="mt-0 mb-0 py-0">
              <p class="body-1 mb-0" v-text="order.delivery.name"></p>
            </v-list-item-content>
            <v-list-item-content
              v-if="!(order.status === 4)"
              class="text-right"
              style="display: inline;"
            >
              <a
                style="text-decoration:none"
                :href="'tel:' + order.delivery.phone"
              >
                <v-btn fab dark icon x-small color="primary"
                  ><v-icon>mdi-phone</v-icon>
                </v-btn></a
              >
              <a
                style="text-decoration:none"
                :href="
                  'https://wa.me/+234' +
                    order.delivery.phone.substring(1) +
                    '?text=Hello,%20' +
                    order.delivery.name +
                    '%20,%20How%20is%20the%20order%20going.'
                "
                target="_blank"
              >
                <v-btn fab dark icon x-small color="green">
                  <v-icon>mdi-whatsapp</v-icon>
                </v-btn>
              </a>
              <!-- <v-btn fab dark depressed color="white" x-small>
                <v-icon color="primary">mdi-map-marker</v-icon>
              </v-btn> -->
            </v-list-item-content>
            <p
              v-if="order.transit_time"
              class="caption grey--text text--lighten-1 mb-0"
            >
              <v-icon size="12" color="grey lighten-1">mdi-clock</v-icon>
              {{ order.transit_time | trackDate }}
            </p>
          </v-timeline-item>
          <v-timeline-item v-if="order.status === 5" color="red" small>
            <p class=" mb-0 ">Order has been rejected.</p>
            <p class="caption grey--text  mb-0">{{ order.reject_reason }}</p>
            <p class="caption grey--text text--lighten-1 mb-0">
              <v-icon size="12" color="grey lighten-1">mdi-clock</v-icon>
              {{ order.rejected_time | trackDate }}
            </p>
          </v-timeline-item>
          <v-timeline-item
            v-if="order.delivery != null && order.status === 4"
            color="green"
            small
          >
            <p class="body-2 grey--text mb-0">Order has been delivered.</p>
            <p
              v-if="order.delivered_time"
              class="caption grey--text text--lighten-1 mb-0"
            >
              <v-icon size="12" color="grey lighten-1">mdi-clock</v-icon>
              {{ order.delivered_time | trackDate }}
            </p>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
   </v-flex>  
            <v-flex md6 sm6 xs12>  
      <span
        class="body-2 font-weight-bold grey--text text--lighten-1"
      >
        DELIVERY & PAYMENT
      </span>
      <v-list-item v-if="order.address" class="mt-1 mb-0" two-line>
        <v-list-item-content class="mt-0 py-0">
          <v-list-item-title
            class="body-1 grey--trxt text--darken-1 font-weight-medium text-wrap"
            v-if="!(order.payment_method === 4 || order.payment_method === 5)"
            >{{ order.address.name }}</v-list-item-title
          >
          <v-list-item-subtitle
            class="body-2 font-weight-medium text--darken-1 grey--text text-wrap "
            v-if="!(order.payment_method === 4 || order.payment_method === 5)"
            >{{ order.address.name_2 }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            class="body-2 font-weight-medium text--darken-1 grey--text text-wrap  "
            v-if="!(order.payment_method === 4 || order.payment_method === 5)"
            >{{ order.address.company }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            class="body-2 font-weight-medium text--darken-1 grey--text text-wrap"
            v-if="!(order.payment_method === 4 || order.payment_method === 5)"
            >{{ order.address.instruction }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            style="font-family: monospace;"
            
             class="body-1 text--lighten-1 grey--text  font-weight-bold"
            
            >  <span  :class="order.approved ? 'text--darken-2 grey--text': 'text--darken-2 red--text'" >
              {{ order.approved ? 'APPROVED' : 'UNAPPROVED' }}
              </span>
              </v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="!(order.payment_method === 4 || order.payment_method === 5)"
            style="font-family: monospace;" class="body-2 text--lighten-1 grey--text  font-weight-bold"
            >ETA - <span class="grey--text text--darken-2" >
              {{ order.duration | duration }}
              </span>
              </v-list-item-subtitle
          >
               <v-list-item-subtitle
            v-if="order.discount"
            class="title orange--text text--darken-3 font-weight-bold"
            ><v-icon color="orange darken-4" style="padding-bottom:3px">mdi-sale</v-icon> Discount Rate</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>   
      
      
       <v-list-item class="py-0">
        <v-list-item-content class="mb-3 -0 py-0">
         
          <v-list-item-subtitle
            v-if="order.payment_method === 3 && !(order.status === 5) && order.grand_total > (order.pos_amt + order.transfer_amt)"
            class="mt-0 pt-0 text-wrap body-2 font-weight-bold grey--text "
            >CASH  <span v-show="order.grand_total - order.pos_amt - order.transfer_amt > 1">
               - <v-icon style="padding-bottom:1px" color="grey" size="13"
                >mdi-currency-ngn</v-icon
              >{{ order.grand_total - order.pos_amt - order.transfer_amt | price }}</span
            ></v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="order.pos && !(order.status === 5)"
            class=" text-wrap body-1 font-weight-bold grey--text "
            >POS  <span v-show="order.pos_amt > 1">
               - <v-icon style="padding-bottom:2px" color="grey" size="14"
                >mdi-currency-ngn</v-icon
              > {{ order.pos_amt | price }}</span
            ></v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="order.transfer && !(order.status === 5)"
            class=" text-wrap body-1 font-weight-bold grey--text "
            >Transfer <span v-show="order.transfer_amt > 1">
               - <v-icon style="padding-bottom:2px" color="grey" size="14"
                >mdi-currency-ngn</v-icon
              >{{ order.transfer_amt | price }}</span
            ></v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="order.creditor"
            class=" text-wrap body-1 font-weight-bold grey--text "
            >CREDIT -{{order.creditor}}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="order.paid && !(order.status === 5)"
            class=" text-wrap body-1 font-weight-bold green--text"
            >PAID</v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="!order.paid"
            class=" text-wrap body-1 font-weight-bold red--text"
            >UNPAID</v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="order.paid && order.status === 5"
            class=" text-wrap body-1 font-weight-bold blue--text"
            >REFUNDED</v-list-item-subtitle
          >
           <v-list-item-subtitle
            class=" text-wrap body-2 "
            >{{ paymentMethod }}
            <span v-show="order.change_amount > 1">
              <v-icon style="padding-bottom:2px" color="grey" size="12"
                >mdi-currency-ngn</v-icon
              >{{ order.change_amount | price }}</span
            ></v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
              </v-flex>
  <v-flex xs12>
           <v-card flat color="transparent" class="mb-4" tile >
        <span class="body-2 font-weight-bold grey--text text--lighten-1">
          SUMMARY
        </span>
      
        <v-row
          v-show="!(order.payment_method === 4 || order.payment_method === 5)"
          class="px-6 pt-0"
        >
          <v-flex xs6>
            <p class="body-1 grey--text  mb-1 font-weight-medium">Delivery</p>
          </v-flex>
          <v-flex xs6>
            <p class="body-1 grey--text  mb-1 font-weight-medium text-right">
             <!-- <v-icon v-if="order.status == 2" @click="bidDialogBtn(order.delivery_fee)" size="14" style="padding-bottom:1px">{{(order.status == 2) ?'mdi-pencil': 'mdi-pencil-off'}}</v-icon>  -->
             <v-icon size="14" style="padding-bottom:1px" color="grey"
                >mdi-currency-ngn</v-icon>{{ (order.errand_id? order.grand_total - cut: order.delivery_fee - cut) | price }}.00
            </p>
          </v-flex>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="space-between" class="px-5 pt-4">
          <v-flex xs4>
            <p class="font-weight-black headline">Total</p>
          </v-flex>
          <v-flex xs8>
            <p class=" font-weight-black headline text-right">
              <v-icon style="padding-bottom:5px" color="black" size="22"
                >mdi-currency-ngn</v-icon
              >{{ (order.errand_id? order.grand_total - cut : order.delivery_fee - cut) | price }}.00
            </p>
          </v-flex>
        </v-row>
        <v-divider></v-divider>
     
      </v-card>
  </v-flex>
   <v-layout
            v-if="order.status < 4"
            style="     justify-content: center;    max-width: 600px;
    margin: auto;width: 100%;"
            wrap
            class=" pb-2 px-2"
          >
            <!-- <v-flex xs6 class="px-2">
              <v-btn
                :loading="loading"
                block
                @click="dialog2 = true"
                class="mt-2 elevation-10 font-weight-black"
                rounded=""
                dark 
                color="orange darken-4"
                >reject
                <v-scale-transition origin="center center">
                  <v-icon v-if="order.status === 5" color=""
                    >mdi-check-decagram</v-icon
                  >
                </v-scale-transition>
              </v-btn>
            </v-flex> -->
            <v-flex v-if=" !orderErrand && order.status > 1" xs12 sm6 class="text-center px-2">
              <v-btn
                :loading="loading"
                block
                @click=" serveBtn()
                "
                :disabled="order.status == 2 && !order.delivery"
                :class="order.status === 2 ? 'mt-2' : 'mt-2 elevation-10'"
                rounded=""
                dark  class=" font-weight-black'"
                :color="order.status == 1 ?'primary': order.status === 2 ? 'yellow darken-4': 'green darken-3'"
              >
              {{
                  order.status != 1 
                    ? order.status == 2? 'in-transit' : "delivered"
                    : "accept delivery"
                }}
              </v-btn>
              <p class="text-center display-1 font-weight-bold red--text mx-auto " v-if="order.status == 2 && !order.delivery"> Assign a "Free & Available" Rider to continue</p>
            </v-flex>
          </v-layout>
    <v-flex v-if="order.table_no" md6 sm6 xs12>
      <div >
        <span class="overline grey--text  text--darken-3 font-weight-bold">
          Table No
        </span>
        <v-list-item class="my-1" dense>
          <v-list-item-content>
            <p
              class="text-wrap display-1 font-weight-bold font-weight-medium my-0 pt-0"
            >
              {{ order.table_no }}
            </p>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-flex>
      </v-layout>
      </v-flex>
         
   
      <v-flex v-if=" order.status > 1" class="mb-12"  md6 sm12 xs12>
   <p v-if="agents.length && order.status < 3" :class="$vuetify.breakpoint.mdAndUp? 'mt-12' : ''" class="headline text-center mb-3">{{order.delivery? 'Change ':'Choose '}} Rider</p>
   <v-row  v-if="agents.length && order.status < 3 && order.status > 1 " class="pa-3 justify-space-around" >

<v-flex  xs6 sm4 class="text-center" md3  :key="n.id" v-for="n in agents">

    <v-avatar @click="order.delivery? order.delivery.id == n.id? '':setDeliveryAgent(n): setDeliveryAgent(n)" 
    :class="order.delivery? order.delivery.id == n.id?'elevation-24 ': 'elevation-0': ''" 
    class=" mx-auto" 
    size="100">
      <img
   
         :src="'https://res.cloudinary.com/dnqw7x4bp/image/upload/c_fit,h_120,w_120/'+n.image.substring(n.image.lastIndexOf('/') + 1,n.image.lastIndexOf('.'))"
      > 

  <div
  v-if="order.delivery"
  >
          <div
          v-if="order.delivery.id == n.id"
            absolute
            class="infoOverlay overlay"
            >
            <v-flex xs12 class="ma-auto">
                <v-flex  class="text-center d-flex ma-auto">
                          <v-icon color="grey lighten-3" class="mx-auto" size="45">mdi-check-decagram</v-icon>
              </v-flex>
            </v-flex>
          </div>
  </div>
    </v-avatar>
    <p class="body-1 text-wrap grey--text text--darken-2 font-weight-bold text-center"> {{n.name}}</p>
</v-flex>

   </v-row>
      </v-flex>
        </v-layout>
    </div>
     </keep-alive>
      <div style="position:fixed;width:100%;left:0; top:0px">
      <v-progress-linear
        color="blue lighten-2" :height="'8px'"
        v-show="orderLoad"
        :indeterminate="orderLoad"
      ></v-progress-linear>
    </div>
       <v-dialog v-model="bidDialog" max-width="290">
      <v-card class="px-2 pb-2">
        <v-card-title
          class="body-1 text-center  pl-3  my-2 pb-0 "
          >Edit Delivery fee.
            </v-card-title>
        <v-form  @submit.prevent="bidFee()" ref="formBid">
          <!-- <v-text-field
            validate-on-blur
            autofocus
            rounded label="Edit Fee"
            solo
            v-model="message"
          ></v-text-field> -->
          <v-card-text>
      <v-slider
        v-model="fee"
        label="Suggest Fee"
            hint="Enter the accurate delivery fee"
            :rules="[rules.required]"
        :tick-labels="ticksLabels"
        :max="3"
        step="1"
        ticks="always"
        tick-size="4"
      ></v-slider>
    </v-card-text>
        </v-form>

        <v-card-actions class="pr-1">
          <v-spacer></v-spacer>

          <v-btn rounded 
             style="background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 10px #d9d9d9,-5px -5px 10px #ffffff!important;"
          class="font-weight-black orange--text text--darken-4 whiteBtnShadow" color=""  small @click="dialogNotify = false">
            cancel
          </v-btn>

          <v-btn
          rounded
             style="background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 10px #d9d9d9,-5px -5px 10px #ffffff!important;"
       class="font-weight-black"
           color="blue darken-1" text small @click="sendNotify()">
            send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
       <v-dialog v-model="dialogNotify" max-width="290">
      <v-card class="px-2 pb-2">
        <v-card-title
          class="body-1 text-center  pl-3  my-2 pb-0 "
          >Send notification to  {{ ' ' + notifyType}}
            </v-card-title
        >
        <v-form  @submit.prevent="sendNotify()" ref="formNotify">
          <v-text-field
            :rules="[rules.required]"
            validate-on-blur
            autofocus
           
            rounded label="Message"
            hint="Write your notification message here"
            solo
            v-model="message"
          ></v-text-field>
        </v-form>

        <v-card-actions class="pr-1">
          <v-spacer></v-spacer>

          <v-btn rounded 
             style="background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 10px #d9d9d9,-5px -5px 10px #ffffff!important;"
          class="font-weight-black orange--text text--darken-4 whiteBtnShadow" color=""  small @click="dialogNotify = false">
            cancel
          </v-btn>

          <v-btn
          rounded
             style="background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 10px #d9d9d9,-5px -5px 10px #ffffff!important;"
       class="font-weight-black"
           color="blue darken-1" text small @click="sendNotify()">
            send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      scrollable
      v-model="dialog"
      max-width="420px"
      transition="dialog-transition"
    >
      <v-card color="white" v-if="dialogItem">
        <v-btn
          @click="dialog = false"
          absolute
          fab
          right
          x-small
          class="mt-6"
          top
          ><v-icon>mdi-close-circle</v-icon></v-btn
        >
        <div v-show="dialogItem">
           <v-card-title style="padding-right: 52px;" class="pb-1 text-capitalize elevation-10" primary-title>
            <v-flex class="d-block" style="    line-height: 1;" xs12>

          
            <span
              class="pr-1 grey--text text--darken-3 font-weight-black"
              v-show="dialogItem.pivot.qty > 1"
              >{{ dialogItem.pivot.qty + "x" }}
            </span>
            {{ dialogItem.name + " " }}
            <span class="pl-1 pb-2 body-2 text--darken-2 grey--text">
              <v-icon size="13" color="grey" style="padding-bottom:1px"
                >mdi-currency-ngn</v-icon
              >{{ (dialogItem.pivot.qty * dialogItem.price) | price }}</span
            >
            <div v-if="dialogComp.length" class="px-0 pb-2">
              <v-chip
                class="mx-1"
                small
                v-for="(n, p) in dialogComp"
                :key="p + n.id + n.pivot.type"
                >{{ n.name }}</v-chip
              >
            </div>
             </v-flex>
          <div v-if="dialogItem.description" class="caption">{{dialogItem.description}}</div>
          </v-card-title>
          <v-card-text style="max-height:200px;overflow:auto">
            <div v-for="(o, p) in dialogOpt" :key="p + o.id + o.pivot.type">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    style="padding-left:1px"
                    class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium"
                    v-html="o.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle class=" grey--text pl-0">
                    <span
                      ><v-icon size="13" color="grey" style="padding-bottom:3px"
                        >mdi-currency-ngn</v-icon
                      ></span
                    >{{ (o.price * o.pivot.qty) | price }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <div class="d-flex py-3">
                  <p
                    class="pt-1 mx-1 body-1 grey--text text--darken-3 font-weight-black text-center mb-0"
                  >
                    {{ "x " + o.pivot.qty }}
                  </p>
                </div>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-card-text>
          <v-layout row wrap style="width:100%" class="px-3 py-3">
            <v-flex xs6 class="px-2">
              <v-btn
                :disabled="item_no === 0"
                @click="food(0)"
                block
                rounded
                class="mx-auto"
                color="white"
                >prev</v-btn
              >
            </v-flex>
            <v-flex xs6 class="px-2">
              <v-btn
                :disabled="max_no === item_no"
                @click="food(1)"
                block
                rounded
                class="mx-auto"
                color="white"
                >next</v-btn
              >
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      scrollable
      v-model="dialog3"
      max-width="420px"
      transition="dialog-transition"
    >
      <v-card color="white" v-if="dialogItem">
        <div v-show="dialogItem">
          <v-card-title class="pb-1 text-capitalize elevation-10" primary-title>
            <span
              class="pr-1 grey--text text--darken-3 font-weight-black"
              v-show="dialogItem.pivot.qty > 1"
              >{{ dialogItem.pivot.qty + "x" }}
            </span>
            {{ dialogItem.name + " " }}
            <span class="pl-1 pb-2 caption grey--text">
              <v-icon size="11" color="grey" style="padding-bottom:3px"
                >mdi-currency-ngn</v-icon
              >
              {{ (dialogItem.pivot.qty * dialogItem.price) | price }}</span
            >

            <div v-if="dialogComp.length" class="px-0 pb-2">
              <v-chip
                class="mx-1"
                small
                v-for="(n, p) in dialogComp"
                :key="p + n.id + n.pivot.type"
                >{{ n.name }}</v-chip
              >
            </div>
          </v-card-title>
          <v-card-text style="max-height:200px;overflow:auto">
            <div v-for="(o, p) in dialogOpt" :key="p + o.id + o.pivot.type">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    style="padding-left:1px"
                    class="body-2 mb-0 grey--text text--darken-1 text-capitalize font-weight-medium"
                    v-html="o.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle class=" grey--text pl-0">
                    <span
                      ><v-icon size="13" color="grey" style="padding-bottom:3px"
                        >mdi-currency-ngn</v-icon
                      ></span
                    >{{ (o.price * o.pivot.qty) | price }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <div class="d-flex py-3">
                  <p
                    class="pt-1 mx-1 body-1 grey--text text--darken-3 font-weight-black text-center mb-0"
                  >
                    {{ "x " + o.pivot.qty }}
                  </p>
                </div>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-card-text>

          <v-card-actions class="pl-3 elevation-10">
            <div class="flex-grow-1"></div>
            <v-btn color="grey lighten-1" text @click="dialog = false"
              >close</v-btn
            >
            <!-- <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn> -->
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
      <v-dialog v-model="dialogAssign" max-width="290">
      <v-card class="px-2 pb-2">
        <v-card-title
          class="body-1 text-center  pl-3  mb-2 pb-0 "
          >Set {{ ' ' + delivery_agent.name}} as Rider
            </v-card-title
        >
        <v-card-actions class="pr-1">
          <v-spacer></v-spacer>

          <v-btn rounded 
             style="background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 10px #d9d9d9,-5px -5px 10px #ffffff!important;"
          class="font-weight-black orange--text text--darken-4 whiteBtnShadow" color=""  small @click="dialogAssign = false">
            cancel
          </v-btn>

          <v-btn
          rounded
             style="background: linear-gradient(145deg, #ffffff, #e6e6e6);
box-shadow:  5px 5px 10px #d9d9d9,-5px -5px 10px #ffffff!important;"
       class="font-weight-black"
           color="blue darken-1" text small @click="setRider()">
            set
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="dialog3" width="500">
      <v-card v-if="agents.length">
        <v-card-title class="body-1 grey lighten-2" primary-title>
          Choose delivery agent
        </v-card-title>
        <v-card-text class="py-0 px-3 ">
          <v-form ref="form">
            <v-list-item
              class="mt-2 px-0 mb-0"
              style="max-height: 38px!important"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="caption grey--text font-weight-bold text--darken-1 mt-1 pb-0"
                >
                  {{ agents[slide2].name }}</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-content style="display: inline;">
                <a
                  style="text-decoration:none"
                  :href="'tel:' + agents[slide2].phone"
                >
                  <v-btn fab dark icon x-small color="primary"
                    ><v-icon>mdi-phone</v-icon>
                  </v-btn></a
                >
                <a
                  style="text-decoration:none"
                  :href="
                    'https://wa.me/+234' +
                      agents[slide2].phone.substring(1) +
                      '?text=Hello,%20this%20is%20' +
                      vendor.name +
                      '%20,%20I%20just%20want%20to%20confirm%20your%20location%20for%20a%20food%20delivery.'
                  "
                  target="_blank"
                >
                  <v-btn fab dark icon x-small color="green">
                    <v-icon>mdi-whatsapp</v-icon>
                  </v-btn>
                </a>
              </v-list-item-content>
              <v-switch
                color="grey lighten-2"
                @change="setDeliveryAgent()"
                :loading="load2"
                v-model="deliverySwitch"
                class="pt-3"
              ></v-switch>
            </v-list-item>
          </v-form>
          <v-slider
            color="grey"
            :loading="load2"
            track-color="grey lighten-2"
            thumb-color="orange darken-4"
            v-model="slide2"
            thumb-label
            :max="slider2"
          ></v-slider>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="grey"
            class="px-3 font-weight-bold caption"
            rounded
            text
            dark
            @click="dialog3 = false"
          >
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="dialogTransit" max-width="290">
      <v-card>
        <v-card-title class="body-1">
          Is the order on the way?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text
            rounded
            small
            @click="dialogTransit = false"
          >
            cancel
          </v-btn>

          <v-btn color="blue darken-1" text rounded small @click="accept()">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelivery" max-width="290">
      <v-card>
        <v-card-title class="body-1">
          Have you delivered the order?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text
            rounded
            small
            @click="dialogDelivery = false"
          >
            cancel
          </v-btn>

          <v-btn color="blue darken-1" text rounded small @click="deliver()">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogServe" max-width="290">
      <v-card>
        <v-card-title class="body-1">Is the item ready for delivery?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey lighten-1"
            text
            rounded
            small
            @click="dialogServe = false"
          >
            cancel
          </v-btn>

          <v-btn color="blue darken-1" text rounded small @click="serve()">
            sure
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.v-tooltip__content {
  padding: 0px 0px !important;
  width: 90%;
}
.v-menu__content--fixed {
    max-width: 328px;
}
.overlay {
  background-color: #2121219e;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 1 !important;
  top: 0;
  -webkit-transition: inherit;
  transition: inherit;
  width: 100%;
  border-color: #2121219e;
  z-index: 9;
  overflow: hidden;
}
.v-overlay__content {
  width: 100% !important;
  height: 100% !important;
  padding: 8px !important;
}
.infoOverlay {
  display: flex !important;
}
</style>

<script>
import axios from "axios";
import wrapper from "axios-cache-plugin";

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
});

export default {
  data() {
    return {
      load: false,
      load2: false,
      loading: false,
      loading2: false,
      taskLoading: false,
      payBtn: false,
      dialog: false,
      dialogIn: false,
      dialogNotify: false,
      dialog2: false,
      dialogAssign: false,
      orderLoad: false,
      bid: '',
      bidDialog: false,
      dialogServe: false,
      dialogTransit: false,
      dialogDelivery: false,
      dialog3: false,
      delivery_agent: "",
      message: "",
      notifyType: '',
      dialogItem: "",
      dialogComp: [],
      dialogOpt: [],
      slide: 0,
      slide2: 0,
      item_no: 0,
      max_no: 0,
      dialogOptions: [],
      reason: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    disableDelivery() {
      const sn = this;
      let r = null;
      if (sn.order.payment_method === 4 || sn.order.payment_method === 5) {
        r = false;
      } else if (sn.order.delivery != null) {
        if (sn.order.delivery.id === sn.slide2) {
          r = true;
        }
      } else {
        r = false;
      }
      return r;
    },
    deliverySwitch: {
      get() {
        const sn = this;
        if (!sn.order.delivery) {
          return false;
        } else {
          return sn.order.delivery.id === sn.agents[sn.slide2].id;
        }
      },
      set() {
        return;
      }
    },
    user() {
      return this.$store.getters.getUser;
    },
    vendor() {
      return this.$store.getters.getVendor;
    },
       logistic_id() {
      return this.$store.getters.getLogisticId;
    },
        cut() {
      return this.$store.getters.getCut;
    },
    agents() {
      return this.$store.getters.getVendorList;
    },
    order() {
      return this.$store.getters.getOrderFull;
    },
      orderErrand() {
      return this.order.type == "Errands";
    },
    paymentMethod() {
      let d = "";
      if (this.order.payment_method === 1) {
        d = "Online payment with card";
      } else if (this.order.payment_method === 2) {
        d = "Mobile/USSD transfer on delivery";
      } else if (this.order.payment_method === 6) {
        d = "Paid from wallet";
      } else if (this.order.payment_method === 5) {
        d = "P.O.S payment";
      } else if (this.order.payment_method === 4) {
        if (this.order.change_amount > 1) {
          d = "Cash payment and expecting change of ";
        } else {
          d = "Cash Payment";
        }
      } else if (this.order.payment_method === 3) {
        var t = this.order.offline !== '0' ? "" : "on delivery";
        if (this.order.change_amount > 1) {
          d = this.order.offline !== '0' ? "" : "Paying Cash " + t + ", expecting change of ";
        } else {
          d = this.order.offline !== '0' ? "" : "Paying Cash " + t;
        }
      }
      return d;
    }
  },
  mounted() {
    const sn = this;
    if (sn.order.items.length) {
      sn.dialogItem = null;
      sn.max_no = sn.order.items.length - 1;
      var n = sn.order.items[sn.item_no];
      sn.setItem(n);
      sn.dialog = true;
    }

    if (sn.order.status < 3 && !(sn.order.payment_method === 4 || sn.order.payment_method === 5)) {
      sn.getAgents();
    }
    sn.$nextTick(()=>{
      if (sn.order.loaded && sn.order.status !== 4 && sn.order.status !== 5) {
        sn.reload(sn.order)
      }
    })
  },
  methods: {
    setDeliveryAgent(x){
      if(this.order.status > 1 && this.order.status < 3){

        this.delivery_agent = x
      this.dialogAssign = true
      }
    },
    sendNotifyBtn(x){
      
      this.notifyType = x
      this.dialogNotify = true
    },
    sendNotify(x){
      if (this.$refs.formNotify.validate()) {
        this.dialogNotify = false
        this.orderLoad = true
        axios.post('/notify_', {
          message: this.message,
          type: this.notifyType,
          order_id: this.order.id
        })
        .then(res => {
          this.orderLoad = false
            this.$store.dispatch("snack", {
                color: "blue",
                text: "Notification sent"
              });
          console.log(res)
        }).catch((err)=>{
          this.orderLoad = false
          this.$store.dispatch("snack", {
              color: "green",
              text: "Err - "+err
            });
          console.log(err)

        })
              }
    },
    setRider(){
        this.dialogAssign = false
        this.orderLoad = true
        axios.post('/order/set_rider', {
          order_id: this.order.id,
          rider_id: this.delivery_agent.id,
        })
        .then(res => {
          this.orderLoad = false
            this.$store.dispatch("snack", {
                color: "blue",
                text: "Rider has been set as "+ this.delivery_agent.name
              });
        this.$store.dispatch("getOrder", {
          id: this.order.id,
          action: 'clear'
        });
          console.log(res)
        }).catch((err)=>{
          this.orderLoad = false
          this.$store.dispatch("snack", {
              color: "green",
              text: "Err - "+err
            });
          console.log(err)

        })
    }, //errand task button 
    markTask(x, y){
      this.taskLoading = true
         const sn = this;
      let url = "/errands/change_status";
      http({
        url: url,
        method: "get",
        params: {
          id: x.id,
          address_id: x.address[y].id,
          status: !x.address[y].pivot.status? 1 : 0,
          task: x.address[y].pivot.type
        }
      }).then(()=>{ 
        this.taskLoading = false
            this.$store.dispatch("snack", {
              color: "green",
              text: "Task completed successfully"
            });
              this.$store.dispatch("order", {
          id: this.order.id,
          action: null
        });
      }).catch(()=>{
        this.taskLoading = false
        this.$store.dispatch("snack", {
              color: "red",
              text: "Something went wrong"
            });
      })
    },
    getAgents() {
      const sn = this;
        axios
      .get("/get_delivery_agents?logistic_id="+this.logistic_id)
        .then(res => {
          this.$store.dispatch('setVendorList', res.data.users);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    distance(positionLat, positionLng, askingLat, askingLng, unit) {
      var radlat1 = (Math.PI * positionLat) / 180;
      var radlat2 = (Math.PI * askingLat) / 180;
      var theta = positionLng - askingLng;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    },
    getLatestNearestAgentAndAssign() {
      const sn = this;
      sn.loading = true;
      var lat = parseFloat(sn.vendor.lat);
      var lng = parseFloat(sn.vendor.lng);
      var data = JSON.parse(JSON.stringify(sn.agents));
      var newData = [];
      data.forEach(element => {
        var distFrmVendor = sn.distance(
          lat,
          lng,
          parseFloat(element.lat),
          parseFloat(element.lng),
          "K"
        );
        var ob = { id: element.id, dist: distFrmVendor };
        newData.push(ob);
      });
      if (data.length > 1) {
        newData.sort(function(a, b) {
          return a.dist - b.dist;
        });
      }
      sn.setDeliveryAgent(newData[0].id);
    },
    setItem(n) {
      const sn = this;
      sn.dialogItem = n;
      sn.dialogOptions = sn.order.options.filter(item => {
        return item.pivot.tracking_id === n.pivot.tracking_id;
      });
      if (sn.dialogOptions.length) {
        sn.dialogComp = sn.dialogOptions.filter(item => {
          return item.pivot.type === "compulsory";
        });
        sn.dialogOpt = sn.dialogOptions.filter(item => {
          return item.pivot.type === "optional";
        });
      } else {
        sn.dialogComp = [];
        sn.dialogOpt = [];
      }
    },
    food(x) {
      const sn = this;
      if (x) {
        if (sn.max_no === sn.item_no) {
          return;
        } else {
          sn.item_no++;
          let n = sn.order.items[sn.item_no];
          sn.setItem(n);
        }
      } else {
        if (sn.item_no === 0) {
          return;
        } else {
          sn.item_no--;
          let n = sn.order.items[sn.item_no];
          sn.setItem(n);
        }
      }
    },
    bidDialogBtn(x) {
    this.bidDialog = true
    this.bid = x
    
    },
    serveBtn() {
      this.order.status < 2
        ? (this.dialogServe = true)
        : this.order.status == 2 ? 
        this.dialogTransit = true : 
        (this.dialogDelivery = true)
    },
     notifyUser() {
      const sn = this;
      sn.loadingNotified = true;
      sn.$store
        .dispatch("order", {
          status: sn.order.status,
          id: sn.order.id,
          action: "notify_customer",
          delivery_agent_id: sn.deliveryAgent.id,
        })
        .then(() => {
          if (!this.orders) {
            this.setLocation();
          }
          sn.$store.dispatch("addAccepted", {
            id: sn.order.tracking_id,
            vendor: sn.order.vendor.name,
            vendorAddress: sn.order.vendor.address,
            phone: sn.order.user.phone,
            address: sn.order.address.name,
            total: sn.order.grand_total,
            paid: sn.order.paid,
          });
          sn.$store.dispatch("setTask", true);
          sn.dialogNotified = false;
        })
        .catch((err) => {
          sn.loadingNotified = false;
          sn.$store.dispatch("snack", {
            color: "red",
            text: "An error Occured",
          });
        });
    },
    reload(e) {
      const sn = this;
      sn.orderLoad = true;
      sn.loadOrder2(e)
    },
    loadOrder(e){
        this.$store.dispatch('getOrder', {
             id: e.id,
             action: 'clear' 
              })
    this.orderLoad = false;
    },
    dialogItemBtn(n, y) {
      const sn = this;
      sn.dialogItem = null;
      sn.item_no = y
      sn.setItem(n);
      sn.dialog = true;
    },
    deliver() {
      const sn = this;
      sn.dialogDelivery = false;
      sn.orderLoad = true;
        sn.$store
          .dispatch("order", {
            id: sn.order.id,
            status: sn.order.status,
            action: "delivered"
          })
          .then(() => {
          this.$store.dispatch("getOrder", {
          id: this.order.id,
          action: 'clear'
        });
            sn.orderLoad = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Customer has been notified"
            });
        });
    },
    accept() {
      const sn = this;
this.dialogTransit = false
this.orderLoad = true
      sn.$store
        .dispatch("order", {
          status: sn.order.status,
          id: sn.order.id,
          action: "transit",
          delivery_agent_id: sn.order.delivery.id,
        }).then(()=>{
          this.$store.dispatch("getOrder", {
            id: this.order.id,
          action: 'clear'
        });
this.orderLoad = false
        })
    },
    loadOrder2(x){
      const sn = this
      sn.orderLoad = true;
      let url = "/order/find2?id=" + x.id
      axios.get(url)
        .then(function (response) {
          var order = response.data.order;
           if (order) {
          sn.$store.dispatch("setOrderObj", order)
          }
                   sn.$store.dispatch("snack", {
            color: "blue",
            text: "Order Refreshed"
          });
              sn.orderLoad = false;

          }).catch((err)=>{
            sn.orderLoad = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Err - "+err
            });
          })
    },
    serve() {
      const sn = this;
      sn.dialogServe = false;
      sn.orderLoad = true;
        sn.$store
          .dispatch("order", {
            id: sn.order.id,
            status: sn.order.status,
            action: "served"
          })
          .then(() => {
            sn.orderLoad = false;
            sn.$store.dispatch("snack", {
              color: "green",
              text: "Customer has been notified"
            });
          });
    },
    reject() {
      const sn = this;
      if (sn.$refs.form.validate()) {
  this.orderLoad = true
          if (sn.order.status === 5) {
          sn.$store.dispatch("snack", {
            color: "blue",
            text:
              "Order has already been rejected, turn off the unavailable items"
          });
          sn.loading2 = false;
          sn.dialog2 = false;
          return;
        } else {
          var n;
          if (sn.order.delivery != null) {
            n = sn.order.delivery.id;
          } else {
            n = null;
          }
          sn.$store.dispatch("order", {
            id: sn.order.id,
            status: sn.order.status,
            action: "rejected",
            delivery: n,
            reason: sn.reason
          });
          sn.dialog2 = false;
          sn.loading2 = false;
          sn.$store.dispatch("snack", {
            color: "green",
            text: "Order has been rejected, and customer has been notified "
          });
        }
      } else {
        return;
      }
    },
    rejectBtn() {
      this.dialog2 = true;
    },
  }
};
</script>
