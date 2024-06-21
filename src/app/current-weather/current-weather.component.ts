import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  weather: any;
  weatherSubscription: Subscription;
  unit: string = 'metric';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherSubscription = this.weatherService.weatherSubject.subscribe(data => {
      this.weather = data;
    });
    this.loadWeather('Kharagpur');
  }

  async loadWeather(city: string) {
    await this.weatherService.getWeather(city);
  }

  ngOnDestroy() {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  getWeatherIcon(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  getWindDirection(deg: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.floor((deg + 11.25) / 22.5);
    return directions[index % 16];
  }

  toggleUnit() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
    this.weatherService.setUnit(this.unit);
    this.loadWeather(this.weather.name); // reload weather data for the current city
  }

  formatTime(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString();
  }
}
