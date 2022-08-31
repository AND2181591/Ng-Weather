import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {

  countryCode: string;
  zipcode: string;
  forecast: Observable<any>;

  constructor(private weatherService: WeatherService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.countryCode = params['country'];
      this.zipcode = params['zipcode'];

      this.weatherService.getForecast(this.countryCode, this.zipcode)
        .subscribe(data => this.forecast = data);
    });
  }
}
