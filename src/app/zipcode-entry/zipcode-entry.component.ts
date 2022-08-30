import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent implements OnInit {
  @Input() zipcodeControl: FormControl;
  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
