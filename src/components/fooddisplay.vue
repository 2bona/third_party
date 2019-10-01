<template>
    <v-card flat tile   class="pb-5 py-12">
       
        
        <v-container  fluid fill-height class="pt-0">
            <v-flex class="mb-auto" xs12 shrink>    

             <v-container fluid>
                                 <v-layout row wrap justify-space-around>
 
                
                <v-flex xs12 lg12>
               <h1 class=" display-1  font-weight-black">Sponsored</h1>
                          <v-layout row wrap n class="mb-10">
     
     
      <v-flex
                        class="my-1  pa-2"
                        xs12
                        sm6
                        md4
                        lg4
                        v-for="n in ad"
                        :key="n.name"
                      >
                    
                        <v-card dark img="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" 
                        hover   style="border-radius: 100px 100px 100px 100px"  class="elevation-7 mx-auto pa-2" width="100%">
                          <v-list-item two-line class="pl-0">
                            <v-list-item-avatar
                              elevation='20'
                              right
                              size="130"
                              color="transparent"
                              class="elevation-7  my-0"
                            >
                              <v-img :src="n.img"></v-img>
                            </v-list-item-avatar>
                         
                            <v-list-item-content>
  
                              <v-list-item-title
                                class=" font-weight-bold text-capitalize text-wrap  mb-1 title "
                              > {{n.name}}
                              </v-list-item-title>
                            </v-list-item-content>
                           
                          </v-list-item>
                        </v-card>
                      </v-flex> </v-layout>
                </v-flex>
                                 </v-layout>
             
             </v-container>
             
             
             <v-container class="pa-0">
               <v-card  color="transparent" max-width="400px" min-height='500px' max-height='1200px' height="90vh">
              
                 <v-card class="" style="padding-bottom:90px; overflow-y:auto" height="70vh" flat tile color=transparent>
                     <p class="overline font-weight-black grey-text text-center">rice</p>
                   <v-card-text  class="d-flex pt-0 justify-center">

                   <v-avatar class="elevation-20" size="200">
                     <v-img src="https://www.averiecooks.com/wp-content/uploads/2016/01/chickenfriedrice-2-650x975.jpg"></v-img>
                   </v-avatar>
                 </v-card-text>
             <v-card-text  class="d-flex pt-0 px-0 justify-center">

          <h1 class=" display-2 text-center black--text font-weight-black text-capitalize">Chineese fried rice</h1>
                                  
                                    </v-card-text>
                                     <v-card-text  class="d-flex py-0 my-0 justify-center"><p class="py-0">250Cal/Plate</p>
                                   </v-card-text> 
          <p class="text-center body-2 grey--text text--darken-1 px-5">Lorem ipsum dolor sit amet consectetur adimhhghmhg mhgcmhg cpisicing elit. Illo,sed magnam incidunt maiores beatae ut eda nam earum?</p>
  <v-card-text>
    <h1 class="title text-center grey--text text--darken-2 font-weight-black text-uppercase">nutritional information</h1>
    <p class="overline text-center">this is only an estimate, ask a nutritionist for the actual values.</p> 
      <v-list  v-for="(n, i) in 6"
        :key="n" flat style="background-color:transparent" tile>
      <v-list-item
      
      >
        <v-list-item-action class="headline font-weight-black grey--text text--darken-2 ">
{{i+1}}
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title class="body-2">Fats and Oil</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action class="overline text-lowercase font-weight-medium">
23g/cm3        </v-list-item-action>

      </v-list-item>
      <v-divider inset></v-divider>
    </v-list>
  </v-card-text>
                 </v-card>
 
            
                 <v-card  v-if="list"
                      width="100%"
                      height="auto"
                      max-width="400px"
                      min-height=""
                      tile
                      img="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      color="transparent"
                      hover
                      style="position:absolute; bottom: 0px; border-radius:100px; overflow-x:scroll;"
                      class="elevation-3 mb-2 px-2 pt-2 pb-2">
                       <v-list-item three-line class="pa-0">
                   
                      <v-list-item-avatar v-for="n in 5" :key="n"
                size="95"
                v-ripple
                class="my-0 elevation-7 mr-2"
              >
                <v-img src="https://www.africanbites.com/wp-content/uploads/2018/09/IMG_3960.jpg"></v-img>
              </v-list-item-avatar>
                            <v-list-item-content class="py-0">
                     
                  
                      </v-list-item-content>

                       </v-list-item>
                    </v-card>
                       </v-card>
             </v-container>
             <v-container>
                                 <v-layout row wrap>
 
                <v-flex xs12 lg9>
                                       
                                        <h3 class=" d-flex px-1 display-1 font-weight-black">Results <span class="title">(200)</span></h3>

               <v-layout row wrap>

                 <v-flex class="my-2 " xs12 sm6 md6 lg6 v-for="n in slides" :key="n.sn">
           <v-card  v-if="list"
                      width="90%"
                      height="auto"
                      max-height=""
                      min-height=""
                      tile
                      flat
                      color="transparent"
                      hover
                      style=" border-radius:100px 100px 100px 100px"
                      class=" mx-auto mb-2 px-1 pt-1 pb-1">
                       <v-list-item three-line class="pa-0">
                      <v-list-item-avatar
                size="100"
                
                class="my-0 elevation-7 mr-2"
              >
                <v-img :src="n.pic"></v-img>
              </v-list-item-avatar>
                            <v-list-item-content class="py-0">
                     
                        <h2
                        style="line-height:1"
                          class="body-1 pr-2  grey--text 
                          text-wrap
                         text--darken-3 font-weight-bold"
                        >{{n.name + ' - 20'}}</h2>
                      </v-list-item-content>

                       </v-list-item>
                    </v-card>
           <v-card v-if="gallery"
                      width="90%"
                      height="250px"                      tile
                      style="border-radius:10px 10px 30px 30px"
                      hover
                      color="transparent"
                      class=" mx-auto mb-4 elevation-2">
                      <v-img class="" height="70%" :src="n.pic"
                     
                      ></v-img>
                    
                
                      <v-card-text class="pa-2">
  
                        <h2
                          class="title  grey--text 
                          text-truncate
                         text--darken-3 font-weight-black"
                        >{{n.name + ' 20'}}</h2>
                     
  

                  
                      </v-card-text>
                    </v-card>
                 </v-flex>
         
               </v-layout>
            </v-flex>
            <v-flex xs12 lg3 class="pt-12">
              <v-card img="https://s3-prod.adage.com/s3fs-public/styles/width_1024/public/20190429_328896624_1-5_3x2.jpg" color="red" class="pa-3" height="100vh">
