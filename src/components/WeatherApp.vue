<template>
  <div class="weather-app">
    <spinner
      v-show="loading"
      size="huge"
    />

    <div v-if="!loading">
      <search-field
        @searchByCity="fetchWeather"
        @searchByLocation="fetchByLocation"
      />

      <weather-info :info="weatherForecast"/>

      <weather-forecast-days :periods="weatherForecast.weatherForecastPeriodList" />
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import WeatherServiceFactory from '../services/WeatherServiceFactory';
import SearchField from './SearchField';
import WeatherForecastDays from './WeatherForecastDays';
import WeatherInfo from './WeatherInfo';

const weatherService = WeatherServiceFactory.create();

/**
 * WeatherApp main container component
 *
 * Custom tag `<weather-app />`
 *
 * @vuedoc
 * @listens searchByCity
 * @listens searchByLocation
 * @exports components/WeatherApp
 */
export default {
  name: 'WeatherApp',
  components: {
    WeatherInfo,
    Spinner,
    SearchField,
    WeatherForecastDays,
  },
  data() {
    return {
      city: 'Warsaw',
      currentWeather: null,
      /*
       * @type {WeatherForecast}
       */
      weatherForecast: {},
      loading: true,
    };
  },
  created() {
    this.fetchByLocation();
  },
  methods: {
    fetchByLocation() {
      if ('geolocation' in navigator) {
        this.showSpinner();

        navigator.geolocation.getCurrentPosition((position) => {
          this.fetchWeather({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
      }
    },
    fetchWeather(params) {
      this.showSpinner();

      // Get five days forecast for the location
      weatherService.getFiveDayWeather(params)
        .then((weatherForecast) => {
          this.weatherForecast = weatherForecast;
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.hideSpinner();
        });
    },
    showSpinner() {
      if (!this.loading) {
        this.loading = true;
      }
    },
    hideSpinner() {
      if (this.loading) {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
