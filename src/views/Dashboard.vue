<template>
  <div class="dashboard">
    <h3 class="mt-4  text-uppercase font-weight-bold"> my tasks</h3>  
    
    <v-container class="my-6">
       <v-card>
        <v-btn @click="deleteicon()"
          color="blue-grey"  class="ma-2 white--text float-right" dark v-on="on">
          Delete
        </v-btn>
       </v-card>
       <v-card>
        <v-btn
          color="blue-grey"  class="ma-2 white--text float-right" dark v-on="on">
          Edit
        </v-btn>
       </v-card>

      <v-menu
           class="mmm"
          transition="slide-y-transition"
           bottom
       >
       <template v-slot:activator="{ on, attrs }">
        <v-btn
         
            color="blue-grey"
            class="ma-2 white--text float-right"
          dark
          v-bind="attrs"
          v-on="on">
          Sort
        </v-btn>
        </template>
        <v-list>
          <v-list-item
           right @click="sortBy('task.date')" >
           <v-list-item-title>By Date</v-list-item-title>
          </v-list-item>
          <v-list-item
            right @click="SortTitle" >
            <v-list-item-title>By title</v-list-item-title>
            
           </v-list-item>

        </v-list>
     </v-menu>

    <br>
     <br>
     <br>






    
      <v-card  elevation="5" v-for="(task,index) in tasks" :key="index"
       outlined
       shaped
        tile flat class="pr-3" >
        <v-layout row wrap     :class="` pa-3 task ${task.status}`" >
            <v-flex xs12 md4 class="pb-3">
                <div subheading class=" grey--text"> task title </div>
                <div> {{ task.title }} </div>
            </v-flex>
            
            <v-flex xs12 md2>
                  <div subheading class=" grey--text"> due date </div>
                <div>{{ task.date }}</div>
            </v-flex>
             <v-flex xs4 md2>
               
                <div class="center"> 
                  <v-chip small :class="`ma-3 ${task.category} font-weight-bold`">{{ task.category }} </v-chip>
                </div>
            </v-flex>
            <v-flex xs6 md4 >
              <div class="right">   
                <v-chip right small :class="`${task.status} black--text  caption ma-3  pointer`"  
                  label outlined  @click="editstatus(index)" > 
                  {{ task.status }}
                </v-chip>
                
                <v-icon class=" pa-3 ml-10" right @click="deletetask(index)" color="black">mdi-delete </v-icon>
              </div> 
               
            </v-flex>
        
        </v-layout>
        
     </v-card>       
    </v-container>
  </div> 
  
</template>
<script>

export default{
    data(){
     return{
         task: '',
         presentstatuses:['to-do' , 'completed', 'inprogress', 'overdue'],
         content:{
             
              fontSize: '13px'
            },
         tasks:[
          {
          title:'Make a call to sam',
          status: 'to-do',
          category: 'business',
          date : '10.06.2021'
           },
          {
          title:'Take bruno for a walk',
          status:'overdue',
          category: 'home',
          date: '12.06.2021'
            }, 
          {
          title: 'Bring the cake ingredients',
          status:'inprogress',
          category: 'grocery',
          date: '14.06.2021'
           },
         {
          title: 'Visit Nanas place',
          status:'completed',
          category: 'home',
          date: '1.06.2021'
           },
       ]
      }
    },

    methods:{
      //  sortBy(title){
      //    this.tasks.sort((a,b) => a[title] < b[title] ? -1 : 1)
      //   },
    
       SortBy(Date){
        this.tasks.sort((a, b) => {
         if (Date.parse(a.date) > Date.parse(b.date)) {
            return 1 ;
          } else if (Date.parse(a.date) < Date.parse(b.date)) {
             return -1;
           } else {
             return 0;
            }
       })
      },
      deletetask(index){
       this.tasks.splice(index,1)
      },
      editstatus(index){
         let updatedindex = this.presentstatuses.indexOf(this.tasks[index].status);
         if(++updatedindex > 3)
          updatedindex = 0;
          this.tasks[index].status = this.presentstatuses[updatedindex]  ;

  },
    } 

}
   
</script>
<style >

.task.to-do{
  border-right: solid 7px greenyellow;
  
}
.task.completed{
  border-right: solid 7px green;
   
}
.task.inprogress{
  border-right: solid 7px blueviolet;
  
}
.task.overdue{
  border-right: solid 7px red;
   
}
.v-chip.to-do{
   border-color: greenyellow !important;

}
.v-chip.completed{
   border-color: green !important;
}
.v-chip.inprogress{
   border-color: blueviolet !important;
}
.v-chip.overdue{
   border-color: red !important;
}
.v-chip.grocery{
  background: #FFCCBC !important ;
}
.v-chip.home {
  background: #F8BBD0 !important;
}
.v-chip.business{
  background: #D1C4E9 !important;
}

</style>