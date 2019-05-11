<template>
  <div class="home">
    <search-city-field @newSearch="searchWeather"></search-city-field>
  </div>
</template>

<script>
import SearchCityField from './SearchCityField.vue';
import WeatherServiceFactory from '../services/WeatherServiceFactory';

const weatherService = WeatherServiceFactory.create();

export default {
  name: 'home',
  components: {
    SearchCityField,
  },
  data() {
    return {
      city: 'Warsaw',
      currentWeather: null,
    };
  },
  created() {
    weatherService.getWeather(this.city).then((weather) => {
      this.currentWeather = weather;
    });
  },
  methods: {
    searchWeather({ query }) {
      console.log(query);
    },
  },
};
</script>
