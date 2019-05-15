import WeatherForecastPeriodList from './WeatherForecastPeriodList';

/**
 * WeatherForecast class represent Weather Forecast for specified location.
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class WeatherForecast {
  /**
   * City name
   *
   * @type {String}
   */
  #city = '';

  /**
   * Country name
   *
   * @type {String}
   */
  #country = '';

  /**
   * Weather forecast list for periods
   *
   * @type {WeatherForecastPeriodList}
   */
  #weatherForecastPeriodList;

  /**
   * WeatherForecast constructor
   *
   * @param {String} city
   * @param {String} country
   * @param {WeatherForecastPeriod[]|WeatherForecastPeriodList} weatherForecastPeriodList
   */
  constructor(city = '', country = '', weatherForecastPeriodList = []) {
    this.#city = city;
    this.#country = country;
    this.weatherForecastPeriodList = weatherForecastPeriodList;
  }

  //-------
  // Accessors
  //-------

  /**
   * City name getter
   *
   * @return {String}
   */
  get city() {
    return this.#city;
  }

  /**
   * Sets city value
   *
   * @param {String} value
   */
  set city(value) {
    this.#city = value;
  }

  /**
   * Country name getter
   *
   * @return {String}
   */
  get country() {
    return this.#country;
  }

  /**
   * Sets country value
   *
   * @param {String} value
   */
  set country(value) {
    this.#country = value;
  }

  /**
   * Weather per hours
   *
   * @return {WeatherForecastPeriodList}
   */
  get weatherForecastPeriodList() {
    return this.#weatherForecastPeriodList;
  }

  /**
   * Sets Weather Forecast Hours List
   *
   * @param {WeatherForecastPeriod[]|WeatherForecastPeriodList} value
   */
  set weatherForecastPeriodList(value) {
    if (value instanceof WeatherForecastPeriodList) {
      this.#weatherForecastPeriodList = value;

      return;
    }

    if (Array.isArray(value)) {
      this.#weatherForecastPeriodList = new WeatherForecastPeriodList(value);

      return;
    }

    throw new Error(`[WeatherForecastHoursList]: Invalid periods type. Expected 'Array' of 'WeatherForecastPeriod' instances got ${typeof periods}`);
  }

  /**
   * Location: City, Country
   *
   * @return {string}
   */
  get location() {
    return this.#city && this.#country
      ? `${this.#city}, ${this.#country}`
      : '';
  }
}

export default WeatherForecast;
