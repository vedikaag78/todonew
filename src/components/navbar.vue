<template >
 <nav>
  <v-toolbar max-height="58px" flat app color="grey">
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
        <span font-weight-ligh> Todo</span>
    </v-toolbar-title>
    <v-spacer> </v-spacer>
     <v-btn text color="white">
                <span>Sign out</span>
                <v-icon right>mdi-exit-to-app</v-icon>
            </v-btn>
     
  </v-toolbar>
  <v-card
    
    height= "800"
    width="256"
    class="d-flex justify-start"
  >
    <v-navigation-drawer app temporary v-model="drawer"   >
      <v-list-item>
          <v-list-item-content>
          <v-list-item-title class="text-h6">
            Welcome
          </v-list-item-title>
          <v-list-item-subtitle>
            have a great day!!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
         <v-list
           v-for="(item,index) in items"
          :key="index"
        dense
        nav
         >
          
           <v-list-item
         
           router :to="item.route"
            >
          
          
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
         
      </v-list>

      <!-- <v-list dense nav  v-for="(item,index) in items" :key="(item,index)">
                <v-list-item router :to="link.route">
                    <v-list-item-action>
                        <v-icon >{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title >
                         {{ link.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>-->
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
          { title: 'About', icon: 'mdi-help-box' , route: '/about' },
        ],
        right: null,
     }
   }
 }
</script>

<style>


</style>
