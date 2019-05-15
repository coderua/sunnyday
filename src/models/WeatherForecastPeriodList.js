import WeatherForecastPeriod from './WeatherForecastPeriod';

/**
 * WeatherForecastHoursList is a collection class
 * for Weather Forecast divided on some amount of hours.
 *
 * @class
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class WeatherForecastPeriodList {
  /**
   * Weather Forecast Periods
   *
   * @type {WeatherForecastPeriod[]}
   */
  #items = [];

  /**
   * WeatherForecastPeriodsList constructor.
   *
   * @param {WeatherForecastPeriod[]} items
   */
  constructor(items = []) {
    this.items = items;
  }

  /**
   *
   * @return WeatherForecastPeriodList
   */
  getApproximateDaysWeatherForecast() {
    const result = new WeatherForecastPeriodList();

    if (!this.length) {
      return result;
    }

    /**
     * Sums two Weather cast periods
     *
     * @param {Object} prevPeriod
     * @param {Object} newPeriod
     * @return {Object}
     */
    const sumPeriodsData = (prevPeriod, newPeriod) => {
      return {
        dateTime: prevPeriod.dateTime,
        temp: prevPeriod.temp + newPeriod.temp,
        tempMin: prevPeriod.tempMin + newPeriod.tempMin,
        tempMax: prevPeriod.tempMax + newPeriod.tempMax,
        cloudiness: prevPeriod.cloudiness + newPeriod.cloudiness,
        windSpeed: prevPeriod.windSpeed + newPeriod.windSpeed,
        humidity: prevPeriod.humidity + newPeriod.humidity,
        condition: prevPeriod.condition + newPeriod.condition,
        weatherIcon: '',
      };
    };

    /**
     * Average Weather Forecast Period data
     *
     * @param {Object} periodData
     * @param {Number} mergedFromPeriodsCount
     * @return {Object}
     */
    const averagePeriod = (periodData, mergedFromPeriodsCount) => {
      const result = {
        dateTime: periodData.dateTime,
        temp: Math.round(periodData.temp / mergedFromPeriodsCount),
        tempMin: Math.round(periodData.tempMin / mergedFromPeriodsCount),
        tempMax: Math.round(periodData.tempMax / mergedFromPeriodsCount),
        cloudiness: Math.round(periodData.cloudiness / mergedFromPeriodsCount),
        windSpeed: Math.round(periodData.windSpeed / mergedFromPeriodsCount),
        humidity: Math.round(periodData.humidity / mergedFromPeriodsCount),
        condition: Math.round(periodData.condition / mergedFromPeriodsCount),
        weatherIcon: periodData.weatherIcon,
      };

      return result;
    };

    // getWeatherIcon(period)

    // Accumulator for daily Weather Forecasts
    const dailyWeatherPeriods = {};

    this.#items.forEach((period) => {
      const day = String(period.getDay());

      if (dailyWeatherPeriods[day]) {
        // Merge periods with existent one
        dailyWeatherPeriods[day].sum = sumPeriodsData(dailyWeatherPeriods[day].sum, period.getData());
        dailyWeatherPeriods[day].periods += 1;
      } else {
        // Add new period
        dailyWeatherPeriods[day] = {
          sum: period.getData(),
          periods: 1,
        };
      }
    });

    for (const day in dailyWeatherPeriods) {
      const dailyAveragePeriod = averagePeriod(dailyWeatherPeriods[day].sum, dailyWeatherPeriods[day].periods);

      result.add(new WeatherForecastPeriod(dailyAveragePeriod));
    }

    return result;
  }

  /**
   * Adds WeatherForecastPeriod to a list.
   *
   * @param {WeatherForecastPeriod} weatherForecastPeriod
   * @return {WeatherForecastPeriodList}
   */
  add(weatherForecastPeriod) {
    this.#items.push(weatherForecastPeriod);

    return this;
  }

  //-------
  // Accessors
  //-------

  /**
   * Returns count of items.
   *
   * @return {Number}
   */
  get length() {
    return this.#items.length;
  }

  /**
   * Returns Weather Forecast Period items.
   *
   * @return {WeatherForecastPeriod[]}
   */
  get items() {
    return this.#items;
  }

  /**
   * Sets weather forecasts per periods
   *
   * @param {Array} periods
   */
  set items(periods) {
    if (!Array.isArray(periods)
      || (periods.length > 0 && periods.some(period => !(period instanceof WeatherForecastPeriod)))
    ) {
      throw new Error(`[WeatherForecastHoursList]: Invalid periods type. Expected 'Array' of 'WeatherForecastPeriod' instances got ${typeof periods}`);
    }

    this.#items = periods;
  }
}

export default WeatherForecastPeriodList;
