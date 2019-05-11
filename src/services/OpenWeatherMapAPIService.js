//
// Symbols for private method names
//
const checkApiKey = Symbol('checkApiKey');
const checkEndpoint = Symbol('checkEndpoint');
const checkHttpClient = Symbol('checkHttpClient');

/**
 * OpenWeatherMapAPIService class
 *
 * @class
 * @classdesc Provides functionality to get Weather Forecast from OpenWeather API.
 */
class OpenWeatherMapAPIService {
  /**
   * API key to have an ability make call to the service.
   *
   * @type {String}
   */
  #apiKey = '';

  /**
   * Endpoint for the service.
   *
   * @type {String}
   */
  #apiEndpoint = 'https://api.openweathermap.org/data/2.5';

  /**
   * HTTP client provide functionality to make API calls.
   *
   * @type {Object|axios}
   */
  #httpClient;

  /**
   * OpenWeatherMapAPIService class constructor.
   *
   * @param {String|undefined} apiKey
   * @param {String|undefined} apiEndpoint
   * @param {Object|undefined} httpClient
   */
  constructor(apiKey = undefined, apiEndpoint = undefined, httpClient = undefined) {
    if (apiKey) {
      this.apiKey = apiKey;
    }

    if (apiEndpoint) {
      this.apiEndpoint = apiEndpoint;
    }

    if (httpClient) {
      this.#httpClient = httpClient;
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

    const url = `${this.#apiEndpoint}/weather?q=${city}&appid=${this.#apiKey}`;

    return this.#httpClient.get(url)
      .then(response => response.data);
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
    this[checkApiKey](apiKey);

    this.#apiKey = apiKey;
  }

  /**
   * Returns API endpoint value.
   *
   * @return {string}
   */
  get apiEndpoint() {
    return this.#apiEndpoint;
  }

  /**
   * Setter for API endpoint value.
   *
   * @param {String} endpoint
   * @throws Error
   */
  set apiEndpoint(endpoint) {
    this[checkEndpoint](endpoint);

    this.#apiEndpoint = endpoint;
  }

  /**
   * Returns HTTP Client instance.
   *
   * @return {Object}
   */
  get httpClient() {
    return this.#httpClient;
  }

  /**
   * Setter for HTTP client to make API calls.
   *
   * @param {Object} httpClient
   * @throws Error
   */
  set httpClient(httpClient) {
    this[checkHttpClient](httpClient);

    this.#httpClient = httpClient;
  }

  //-------
  // Private methods
  //-------

  /**
   * Checks API key for validity.
   *
   * @return {OpenWeatherMapAPIService}
   * @throws Error
   */
  [checkApiKey](apiKey) {
    if (!apiKey) {
      throw new Error('[OpenWeatherMapAPIService]: Empty API key for the openweathermap.org service.');
    }

    if (apiKey.length !== 32) {
      throw new Error('[OpenWeatherMapAPIService]: Invalid API key for the openweathermap.org service.');
    }

    return this;
  }

  /**
   * Checks endpoint for validity.
   *
   * @param {String} endpoint
   * @return {OpenWeatherMapAPIService}
   */
  [checkEndpoint](endpoint) {
    if (!endpoint) {
      throw new Error('[OpenWeatherMapAPIService]: Invalid API endpoint. Expected url.');
    }

    // @todo Improvement: add checks for url format

    return this;
  }

  /**
   * Checks HTTP Client for validity.
   *
   * @param {Object} httpClient
   * @return {OpenWeatherMapAPIService}
   */
  [checkHttpClient](httpClient) {
    if (!httpClient || !httpClient.get) {
      throw new Error('[OpenWeatherMapAPIService]: Invalid HTTP Client.');
    }

    return this;
  }
}

export default OpenWeatherMapAPIService;
