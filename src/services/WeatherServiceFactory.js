import axios from 'axios';
import ConfigService from './ConfigService';
import OpenWeatherMapAPIService from './OpenWeatherMapAPIService';

/**
 * Factory for creation Weather Service
 */
class WeatherServiceFactory {
  static create() {
    const config = ConfigService.get('services.openweathermap', {});

    return new OpenWeatherMapAPIService({ ...config, httpClient: axios.create() });
  }
}

export default WeatherServiceFactory;
