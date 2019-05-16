/**
 * Application configuration
 *
 * @type {Object}
 *
 * @author Volodymyr Chumak <coder.ua@gmail.com>
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
        // lang parameter used to get the output in specified language.
        // The OpenWeatherMap supports the following languages:
        //   Arabic - ar, Bulgarian - bg, Catalan - ca, Czech - cz, German - de, Greek - el,
        //   English - en, Persian (Farsi) - fa, Finnish - fi, French - fr, Galician - gl,
        //   Croatian - hr, Hungarian - hu, Italian - it, Japanese - ja, Korean - kr, Latvian - la,
        //   Lithuanian - lt, Macedonian - mk, Dutch - nl, Polish - pl, Portuguese - pt,
        //   Romanian - ro, Russian - ru, Swedish - se, Slovak - sk, Slovenian - sl, Spanish - es,
        //   Turkish - tr, Ukrainian - ua, Vietnamese - vi, Chinese Simplified - zh_cn,
        //   Chinese Traditional - zh_tw.
        lang: 'en',
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
