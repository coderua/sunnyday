import BaseWeatherService from './BaseWeatherService';

//
// Symbols for private method names.
//
const checkUnits = Symbol('checkUnits');

//
// Available values for different options.
//
const availableUnitOptions = ['standard', 'metric', 'imperial'];

/**
 * OpenWeatherMapAPIService class
 *
 * @class
 * @classdesc Provides functionality to get Weather Forecast from OpenWeather API.
 * @extends BaseWeatherService
 */
class OpenWeatherMapAPIService extends BaseWeatherService {
  /**
   * Units format:
   * standard, metric, and imperial units are available.
   *
   * @private
   * @type {String}
   */
  #units = 'metric';

  /**
   * OpenWeatherMapAPIService class constructor.
   *
   * @param {Object} [options={}]
   */
  constructor(options = {}) {
    super(options);

    if (options.units) {
      this.#units = options.units;
    }
  }

  /**
   * Returns current weather for specified city
   *
   * @param {String} city
   * @return {Promise<Object | Error>}
   */
  getWeather(city) {
    if (!city) {
      return Promise.reject(new Error('Please specify the city'));
    }

    const url = `${this._apiEndpoint}/weather?q=${city}&units=${this.#units}&appid=${this._apiKey}`;

    console.log('Url: ', url);

    return this.httpClient.get(url)
      .then(response => response.data);
  }

  //-------
  // Acceptors
  //-------

  /**
   * Sets units value
   *
   * @param {String} units
   */
  set units(units) {
    this[checkUnits](units);

    this.#units = units;
  }

  /**
   * Returns units value.
   *
   * @return {string}
   */
  get units() {
    return this.#units;
  }

  //-------
  // Private methods
  //-------

  /**
   * Checks units for validity.
   *
   * @private
   * @param {String} units
   * @return {OpenWeatherMapAPIService}
   */
  [checkUnits](units) {
    if (!units || !availableUnitOptions[units]) {
      throw new Error(`[OpenWeatherMapAPIService]: Invalid units value '${units}'. Available values are: ${availableUnitOptions.join(', ')}`);
    }

    return this;
  }
}

export default OpenWeatherMapAPIService;
