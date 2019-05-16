/**
 * Returns the weather icon class depends on condition an Date or pod value from response.
 *
 * @example
 * `wi wi-owm-night-804`
 * `wi wi-owm-day-804`
 * `wi wi-owm-804`
 * `wi wi-owm-622`
 *
 * @param {Number} condition
 * @param {undefined|Number|String} dateTime Unix time stamp or pod value from response
 * @return {string}
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
const getIconClassName = function getIconClassName(condition, dateTime = undefined) {
  let className = 'wi wi-owm-';

  if (dateTime) {
    if (dateTime === 'd' || dateTime === 'n') {
      className += dateTime === 'd' ? 'day-' : 'night-';
    } else {
      const date = new Date(dateTime * 1000);

      const hours = date.getHours(); // Hour for the specified date, according to local time
      const minutes = date.getMinutes(); // Minutes in the specified date according to local time
      const seconds = date.getSeconds(); // Seconds in the specified date according to local time

      className += (hours >= 3 && minutes >= 1 && hours <= 17 && minutes <= 59 && seconds <= 59)
        ? 'day-'
        : 'night-';
    }
  }

  return `${className}${condition}`;
};

export default getIconClassName;
