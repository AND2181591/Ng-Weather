import { Component, OnDestroy, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import { interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {
  currentConditions = [];
  conditionUpdates$ = interval(30000);
  weatherSubscribe: Subscription;
  updateSubscribe: Subscription;

  constructor(
    private weatherService : WeatherService, 
    private locationService : LocationService, 
    private router : Router) {
  }

  ngOnInit(): void {
    this.currentConditions = this.getCurrentConditions(); 
    this.weatherSubscribe = this.weatherService.getCurrentConditions$.subscribe(
      (conditions: any[]) => {
        this.currentConditions = conditions;
      }
    )

    this.updateSubscribe = this.conditionUpdates$.pipe( startWith(0) )
      .subscribe(() => { this.weatherService.updateCurrentConditions(); })
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(country: string, zipcode: string){
    this.router.navigate(['/forecast', country, zipcode])
  }

  ngOnDestroy(): void {
    this.weatherSubscribe.unsubscribe();
    this.updateSubscribe.unsubscribe();
  }
}
