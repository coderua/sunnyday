import expect from 'expect/build/index';
import WeatherForecast from '../../../../src/models/WeatherForecast';
import OpenWeatherMapResponseToWeatherForecastTransformer
  from '../../../../src/services/openweathermap/OpenWeatherMapResponseToWeatherForecastTransformer';
import WeatherForecastPeriod from '../../../../src/models/WeatherForecastPeriod';
import forecastWarsawResponseJson from '../../fixtures/forecast-Warsaw-response.json';
import WeatherForecastPeriodList from '../../../../src/models/WeatherForecastPeriodList';

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
    expect(forecast.weatherForecastPeriodList).toBeInstanceOf(WeatherForecastPeriodList);
    expect(forecast.weatherForecastPeriodList.length).toBe(40);

    for (const weatherForecastPeriod of forecast.weatherForecastPeriodList.items) {
      expect(weatherForecastPeriod).toBeInstanceOf(WeatherForecastPeriod);
    }
  });

  it('can not transforms empty OpenWeatherMap API Response into WeatherForecast', () => {
    // Action && Assertion
    expect(() => OpenWeatherMapResponseToWeatherForecastTransformer.transform())
      .toThrow(/Empty response data/);

    expect(() => OpenWeatherMapResponseToWeatherForecastTransformer.transform({}))
      .toThrow(/Empty response data/);

    expect(() => OpenWeatherMapResponseToWeatherForecastTransformer.transform(null))
      .toThrow(/Empty response data/);

    expect(() => OpenWeatherMapResponseToWeatherForecastTransformer.transform(''))
      .toThrow(/Empty response data/);

    expect(() => OpenWeatherMapResponseToWeatherForecastTransformer.transform(123))
      .toThrow(/Empty response data/);

    expect(() => OpenWeatherMapResponseToWeatherForecastTransformer.transform(() => {}))
      .toThrow(/Empty response data/);
  });
});
