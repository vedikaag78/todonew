<template >
 <nav>
  
    
  <v-toolbar max-height="58px" flat app color="black">
    <v-toolbar-side-icon class="black--text   mr-0"></v-toolbar-side-icon>
     <v-btn small   @click="drawer= !drawer" class="mx-4 "  justify-start >
      <v-icon
       
      color="black lighten-4 "
      >
       fa fa-bars 
      </v-icon> 
       </v-btn>   
       
    <v-toolbar-title class="text-uppercase white--text ml-5" >
        My
        <span font-weight-light> Todo</span>
    </v-toolbar-title>
    
     <!-- <v-btn text color="white">
                <span>Sign out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
      -->
  </v-toolbar>
  <v-card>
    <v-navigation-drawer app v-model="drawer" offset-y temporary  >
      <v-layout column align-center>
        <v-flex class="mt-4">
          <v-avatar size="100">
            <img src="/1.jpg" alt="sorry">
          </v-avatar>
          <p class="subheading ma-2">  USER </p>
          <p class="subheading ">  </p>
           <p class="subheading" >  
             Welcome
         have a great day!!</p>
        </v-flex>
      </v-layout>      
      <!-- <v-list-item>
          <v-list-item-content>
          <v-list-item-title class="text-h6">
           
          </v-list-item-title>
          <v-list-item-subtitle>
          
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      <v-divider></v-divider>
        <v-list
           v-for="(item,index) in items"
          :key="index"
        dense
        nav
        class="font-weight-bold"
         >
          
          <v-list-item  router :to="item.route"> 
            
         
          
             <v-list-item-icon>
                <v-icon >{{ item.icon }}</v-icon>
             </v-list-item-icon>

             <v-list-item-content>
               <v-list-item-title >{{ item.title }}</v-list-item-title>
             </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

  </v-card>
 </nav>
</template>
<script>
 export default{
   data(){
     return{
       drawer: false ,
         item: '',
        items : [
          { title: 'Dashboard', icon: 'mdi-database' , route: '/' },
          { title: 'Create', icon: 'mdi-pencil' , route: '/home'},
         
        ],
        right: null,
        snackbar: false,
     }
   }
 }
</script>

<style>
.nav{
  position: relative;
}

</style>
