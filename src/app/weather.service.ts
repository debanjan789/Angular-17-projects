import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '38330b9a6cc89890132ed7e1ffeafc19';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiHourlyUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  weatherSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  hourlyWeatherSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  unit: string = 'metric'; // default to Celsius

  constructor() {}

  async getWeather(city: string) {
    try {
      const response = await axios.get(`${this.apiUrl}?q=${city}&units=${this.unit}&appid=${this.apiKey}`);
      this.weatherSubject.next(response.data);
      this.getHourlyWeather(response.data.coord.lat, response.data.coord.lon);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getHourlyWeather(lat: number, lon: number) {
    try {
      const response = await axios.get(`${this.apiHourlyUrl}?lat=${lat}&lon=${lon}&units=${this.unit}&appid=${this.apiKey}`);
      this.hourlyWeatherSubject.next(response.data.list);
    } catch (error) {
      console.error(error);
    }
  }

  setUnit(unit: string) {
    this.unit = unit;
  }
}
