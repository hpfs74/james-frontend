import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Car } from '../../models/car';
import { CarPreviewComponent } from './car-preview.component';
import { IChatMessage } from './../knx-chat-stream/chat-message.interface';

@Component({
  selector: 'knx-car-info',
  template: `
  <div class="container-fluid knx-container--fullwidth">
      <div class="knx-car-info__message">
        Molto bello! Mooie auto die <strong>{{ data.car.make | titleCase }} {{ data.car.model | titleCase }}</strong>
        <knx-car-preview [colorCode]="data.car.color_code"></knx-car-preview>
      </div>
      <div class="row">
        <div class="col-sm-6">Merk</div>
        <div class="col-sm-6 knx-car-info__item ">{{ data.car.make | uppercase  }}</div>
      </div>
      <div class="row">
        <div class="col-sm-6">Model</div>
        <div class="col-sm-6 knx-car-info__item">{{ data.car.model | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data.car.color">
        <div class="col-sm-6">Kleur</div>
        <div class="col-sm-6 knx-car-info__item">{{ data.car.color | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data.car.technical_type">
        <div class="col-sm-6">Brandstof</div>
        <div class="col-sm-6 knx-car-info__item">{{ data.car.technical_type | uppercase }}</div>
      </div>
      <div class="row" *ngIf="data.car.transmission">
        <div class="col-sm-6">Transmissie</div>
        <div class="col-sm-6 knx-car-info__item">{{ data.car.transmission || data.car.transmission_nl }}</div>
      </div>
      <div class="row" *ngIf="data.car.year">
        <div class="col-sm-6">Bouwjaar</div>
        <div class="col-sm-6 knx-car-info__item">{{ data.car.year }}</div>
      </div>
      <div class="row" *ngIf="data.car.price_consumer_incl_vat">
        <div class="col-sm-6">Aanschafwaarde</div>
        <div class="col-sm-6 knx-car-info__item">{{ data.car.price_consumer_incl_vat | currency:'EUR':true }}</div>
      </div>
    </div>
  `
})
export class CarInfoComponent implements IChatMessage {
  @Input() data: any;
}
