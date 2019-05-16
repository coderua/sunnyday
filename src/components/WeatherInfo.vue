<template>
  <div class="weather-info">
    <div class="weather-info__location">
      <span class="weather-info__location__city">{{ info.location }}</span>
      <span class="weather-info__location__date">{{ formattedDate }}</span>
    </div>
    <div class="weather-info__icon"><i :class="weather.weatherIcon"></i></div>
    <div class="weather-info__temperature">{{ weather.temp }}&deg; {{ weather.temperatureUnit }}</div>
  </div>
</template>

<script>
/**
 * WeatherInfo component shows weather forecast for selected period (hour).
 *
 * Custom tag `<weather-info />`
 *
 * @vuedoc
 * @exports components/WeatherInfo
 */
import WeatherForecast from '../models/WeatherForecast';
import formattedDate from '../helpers/formatted-date';

const formattedDateOptions = { weekday: 'long', hour: 'numeric' };

export default {
  name: 'WeatherInfo',
  props: {
    /*
     * @type {WeatherForecast}
     */
    info: {
      type: Object,
      required: true,
      default: () => new WeatherForecast(),
    },
    selectedPeriod: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    /**
     * Returns the weather for selected hourly period.
     *
     * @return {WeatherForecastPeriod}
     */
    weather() {
      console.log(this.info.weatherForecastPeriodList);
      return this.info.weatherForecastPeriodList.items[this.selectedPeriod];
    },

    /**
     * Returns Formatted date for the Weather Forecast period.
     *
     * @return {String}
     */
    formattedDate() {
      return formattedDate(this.weather.date, formattedDateOptions);
    },
  },
};
</script>

<style scoped>
  .weather-info {
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
    margin-bottom: 2em;
  }

  .weather-info__location {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .weather-info__icon i {
    font-size: 66px;
  }
</style>
