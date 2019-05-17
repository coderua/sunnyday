<template>
  <div
    class="weather-forecast-day-thumb"
    :class="{ '--active': activeDay === day }"
    @click="selectDay(day)"
  >
    <div class="weather-forecast-day-thumb__day-name">{{ dayName }}</div>

    <div class="weather-forecast-day-thumb__icon"><i :class="[weather.weatherIcon]"></i></div>

    <div class="weather-forecast-day-thumb__temp-max">
      {{ weather.tempMax }}&deg; {{ weather.temperatureUnit }}
    </div>

    <div class="weather-forecast-day-thumb__temp-min">
      {{ weather.tempMin }}&deg; {{ weather.temperatureUnit }}
    </div>

  </div>
</template>

<script>
/**
 * WeatherDays component shows weather thump for a day
 *
 * Custom tag `<weather-forecast-day-thumb />`
 *
 * @vuedoc
 * @emits selectedDay
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
      default: 0,
    },
    activeDay: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    dayName() {
      return formattedDate(this.weather.date, { weekday: 'short' });
    },
  },
  methods: {
    /**
     * Notify parent component about selecting a new day
     *
     * @emits selectedDay
     * @param {Number} day
     */
    selectDay(day) {
      this.$emit('selectedDay', day);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/css/media-query-mixin.scss";

  .weather-forecast-day-thumb {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: .9em 2em;

    div {
      margin-bottom: .3em;
    }

    @include for-phone-only {
      flex-direction: row;
      padding: .2em 1em;
    }
  }

  .weather-forecast-day-thumb__day-name {
    @include for-phone-only {
      text-align: left;
      width: 20vw;
    }
  }

  .weather-forecast-day-thumb.--active {
    border: 1px solid #e9e9e9;
    border-radius: 1px;
  }

  .weather-forecast-day-thumb__temp-max {
    color: #924da3;
  }

  .weather-forecast-day-thumb__temp-min {
    color: #3f76fe;
  }
</style>
