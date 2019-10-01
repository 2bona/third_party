<template>
    
<div ref="searchdiv">
  <div  class="" >
 
      <div class="inputWithIcon">
           <v-text-field  background-color="grey lighten-4" @click="show=true"  class="borders ni font-weight-bold mx-auto " solo color="orange" label="Search by place, adventure or event" style=" width:100%"
            append-icon="fas fa-search fa-xs"></v-text-field>
            
 
</div>
  <transition name="slide-y-transition" origin="center center">

  <v-container class="searchcont " v-if="show"   v-closable="{
    exclude: ['searchdiv', 'searchcont'],
    handler: 'onClose'
  }" fluid grid-list-md  >
    <v-layout ref="searchcont" justify-space-between row wrap style="position:absolute; width:-webkit-fill-available;right:0; min-width:310px">
      <v-flex d-flex xs12 sm12 md12 lg12 class="hidden-md-and-up; " style="width: inherit;">
        <v-card     width="100%" class="elevation-24 " color="transparent" style="border-radius:15px 15px 0 0; width:inherit;" > 
<v-tabs
      v-model="active"
      color="white"
     grow
      slider-color="blue"
    >
      <v-tab 
        v-for="tem in tems"
        :key="tem.title"
        ripple
        class="grey--text"
      >
         {{ tem.title }}

      </v-tab>
      <v-tab-item
        v-for="temk in tems"
        :key="temk.title"
      >
          <v-list subheader class="bi">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            avatar
           
            class="caption"
          >
            <v-list-item-avatar size="30"  class="caption" style="min-width:37px;">
              <img :src="item.avatar">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="body-1" v-html="item.title"></v-list-item-title>
                            <v-list-item-sub-title class="caption" v-html="item.subtitle"></v-list-item-sub-title>

            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs>
        </v-card>
      </v-flex>
      
     
    

    
    </v-layout>
  </v-container>
  
  </transition>
   </div>
   </div>
</template>
<style scoped>
.theme--dark.v-icon {
    color: #c6c6c6!important;
}
input[type="text"].search {
      box-shadow: rgba(15, 15, 15, 0.12) 0px 16px 24px 0px;
   max-width: 433px;
    width: 100%;
  border-radius: 20px;
  background-color: white;
  margin: 8px 0;
  outline: none;
  height: 38px;
  padding: 2px;
  box-sizing: border-box;
  transition: 0.3s;
  color: black;
}
.bi.theme--light.v-list {
    background: #ffffffeb;
    color: rgba(0,0,0,0.87);
}
.inputWithIcon input[type="text"] {
  padding-left: 39px;
}
input[type="text"]:focus {
  border-color: dodgerBlue;
      box-shadow: rgba(15, 15, 15, 0.32) 0px 16px 24px 0px;
}
input[type="text"]:hover {
  border-color: dodgerBlue;
      box-shadow: rgba(15, 15, 15, 0.32) 0px 16px 24px 0px;
}
.inputWithIcon {
  position: relative;
}
.inputWithIcon i {
    position: absolute;
    left: 0;
    transform: translate(30%, 0%);
    top: 9px;
  padding: 9px 8px;
  color: rgb(65, 62, 62);
  transition: 0.3s;
}.inputWithIcon input[type="text"]:focus + div.container.searchcont.fluid.grid-list-md {
  display: block;
  transition: 1s all ease-in-out;
}
.inputWithIcon input[type="text"]:focus + i {
  color: dodgerBlue;
}
.v-text-field.v-text-field--solo .v-label {
    top: calc(50% - 10px);
    font-size: 13px;
}
div.container.searchcont.fluid.grid-list-md{
  
  padding: 0px; 
  position: relative;;
  
  z-index:99;
}


</style>

<script>
import Vue from 'vue'
let handleOutsideClick
Vue.directive('closable', {
  bind (el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation()
      const { handler, exclude } = binding.value
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName]
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },

  unbind () {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})


  export default {
    data () {
// this.isActive = false;
      return {
        loading: false,
        
        isActive: false,
        search: null,
        select: null,
        show: false,
        none: "none",
        active: 0,
        visible: "relative",
        hidden: "absolute",
        op: 1,
        noop: 0,

          items: [
          { active: true, title: 'Jasongtreshbiuibih Oner',subtitle: 'Arizona', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson',subtitle: 'New York', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker',subtitle: 'Chicago', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors',subtitle: 'Los Angeles', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ],
        tems: [
          {title: "Top Search"},
          {title: "Related"},
          {title: "Trending"}
        ],
        lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
        states: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Federated States of Micronesia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Marshall Islands',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Palau',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virgin Island',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming'
        ]
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500);
        
      },
        onClose () {
    this.show = false
   
  },
     
  
    }
  }
</script>