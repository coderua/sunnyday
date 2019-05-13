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
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
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
    if (!this._isRequiredSearchParamsExist(params)) {
      return Promise.reject(new Error('Please specify the city or location'));
    }

    const url = `${this._apiEndpoint}/weather`;

    console.log('[OpenWeatherMapAPIService]: Request => ', url);

    return this._request('get', url, params);
  }

  /**
   * Returns five days forecast.
   *
   * @param {Object} params
   * @return {Promise<Object | Error>}
   */
  getFiveDayWeather(params) {
    if (!this._isRequiredSearchParamsExist(params)) {
      return Promise.reject(new Error('Please specify the city or location'));
    }

    const url = `${this._apiEndpoint}/forecast`;

    console.log('[OpenWeatherMapAPIService]: Request => ', url);

    return this._request('get', url, params);
  }

  /**
   * Checks if City or Latitude and Longitude are present.
   *
   * @example params for city
   * {
   *   q: 'Warsaw'
   * }
   *
   * @example params for location
   * {
   *   lat: 52.2319,
   *   lon: 21.0067
   * }
   *
   * @param {Object} params
   * @return {boolean}
   * @private
   */
  _isRequiredSearchParamsExist(params = {}) {
    return !!(params.q || (params.lat && params.lon));
  }

  /**
   *
   * @param {String} method
   * @param {String} url
   * @param {Object} params
   * @return {Promise<Object | Error>}
   * @private
   */
  _request(method = 'get', url, params = {}) {
    if (!url) {
      return Promise.reject(new Error('[OpenWeatherMapAPIService]: Url is required.'));
    }

    this._checkApiKey(this._apiKey);
    this._checkHttpClient(this.httpClient);

    const query = BaseWeatherService.createQuery({
      appid: this._apiKey,
      units: this.#units,
      ...params,
    });

    const fullUrl = query ? `${url}?${query}` : url;

    return this.httpClient[method](fullUrl)
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
