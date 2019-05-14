/**
 * Application configuration
 *
 * @type {Object}
 */
const config = {
  defaults: {
    services: {
      //
      // Weather services configuration
      //

      // OpenWeatherMap Service config
      openweathermap: {
        // Can be a lot of Weather Forecast services.
        // The 'default' option sets the service as a default service.
        default: true,
        apiKey: 'd29d92630313fdaccd0c9cd7c5d8666f',
        apiEndpoint: 'https://api.openweathermap.org/data/2.5',
        // Units available values:
        //  'standard' -> default value for the service
        //  'metric'   -> for temperature in Celsius
        //  'imperial' -> for temperature in Fahrenheit
        units: 'metric',
      },
    },
  },
  environment: {
    test: {

    },
  },
};

export default config;
