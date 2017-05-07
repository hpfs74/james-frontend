import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Car } from '../../models/car';
import { CarPreviewComponent } from './car-preview.component';

@Component({
  selector: 'knx-car-info',
  template: `
  <div class="container-fluid knx-container--fullwidth">
      <div class="knx-car-info__message">
        Molto bello! Mooie auto die <strong>{{ car.make | titleCase }} {{ car.model | titleCase }}</strong>
        <knx-car-preview [colorCode]="car.color_code"></knx-car-preview>
      </div>
      <div class="row">
        <div class="col-sm-6">Merk</div>
        <div class="col-sm-6 knx-car-info__item ">{{ car.make | uppercase  }}</div>
      </div>
      <div class="row">
        <div class="col-sm-6">Model</div>
        <div class="col-sm-6 knx-car-info__item">{{ car.model | uppercase }}</div>
      </div>
      <div class="row" *ngIf="car.color">
        <div class="col-sm-6">Kleur</div>
        <div class="col-sm-6 knx-car-info__item">{{ car.color | uppercase }}</div>
      </div>
      <div class="row" *ngIf="car.technical_type">
        <div class="col-sm-6">Brandstof</div>
        <div class="col-sm-6 knx-car-info__item">{{ car.technical_type | uppercase }}</div>
      </div>
      <div class="row" *ngIf="car.transmission">
        <div class="col-sm-6">Transmissie</div>
        <div class="col-sm-6 knx-car-info__item">{{ car.transmission || car.transmission_nl }}</div>
      </div>
      <div class="row" *ngIf="car.year">
        <div class="col-sm-6">Bouwjaar</div>
        <div class="col-sm-6 knx-car-info__item">{{ car.year }}</div>
      </div>
      <div class="row" *ngIf="car.price_consumer_incl_vat">
        <div class="col-sm-6">Aanschafwaarde</div>
        <div class="col-sm-6 knx-car-info__item">{{ car.price_consumer_incl_vat | currency:'EUR':true }}</div>
      </div>
    </div>
  `
})
export class CarInfoComponent {
  @Input() car: Car;
  @Input() comment: string;
  @Input() state: string;
}
