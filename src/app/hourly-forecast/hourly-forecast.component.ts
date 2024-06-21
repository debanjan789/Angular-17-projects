import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.css']
})
export class HourlyForecastComponent implements OnInit {
  hourlyWeather: any[];
  unit: string = 'metric';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.hourlyWeatherSubject.subscribe(data => {
      this.hourlyWeather = data.slice(0, 12);
    });
  }

  getWeatherIcon(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}.png`;
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}
