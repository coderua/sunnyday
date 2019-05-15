/**
 * WeatherForecastPeriod class represents weather for some hours time period (three hours for example).
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class WeatherForecastPeriod {
  /**
   * Weather description
   *
   * @private
   * @type {string}
   */
  #description = '';

  /**
   * Date and time as unix time stamp (seconds)
   *
   * @private
   * @type {number}
   */
  #dateTime = 0;

  /**
   * Cloudiness level (%)
   *
   * @private
   * @type {number}
   */
  #cloudiness = 0;

  /**
   * Wind speed (meter/sec)
   *
   * @private
   * @type {number}
   */
  #windSpeed = 0;

  /**
   * Humidity level (%)
   *
   * @private
   * @type {number}
   */
  #humidity = 0;

  /**
   * Temperature (Kelvin, Celsius, Fahrenheit)
   *
   * @private
   * @type {number}
   */
  #temp = 0;

  /**
   * Minimum temperature at the moment (Kelvin, Celsius, Fahrenheit)
   *
   * @private
   * @type {number}
   */
  #tempMin = 0;

  /**
   * Maximum temperature at the moment (Kelvin, Celsius, Fahrenheit)
   *
   * @private
   * @type {number}
   */
  #tempMax = 0;

  /**
   * Weather icon
   *
   * @private
   * @type {string}
   */
  #weatherIcon = '';

  /**
   * Weather condition: Thunderstorm, Drizzle, Rain, Snow, Atmosphere, Clear, Clouds
   *
   * @private
   * @type {Number|String}
   */
  #condition = '';

  /**
   *
   * @param {Object} data
   */
  constructor(data = {}) {
    this.populate(data);
  }

  /**
   * Populate property values from a passed data
   *
   * @param {Object} data
   * @return {WeatherForecastPeriod}
   */
  populate(data = {}) {
    Object.keys(data).forEach((field) => {
      this[field] = data[field];
    });

    return this;
  }

  /**
   * Returns data as a POJO.
   *
   * @return {{dateTime: number, tempMax: number, temp: number, weatherIcon: string, description: string, humidity: number, cloudiness: number, windSpeed: number, tempMin: number}}
   */
  getData() {
    return {
      description: this.#description,
      dateTime: this.#dateTime,
      temp: this.#temp,
      tempMin: this.#tempMin,
      tempMax: this.#tempMax,
      cloudiness: this.#cloudiness,
      windSpeed: this.#windSpeed,
      humidity: this.#humidity,
      weatherIcon: this.#weatherIcon,
      condition: this.#condition,
    };
  }

  /**
   * Returns day number
   *
   * @return {number}
   */
  getDay() {
    return new Date(this.#dateTime * 1000).getUTCDay();
  }

  //-------
  // Accessors
  //-------

  get description() {
    return this.#description;
  }

  set description(value) {
    this.#description = value;
  }

  get dateTime() {
    return this.#dateTime;
  }

  set dateTime(value) {
    this.#dateTime = value;
  }

  get cloudiness() {
    return this.#cloudiness;
  }

  set cloudiness(value) {
    this.#cloudiness = value;
  }

  get windSpeed() {
    return this.#windSpeed;
  }

  set windSpeed(value) {
    this.#windSpeed = value;
  }

  get humidity() {
    return this.#humidity;
  }

  set humidity(value) {
    this.#humidity = value;
  }

  get temp() {
    return this.#temp;
  }

  set temp(value) {
    this.#temp = Math.round(value);
  }

  get tempMax() {
    return this.#tempMax;
  }

  set tempMax(value) {
    this.#tempMax = Math.round(value);
  }

  get tempMin() {
    return this.#tempMin;
  }

  set tempMin(value) {
    this.#tempMin = Math.round(value);
  }

  get weatherIcon() {
    return this.#weatherIcon;
  }

  set weatherIcon(value) {
    this.#weatherIcon = value;
  }

  get condition() {
    return this.#condition;
  }

  set condition(value) {
    this.#condition = value;
  }
}

export default WeatherForecastPeriod;
