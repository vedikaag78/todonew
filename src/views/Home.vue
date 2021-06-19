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
                  label="date"
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
            <!-- <v-btn class="mr-8 my-5" outlined>
              <v-container class="px-0" fluid>
                <v-switch v-model="switch1"> </v-switch>
              </v-container>
              Remind Me
            </v-btn> -->
             <v-menu offset-x  color="white my-7" cursor:pointer>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue-grey darken-2 white--text" v-bind="attrs" v-on="on">
                  Category
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="item in items" :key="item.title" cursor:pointer>
                  <v-list-item-title 
                    v-model="category"
                    @click="takeCat(item.title)"
                    >{{ item.title }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
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
      cat: null,
      time: null,
      item: Object,
      items: [{ title: "grocery" }, { title: "home" }, { title: "business" }],

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
  methods: {
    takeCat(n) {
      this.cat = n;
    },

    submit() {
      if (this.$refs.form.validate()) {
        console.log(this.title, this.description);
        this.loading = true;
        const task = {
          title: this.title,
          description: this.description,
          date: this.date,
          time: this.time,
          status: "to-do",
          category: this.cat,
        };
        db.collection("tasks")
          .add(task)
          .then(() => {
            console.log("added to db");
            this.loading = false;
            this.dialog = false;
            this.$emit("taskAdded");
            this.$router.push("/");
          });
      }
    },
  },
};
</script>
