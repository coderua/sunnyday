import OpenWeatherMapAPIService from './openweathermap/OpenWeatherMapAPIService';

/**
 * Map for Weather Forecast Service name in config to Weather Forecast Service class.
 *
 * --------------------------------------------------
 * How to add more services.
 * --------------------------------------------------
 * 1. Assume that in `src/config.js` we have a Weather Forecast service configuration:
 *    defaults: {
 *      services: {
 *        //
 *        // Weather services configuration
 *        //
 *        // OpenWeatherMap Service config
 *        awesomeweather: {
 *          default: true,
 *          apiKey: 'xyz',
 *          apiEndpoint: 'https://api.awesomeweather.com',
 *        }
 *      }
 *    }
 * 2. Also already exists implemented `src/services/awesomeweather/AwesomeWeatherServiceAPIService.js` service
 *    which provides functionality to get weather cast.
 * 3. Then need to add import to AwesomeWeatherServiceAPIService at the start of the file:
 *    `import AwesomeWeatherServiceAPIService from './awesomeweather/AwesomeWeatherServiceAPIService'`;
 * 4. And add one more property to weatherServicesMap, in the next format:
 *    `<service name in config>: <ServiceClass>,` => `awesomeweather: AwesomeWeatherServiceAPIService,`
 *
 * @type {Readonly<{openweathermap: OpenWeatherMapAPIService}>}
 */
const weatherServicesMap = Object.freeze({
  openweathermap: OpenWeatherMapAPIService,
});

export default weatherServicesMap;
