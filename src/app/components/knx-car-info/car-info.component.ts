import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Car } from '../../models/car';

@Component({
  selector: 'knx-car-info',
  template: `
  <div class="container-fluid knx-container--fullwidth">
      Molto bello! Mooie auto die <strong>{{ car.make | titleCase }} {{ car.model | titleCase }}</strong>
      <!-- TODO: implement visual preview -->
      <img class="knx-car-info__visual" alt="car image"
                src="/assets/images/cars/{{ car.make | lowercase }}.jpg">
      <div class="row">
        <div class="col-sm-6">Merk</div>
        <div class="col-sm-6 knx-chat-message-content ">{{ car.make | uppercase  }}</div>
      </div>
      <div class="row">
        <div class="col-sm-6">Model</div>
        <div class="col-sm-6 knx-chat-message-content">{{ car.model | uppercase }}</div>
      </div>
      <div class="row" *ngIf="car.color">
        <div class="col-sm-6">Kleur</div>
        <div class="col-sm-6 knx-chat-message-content">{{ car.color | uppercase }}</div>
      </div>
      <div class="row" *ngIf="car.technical_type">
        <div class="col-sm-6">Brandstof</div>
        <div class="col-sm-6 knx-chat-message-content">{{ car.technical_type | uppercase }}</div>
      </div>
      <div class="row" *ngIf="car.transmission">
        <div class="col-sm-6">Transmissie</div>
        <div class="col-sm-6 knx-chat-message-content">{{ car.transmission || car.transmission_nl }}</div>
      </div>
      <div class="row" *ngIf="car.year">
        <div class="col-sm-6">Bouwjaar</div>
        <div class="col-sm-6 knx-chat-message-content">{{ car.year }}</div>
      </div>
      <div class="row" *ngIf="car.price_consumer_incl_vat">
        <div class="col-sm-6">Aanschafwaarde</div>
        <div class="col-sm-6 knx-chat-message-content">{{ car.price_consumer_incl_vat | currency:'EUR':true }}</div>
      </div>
    </div>
  `
})
export class CarInfoComponent {
  @Input() car: Car;
  @Input() comment: string;
  @Input() state: string;
}
