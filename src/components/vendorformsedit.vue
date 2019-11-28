<template>
<div>
 <v-card flat tile class="px-5 pb-9">
     <v-card-title primary-title class="title mb-3 px-0 font-weight-bold grey--text">
         Edit food title
     </v-card-title>
             <div>
<v-flex xs12>
      
         <v-text-field
            ref="name"
            value="value"
            class="font-weight-regular grey--text text--darken-4"
            
            placeholder="Name of item"
            color="orange"
            required
          ></v-text-field>
         <v-text-field
            ref="email"
            value="value"
            class="font-weight-regular grey--text text--darken-4"
            placeholder="Price"
            color="orange"
            required
          ></v-text-field>
   

</v-flex>
   <v-row class="px-3"  justify="space-between">

<v-flex xs12>
       <v-row justify="start" class="px-3">
<v-flex xs4 v-for="n in 4" class="my-2" :key="n">
    <v-avatar
    size="80"
    color="transparent"
    class="elevation-8"
    tile
    style="border-radius: 10px;"
>
    <img src="https://images.unsplash.com/photo-1569900245921-240b4779788d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="alt">
<v-btn style="    position: absolute;
    top: 0px; right:0px" small icon><v-icon color="red" size="20px">mdi-trash-can</v-icon></v-btn>
    </v-avatar>

</v-flex>
<v-flex xs12>
        <v-file-input multiple  
         prepend-icon="mdi-camera"
         label="Food Pic"></v-file-input>
   
</v-flex>
       </v-row>
   
</v-flex>

<v-flex xs12>

       <v-textarea
          name="description"
          label="Description"
          color="orange"
          class="font-weight-regular grey--text text--darken-4"
          placeholder="eg. Egusi soup garnished with kpomo and okporoko, to satisfy your hunger and keep you wanting more."
         value="content"
        ></v-textarea>
          
          </v-flex>
          <v-flex xs12>
            <v-select
            class="font-weight-regular grey--text text--darken-4"
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
            class="font-weight-regular grey--text text--darken-4"
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
<v-btn   class="px-6"  color="orange" dark rounded>add</v-btn>
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