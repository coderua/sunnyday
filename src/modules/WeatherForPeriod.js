/**
 * WeatherForHour class represents weather for a three hours time period.
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class WeatherForPeriod {
  /**
   * Weather description
   *
   * @type {string}
   */
  #description = '';

  /**
   * Date and time as unix time stamp (seconds)
   *
   * @type {number}
   */
  #dateTime = 0;

  /**
   * Cloudiness level (%)
   *
   * @type {number}
   */
  #cloudiness = 0;

  /**
   * Wind speed (meter/sec)
   *
   * @type {number}
   */
  #windSpeed = 0;

  /**
   * Humidity level (%)
   *
   * @type {number}
   */
  #humidity = 0;

  /**
   * Temperature (Kelvin, Celsius, Fahrenheit)
   *
   * @type {number}
   */
  #temp = 0;

  /**
   * Minimum temperature at the moment (Kelvin, Celsius, Fahrenheit)
   *
   * @type {number}
   */
  #tempMin = 0;

  /**
   * Maximum temperature at the moment (Kelvin, Celsius, Fahrenheit)
   *
   * @type {number}
   */
  #tempMax = 0;

  /**
   * Weather icon
   *
   * @type {string}
   */
  #weatherIcon = '';

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
   * @return {WeatherForPeriod}
   */
  populate(data = {}) {
    Object.keys(data).forEach((field) => {
      this[field] = data[field];
    });

    return this;
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
}

export default WeatherForPeriod;
