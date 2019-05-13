import expect from 'expect';
import BaseWeatherService from '../../../src/services/BaseWeatherService';

describe('BaseWeatherService.js', () => {
  it('creates query string from params object', () => {
    // Arrangement
    const params = {
      appid: 't29d92731317fdaccd0c9cu7c5k8066y',
      q: 'Warsaw',
      units: 'metric',
    };

    // Acting
    const query = BaseWeatherService.createQuery(params);

    // Assertion: appid=t29d92731317fdaccd0c9cu7c5k8066y&q=Warsaw&units=metric
    expect(query).toBe(`appid=${params.appid}&q=${params.q}&units=${params.units}`);
  });

  it('creates empty query string from empty params values', () => {
    // Acting and Assertion
    expect(BaseWeatherService.createQuery()).toBe('');
    expect(BaseWeatherService.createQuery(null)).toBe('');
    expect(BaseWeatherService.createQuery(undefined)).toBe('');
    expect(BaseWeatherService.createQuery({})).toBe('');
    expect(BaseWeatherService.createQuery('')).toBe('');
  });

  it('thrown exception for non supported createQuery param', () => {
    // Acting and Assertion
    expect(() => BaseWeatherService.createQuery(() => {}))
      .toThrow(/method expects first param to be type of 'Object'/);
  });
});
