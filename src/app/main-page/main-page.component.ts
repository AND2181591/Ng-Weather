import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from 'app/interfaces/country';
import { LocationService } from 'app/location.service';
import { WeatherService } from 'app/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  loadingSubscribe: Subscription;
  done = {
    backgroundColor: '#198754', 
    borderColor: '#198754'
  }

  selectedCountry: Country;
  weatherForm = new FormGroup({
    country: new FormControl(''), 
    zipcode: new FormControl('')
  });

  constructor(
    private locationService: LocationService, 
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.countries = this.locationService.getCountries();

    this.loadingSubscribe = this.weatherService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    });
  }

  onTextInput(text: string): void {
    const enteredText = this.weatherForm.get('country').value;
    const countryExists = this.countries.find(country => country.name.toUpperCase() === enteredText.toUpperCase());
    if (countryExists) {
      this.onCountrySelect(countryExists);
    }
    this.filteredCountries = this.locationService.filterCountries(text);
  }

  onCountrySelect(country: Country): void {
    this.selectedCountry = country;
  }

  addLocation(): void {
    const zipcode = this.weatherForm.get('zipcode').value;
    this.locationService.addLocation(this.selectedCountry, zipcode);
  }

  ngOnDestroy(): void {
    this.loadingSubscribe.unsubscribe();
  }
    
}
