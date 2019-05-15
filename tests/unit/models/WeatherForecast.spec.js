import expect from 'expect';
import WeatherForecastPeriod from '../../../src/models/WeatherForecastPeriod';
import WeatherForecast from '../../../src/models/WeatherForecast';
import forecastWarsawResponseJson from '../fixtures/forecast-Warsaw-response.json';

describe('WeatherForecast.js', () => {
  it('creates WeatherForecast instance wo/ data', () => {
    // Arrangement
    const weatherForecast = new WeatherForecast('Warsaw', 'PL');

    // Assertion
    expect(weatherForecast).toBeInstanceOf(WeatherForecast);
    expect(weatherForecast.city).toBe('Warsaw');
    expect(weatherForecast.country).toBe('PL');
  });

  it('creates WeatherForecastPeriod instance with data', () => {
    // Arrangement data from response
    const data = {
      description: 'light rain',
      dateTime: 1557846000,
      temp: 8.62,
      tempMin: 8.13,
      tempMax: 9.05,
      cloudiness: 100,
      windSpeed: 4.88,
      humidity: 9.05,
      weatherIcon: 'some-icon.svg',
    };

    // Action
    const weatherForHour = new WeatherForecastPeriod(data);

    // Assertion
    expect(weatherForHour).toBeInstanceOf(WeatherForecastPeriod);
    expect(weatherForHour.description).toBe('light rain');
    expect(weatherForHour.dateTime).toBe(1557846000);
    expect(weatherForHour.temp).toBe(9);
    expect(weatherForHour.tempMin).toBe(8);
    expect(weatherForHour.tempMax).toBe(9);
    expect(weatherForHour.cloudiness).toBe(100);
    expect(weatherForHour.humidity).toBe(9.05);
    expect(weatherForHour.weatherIcon).toBe('some-icon.svg');
  });
});
