
<template>
  <v-app grey >
    <navbar />
    <v-content class="mx-5">
     <router-view>
     </router-view>
    </v-content>
  </v-app>
</template>

<script>
import navbar from './components/navbar.vue';
export default {
  name: 'App',

  components: {
   
    navbar,
  },

  data: () => ({
    //
  }),
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>