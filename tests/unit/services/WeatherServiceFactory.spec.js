import expect from 'expect';
import WeatherServiceFactory from '../../../src/services/WeatherServiceFactory';
import OpenWeatherMapAPIService from '../../../src/services/openweathermap/OpenWeatherMapAPIService';

describe('WeatherServiceFactory.js', () => {
  it('creates OpenWeatherMapAPIService instance without params', () => {
    // Arrangement
    const openWeatherMapAPIService = WeatherServiceFactory.create();

    // Assertion
    expect(openWeatherMapAPIService).toBeInstanceOf(OpenWeatherMapAPIService);
  });

  it('creates OpenWeatherMapAPIService instance with passing service name', () => {
    // Arrangement
    const openWeatherMapAPIService = WeatherServiceFactory.create('openweathermap');

    // Assertion
    expect(openWeatherMapAPIService).toBeInstanceOf(OpenWeatherMapAPIService);
  });

  it('not creates any Weather Forecast instance with passing non existent service name', () => {
    // Acting and Assertion
    expect(() => WeatherServiceFactory.create('zyx'))
      .toThrow(/Not found configuration for 'zyx' Weather Forecast service/);
  });
});
