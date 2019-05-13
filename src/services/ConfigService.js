/*
 * Singleton for the Application Configuration
 */

import configuration from '../config';

/**
 * The config dictionary
 *
 * @type {Object}
 */
let config = {};

/**
 * Default options
 *
 * @type {Object}
 */
const defaultOptions = {
  environment: {},
  defaults: {},
};

/* eslint-disable no-console */
const warn = (...args) => console.warn('[ConfigService]: '.concat(args));

/**
 * Get configuration for the browser's current location
 *
 * @type   {Function}
 * @return {String} Environment name
 */
const getCurrentEnv = () => {
  let environment = 'production';

  try {
    const systemEnv = process.env.NODE_ENV;

    if (typeof systemEnv !== 'undefined') {
      environment = systemEnv;
    }
  } catch (e) {
    // Catches errors when server run under not node.js server.
    warn([e.message]);
  }

  return environment;
};

/**
 * Merge options into a flattened config
 *
 * @type   {Function}
 * @param  {Object} options
 * @return {Object|null}
 */
const mergeConfig = (options) => {
  const { environment, defaults } = Object.assign(defaultOptions, options);
  const isObject = value => typeof value === 'object';
  const validOptions = [environment, defaults].some(isObject);

  if (!validOptions) {
    warn('The provided options are incorrect');

    return {};
  }

  const currentEnv = getCurrentEnv();

  if (!environment[currentEnv]) {
    // Environment configuration section does not exist
    return defaults;
  }

  return Object.assign({}, defaults, environment[currentEnv]);
};

/**
 * Get a deeply nested value from an object
 *
 * @type   {Function}
 * @param  {Object} cfg
 * @param  {String} path
 * @return {*}
 */
const getDeepValue = (cfg, path) => {
  const fragments = path.split('.');

  return fragments.reduce((prev, n) => {
    if (typeof prev !== 'object') {
      return;
    }

    return prev[n];
  }, cfg);
};

/**
 * ConfigService instance
 *
 * @type {ConfigService}
 */
let instance = null;

/**
 * ConfigService constructor
 *
 * @constructor
 * @class
 */
function ConfigService() {
  if (instance !== null) {
    return this;
  }

  config = mergeConfig(configuration);

  instance = this;
}

/**
 * Vue.js plugin registration function.
 *
 * @param {Vue} Vue
 */
ConfigService.prototype.install = function install(Vue) {
  Vue.prototype.$configSevice = Vue.$configSevice = new ConfigService();
};

/**
 * Returns configuration value by the key.
 *
 * @example for path param
 *          'services.openweathermap'
 *          'services'
 *
 * @example for defaultValue param
 *          {}
 *          []
 *          'some value'
 *
 * @param {String} path          Path key separated by dot to find configuration value
 * @param {*}      defaultValue  If config value won't be found this is optional default value.
 * @throws Error
 * @returns {*}
 */
ConfigService.prototype.get = function get(path, defaultValue = undefined) {
  if (typeof path !== 'string') {
    throw new Error(`Expected string key for getting configuration value. Got '${typeof path}'`);
  }

  const configValue = getDeepValue(config, path);

  return (undefined === configValue && undefined !== defaultValue) ? defaultValue : configValue;
};

export default new ConfigService();
