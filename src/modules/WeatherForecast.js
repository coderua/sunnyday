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
   * @type {WeatherForPeriod[]}
   */
  #weatherPeriods = [];

  /**
   * WeatherForecast constructor
   *
   * @param {String} city
   * @param {String} country
   * @param {WeatherForPeriod[]} weatherPeriods
   */
  constructor(city, country, weatherPeriods = []) {
    this.#city = city;
    this.#country = country;
    this.#weatherPeriods = [...weatherPeriods];
  }

  //-------
  // Getters
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
   * Country name getter
   *
   * @return {String}
   */
  get country() {
    return this.#country;
  }

  /**
   * Weather per hours
   *
   * @return {WeatherForPeriod[]}
   */
  get weatherPeriods() {
    return this.#weatherPeriods;
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
