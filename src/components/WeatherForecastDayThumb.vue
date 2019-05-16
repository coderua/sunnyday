<template>
  <div class="weather-forecast-days">
    <div class="weather-forecast-days__day-name">{{ dayName }}</div>
    <i :class="[weather.weatherIcon]"></i>
    <div class="weather-forecast-days__temp-max">{{ weather.tempMax }}&deg; {{ weather.temperatureUnit }}</div>
    <div class="weather-forecast-days__temp-min">{{ weather.tempMin }}&deg; {{ weather.temperatureUnit }}</div>
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
import formattedDate from '../helpers/formatted-date';
import WeatherForecastPeriod from '../models/WeatherForecastPeriod';

export default {
  name: 'WeatherForecastDayThumb',
  props: {
    weather: {
      type: Object,
      required: true,
      default: () => new WeatherForecastPeriod(),
    },
    day: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    dayName() {
      return formattedDate(this.weather.date, { weekday: 'short' });
    },
  },
};
</script>

<style scoped>
  .weather-forecast-days {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .weather-forecast-days__temp-max {
    color: #924da3;
  }

  .weather-forecast-days__temp-min {
    color: #3f76fe;
  }
</style>
