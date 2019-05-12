<template>
  <search-city-field @newSearch="searchWeather"></search-city-field>
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
    Promise.all([
      // Get current weather for the location
      weatherService.getCurrentWeather({ q: this.city }),
      // Get five days forecast for the location
      weatherService.getFiveDayWeather({ q: this.city }),
    ])
      .then(([currentWeather, fiveDayWeather]) => {
        this.currentWeather = currentWeather;
        this.fiveDayWeather = fiveDayWeather;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    searchWeather(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>

</style>
