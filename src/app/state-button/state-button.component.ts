import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";

@Component({
    selector: 'app-state-button',
    templateUrl: './state-button.component.html'
})
export class StateButtonComponent implements OnInit {
    private isLoading$ = new BehaviorSubject<boolean>(false);
    @Input() 
        get isLoading() { return this.isLoading$.value }
        set isLoading(value: boolean) { this.isLoading$.next(value); }
    @Input() defaultState: TemplateRef<any>;
    @Input() workingState: TemplateRef<any>;
    @Input() finishedState: TemplateRef<any>;
    @Input() customStyle: {};
    @Output() submitted = new EventEmitter<void>();
    displayedState: TemplateRef<any>;
    finishedStateTimer$ = timer(500);
    addClass: boolean;

    constructor() {}

    ngOnInit(): void {
        this.displayedState = this.defaultState;
    }

    onSubmit(): void {
        this.submitted.emit();
        this.isLoading$.subscribe((value) => {
            if (value) {
                this.addClass = false;
                this.displayedState = this.workingState;
            }

            if (!value) {
                this.addClass = true;
                this.displayedState = this.finishedState;
                this.finishedStateTimer$.subscribe(() => {
                    this.displayedState = this.defaultState;
                    this.addClass = false;
                });
            }
        });
    }
}
