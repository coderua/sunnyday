<template>
  <div class="weather-forecast-days">
      <weather-forecast-day-thumb
        v-for="forecast in dailyForecasts"
        :weather-forecast="forecast"
      />
  </div>
</template>

<script>
/**
 * WeatherDays component shows weather forecast days list.
 *
 * Custom tag `<weather-forecast-days />`
 *
 * @vuedoc
 * @exports components/WeatherDays
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

</style>
