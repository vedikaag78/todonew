<template>
  <div class="home">
    <v-card outlined shaped tile flat class="pa-6 my-6 mx-6" elevation="2">
      <v-card-title>
        <h3 class="mt-4 font-weight-bold">Create the task</h3>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            label="task title"
            counter="10"
            :rules="nameRules"
          >
          </v-text-field>

          <v-text-field
            v-model="description"
            label="task description"
            :rules="nameRules"
          >
          </v-text-field>

          <v-row rows="6" sm="12" md="4">
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
                  v-model="date"
                  label="Picker in menu"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-row>
          <v-row rows="6" sm="12">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Remind me"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                @click:minute="$refs.menu2.save(time)"
              >
              </v-time-picker>
            </v-menu>
          </v-row>

          <v-card-actions>
            <v-btn class="ma-2" outlined>
              <v-container class="px-0" fluid>
                <v-switch v-model="switch1"> </v-switch>
              </v-container>
              Remind Me
            </v-btn>
          </v-card-actions>
          <v-card-text>
            <v-layout row wrap class="pa-3">
              <v-flex xs12 md3 class="pb-3">
                <div class="pa-3 text-sm-h6">Category</div>
              </v-flex>
              <v-flex xs4 md3 class="pb-3">
                <v-btn
                  color="#F8BBD0"
                  class="ma-2 md purple--text font-weight-bold"
                >
                  Home
                </v-btn>
              </v-flex>
              <v-flex xs4 md3 class="pb-3">
                <v-btn
                  class="ma-2 brown--text font-weight-bold"
                  color="#FFCCBC"
                >
                  Grocery
                </v-btn>
              </v-flex>
              <v-flex xs4 md3 class="pb-3">
                <v-btn
                  color="#D1C4E9"
                  class="ma-2 md font-weight-bold deeppurple--text"
                >
                  Business
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-btn class="success mr-4" @click="submit()" :loading="loading">
              submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>




<script>
import db from "@/Db";
// import format from 'date-fns/format'
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      title: "",
      description: "",
      time: null,

      nameRules: [
        (v) => !!v || "field is required",
        (v) => (v && v.length >= 4) || "must be more than 4 characters",
      ],
      loading: false,
      dialog: false,
      switch1: true,
      valid: true,
      modal2: false,
    };
  },
  //  computed:{
  //  formatteddate(){
  //   return this.date ? format(this.date, 'MMM DD YYYY') :''
  //   }
  //   },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.title, this.description);
        this.loading = true;
        const task = {
          title: this.title,
          description: this.description,
          date: this.date,
          time: this.time,
          status: "ongoing",
        };
        db.collection("tasks")
          .add(task)
          .then(() => {
            console.log("added to db");
            this.loading = false;
            this.dialog = false;
            this.$emit("taskAdded");
          });
      }
    },
  },
};
</script>
