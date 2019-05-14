import axios from 'axios';
import ConfigService from './ConfigService';
import OpenWeatherMapAPIService from './OpenWeatherMapAPIService';

/**
 * Factory for creation Weather Service
 *
 * @class
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class WeatherServiceFactory {
  /**
   * Creates a Weather Forecast service instance depend on config data
   *
   * @param {String|undefined} [serviceName=undefined]
   * @return {BaseWeatherService|OpenWeatherMapAPIService}
   */
  static create(serviceName = undefined) {
    const servicesConfig = ConfigService.get('services');

    let config;

    if (serviceName) {
      config = servicesConfig[serviceName];
    } else {
      const services = Object.keys(servicesConfig);

      for (const service of services) {
        if (servicesConfig[service].default) {
          config = servicesConfig[service];
          break;
        }
      }
    }

    if (!config) {
      const message = serviceName
        ? `Not found configuration for '${serviceName}' Weather Forecast service`
        : 'Not found default Weather Forecast service';

      throw new Error(`[WeatherServiceFactory]: ${message}.`);
    }

    return new OpenWeatherMapAPIService({ ...config, httpClient: axios.create() });
  }
}

export default WeatherServiceFactory;
