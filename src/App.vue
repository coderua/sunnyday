<template>
  <div id="app">
    <weather-app></weather-app>
  </div>
</template>

<script>
import WeatherApp from './components/WeatherApp';

// Require application style
require('./assets/css/style.css');

/**
 * App component is a main application component.
 *
 * @vuedoc
 * @exports App
 */
export default {
  name: 'App',
  components: {
    WeatherApp,
  },
};
</script>
