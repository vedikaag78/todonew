
<template>
  <v-app>
    <navbar />
    <v-content >
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
  margin-top: 0px;
  background: whitesmoke;
}

</style>