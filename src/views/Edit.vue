<!--
<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template >
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
       
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>-->



<template>
  <v-container>
     <v-row
        align="center"
        class="mx-7 mb-5 mt-2"
      >
    <v-card class="mx-auto mb-12 mt-7 " max-width="500px" max-height="700px" >
      <div class="card-header">
        <h3 class="mt-4 font-weight-dark">Edit the Task</h3>
      </div>
      <div class="card-body">
        <v-form>
          <div class="form-group">
            <label class=" text-lg-subtitle-2 mt-5 mb-1" >task title</label>
            <input type="text" class="form-control" v-model="task.title" />
          </div>
          <div class="form-group">
            <div>
            <label class=" text-lg-subtitle-2  mt-5 mb-1">task description</label>
            <input
              type="text"
              class="form-control"
              v-model="task.description"
            />
               </div>
            <div class="form-group">
              <label class=" text-lg-subtitle-2  mt-7 mb-1">task status </label>
              <input type="text" class="form-control" v-model="task.status" />
            </div>
            <div>
               <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="task.date"
                  label="due date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                > </v-text-field>
                
              </template>
              <v-date-picker v-model="task.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
              </div>
            <v-btn @click="updateTask" color="success" dark> Submit </v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
   </v-row>
  </v-container>
</template>









<script>
import db from "@/Db";

export default {
  data() {
    return {
      dialog: false,
      task: {
        title: null,
        description: null,
        date: null,
      },
    };
  },
  created() {
    var docRef = db.collection("tasks").doc(this.$route.params.id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.task = {
            title: doc.data().title,
            description: doc.data().description,
            status: doc.data().status,
            date: doc.data().date ,
          };
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },

  methods: {
    updateTask() {
      db.collection("tasks")
        .doc(this.$route.params.id)
        .update(this.task)
        .then(() => {
          console.log("updated");
          this.$router.push('/')
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
   },
};
</script>
<style scoped>
</style> 

