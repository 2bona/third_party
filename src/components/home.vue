
<template>
    <v-app>
                <v-app-bar
      color=""
      dense
      fixed
      tile
    >
    <router-link  style="text-decoration: none;" to="/">
<v-toolbar-title  style="text-decoration: none;" class="texti font-weight-black">Food Republic</v-toolbar-title>
</router-link>
      <div class="flex-grow-1"></div>

     

      <v-btn to="/auth" icon>
        <v-icon >mdi-magnify</v-icon>
      </v-btn>

  
    </v-app-bar> 
        <!-- <v-card   color="grey lighten-4" flat  tile> -->
    
        <v-app-bar class="mt-12" style="z-index:2" fixed  clipped-left hide-on-scroll tile flat    dense>
    
            <template v-slot:img="{ props }">
                        <v-img v-bind="props" gradient="to top right, rgb(0,0,0), rgba(0,0,0,0), rgb(0,0,0)"></v-img>
</template>
      <!-- <v-app-bar-nav-icon class="fon-weight-black" @click.stop="drawright = !drawright"></v-app-bar-nav-icon>
      <v-toolbar-title
        class=" white--text  font-weight-medium  text-capitalize"
        v-text="order +' '+ title"
      ></v-toolbar-title>
   

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fas fa-search</v-icon>
      </v-btn> -->
<template >
    <v-tabs style="margin-left: -10px;" show-arrows optional background-color="transparent" fixed color="grey lighten-3" slider-color="grey">
        <v-tab class="font-weight-bold" @click="food">food</v-tab>
        <v-tab class="font-weight-bold" @click="drinks">drinks</v-tab>
        <v-tab class="font-weight-bold" @click="snacks">snacks</v-tab>
        <v-tab class="font-weight-bold" @click="bread">bread</v-tab>
        <v-tab class="font-weight-bold" @click="pay">pay</v-tab>
    
    
    
    
        <v-tab disabled class="text-capitalize overline orange--text text--lighten-3">recommended</v-tab>
        <v-tab class="text-uppercase ">Mummy's Pot</v-tab>
        <v-tab class="text-uppercase ">Ofiaku</v-tab>
        <v-tab class="text-uppercase "> Destiny's Pot</v-tab>
        <v-tab class="text-uppercase "> Odogwu's Kitchen</v-tab>
        <v-tab class="text-uppercase "> five star</v-tab>
        <v-tab class="text-uppercase "> Crunchies </v-tab>
        <v-tab class="text-uppercase "> kfc </v-tab>
        <v-tab class="text-uppercase "> Bubbles </v-tab>
        <v-tab class="text-uppercase "> mr biggs </v-tab>
        <v-tab class="text-uppercase "> Chuks world </v-tab>
        <v-tab class="text-uppercase "> Ojimgbaeme kitchen </v-tab>
        <v-tab class="text-uppercase "> Divine heart kitchen </v-tab>
        <v-tab class="text-uppercase "> Xfits shawarma </v-tab>
        <v-tab class="text-uppercase "> Annabel kitchen </v-tab>
    
    </v-tabs>
    <v-progress-linear v-if="loading" :indeterminate="loading" absolute bottom color="deep-orange accent-4"></v-progress-linear>
</template>
     
    </v-app-bar>
    <v-navigation-drawer v-model="drawright" app clipped left class="pt-0">
      <v-list>
        <v-list-item-group color>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold text-capitalize title" v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    

<v-content style="overflow-x:hidden"> 
    <router-view name="content"></router-view>
 
<display v-bind:ad="ad" v-if="display" v-bind:chosentypes="chosentypes" v-bind:options="options" v-bind:slides="slides" v-bind:tags="tags" v-bind:sliding="sliding"></display>
<chefprofile ></chefprofile>
<profile v-bind:options="options" v-bind:tags="specialty" v-bind:slides="slides" v-bind:sliding="sliding" v-bind:restaurant="restaurant"></profile>

</v-content>
    
  </v-app>
</template>

<script>
import display from "./fooddisplay"
import profile from "./profile"
import chefprofile from "./chefprofile"


