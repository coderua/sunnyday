/**
 * WeatherForecast class
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
   * Per three hours weather forecast list
   *
   * @type {WeatherForHour[]}
   */
  #weatherPerHours = [];

  /**
   * WeatherForecast constructor
   *
   * @param {String} city
   * @param {String} country
   * @param {WeatherForHour[]} weatherPerHours
   */
  constructor(city, country, weatherPerHours = []) {
    this.#city = city;
    this.#country = country;
    this.#weatherPerHours = [...weatherPerHours];
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
   * @return {WeatherForHour[]}
   */
  get weatherPerHours() {
    return this.#weatherPerHours;
  }

  /**
   * Location: City, Country
   *
   * @return {string}
   */
  get location() {
    return `${this.#city}, ${this.#country}`;
  }
}

export default WeatherForecast;
