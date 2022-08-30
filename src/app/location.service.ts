import { Injectable } from '@angular/core';
import { COUNTRYLIST } from './countries';
import { Country } from './interfaces/country';
import { WeatherService } from "./weather.service";

export const COUNTRIES: string = 'countries';
export const LOCATIONS : string = "locations";
export interface LocationsTemp {
  country: Country;
  zipcode: string;
}

@Injectable()
export class LocationService {

  private countryList: Country[] = COUNTRYLIST;
  locationsTemp: LocationsTemp[] = [];
  locations: string[] = [];

  constructor(private weatherService : WeatherService) {
    // let locStringTemp = localStorage.getItem(LOCATIONS);

    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    // for (let loc of this.locations)
      // this.weatherService.addCurrentConditions(country, loc);
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
    this.locationsTemp.push(newLocation);

    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(country, zipcode);
  }

  removeLocation(zipcode : string){
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
