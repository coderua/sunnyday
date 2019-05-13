<template>
  <search-city-field
    @searchByCity="fetchWeather"
    @searchByLocation="fetchByLocation"
  />
</template>

<script>
import WeatherServiceFactory from '../services/WeatherServiceFactory';
import SearchCityField from './SearchCityField';

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
    SearchCityField,
  },
  data() {
    return {
      city: 'Warsaw',
      currentWeather: null,
      fiveDayWeather: {},
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
      Promise.all([
        // Get current weather for the location
        weatherService.getCurrentWeather(params),
        // Get five days forecast for the location
        weatherService.getFiveDayWeather(params),
      ])
        .then(([currentWeather, fiveDayWeather]) => {
          this.currentWeather = currentWeather;
          this.fiveDayWeather = fiveDayWeather;
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
