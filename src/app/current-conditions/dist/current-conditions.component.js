"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurrentConditionsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CurrentConditionsComponent = /** @class */ (function () {
    function CurrentConditionsComponent(weatherService, locationService, router) {
        this.weatherService = weatherService;
        this.locationService = locationService;
        this.router = router;
        this.currentConditions = [];
        this.conditionUpdates$ = rxjs_1.interval(5000);
    }
    CurrentConditionsComponent.prototype.ngOnInit = function () {
        this.currentConditions = this.getCurrentConditions();
    };
    CurrentConditionsComponent.prototype.getCurrentConditions = function () {
        return this.weatherService.getCurrentConditions();
    };
    CurrentConditionsComponent.prototype.showForecast = function (zipcode) {
        this.router.navigate(['/forecast', zipcode]);
    };
    CurrentConditionsComponent = __decorate([
        core_1.Component({
            selector: 'app-current-conditions',
            templateUrl: './current-conditions.component.html',
            styleUrls: ['./current-conditions.component.css']
        })
    ], CurrentConditionsComponent);
    return CurrentConditionsComponent;
}());
exports.CurrentConditionsComponent = CurrentConditionsComponent;
