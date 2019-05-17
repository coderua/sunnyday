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

      <weather-forecast-periods
        :periods="weatherForecast.weatherForecastPeriodList"
        :day="selectedDay"
      />

      <weather-forecast-days
        :periods="weatherForecast.weatherForecastPeriodList"
        :activeDay="selectedDay"
        @selectedDay="selectDay"
      />
    </div>
  </div>
</template>

<script>
import Spinner from 'vue-simple-spinner';
import WeatherServiceFactory from '../services/WeatherServiceFactory';
import SearchField from './SearchField';
import WeatherForecastDays from './WeatherForecastDays';
import WeatherInfo from './WeatherInfo';
import WeatherForecastPeriods from './WeatherForecastPeriods';

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
    WeatherForecastPeriods,
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
      selectedDay: 0,
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

    selectDay(day) {
      this.selectedDay = day;
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

<style lang="scss" scoped>
  @import "../assets/css/media-query-mixin.scss";

  .weather-app {
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    padding: 20px;

    @include for-phone-only {
      padding: 10px;
      width: 100vw;
      margin: 10px;
    }

    @include for-desktop-up {
      padding: 50px;
      width: 50vw;
    }
  }
</style>
