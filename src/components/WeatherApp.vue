<template>
  <div :class="['weather-app', {loading: loading}]">
    <div v-if="!loading">
      <search-field
        @searchByCity="fetchWeather"
        @searchByLocation="fetchByLocation"
      />

      <weather-info
        :info="weatherForecast"
        :selected-period="selectedPeriod"
      />

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
 * @emits showSpinner
 * @emits hideSpinner
 * @exports components/WeatherApp
 */
export default {
  name: 'WeatherApp',
  components: {
    WeatherForecastPeriods,
    WeatherInfo,
    SearchField,
    WeatherForecastDays,
  },
  data() {
    return {
      city: 'Warsaw',
      currentWeather: null,
      /**
       * @type {WeatherForecast}
       */
      weatherForecast: undefined,
      selectedDay: 0,
      /**
       * @type {WeatherForecastPeriod}
       */
      selectedPeriod: undefined,
      loading: true,
    };
  },
  created() {
    this.fetchByLocation();

    window.EventBus.$on('selectedDay', this.selectDay);
    window.EventBus.$on('selectedPeriod', this.selectPeriod);
  },
  beforeDestroy() {
    window.EventBus.$off('selectedDay', this.selectDay);
    window.EventBus.$off('selectedPeriod', this.selectPeriod);
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

          this.selectedPeriod = this.weatherForecast.weatherForecastPeriodList.getDailyItems(0)[0];
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.hideSpinner();
        });
    },

    selectDay({ day, weekDay }) {
      this.selectedDay = day;
      this.selectedPeriod = this.weatherForecast.weatherForecastPeriodList.getFirstDailyItem(day, weekDay);
    },

    selectPeriod(period) {
      this.selectedPeriod = period;
    },

    showSpinner() {
      if (!this.loading) {
        this.loading = true;
      }

      this.$emit('showSpinner');
    },
    hideSpinner() {
      if (this.loading) {
        this.loading = false;
      }

      this.$emit('hideSpinner');
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
      padding-top: 4em;
      width: 100vw;
      margin: 10px;
      box-shadow:none;
    }

    @include for-desktop-up {
      padding: 50px;
      width: 50vw;
    }

    &.loading {
      height: 0;
      padding: 0;
      margin: 0;
    }
  }
</style>
