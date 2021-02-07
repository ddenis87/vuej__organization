import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueMask from './plugins/vmask';
import VCalendar from './plugins/vcalendar';

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  VueMask,
  VCalendar,
  render: h => h(App)
}).$mount('#app')
