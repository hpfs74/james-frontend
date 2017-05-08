import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Car } from '../../models/car';
import { CarPreviewComponent } from './car-preview.component';
import { IChatMessage } from './../knx-chat-stream/chat-message.interface';

@Component({
  selector: 'knx-car-info',
  template: `
  <div class="knx-chat-message">
    <div class="container-fluid">
        <div class="knx-car-info__message">
          Molto bello! Mooie auto die <strong>{{ data.make | titleCase }} {{ data.model | titleCase }}</strong>
          <knx-car-preview [colorCode]="data.color_code"></knx-car-preview>
        </div>
        <div class="row">
          <div class="col-sm-6">Merk</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.make | uppercase  }}</div>
        </div>
        <div class="row">
          <div class="col-sm-6">Model</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.model | uppercase }}</div>
        </div>
        <div class="row" *ngIf="data.color">
          <div class="col-sm-6">Kleur</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.color | uppercase }}</div>
        </div>
        <div class="row" *ngIf="data.technical_type">
          <div class="col-sm-6">Brandstof</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.technical_type | uppercase }}</div>
        </div>
        <div class="row" *ngIf="data.transmission">
          <div class="col-sm-6">Transmissie</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.transmission || data.transmission_nl }}</div>
        </div>
        <div class="row" *ngIf="data.year">
          <div class="col-sm-6">Bouwjaar</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.year }}</div>
        </div>
        <div class="row" *ngIf="data.price_consumer_incl_vat">
          <div class="col-sm-6">Aanschafwaarde</div>
          <div class="col-sm-6 knx-car-info__item">{{ data.price_consumer_incl_vat | currency:'EUR':true }}</div>
        </div>
      </div>
    </div>
  `
})
export class CarInfoComponent implements IChatMessage {
  @Input() data: any;
}
