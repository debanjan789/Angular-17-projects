import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { FormsModule } from '@angular/forms';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherSearchComponent,
    HourlyForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
