<template>

<div class="container">
     <h1 class="text-center mt-5">MY TO-DO app</h1>
   
  
  
   <!--input-->
   <div class="form-group"> 
    <input v-model="task" class="form-control" placeholder="enter task"/>
    <button @click="submittask" type="submit" class="btn btn-primary">Submit</button>
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
      editedtask: -1,
      presentstatuses:['to-do' , 'completed', 'inprogress'],
      tasks:[
        {
          name:'Make a call to sam',
          status: 'to-do',
        },
        {
          name:'Take bruno for a walk',
          status:'completed',
        },
      ]
    }
  },
  methods:{
    submittask(){
      console.log(this.task)
      console.log('0')
      if(this.tasks.length == 0) return;
      if(this.editedtask != -1) {
         this.tasks[this.editedtask].name= this.task
        this.editedtask= -1;
      
      }else{
       
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pointer{
  cursor: pointer;
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
