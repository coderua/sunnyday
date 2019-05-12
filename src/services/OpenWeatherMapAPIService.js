import BaseWeatherService from './BaseWeatherService';

//
// Symbols for private method names.
//
const checkUnits = Symbol('checkUnits');

//
// Available values for different options.
//
const availableUnitOptions = [
  'standard', // Default value for the
  'metric', // For temperature in Celsius
  'imperial', // For temperature in Fahrenheit
];

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
   * @param {Object} params
   * @return {Promise<Object | Error>}
   */
  getCurrentWeather(params) {
    if (!params.q && !(params.lat && params.lon)) {
      return Promise.reject(new Error('Please specify the city or location'));
    }

    const query = BaseWeatherService.createQuery({
      appid: this._apiKey,
      units: this.#units,
      ...params,
    });

    const url = `${this._apiEndpoint}/weather?${query}`;

    console.log('[OpenWeatherMapAPIService]: Request => ', url);

    return this.httpClient.get(url)
      .then(response => response.data);
  }

  /**
   * Returns five days forecast.
   *
   * @param {Object} params
   * @return {Promise<Object | Error>}
   */
  getFiveDayWeather(params) {
    if (!params.q && !(params.lat && params.lon)) {
      return Promise.reject(new Error('Please specify the city or location'));
    }

    const query = BaseWeatherService.createQuery({
      appid: this._apiKey,
      units: this.#units,
      ...params,
    });

    const url = `${this._apiEndpoint}/forecast?${query}`;

    console.log('[OpenWeatherMapAPIService]: Request => ', url);

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
