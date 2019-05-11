import axios from 'axios';
import ConfigService from './ConfigService';
import OpenWeatherMapAPIService from './OpenWeatherMapAPIService';

/**
 * Factory for creation Weather Service
 */
class WeatherServiceFactory {
  static create() {
    const { apiKey, endpoint } = ConfigService.get('services.openweathermap');

    return new OpenWeatherMapAPIService(apiKey, endpoint, axios.create());
  }
}

export default WeatherServiceFactory;