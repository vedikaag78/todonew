<template>
  <div class="dashboard mt-0 ">
    <h3 class="mytask mt-0 text-uppercase font-weight-bold">my tasks</h3>

    <v-container class="my-6" fluid>

        <v-menu  transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue-grey"
            class="ma-2 white--text float-right"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Filter
          </v-btn>
        </template>
        <v-list>
          <v-list-item right @click="filterBy('grocery')">
            <v-list-item-title>Grocery</v-list-item-title>
          </v-list-item>
          <v-list-item right @click="filterBy('business')" v-on="on">
            <v-list-item-title >Business</v-list-item-title>
          </v-list-item>
           <v-list-item right @click="filterBy('home')" v-on="on">
            <v-list-item-title >Home</v-list-item-title>
          </v-list-item>
        </v-list> 
      </v-menu> 
    
       <v-menu  transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue-grey"
            class="ma-2 white--text float-right"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Sort
          </v-btn>
        </template>
        <v-list>
          <v-list-item right @click="SortBy('date')">
            <v-list-item-title>By Date</v-list-item-title>
          </v-list-item>
          <v-list-item right @click="sortBy('title')" v-on="on">
            <v-list-item-title >By title</v-list-item-title>
          </v-list-item>
        </v-list> 
      </v-menu> 

      <br />
      <br />
      <br />

      <template>
        <v-row no-gutters >
          <v-col
            elevation="5"
            v-for="(task, index) in tasks"
            :key="task['.key']"
            :cols="task.flex"
            lg="3"
            sm="12"
            
          >
          
            <v-card
              elevation="5"
              :class="`ma-3  ${task.category} rounded-lg  font-weight-bold`"
            >
              <v-card-text>
                <div>Your Task</div>

                <div class="text-h6 text--primary">
                  {{ task.title }}
                </div>

                <div class="text--primary">{{ task.date }}<br /></div>

                <div align="center" class="float-left">
                  <v-chip
                    small
                    outlined
                    :class="`ma-3 ${task.category} font-weight-bold`"
                    >{{ task.category }}
                  </v-chip>
                </div>

                <div align="center" class="float-left">
                  <v-chip
                    right
                    small
                    :class="`${task.status} black--text  caption ma-3  pointer`"
                    label
                    outlined
                    @click="editstatus(index)"
                  >
                    {{ task.status }}
                  </v-chip>
                </div>
                <div align="center" class="float-left">
                  <v-btn fab dark small color="black" class="mx-3 my-3">
                    <v-icon small dark @click="deletetask(task.id)"
                      >mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
                <div align="center">
                  
                   <v-btn
                    class="mx-3 my-3"
                    fab
                    dark
                    small
                    color="black"
                    @click="editTask(task.id)"
                  >
                    <v-icon small dark> mdi-pencil</v-icon>
                  </v-btn> 
                </div>
              </v-card-text>
              <v-card-actions>
                <div>
                  <v-btn
                    text
                    color="black"
                    @click="reveal = true"
                    align="center"
                  >
                    Description
                  </v-btn>
                </div>
              </v-card-actions>

              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  color="brown lighten-5"
                  class="
                    transition-fast-in-fast-out
                    v-card--reveal
                    d-flex
                    align-center
                  "
                  style="height: 100%"
                >
                  <v-card-text class="pb-0">
                    <div class="text-h6 text--primary sub-heading">
                      {{ task.description }}
                    </div>
                  </v-card-text>
                  <v-card-actions class="pt-0 d-flex align-end">
                    <v-btn
                      text
                      color="teal accent-4"
                      @click="reveal = false"
                      class="d-flex align-end"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
      </v-container >
  </div>
</template>

   
<script>
import db from "@/Db";

export default {
 
  data() {
    return {
      task: "",
      reveal: false,
      presentstatuses: ["to-do", "completed", "inprogress", "overdue"],
      content: {
        fontSize: "13px",
      },
      tasks: [],
    };
  },
  mounted() {
  
    db.collection("tasks").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        let task = change.doc.data();
        // let id = task.id;
        console.log(task)
        if (change.type === "added") {
          this.tasks.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      
        if (change.type === "modified") {
          this.tasks.push({
            ...change.doc.data(),
          });
        }
        if (change.type === "moved"){
           this.tasks.push({
            ...change.doc.data(),
          });
        }
      });
    });
  },

  methods: {

     filterBy(category){
      let temp_task = this.tasks ;
      // console.log(temp_task);
      temp_task.filter((task)=>{return task.category ==  category.toString()});
      // console.log(temp_task);
      return temp_task;

    },
     sortBy(title){
       console.log(this.tasks);
     this.tasks.sort((a,b) => a[title] < b[title] ? -1 : 1)
    //  db.collection("tasks").doc(title).orderByValue('title');
      },
      

    SortBy(date) {
      this.tasks.sort((a,b) => a[date] < b[date] ? -1 : 1)
    },
    deletetask(id) {
      db.collection("tasks").doc(id).delete();
       let index = this.tasks.findIndex((task) => task.id === id);
       this.tasks.splice(index, 1);
    },
    editTask(id) {
      let route = "/edit/" + id;
      this.$router.push(route);
    },

    editstatus(index) {
      let updatedindex = this.presentstatuses.indexOf(this.tasks[index].status);
      if (++updatedindex > 3) updatedindex = 0;
      this.tasks[index].status = this.presentstatuses[updatedindex];
    },
  },

};
</script>
<style >
.dashboard{
  height: 100vh;
  background-image: linear-gradient(to bottom, whitesmoke , #acb3f1  );
  overflow-y: scroll;
}
.mytask{
  transform:translateY(40px);
}
.float-left {
  float: left;
  width: 50%;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.v-chip.to-do {
  border-color: greenyellow !important;
}
.v-chip.completed {
  border-color: green !important;
}
.v-chip.inprogress {
  border-color: blueviolet !important;
}
.v-chip.overdue {
  border-color: red !important;
}
.v-chip.grocery {
  background: #ffe082 !important ;
}
.v-chip.home {
  background: #ffab91 !important;
}
.v-chip.business {
  background: #b2ebf2 !important;
}
.v-card.grocery {
  background: #ffe082 !important ;
}
.v-card.home {
  background: #ffab91 !important;
}
.v-card.business {
  background: #b2ebf2 !important;
}
</style>
