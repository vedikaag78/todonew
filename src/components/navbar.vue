<template >
 <nav>
  <v-toolbar max-height="58px" flat app color="black">
    <v-toolbar-side-icon class="black--text"></v-toolbar-side-icon>
     <v-btn @click="drawer= !drawer" >
      <v-icon
       justify-around
      color="black lighten-4"
      >
       fa fa-bars 
      </v-icon> 
     </v-btn>   
    <v-toolbar-title class="text-uppercase white--text" >
        My
        <span font-weight-light> Todo</span>
    </v-toolbar-title>
    <v-spacer> </v-spacer>
     <v-btn text color="white">
                <span>Sign out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
     
  </v-toolbar>
  <v-card>
    <v-navigation-drawer app v-model="drawer" offset-y temporary  >
      <v-layout column align-center>
        <v-flex class="mt-4">
          <v-avatar size="100">
            <img src="/1.jpg" alt="sorry">
          </v-avatar>
          <p class="subheading ma-2">  Vedika </p>
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
         >
          
          <v-list-item router :to="item.route"> 
            
         
          
             <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
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
          { title: 'Dashboard', icon: 'mdi-pencil' , route: '/' },
          { title: 'Home', icon: 'mdi-home' , route: '/home'},
          { title: 'Calender', icon: 'mdi-help-box' , route: '/calender' },
        ],
        right: null,
     }
   }
 }
</script>

<style>
.nav{
  position: relative;
}

</style>
