
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import vuetify from './plugins/vuetify'
import router from './router'


Vue.config.productionTip = false

new Vue({
  vuetify,
  router ,
  render: h => h(App)
}).$mount('#app')


