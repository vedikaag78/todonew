<template>


<div class="container">
  <nav class="navbar navbar-expand-md navbar-dark">
    <a href="#" class="navbar-brand">My-Todo</a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
            <a href="#" class="nav-item nav-link active">Home</a>
            <a href="#" class="nav-item nav-link">Calender</a>
            <a href="#" class="nav-item nav-link">New</a>
        </div>
        <form class="form-inline ml-auto">
            <input type="text" class="form-control mr-sm-2" placeholder="Search Task">
            <button type="submit" 
            
            class="btn btn-outline-light">Search</button>
        </form>
    </div>
</nav>









     <h1 class="text-head mt-5">MY TO-DO app</h1>
   
  
  
   <!--input-->
   <div class="form-group"> 
    <input v-model="task" class="form-control" placeholder="enter task"/>
    <button @click="submittask" type="submit" class="btn btn-primary">Submit</button>
    <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Category
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Grocery</a>
    <a class="dropdown-item" href="#">Business</a>
    <a class="dropdown-item" href="#">Home</a>
    </div>
    </div>
  </div>
   <!--task display-->
   
     <table class="table table-bordered mt-6" >
  <thead>
    <tr>
      <th scope="col">TASK</th>
      <th scope="col">STATUS</th>
      <th scope="col">D</th>
      <th scope="col">E</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(task,index) in tasks" :key="index">
      <th scope="row">{{ task.name }}</th>
      <td>
        <span @click="editstatus(index)" class="pointer">
        {{ task.status }}
        </span>
      </td>
      
      <td>
        <div class="text-center" @click="deletetask(index)">
            <i class="fa fa-trash"></i>
        </div>      
      </td>
      <td>
        <div class="text-center" @click="edittask(index)">
         <i class="fas fa-pencil-alt"></i>
         </div>   
      </td>
    </tr>
   
    
  </tbody>
</table>
<br>
<br>
<br>
<table class="table table-sm ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category</th>
      <th scope="col">Tasks</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td @click="CategoryN('H')">Home</td>
     
    <tr>
      <th scope="row">2</th>
      <td @click="CategoryName('B')">Business</td>
       <td v-for="(n,index) in nc" :key="index">
       {{ nc.name }}
    </td>
     
    </tr>
     <tr>
      <th scope="row">3</th>
      <td @click="CategoryName('G')">Grocery</td>
       <td v-for="(t, index) in items" :key="index">
       {{ items.name }}
    </td>
     
    </tr>
    
  </tbody>
</table>
</div>

</template> 


<script>
export default {

  props: {
    msg: String
  },
  data(){
    return{
      task: '',
      items: Object,
      
      editedtask: -1,
      presentstatuses:['to-do' , 'completed', 'inprogress'],
      tasks:[
        {
          name:'Make a call to sam',
          status: 'to-do',
          category: 'Business',
        },
        {
          name:'Take bruno for a walk',
          status:'to-do',
          category: 'Home',
        },
        {
          name: 'Bring the cake ingredients',
          status:'inprogress',
          category: 'Grocery',
        },
      ]
    }
  },

 





  methods:{
    submittask(){
      
      if(this.tasks.length == 0) return;
      if(this.editedtask != -1) {
         this.tasks[this.editedtask].name= this.task
        this.editedtask= -1;
      
      }else{
       if(this.tasks.length == 0) return;
        this.tasks.push({
        name:this.task,
        status:'to-do',
      }) ;
      }
      this.task='';

  },
  deletetask(index){
    this.tasks.splice(index,1)
  },
  edittask(index){
    this.task= this.tasks[index].name ;
    this.editedtask = index;
  },
  editstatus(index){
   let updatedindex = this.presentstatuses.indexOf(this.tasks[index].status);
   if(++updatedindex > 2)
     updatedindex = 0;
   this.tasks[index].status = this.presentstatuses[updatedindex]  ;

  },
  
  
}

 





};
</script>

<style>
.text-head{
  color: antiquewhite;
  align-items: center;
}
.button{
  
  padding: 10px 22px;
  background:white;

  

}
.pointer{
  cursor: pointer;
}
.table{
  background: #8ec8e9;
  background-blend-mode: soft-light;
  margin-bottom: 5rem;
}
.container{
 background: #164b69;
 
}
.form-group{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 10px;
  
  padding: 10px;
}
.form-control {
  grid-column: 1 / 5;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>



 <!--CategoryName(n){
    var n ;
    for(t in tasks){
      if(t.category==n)
      this.items.push(t);
    }
    
  },-->

  <!--  computed: {
        CategoryN(n) {
            var nc = [];
            var i ;
            for (i = 0; i < this.tasks.length; i++) {
              if (tasks[i].category==n) {
                 nc[i] = { index: i, name: i};
              }
              }
               
            return nc;
        }
    },

    CategoryName() {
    var i ;
     console.log(this.CategoryN); 
     for (i = 0; i < this.CategoryN.length; i++) {
      console.log(this.CategoryN[i]);  
     }
  }, -->

