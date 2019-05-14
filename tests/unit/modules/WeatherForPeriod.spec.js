import expect from 'expect';
import WeatherForPeriod from '../../../src/modules/WeatherForPeriod';

describe('WeatherForPeriod.js', () => {
  it('creates WeatherForPeriod instance wo/ data', () => {
    // Arrangement
    const weatherForHour = new WeatherForPeriod();

    // Assertion
    expect(weatherForHour).toBeInstanceOf(WeatherForPeriod);
    expect(weatherForHour.description).toBe('');
    expect(weatherForHour.dateTime).toBe(0);
    expect(weatherForHour.cloudiness).toBe(0);
    expect(weatherForHour.windSpeed).toBe(0);
    expect(weatherForHour.humidity).toBe(0);
    expect(weatherForHour.temp).toBe(0);
    expect(weatherForHour.tempMin).toBe(0);
    expect(weatherForHour.tempMax).toBe(0);
    expect(weatherForHour.weatherIcon).toBe('');
  });

  it('creates WeatherForPeriod instance with data', () => {
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
    const weatherForHour = new WeatherForPeriod(data);

    // Assertion
    expect(weatherForHour).toBeInstanceOf(WeatherForPeriod);
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
