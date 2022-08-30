import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: 'app-country-selection', 
    templateUrl: './country-selection.component.html', 
    styleUrls: ['./country-selection.component.css']
})
export class CountrySelectionComponent implements OnInit {
    @Input() countryControl: FormControl;
    @Input() countries: string[] = [];
    @Input() filteredCountries: string[] = [];
    @Output() countryInput = new EventEmitter<string>();

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

    onRemoveSelection(): void {
        this.filteredCountries = [];
    }

    onCountrySelect(index: number): void {
        this.countryControl.setValue(this.filteredCountries[index]);
        this.onRemoveSelection();
    }
}