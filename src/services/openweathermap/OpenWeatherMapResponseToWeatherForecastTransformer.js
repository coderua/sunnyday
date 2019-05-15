import WeatherForecast from '../../models/WeatherForecast';
import WeatherForecastPeriod from '../../models/WeatherForecastPeriod';

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
   * @return {WeatherForecast}
   */
  static transform(responseData = {}) {
    if (!responseData || typeof responseData !== 'object' || !Object.keys(responseData).length) {
      throw new Error('[OpenWeatherMapResponseToWeatherForecastTransformer]: Empty response data.');
    }

    const weatherPeriods = responseData.list.map((item) => {
      const data = {
        description: item.weather[0].description,
        dateTime: item.dt,
        temp: item.main.temp,
        tempMin: item.main.temp_mix,
        tempMax: item.main.temp_man,
        cloudiness: item.clouds.all,
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
        // @todo implement setting the weather icon independently from any Weather service
        weatherIcon: '',
      };

      return new WeatherForecastPeriod(data);
    });

    return new WeatherForecast(responseData.city.name, responseData.city.country, weatherPeriods);
  }
}

export default OpenWeatherMapResponseToWeatherForecastTransformer;
