import Vue from 'vue';
import App from './App';
import ConfigService from './services/ConfigService';

Vue.config.productionTip = false;

/**
 * Event Bus instance (an empty Vue.js instance for non Parent-Child Communication).
 *
 * @example of using
 *          Fire an event:         EventBus.$emit('some-event', data)
 *          Listen for an event:   EventBus.$on('some-event', callback)
 *          Remove Event Listener: EventBus.$off('some-event', callback)
 * @type {Vue}
 */
window.EventBus = new Vue();

Vue.use(ConfigService);

new Vue({
  render: h => h(App),
}).$mount('#app');
