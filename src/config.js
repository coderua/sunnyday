/**
 * Application configuration
 *
 * @type {Object}
 */
const config = {
  defaults: {
    services: {
      // Weather services
      openweathermap: {
        apiKey: '',
        apiEndpoint: 'https://api.openweathermap.org/data/2.5',
        units: 'metric',
      },
    },
  },
};

export default config;
