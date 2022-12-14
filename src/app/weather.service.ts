import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Country } from './interfaces/country';

@Injectable()
export class WeatherService {

  static URL = 'https://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = [];
  public getCurrentConditions$ = new Subject<any>();
  public isLoading$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  addCurrentConditions(country: Country, zipcode: string) {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    this.isLoading$.next(true);
    this.http.get(`${WeatherService.URL}/weather?zip=${zipcode},${country.code}&units=imperial&APPID=${WeatherService.APPID}`)
      .subscribe(data => {
        this.isLoading$.next(false);
        this.currentConditions.push({zip: zipcode, country: country, data: data})
      });
  }

  updateCurrentConditions(): void {
    this.currentConditions.forEach(location => {
      this.http.get(`${WeatherService.URL}/weather?zip=${location.zip},${location.country.code}&units=imperial&APPID=${WeatherService.APPID}`)
        .subscribe((data) => {
          location.data = data;
          this.getCurrentConditions$.next(this.currentConditions);
        });
    });
  }

  removeCurrentConditions(zipcode: string) {
    for (let i in this.currentConditions){
      if (this.currentConditions[i].zip == zipcode)
        this.currentConditions.splice(+i, 1);
    }
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }
 
  getForecast(countryCode: string, zipcode: string): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${countryCode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

  getWeatherIcon(id){
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