<h1 class="display-4 font-weight-black white--text">ADVERT PLACEMENT</h1>
              </v-card>
            </v-flex>
            <v-flex xs12 lg4>
              <v-card max-width='400px' color='grey lighten-5'>
                <v-card-text class="text-center">
                  <p class="overline text-center font-weight-bold">soup</p>
                  <v-avatar class="elevation-10" size="200">
                  <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlVJ_ft3gg3cUPAO-lj0UYtjnHut2LSKvV75bJR6aSFshjcDYpSQ"></v-img>
                </v-avatar>
                <v-card-title class=" justify-center text-capitalize black--text headline font-weight-black">
                  Egusi soup
                </v-card-title>
                   <span class="d-flex justify-center">
             

          <v-btn fab color="white" small >
              <v-icon style="font-size:11px">fas fa-minus fa-1x</v-icon>
          </v-btn>
          <span class="headline mx-2 grey--text font-weight-black" style="line-height:1.8;">20</span>
            <v-btn fab color="white" small >
              <v-icon style="font-size:11px">fas fa-plus</v-icon>
          </v-btn>
          </span>
                </v-card-text>
                   <v-divider></v-divider>
      <v-card-text>
          <v-expansion-panels accordion>
    <v-expansion-panel
      v-for="i in options"
      :key="i"
    >
           <v-expansion-panel-header class="text-capitalize font-weight-black" >
       {{i.name}}
     
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list rounded>
   <v-list-item-group >
          <v-list-item
            v-for="i in options"
            :key="i"
          >
            <v-list-item-avatar size="60">
              <v-img :src="i.img"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-capitalize font-weight-bold title" v-html="i.name"></v-list-item-title>
            </v-list-item-content>
            
        <v-list-item-action>
          <span class="d-flex">
             

          <v-btn icon>
              <v-icon>fas fa-minus</v-icon>
          </v-btn>
          <span class="headline mx-2 grey--text font-weight-black">20</span>
            <v-btn icon>
              <v-icon>fas fa-plus</v-icon>
          </v-btn>
          </span>
       
        </v-list-item-action>
          </v-list-item>
   </v-list-item-group>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
        
      </v-card-text>
         <v-card-actions>
           <h2 style="font-family:monospace">N1,200.00</h2>
           <v-spacer></v-spacer>
      <v-btn  class="white--text font-weight-black" color="grey">cancel</v-btn>
      <v-btn class="white--text font-weight-black" color="deep-orange darken-3">add to cart</v-btn>
    </v-card-actions>
              </v-card>
            </v-flex>
                                 </v-layout>
                 </v-container>
            </v-flex>

        </v-container>

    </v-card>
