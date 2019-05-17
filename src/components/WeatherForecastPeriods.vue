<template>
  <div class="weather-forecast-periods">
    <div
      v-for="weather in weathers"
      class="weather-forecast-periods__weather"
    >
      <div class="weather-forecast-periods__hours">{{ hours(weather.date) }}</div>
      <i :class="[weather.weatherIcon]"></i>
      <div class="weather-forecast-periods__temp">{{ weather.temp }}&deg;</div>
    </div>
  </div>
</template>

<script>
/**
 * WeatherForecastPeriods component shows weather for periods (hours)
 *
 * Custom tag `<weather-forecast-periods />`
 *
 * @vuedoc
 * @exports components/WeatherForecastPeriods
 */
import WeatherForecastPeriodList from '../models/WeatherForecastPeriodList';

export default {
  name: 'WeatherForecastPeriods',
  props: {
    day: {
      type: Number,
      default: undefined,
    },
    /*
     * @type {WeatherForecast}
     */
    periods: {
      type: Object,
      required: true,
      default: () => new WeatherForecastPeriodList(),
    },
  },
  computed: {
    weathers() {
      console.log('====> ', this.day);
      return this.periods.getDailyItems(this.day);
    },
  },
  methods: {
    hours(date) {
      const h = date.getHours();
      const m = date.getMinutes();

      const hStr = h <= 9 ? `0${h}` : h;
      const mStr = m <= 9 ? `0${m}` : m;

      return `${hStr}:${mStr}`;
    },
  },
};
</script>

<style scoped>
  .weather-forecast-periods {
    display: flex;
    justify-content: space-between;
    margin-top: 2em;
    margin-bottom: 1em;
    border-bottom: 1px solid white;
    overflow-x: auto;
  }

  .weather-forecast-periods__weather {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .weather-forecast-periods__hours,
  .weather-forecast-periods__temp {
    color: white;
  }
</style>
