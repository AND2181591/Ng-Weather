import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'app/weather.service';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent implements OnInit {
  isLoading = false;
  done = {
    backgroundColor: '#198754', 
    borderColor: '#198754'
  }

  constructor(
    private locationService : LocationService, 
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    });
  }

  addLocation(zipcode : string){
    this.locationService.addLocation(zipcode);
  }

}
