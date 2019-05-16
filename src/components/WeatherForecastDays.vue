<template>
  <div class="weather-forecast-days">
      <weather-forecast-day-thumb
        v-for="forecast in dailyForecasts"
        :weather="forecast"
      />
  </div>
</template>

<script>
/**
 * WeatherForecastDays component shows weather forecast days list.
 *
 * Custom tag `<weather-forecast-days />`
 *
 * @vuedoc
 * @exports components/WeatherForecastDays
 */
import WeatherForecast from '../models/WeatherForecast';
import WeatherForecastDayThumb from './WeatherForecastDayThumb';

export default {
  name: 'WeatherForecastDays',
  components: { WeatherForecastDayThumb },
  props: {
    periods: {
      type: Object,
      required: true,
      default: () => new WeatherForecast(),
    },
    days: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    dailyForecasts() {
      return this.periods.getApproximateDaysWeatherForecast().items;
    },
  },
};
</script>

<style scoped>
  .weather-forecast-days {
    display: flex;
    justify-content: space-around;
  }
</style>
