import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ConfigService from './services/ConfigService';

Vue.config.productionTip = false;

Vue.use(ConfigService);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
