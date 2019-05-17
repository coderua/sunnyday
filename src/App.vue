<template>
  <div id="app">
    <spinner
      v-show="loading"
      size="huge"
    />

    <weather-app
      @showSpinner="showSpinner"
      @hideSpinner="hideSpinner"
    />
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import WeatherApp from './components/WeatherApp';

// Require application style
require('./assets/css/style.css');

/**
 * App component is a main application component.
 *
 * @vuedoc
 * @listens showSpinner
 * @listens hideSpinner
 * @exports App
 */
export default {
  name: 'App',
  data() {
    return {
      loading: true,
    };
  },
  components: {
    Spinner,
    WeatherApp,
  },
  methods: {
    showSpinner() {
      console.log('showSpinner');
      if (!this.loading) {
        this.loading = true;
      }
    },
    hideSpinner() {
      console.log('hideSpinner');

      if (this.loading) {
        this.loading = false;
      }
    },
  },
};
</script>
