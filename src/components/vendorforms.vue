<template>
<div>
 <v-card flat tile class="px-5 pb-9">
     <v-card-title primary-title class="title mb-3 px-0 font-weight-bold grey--text">
         Add new item to category
     </v-card-title>
             <div>
<v-flex xs12>
      
         <v-text-field
            ref="name"
            class="font-weight-bold grey--text text--darken-4"
        
            placeholder="Name of item"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            ref="email"
            class="font-weight-bold grey--text text--darken-4"
            placeholder="Price"
            color="orange"
            required
          ></v-text-field>
   

</v-flex>
   <v-row class="px-3"  justify="space-between">

<v-flex xs12>
        <v-file-input multiple  
         prepend-icon="mdi-camera"
         label="Food Pic"></v-file-input>
   
</v-flex>

<v-flex xs12>

       <v-textarea
          name="description"
          label="Description"
          color="orange"
          class="font-weight-bold grey--text text--darken-4"
          placeholder="eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more."
         
        ></v-textarea>
          
          </v-flex>
          <v-flex xs12>
            <v-select
            class="font-weight-bold grey--text text--darken-4"
            :items="extras"
            attach
            chips
            placeholder="what do you like"
            label="Extras (optional)"
            color="orange"
            multiple
          ></v-select>
</v-flex>
<v-flex xs12>
            <v-select
            class="font-weight-bold grey--text text--darken-4"
            :items="tags"
            attach
            chips
            placeholder="what do you like"
            label="Tags (optional)"
            color="orange"
            multiple
          ></v-select>
</v-flex>

   </v-row>

      <v-row class="my-5 px-3"  justify="space-around">
<v-btn to="/vendorformedit"  class="px-6"  color="orange" dark rounded>add</v-btn>
      </v-row>

</div>
 </v-card>


</div>
</template>
<script>
export default {
  components: {
    navbottom: () => import('./navbottom'),
  },
    data: () => ({
      extras: ['peppery food', 'chicken', 'turkey', 'fish', 'soup', 'rice', 'fries', 'street bites'],
      tags: ['peppery food', 'chicken', 'turkey', 'fish', 'soup', 'rice', 'fries', 'street bites'],
    }),
}
</script>