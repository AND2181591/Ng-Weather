import { Injectable } from '@angular/core';
import { COUNTRYLIST } from './countries';
import { Country } from './interfaces/country';
import { Location } from './interfaces/location';
import { WeatherService } from "./weather.service";

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  private countryList: Country[] = COUNTRYLIST;
  locations: Location[] = [];

  constructor(private weatherService : WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc.country, loc.zipcode);
  }

  getCountries(): Country[] {
    return this.countryList;
  }

  filterCountries(value: string): Country[] {
    if (value)
      return this.countryList.filter(country => country.name.toUpperCase().includes(value.toUpperCase()));
  }

  addLocation(country: Country, zipcode:string){
    const newLocation = { country: country, zipcode: zipcode };
    this.locations.push(newLocation);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(country, zipcode);
  }

  removeLocation(zipcode : string){
    let index = this.locations.findIndex(location => location.zipcode === zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
