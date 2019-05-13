/**
 * BaseWeatherService class
 *
 * @class
 * @classdesc Like an abstract class that provides base functionality to
 *            child Weather service classes.
 */
class BaseWeatherService {
  /**
   * API key to have an ability make call to the service.
   *
   * @protected
   * @type {String}
   */
  _apiKey = '';

  /**
   * Endpoint for the service.
   *
   * @protected
   * @type {String}
   */
  _apiEndpoint = '';

  /**
   * HTTP client provide functionality to make API calls.
   *
   * @protected
   * @type {Object}
   */
  _httpClient;

  /**
   * BaseWeatherService class constructor.
   *
   * @param {Object} [options={}]
   */
  constructor(options = {}) {
    if (options.apiKey) {
      this.apiKey = options.apiKey;
    }

    if (options.apiEndpoint) {
      this.apiEndpoint = options.apiEndpoint;
    }

    if (options.httpClient) {
      this.httpClient = options.httpClient;
    }
  }

  //-------
  // Acceptors
  //-------

  /**
   * Setter for API key value.
   *
   * @param {String} apiKey
   */
  set apiKey(apiKey) {
    this._checkApiKey(apiKey);

    this._apiKey = apiKey;
  }

  /**
   * Setter for API key value.
   *
   * @return {String}
   */
  get apiKey() {
    return this._apiKey;
  }

  /**
   * Returns API endpoint value.
   *
   * @return {string}
   */
  get apiEndpoint() {
    return this._apiEndpoint;
  }

  /**
   * Setter for API endpoint value.
   *
   * @param {String} endpoint
   * @throws Error
   */
  set apiEndpoint(endpoint) {
    this._checkEndpoint(endpoint);

    this._apiEndpoint = endpoint;
  }

  /**
   * Returns HTTP Client instance.
   *
   * @return {Object}
   */
  get httpClient() {
    return this._httpClient;
  }

  /**
   * Setter for HTTP client to make API calls.
   *
   * @param {Object} httpClient
   * @throws Error
   */
  set httpClient(httpClient) {
    this._checkHttpClient(httpClient);

    this._httpClient = httpClient;
  }

  //-------
  // Protected methods
  //-------

  /**
   * Checks API key for validity.
   *
   * @protected
   * @return {this}
   * @throws Error
   */
  _checkApiKey(apiKey) {
    if (!apiKey) {
      throw new Error(`[${this.name}]: Empty API key for the openweathermap.org service.`);
    }

    if (apiKey.length !== 32) {
      throw new Error(`[${this.name}]: Invalid API key for the openweathermap.org service.`);
    }

    return this;
  }

  /**
   * Checks endpoint for validity.
   *
   * @protected
   * @param {String} endpoint
   * @return {this}
   */
  _checkEndpoint(endpoint) {
    if (!endpoint) {
      throw new Error(`[${this.name}]: Invalid API endpoint. Expected url.`);
    }

    // @todo Improvement: add checks for url format

    return this;
  }

  /**
   * Checks HTTP Client for validity.
   *
   * @protected
   * @param {Object} httpClient
   * @return {this}
   */
  _checkHttpClient(httpClient) {
    if (!httpClient || typeof httpClient !== 'function') {
      throw new Error(`[${this.name}]: Invalid HTTP Client.`);
    }

    return this;
  }

  //-------
  // Helpers
  //-------

  /**
   * Creates a query string for a passed object.
   *
   * @param {Object} [params={}]
   * @return {string}
   */
  static createQuery(params = {}) {
    if (!params) {
      return '';
    }

    if (typeof params !== 'object') {
      throw new Error(`[${this.name}]: createQuery(params) method expects first param to be type of 'Object'. Got '${typeof params}'.`);
    }

    return Object.keys(params)
      .map(name => `${encodeURIComponent(name)}=${encodeURIComponent(params[name])}`)
      .join('&');
  }
}

export default BaseWeatherService;
