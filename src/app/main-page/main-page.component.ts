import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from 'app/location.service';
import { WeatherService } from 'app/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
  isLoading = false;
  countries: string[] = [];
  filteredCountries: string[] = [];

  weatherForm = new FormGroup({
    country: new FormControl(''), 
    zipcode: new FormControl('')
  });

  done = {
    backgroundColor: '#198754', 
    borderColor: '#198754'
  }

  constructor(
    private locationService: LocationService, 
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.countries = this.locationService.getCountries();

    this.weatherService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    });
  }

  onTextInput(text: string): void {
    this.weatherForm.get('country').setValue(text);
    this.filteredCountries = this.locationService.filterCountries(text);
  }

  onCountrySelect(country: string): void {
    console.log(country)
  }

  addLocation(): void {
    const country = this.weatherForm.get('country').value;
    const zipcode = this.weatherForm.get('zipcode').value;
    this.locationService.addLocation(zipcode);
  }
    
}
