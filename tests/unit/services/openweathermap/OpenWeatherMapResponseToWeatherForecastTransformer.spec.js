import expect from 'expect/build/index';
import WeatherForecast from '../../../../src/modules/WeatherForecast';
import OpenWeatherMapResponseToWeatherForecastTransformer
  from '../../../../src/services/openweathermap/OpenWeatherMapResponseToWeatherForecastTransformer';
import WeatherForPeriod from '../../../../src/modules/WeatherForPeriod';
import forecastWarsawResponseJson from '../../fixtures/forecast-Warsaw-response.json';

describe('OpenWeatherMapResponseToWeatherForecastTransformer.js', () => {
  it('transforms OpenWeatherMap API Response into WeatherForecast', () => {
    // Acting
    const forecast = OpenWeatherMapResponseToWeatherForecastTransformer
      .transform(forecastWarsawResponseJson);

    // Assertion
    expect(forecast).toBeInstanceOf(WeatherForecast);
    expect(forecast.city).toBe('Warsaw');
    expect(forecast.country).toBe('PL');
    expect(forecast.location).toBe('Warsaw, PL');
    expect(forecast.weatherPeriods).toBeInstanceOf(Array);
    expect(forecast.weatherPeriods.length).toBe(40);

    for (let i = 0, len = forecast.weatherPeriods.length; i < len; i += 1) {
      expect(forecast.weatherPeriods[i]).toBeInstanceOf(WeatherForPeriod);
    }
  });
});
