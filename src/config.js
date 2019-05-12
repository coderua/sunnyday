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
        apiKey: 'd29d92630313fdaccd0c9cd7c5d8666f',
        apiEndpoint: 'https://api.openweathermap.org/data/2.5',
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
