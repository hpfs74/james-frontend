import { Component, Input } from '@angular/core';
import { Car } from '../../models';

@Component({
  selector: 'knx-car-summary',
  template: `
  <div class="knx-car-summary knx-well">
    <div class="knx-well__content">
      <div class="container knx-container--fullwidth">
        <div class="row" *ngIf="car.license">
          <div class="col-sm-7 knx-car-summary__label">Kenteken</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.license | licensePlate }}</div>
        </div>
        <div class="row" *ngIf="car.make">
          <div class="col-sm-7 knx-car-summary__label">Merk</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.make }}</div>
        </div>
        <div class="row" *ngIf="car.model">
          <div class="col-sm-7 knx-car-summary__label">Model</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.model }}</div>
        </div>
        <div class="row" *ngIf="car.edition">
          <div class="col-sm-7 knx-car-summary__label">Type</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.edition | uppercase }}</div>
        </div>
        <div class="row" *ngIf="car.year">
          <div class="col-sm-7 knx-car-summary__label">Bouwjaar</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.year }}</div>
        </div>
        <div class="row" *ngIf="car.current_value">
          <div class="col-sm-7 knx-car-summary__label">Cataloguswaarde</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.current_value | currency:'EUR':true }}</div>
        </div>
        <div class="row" *ngIf="car.price_consumer_incl_vat">
          <div class="col-sm-7 knx-car-summary__label">Dagwaarde</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.price_consumer_incl_vat | currency:'EUR':true }}</div>
        </div>
        <div class="row" *ngIf="car.weight_empty_vehicle">
          <div class="col-sm-7 knx-car-summary__label">Gewicht</div>
          <div class="col-sm-5 knx-car-summary__info">{{ car.weight_empty_vehicle}} kg</div>
        </div>
        <!--<div class="row" *ngIf="options.kilometers_per_year">
          <div class="col-sm-6 knx-car-summary__label">Km. per jaar</div>
          <div class="col-sm-6 knx-car-summary__info">{{ options.kilometers_per_year }}</div>
        </div>
        -->
      </div>
    </div>
  </div>
  `
})
export class CarSummaryComponent {
  @Input() car: Car;
  @Input() options: any;

}
