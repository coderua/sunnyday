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
   * Adds WeatherForecastPeriod to a list.
   *
   * @param {WeatherForecastPeriod} weatherForecastPeriod
   * @return {WeatherForecastPeriodList}
   */
  add(weatherForecastPeriod) {
    this.#items.push(weatherForecastPeriod);

    return this;
  }

  /**
   * Sorts the collection by Date.
   *
   * @return {WeatherForecastPeriodList}
   */
  sortByDate() {
    this.#items = this.#items.sort((a, b) => a.dateTime - b.dateTime);

    return this;
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
     * @param {Number} dailyWeatherPeriods
     * @return {Object}
     */
    const averagePeriod = (periodData, dailyWeatherPeriods) => {
      const result = {
        dateTime: periodData.dateTime,
        temp: Math.round(periodData.temp / dailyWeatherPeriods),
        tempMin: Math.round(periodData.tempMin / dailyWeatherPeriods),
        tempMax: Math.round(periodData.tempMax / dailyWeatherPeriods),
        cloudiness: Math.round(periodData.cloudiness / dailyWeatherPeriods),
        windSpeed: Math.round(periodData.windSpeed / dailyWeatherPeriods),
        humidity: Math.round(periodData.humidity / dailyWeatherPeriods),
        condition: Math.round(periodData.condition / dailyWeatherPeriods),
        weatherIcon: periodData.weatherIcon,
      };

      return result;
    };

    // Accumulator for daily Weather Forecasts
    const dailyWeatherPeriods = {};

    this.#items.forEach((period) => {
      const day = String(period.day);

      if (dailyWeatherPeriods[day]) {
        // Merge periods with existent one
        dailyWeatherPeriods[day].approxWeather = sumPeriodsData(
          dailyWeatherPeriods[day].approxWeather,
          period.getData(),
        );
        dailyWeatherPeriods[day].periodsCount += 1;
      } else {
        // Add new period
        dailyWeatherPeriods[day] = {
          approxWeather: period.getData(),
          periodsCount: 1,
        };
      }
    });

    for (const day in dailyWeatherPeriods) {
      const dailyAveragePeriod = averagePeriod(
        dailyWeatherPeriods[day].approxWeather,
        dailyWeatherPeriods[day].periodsCount,
      );

      result.add(new WeatherForecastPeriod(dailyAveragePeriod));
    }

    return result.sortByDate();
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
