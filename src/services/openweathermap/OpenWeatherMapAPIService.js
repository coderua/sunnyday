import BaseWeatherService from '../BaseWeatherService';

//
// Symbols for private method names.
//
const checkUnits = Symbol('checkUnits');
const checkLang = Symbol('checkLang');

//
// Available values for different options.
//

// Units
const availableUnitOptions = [
  'standard', // Default value for the
  'metric', // For temperature in Celsius
  'imperial', // For temperature in Fahrenheit
];

// Supported languages to get output in specified language.
const supportedLanguages = [
  'ar', // Arabic
  'bg', // Bulgarian
  'ca', // Catalan
  'cz', // Czech
  'de', // German
  'el', // Greek
  'en', // English
  'fa', // Persian (Farsi)
  'fi', // Finnish
  'fr', // French
  'gl', // Galician
  'hr', // Croatian
  'hu', // Hungarian
  'it', // Italian
  'ja', // Japanese
  'kr', // Korean
  'la', // Latvian
  'lt', // Lithuanian
  'mk', // Macedonian
  'nl', // Dutch
  'pl', // Polish
  'pt', // Portuguese
  'ro', // Romanian
  'ru', // Russian
  'se', // Swedish
  'sk', // Slovak
  'sl', // Slovenian
  'es', // Spanish
  'tr', // Turkish
  'ua', // Ukrainian
  'vi', // Vietnamese
  'zh_cn', // Chinese Simplified
  'zh_tw', // Chinese Traditional
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
   * Lang property used to get the output in specified language.
   * NOTE: Translation is only applied for the "description" field
   *
   * @type {string}
   */
  #lang = 'en';

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

    if (options.lang) {
      this.#lang = options.lang;
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
      lang: this.#lang,
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
   * Returns units value.
   *
   * @return {string}
   */
  get units() {
    return this.#units;
  }

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
   * Returns lang value.
   *
   * @return {string}
   */
  get lang() {
    return this.#lang;
  }

  /**
   * Sets units value
   *
   * @param {String} lang
   */
  set lang(lang) {
    this[checkLang](lang);

    this.#lang = lang;
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

  /**
   * Checks lang for validity.
   *
   * @private
   * @param {String} lang
   * @return {OpenWeatherMapAPIService}
   */
  [checkLang](lang) {
    if (!lang || !supportedLanguages[lang]) {
      throw new Error(`[OpenWeatherMapAPIService]: Invalid lang value '${lang}'. Available values are: ${supportedLanguages.join(', ')}`);
    }

    return this;
  }
}

export default OpenWeatherMapAPIService;
