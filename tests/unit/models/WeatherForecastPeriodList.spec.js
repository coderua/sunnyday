import expect from 'expect';
import WeatherForecastPeriod from '../../../src/models/WeatherForecastPeriod';
import WeatherForecastPeriodList from '../../../src/models/WeatherForecastPeriodList';
import forecastWarsawResponseJson from '../fixtures/forecast-Warsaw-response.json';
import OpenWeatherMapResponseToWeatherForecastTransformer
  from '../../../src/services/openweathermap/OpenWeatherMapResponseToWeatherForecastTransformer';

describe('WeatherForecastPeriodList.js', () => {
  it('creates WeatherForecastPeriodList instance wo/ data', () => {
    // Arrangement
    const weatherForecastPeriodsList = new WeatherForecastPeriodList();

    // Assertion
    expect(weatherForecastPeriodsList).toBeInstanceOf(WeatherForecastPeriodList);
    expect(weatherForecastPeriodsList.items).toBeInstanceOf(Array);
    expect(weatherForecastPeriodsList.items.length).toBe(0);
  });

  it('creates WeatherForecastPeriodList instance with data', () => {
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

    const weatherPeriods = [
      new WeatherForecastPeriod(data),
      new WeatherForecastPeriod(data),
    ];

    // Action
    const weatherForecastPeriodsList = new WeatherForecastPeriodList(weatherPeriods);

    // Assertion
    expect(weatherForecastPeriodsList).toBeInstanceOf(WeatherForecastPeriodList);
    expect(weatherForecastPeriodsList.items).toBeInstanceOf(Array);
    expect(weatherForecastPeriodsList.items.length).toBe(2);
  });

  it('thrown Error when creates WeatherForecastPeriodList instance with invalid data', () => {
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

    const weatherPeriods = [
      new WeatherForecastPeriod(data),
      [],
    ];

    // Action && Assertion
    expect(() => new WeatherForecastPeriodList(weatherPeriods))
      .toThrow(/Invalid periods type/);
  });

  it('creates approximate daily WeatherForecastPeriodList', () => {
    // Arrangement data from response
    const data = [
      // 2019-05-14 12:00:00 UTC
      // Tuesday, May 14, 2019 3:00:00 PM GMT+03:00 DST
      {
        description: 'light rain',
        dateTime: 1557835200,
        temp: 9.05,
        tempMin: 8.13,
        tempMax: 9.05,
        cloudiness: 100,
        windSpeed: 4.88,
        humidity: 86,
        weatherIcon: '10d',
        condition: 500,
      },

      // 2019-05-14 15:00:00 UTC
      // Tuesday, May 14, 2019 6:00:00 PM GMT+03:00 DST
      {
        description: 'light rain',
        dateTime: 1557846000,
        temp: 8.62,
        tempMin: 7.93,
        tempMax: 8.62,
        cloudiness: 100,
        windSpeed: 5.09,
        humidity: 90,
        weatherIcon: 'some-icon.svg',
        condition: 500,
      },

      // 2019-05-14 18:00:00 UTC
      // Tuesday, May 14, 2019 9:00:00 PM GMT+03:00 DST
      {
        description: 'overcast clouds',
        dateTime: 1557856800,
        temp: 9.49,
        tempMin: 9.03,
        tempMax: 9.49,
        cloudiness: 97,
        windSpeed: 4.99,
        humidity: 90,
        weatherIcon: '04d',
        condition: 804,
      },

      // 2019-05-14 21:00:00 UTC
      // Wednesday, May 15, 2019 12:00:00 AM GMT+03:00 DST
      {
        description: 'light rain',
        dateTime: 1557867600,
        temp: 9.82,
        tempMin: 9.59,
        tempMax: 9.82,
        cloudiness: 100,
        windSpeed: 5.7,
        humidity: 89,
        weatherIcon: '10n',
        condition: 500,
      },

      // 2019-05-15 00:00:00 UTC
      // Wednesday, May 15, 2019 3:00:00 AM GMT+03:00 DST
      {
        description: 'light rain',
        dateTime: 1557878400,
        temp: 8.45,
        tempMin: 8.45,
        tempMax: 8.45,
        cloudiness: 100,
        windSpeed: 5.69,
        humidity: 93,
        weatherIcon: '10n',
        condition: 500,
      },

      // 2019-05-15 03:00:00 UTC
      // Wednesday, May 15, 2019 6:00:00 AM GMT+03:00 DST
      {
        description: 'light rain',
        dateTime: 1557889200,
        temp: 7.86,
        tempMin: 7.86,
        tempMax: 7.86,
        cloudiness: 100,
        windSpeed: 6.03,
        humidity: 98,
        weatherIcon: '10n',
        condition: 500,
      },
    ];

    const weatherPeriods = data.map(period => new WeatherForecastPeriod(period));
    const weatherForecastPeriodList = new WeatherForecastPeriodList(weatherPeriods);
    const approximateWeatherForecast = weatherForecastPeriodList.getApproximateDaysWeatherForecast();

    // Action && Assertion
    expect(approximateWeatherForecast).toBeInstanceOf(WeatherForecastPeriodList);
    expect(approximateWeatherForecast.length).toBe(2);
  });

  it('creates approximate daily WeatherForecastPeriodList from response', () => {
    // Arrangement data from response
    const forecast = OpenWeatherMapResponseToWeatherForecastTransformer
      .transform(forecastWarsawResponseJson);

    // Action
    const { weatherForecastPeriodList } = forecast;
    const approximateWeatherForecast = weatherForecastPeriodList.getApproximateDaysWeatherForecast();

    // Assertion
    expect(approximateWeatherForecast).toBeInstanceOf(WeatherForecastPeriodList);
    expect(approximateWeatherForecast.length).toBe(6);
  });
});
