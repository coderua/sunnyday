import axios from 'axios';
import ConfigService from './ConfigService';
import OpenWeatherMapAPIService from './openweathermap/OpenWeatherMapAPIService';
import weatherServicesMap from './weather-services-map';

/**
 * Factory for creation Weather Service.
 *
 * @class
 * @author Volodymyr Chumak <coder.ua@gmail.com>
 */
class WeatherServiceFactory {
  /**
   * Creates a Weather Forecast service instance depend on config data
   *
   * @param {String|undefined} [service=undefined]
   * @return {BaseWeatherService|OpenWeatherMapAPIService}
   */
  static create(service = undefined) {
    let serviceName = service;
    let config;
    const servicesConfig = ConfigService.get('services');

    if (serviceName) {
      config = servicesConfig[serviceName];
    } else {
      const services = Object.keys(servicesConfig);

      for (const srv of services) {
        if (servicesConfig[srv].default) {
          config = servicesConfig[srv];
          serviceName = srv;

          break;
        }
      }
    }

    if (!config) {
      const message = service
        ? `Not found configuration for '${serviceName}' Weather Forecast service`
        : 'Not found default Weather Forecast service';

      throw new Error(`[WeatherServiceFactory]: ${message}.`);
    }

    return new weatherServicesMap[serviceName]({ ...config, httpClient: axios.create() });
  }
}

export default WeatherServiceFactory;
