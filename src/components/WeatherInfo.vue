<template>
  <div class="weather-info">
    <div class="weather-info__location">
      <span class="weather-info__location__city">{{ info.location }}</span>
      <span class="weather-info__location__date">{{ formattedDate }}</span>
      <span class="weather-info__location__description">{{ weather.description }}</span>
    </div>
    <div class="weather-info__icon"><i :class="weather.weatherIcon"></i></div>
    <div class="weather-info__temperature">
      {{ weather.temp }}&deg; <span class="weather-info__temperature__unit">{{ weather.temperatureUnit }}</span>
    </div>
  </div>
</template>

<script>
import WeatherForecast from '../models/WeatherForecast';
import formattedDate from '../helpers/formatted-date';
import WeatherForecastPeriod from '../models/WeatherForecastPeriod';

const formattedDateOptions = { weekday: 'long', hour: 'numeric' };

/**
 * WeatherInfo component shows weather forecast for selected period (hour).
 *
 * Custom tag `<weather-info />`
 *
 * @vuedoc
 * @exports components/WeatherInfo
 */
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
      type: Object,
      required: true,
      default: () => new WeatherForecastPeriod(),
    },
  },
  computed: {
    /**
     * Returns the weather for selected hourly period.
     *
     * @return {WeatherForecastPeriod}
     */
    weather() {
      return this.selectedPeriod;
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

<style lang="scss" scoped>
  @import "../assets/css/media-query-mixin.scss";

  .weather-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3.2em;
    margin-bottom: 3em;

    @include for-phone-only {
      margin-top: 2em;
      margin-bottom: 1.5em;
      flex-direction: column;
      text-align: center;
    }
  }

  .weather-info__location {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: 1.8em;
  }

  .weather-info__location__city {
    margin-bottom: 0.3em;

    @include for-phone-only {
      font-size: 1em;
      text-align: center;
    }
  }

  .weather-info__location__description {
    font-size: 0.6em;

    @include for-phone-only {
      text-align: center;
    }
  }

  .weather-info__location__date {
    font-size: 0.6em;
    @include for-phone-only {
      display: none;
    }
  }

  .weather-info__temperature {
    font-size: 4em;

    @include for-phone-only {
      margin-top: .4em;
    }

    .weather-info__temperature__unit {
      @include for-phone-only {
        display: none;
      }
    }
  }

  .weather-info__icon {
    @include for-phone-only {
      margin-top: 2em;
    }

    i {
      font-size: 5em;
    }
  }
</style>
