import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { LocationService } from "app/location.service";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

@Component({
    selector: 'app-country-selection', 
    templateUrl: './country-selection.component.html', 
    styleUrls: ['./country-selection.component.css']
})
export class CountrySelectionComponent implements OnInit {
    countryForm = new FormControl('');
    countries: string[] = [];
    filteredCountries: string[] = []; 

    constructor(
        private locationService: LocationService, 
    ) {}

    ngOnInit(): void {
        this.countries = this.locationService.getCountries();

        this.countryForm.valueChanges.pipe(
            debounceTime(100), 
            distinctUntilChanged()
        ).subscribe((value: string) => {
            this.filteredCountries = this.locationService.filterCountries(value);
        });
    }

    onInputSelect(): void {
        this.filteredCountries = this.countries;
    }

    onCountrySelect(index: number): void {
        this.countryForm.setValue(this.filteredCountries[index]);
        this.filteredCountries = [];
    }
}