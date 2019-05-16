import WeatherForecast from '../../models/WeatherForecast';
import WeatherForecastPeriod from '../../models/WeatherForecastPeriod';
import getIconClassName from './get-icon-class-name';

/**
 * OpenWeatherMapResponseToWeatherForecastTransformer class provide functionality
 * for transformation responses from OpenWeatherMap service to internal entities.
 *
 * @class
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class OpenWeatherMapResponseToWeatherForecastTransformer {
  /**
   * Transforms weather forecast response from OpenWeatherMap into application WeatherForecast
   * with list of WeatherForecastForPeriod classes.
   *
   * @static
   * @param {Object} responseData
   * @param {String} [units=metric]
   * @return {WeatherForecast}
   */
  static transform(responseData = {}, units = 'metric') {
    if (!responseData || typeof responseData !== 'object' || !Object.keys(responseData).length) {
      throw new Error('[OpenWeatherMapResponseToWeatherForecastTransformer]: Empty response data.');
    }

    const weatherPeriods = responseData.list
      .map((item) => {
        const data = {
          units,
          description: item.weather[0].description,
          dateTime: item.dt,
          temp: item.main.temp,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          cloudiness: item.clouds.all,
          windSpeed: item.wind.speed,
          humidity: item.main.humidity,
          weatherIcon: getIconClassName(item.weather[0].id, item.sys.pod),
          condition: item.weather[0].id,
        };

        return new WeatherForecastPeriod(data);
      })
      .sort((a, b) => a.dateTime - b.dateTime);

    return new WeatherForecast(responseData.city.name, responseData.city.country, weatherPeriods, units);
  }
}

export default OpenWeatherMapResponseToWeatherForecastTransformer;
