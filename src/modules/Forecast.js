/**
 * Forecast class
 */
class Forecast {
  #day = 1;

  #icon = '';

  #tempMin = 0;

  #tempMax = 0;

  /**
   *
   * @param {Number} day
   * @param {String} icon
   * @param {Number} tempMin
   * @param {Number} tempMax
   */
  constructor(day, icon, tempMin = 0, tempMax = 0) {
    this.#day = day;
    this.#icon = icon;
    this.#tempMin = tempMin;
    this.#tempMax = tempMax;
  }
}

export default Forecast;