</template>
<style>
.v-expansion-panel-content__wrap {
    padding: 0px!important;
}
</style>
<script>

export default {
  
    name: 'display',
    props: ['slides', 'ad', 'sliding', 'tags', 'options', 'chosentypes' ],
     data() {
    return {
      gallery:0,
      list: 1,  
      title: "food",
      order: "order",
      overlay: "false",
      menu: false,
      fav: true,
      imght: '40%',
      showdetails: true,
      showMenu: false,
      x: 0,
      y: 0,
      message: false,
      hints: true,
      drawright: null,
      drawer: false,
      slide3d: true,
      flickityOptions: {
        contain: true, 
        pageDots: false,
        percentPosition: false,
        wrapAround: true,
        freeScroll: true
      },
    }
     },
     methods: {
         next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    },
    food() {
      this.title = "food";
      this.show3d = true;
      this.order = "order";
      this.drawright = true;
      this.pic = "https://www.mjeez.com/2987[1].jpg";
    },
    drinks() {
      this.title = "drinks";
      this.show3d = true;
      this.order = "order";
      this.drawright = true;
      this.pic =
        "https://images.unsplash.com/photo-1519944781502-4ac8148b55e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80";
    },
    listfn(){
        this.list = true;
        this.gallery = false
    },
    galleryfn(){
        this.list = false;
        this.gallery = true
    },

    snacks() {
      this.title = "snacks";
      this.show3d = true;
      this.order = "order";
      this.drawright = true;
      this.pic =
        "https://images.unsplash.com/photo-1550436566-df63e63a1585?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80";
    },
    bread() {
      this.title = "bread";
      this.show3d = true;
      this.order = "order";
      this.drawright = true;
      this.pic = "https://www.mjeez.com/2987[1].jpg";
    },
    // eslint-disable-next-line

    details() {
      this.drawer = !this.drawer;
    },
    setmenu(n) {
      this.chosentypes = this.options[n].types;
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    pay() {
      this.show3d = false;

      this.title = "pay";
      this.order = "";
      this.drawright = false;
      this.pic = "https://www.mjeez.com/2987[1].jpg";
    },
    loadData() {
      this.slides = this.assets[0].items;
      this.show3d = true;
      this.sliding = true
    },
    showimg(key){
      // imgHt = 
this.slides[key].show =  !this.slides[key].show;
  },
    ko(n) {
      return n;
    }
  },

     
     
}
</script>