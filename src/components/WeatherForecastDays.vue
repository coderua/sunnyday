<template>
  <div class="weather-forecast-days">
      <weather-forecast-day-thumb
        v-for="(forecast, day) in dailyForecasts"
        :activeDay="activeDay"
        :weather="forecast"
        :day="day"
        :key="forecast.dateTime"
        @selectedDay="selectedDay"
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
 * @emits selectedDay
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
    activeDay: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dailyForecasts() {
      return this.periods.getApproximateDaysWeatherForecast().items.slice(0, 5);
    },
  },
  methods: {
    /**
     * Notify parent component about selecting a new day
     *
     * @emits selectedDay
     * @param {Number} day
     */
    selectedDay(day) {
      this.$emit('selectedDay', day);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/css/media-query-mixin.scss";

  .weather-forecast-days {
    display: flex;
    justify-content: space-around;

    @include for-phone-only {
      flex-direction: column;
    }
  }
</style>
