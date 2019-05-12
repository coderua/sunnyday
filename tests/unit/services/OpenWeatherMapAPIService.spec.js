import axios from 'axios';
import expect from 'expect';
import moxios from 'moxios';
import OpenWeatherMapAPIService from '../../../src/services/OpenWeatherMapAPIService';

describe('OpenWeatherMapAPIService.js', () => {
  it('creates an instance with default params', () => {
    // Acting
    const openWeatherMapAPIService = new OpenWeatherMapAPIService();

    // Assertion
    expect(openWeatherMapAPIService).toBeInstanceOf(OpenWeatherMapAPIService);
  });

  it('creates an instance with API key', () => {
    // Arrangement
    const apiKey = 't29d92731317fdaccd0c9cu7c5k8066y';

    // Acting
    const openWeatherMapAPIService = new OpenWeatherMapAPIService(apiKey);

    // Assertion
    expect(openWeatherMapAPIService).toBeInstanceOf(OpenWeatherMapAPIService);
  });

  it('creates an instance with API key and custom endpoint', () => {
    // Arrangement
    const config = {
      apiKey: 't29d92731317fdaccd0c9cu7c5k8066y',
      apiEndpoint: 'https://api.openweathermap.org/v2',
    };

    // Acting
    const openWeatherMapAPIService = new OpenWeatherMapAPIService(config);

    // Assertion
    expect(openWeatherMapAPIService).toBeInstanceOf(OpenWeatherMapAPIService);
  });

  it('validates an API key', () => {
    // Arrangement
    const config = { apiKey: 'abcdefghigklmnopqrstuvwxyz' };

    // Acting && Assertion
    expect(() => new OpenWeatherMapAPIService(config)).toThrow(/Invalid API key/);
    expect(() => {
      const openWeatherMapAPIService = new OpenWeatherMapAPIService();

      openWeatherMapAPIService.apiKey = config.apiKey;
    })
      .toThrow(/Invalid API key/);
  });

  it('validates an API endpoint', () => {
    // Arrangement
    const config = { apiKey: 't29d92731317fdaccd0c9cu7c5k8066y' };

    // Acting && Assertion
    expect(() => {
      const openWeatherMapAPIService = new OpenWeatherMapAPIService(config);

      openWeatherMapAPIService.apiEndpoint = '';
    })
      .toThrow(/Invalid API endpoint/);
  });

  it('validates an HTTP client', () => {
    // Arrangement
    const httpClient = axios.create();
    moxios.install(httpClient);

    const openWeatherMapAPIService = new OpenWeatherMapAPIService();

    // Acting
    openWeatherMapAPIService.httpClient = httpClient;

    // Assertion
    expect(openWeatherMapAPIService.httpClient).toBeInstanceOf(Function);

    moxios.uninstall(httpClient);
  });

  it('validates an HTTP client for invalid instance', () => {
    // Arrangement
    const openWeatherMapAPIService = new OpenWeatherMapAPIService();

    // Acting && Assertion
    expect(() => {
      openWeatherMapAPIService.httpClient = 'not a valid http client';
    })
      .toThrow(/Invalid HTTP Client/);
  });
});
