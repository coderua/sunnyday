/**
 * Returns formatted date by options.
 *
 * @param {Date} date
 * @param {Object} [formattedDateOptions={}]
 * @return {string}
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
const formattedDate = function formattedDate(date, formattedDateOptions = {}) {
  // User-Agent locale
  const locale = navigator.language || navigator.userLanguage;

  return date.toLocaleDateString(locale, formattedDateOptions);
};

export default formattedDate;
