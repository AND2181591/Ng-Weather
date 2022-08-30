import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Country } from "app/interfaces/country";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: 'app-country-selection', 
    templateUrl: './country-selection.component.html', 
    styleUrls: ['./country-selection.component.css']
})
export class CountrySelectionComponent implements OnInit {
    @Input() countryControl: FormControl;
    @Input() countries: Country[] = [];
    @Input() filteredCountries: Country[] = [];
    @Output() countryInput = new EventEmitter<string>();
    @Output() countrySelect = new EventEmitter<Country>();

    constructor() {}

    ngOnInit(): void {
        this.countryControl.valueChanges.pipe(
            debounceTime(100), 
            distinctUntilChanged()
        ).subscribe((value: string) => {
            this.countryInput.emit(value);
        });
    }

    onRevealSelection(): void {
        this.filteredCountries = this.countries;
    }

    onCountrySelect(index: number): void {
        this.countryControl.setValue(this.filteredCountries[index].name);
        this.countrySelect.emit(this.filteredCountries[index]);
        this.filteredCountries = [];
    }
}