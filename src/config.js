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
        endpoint: 'https://api.openweathermap.org/data/2.5',
      },
    },
  },
};

export default config;
