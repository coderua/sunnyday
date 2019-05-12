import Vue from 'vue';
import App from './App';
import ConfigService from './services/ConfigService';

Vue.config.productionTip = false;

Vue.use(ConfigService);

new Vue({
  render: h => h(App),
}).$mount('#app');