export default {
    name: "App",
    components: {
        profile,
        chefprofile,
        display
    },
    data() {
        return {
            display: true,
            title: "food",
            loading: 0,
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
            chosentypes: [],
            drawright: null,
            drawer: false,
            slide3d: true,
            slides: [],
            sliding: false,
            ad: [{
                    name: 'stanel foods',
                    img: 'https://www.nairaland.com/attachments/5611903_fbimg1499430874310_jpege49c0d41d130fed708536e6e64fbe8f4',
                },
                {
                    name: 'crunchies fried chicken',
                    img: 'https://crunchiesfriedchickenltd.com/wp-content/uploads/2015/10/crunchies_logo_main.png',
                },
                {
                    name: 'KFC foods',
                    img: 'https://www.joc.com/sites/default/files/field_feature_image/KFC_0.png',
                }
            ],
            restaurant: [{
                        name: "Mummy's Pot kitchen",
                        avatar: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                        type: 'restaurant',
                        img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80',
                        reviews: [{
                            user: {
                                name: "emeka okoro",
                                id: '1',

                            }
                        }]
                    }

                ]

                ,
            chef: [{
                        name: "Nonso Amadi",
                        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
                        type: 'chef',
                        avatar: 'https://images.unsplash.com/photo-1561259230-46fa9832bf20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
                        img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80',
                        reviews: [{
                            user: {
                                name: "emeka okoro",
                                id: '1',

                            }
                        }]
                    }

                ]

                ,
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with",
            tags: [
                "crayfish",
                "hoax",
                "plenty",
                "dreadnut",
                "meat",

            ],
            specialty: [
                "continental",
                "jollof rice",
                "onugbu soup",
                "Ukwa",
                "Yam porridge",
                "Ogbono",
                "egusi",
                "spaghetti",
                "catfish peppersoup",

            ],
            maintitle: "order food",
            pic: "https://www.mjeez.com/2987[1].jpg",

            options: [{
                    name: "swallow",
                    sn: 0,
                    img: "https://steemitimages.com/DQmYKGgpGxZf2riY4W7zxT4vt4qTNY3uqeba6XDz59ZHLV2/IMG_20180510_170815_694.JPG",
                    types: [{
                            name: "fufu(akpu)",
                            img: "https://cdn08.allafrica.com/download/pic/main/main/csiid/00390568:5f616dc0442c85424d6cf6003827eeb9:arc614x376:w285:us1.png"
                        },
                        {
                            name: "garri",

                            img: "https://wazobiaafricankitchen.com/wp-content/uploads/IMG_1585.jpg"
                        },
                        {
                            name: "amala",
                            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPwfDYGGFDusxkElLPAsnW2qeLeP3xWOFyQtTP_5s8Z1dSSjI"
                        }
                    ]
                },
                {
                    name: "drinks",
                    sn: 1,
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgyO0QY5e2B8nKfVPAZl3eWTC9nOjx97NIsiNMDxzNsGw0inT",
                    types: [{
                            name: "coca cola",
                            img: "https://images.unsplash.com/photo-1561758033-48d52648ae8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        },
                        {
                            name: "sprite",
                            img: "https://www.sprite.com/content/dam/coke2016/page-properties-images/Sprite_PageProperties.jpg"
                        },
                        {
                            name: "hollandia youghurt",
                            img: "https://www.yateso.com/wp-content/uploads/2018/05/Hollandia-yoghurt-1.jpg"
                        }
                    ]
                },
                {
                    name: "Sides",
                    sn: 2,
                    img: "data:image/jpeg;base64,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",
                    types: [{
                            name: "Beef",
                            img: "https://cdn.shopify.com/s/files/1/0027/9645/3961/products/Beef_Rib_Eye_shopify_1200x.jpg?v=1539137742"
                        },
                        {
                            name: "Fish",
                            img: "https://www.sprite.com/content/dam/coke2016/page-properties-images/Sprite_PageProperties.jpg"
                        },
                        {
                            name: "Chicken",
                            img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/5/27/0/0125629_03_chicken-in-skillet_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371589386937.jpeg"
                        },
                        {
                            name: "Goat meat",
                            img: "data:image/jpeg;base64,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"
                        },
                        {
                            name: "Pork",
                            img: "data:image/jpeg;base64,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"
                        }
                    ]
                }
            ],
            assets: [{
                cat: "food",
                items: [{
                        pic: "https://images.unsplash.com/photo-1534070189982-818bb5622474?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 0,
                        name: "Meat balls"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 1,
                        name: "Spaghetti"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 2,
                        name: "Baked Burger"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 3,
                        name: "Salad"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1539735776517-befcae86494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 4,
                        name: "Fried Fritata"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1539735776517-befcae86494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 5,
                        name: "Fried Fritata"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1539735776517-befcae86494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 6,
                        name: "Fried Fritata"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 7,
                        name: "Baked Fish and sauce"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 8,
                        name: "Agidi and pepper soup"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 9,
                        name: "Jollof rice and chicken with salad"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 10,
                        name: "Sea food"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 11,
                        name: "Sea food"
                    },
                    {
                        pic: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
                        show: true,
                        sn: 12,
                        name: "Sea food"
                    }
                ]
            }],
            items: [{
                    icon: "fas fa-pizza-slice",
                    text: "Rice and Chicken"
                },
                {
                    icon: "fas fa-cheese",
                    text: "Cake"
                },
                {
                    icon: "fas fa-pizza-slice",
                    text: "Rice and Chicken"
                },
                {
                    icon: "fas fa-cheese",
                    text: "Cake"
                },
                {
                    icon: "fas fa-pizza-slice",
                    text: "Rice and Chicken"
                },
                {
                    icon: "fas fa-cheese",
                    text: "Cake"
                },
                {
                    icon: "fas fa-pizza-slice",
                    text: "Rice and Chicken"
                },
                {
                    icon: "fas fa-cheese",
                    text: "Cake"
                },
                {
                    icon: "fas fa-pizza-slice",
                    text: "Rice and Chicken"
                },
                {
                    icon: "fas fa-cheese",
                    text: "Cake"
                },
                {
                    icon: "fas fa-bacon",
                    text: "Grilled meat"
                },
                {
                    icon: "mdi-chart-donut",
                    text: "Freid rice"
                },
                {
                    icon: "fas fa-hotdog",
                    text: "hot dog"
                }
            ]
        };
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
        showimg(key) {
            // imgHt = 
            this.slides[key].show = !this.slides[key].show;
        },
        ko(n) {
            return n;
        }
    },
    mounted() {
        this.loadData();
    },
    head: {
        // eslint-disable-next-line
        style: [{
                type: 'text/css',
                inner: '.flickity-viewport{height:405px}',
                undo: false
            }
            // ...
        ]
    },

};
</script>

<style scoped>
.toolbarmain.v-sheet.v-sheet--tile.theme--dark.v-toolbar.v-toolbar--extended.v-toolbar--prominent {
    background: #daadad;
    background: -moz-linear-gradient(left, #000000 0%, rgba(8, 0, 0, 0.33) 100%);
    background: -webkit-linear-gradient( left, #000000 0%, rgba(8, 0, 0, 0.33) 100%);
    background: linear-gradient(to right, #000000 0%, rgba(8, 0, 0, 0.33) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='rgba(8,0,0,0.33)', GradientType=1);
}

.carousel-3d-slide {
    border: none;
    border-radius: 0px;
    border-color: transparent;
    border-color: transparent;
    border-style: none;
}

.v-btn.v-btn--fab.btnflt {
    margin-top: -34px !important;
}

.carousel-cell {
    width: 40%;
    min-width: 280px;
    height: 280px;
    background: transparent;
    border-radius: 10px;
    counter-increment: carousel-cell;
}

@media only screen and (max-width: 600px) {
    .flickity-prev-next-button {
        display: none;
    }
}

.his .flickity-viewport {
    height: 76px
}

body ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 1px;
    height: 3px;
}

.flickity-prev-next-button.previous {
    left: -45px
}

.flickity-prev-next-button.next {
    right: -45px
}

.flickity-prev-next-button.previous {
    top: 50%;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px 0px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    left: -30px;
    background: rgb(255, 255, 255);
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 100px;
}

.flickity-prev-next-button.next {
    top: 50%;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px 0px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    right: -34px;
    background: rgb(255, 255, 255);
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 100px;
}

.flickity-prev-next-button .flickity-button-icon {
    position: absolute;
    left: 30%;
    top: 30%;
    width: 31%;
    height: 36%;
}
</style>