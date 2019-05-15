<template>
  <div class="weather-forecast-days">
    Date {{ date }}
    Temperature {{ weatherForecast.temp }}
  </div>
</template>

<script>
/**
 * WeatherDays component shows weather thump for a day
 *
 * Custom tag `<weather-forecast-day-thumb />`
 *
 * @vuedoc
 * @exports components/WeatherForecastDayThumb
 */
import WeatherForecast from '../models/WeatherForecast';

export default {
  name: 'WeatherForecastDayThumb',
  props: {
    weatherForecast: {
      type: Object,
      required: true,
      default: () => new WeatherForecast(),
    },
    day: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    date() {
      return (new Date(this.weatherForecast.dateTime * 1000)).toDateString();
    },
  },
};
</script>

<style scoped>

</style>
