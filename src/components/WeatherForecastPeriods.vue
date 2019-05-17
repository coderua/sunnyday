<template>
  <div class="weather-forecast-periods">
    <div
      v-for="weather in weathers"
      class="weather-forecast-periods__weather"
    >
      <div class="weather-forecast-periods__hours">{{ hours(weather.date) }}</div>
      <div class="weather-forecast-periods__icon"><i :class="[weather.weatherIcon]"></i></div>
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
      return this.periods.getDailyItems(this.day);
    },
  },
  methods: {
    hours(date) {
      const h = date.getHours();

      return h <= 9 ? `0${h}` : h;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/css/media-query-mixin.scss";

  .weather-forecast-periods {
    display: flex;
    justify-content: space-between;
    margin-top: 2em;
    margin-bottom: 1em;
    border-bottom: 1px solid white;
    overflow-x: auto;

    @include for-phone-only {
      border-bottom: none;
    }
  }

  .weather-forecast-periods__weather {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 1em;

    div {
      padding-bottom: .7em;

      @include for-phone-only {
        padding-bottom: .7em;
      }
    }
  }

  .weather-forecast-periods__hours {
    color: white;
  }

  .weather-forecast-periods__temp {
    color: white;
  }
</style>
