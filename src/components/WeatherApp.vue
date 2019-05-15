<template>
  <div>
    <search-field
      @searchByCity="fetchWeather"
      @searchByLocation="fetchByLocation"
    />

    <weather-forecast-days
      v-if="loaded"
      :periods="weatherForecast.weatherForecastPeriodList" />
  </div>
</template>

<script>
import WeatherServiceFactory from '../services/WeatherServiceFactory';
import SearchField from './SearchField';
import WeatherForecastDays from './WeatherForecastDays';

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
    WeatherForecastDays,
    SearchField,
  },
  data() {
    return {
      city: 'Warsaw',
      currentWeather: null,
      /*
       * @type {WeatherForecast}
       */
      weatherForecast: {},
      loaded: false,
    };
  },
  created() {
    this.fetchByLocation();
  },
  methods: {
    fetchByLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.fetchWeather({ lat: position.coords.latitude, lon: position.coords.longitude });
        });
      }
    },
    fetchWeather(params) {
      // Get five days forecast for the location
      weatherService.getFiveDayWeather(params)
        .then((weatherForecast) => {
          this.weatherForecast = weatherForecast;
          this.loaded = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>

</style>
