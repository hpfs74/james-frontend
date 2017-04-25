import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Car } from '../../models/car';

@Component({
  selector: 'knx-vehicle-info',
  template: `
  <div class="container-fluid container--fullwidth">
      Molto bello! Mooie auto die <strong>{{ vehicle.manufacturer }} {{ vehicle.name }} {{ vehicle.model }}</strong>
      <img class="knx-vehicle-info-car-preview" alt="vehicle image"
                src="/assets/images/cars/{{ vehicle.manufacturer | lowercase }}/{{ vehicle.name | lowercase }}.jpg">

      <div class="row">
        <div class="col-sm-6">Merk</div>
        <div class="col-sm-6 knx-chat-message-content ">{{ vehicle.manufacturer | uppercase  }} {{ vehicle.name | uppercase }}</div>
      </div>
      <div class="row">
        <div class="col-sm-6">Model</div>
        <div class="col-sm-6 knx-chat-message-content">{{ vehicle.model | uppercase }}</div>
      </div>
      <div class="row" *ngIf="vehicle.engine">
        <div class="col-sm-6">Brandstof</div>
        <div class="col-sm-6 knx-chat-message-content">{{ vehicle.engine | uppercase }}</div>
      </div>
      <div class="row" *ngIf="vehicle.transmission">
        <div class="col-sm-6">Transmissie</div>
        <div class="col-sm-6 knx-chat-message-content">{{ vehicle.transmission }}</div>
      </div>
      <div class="row" *ngIf="vehicle.year">
        <div class="col-sm-6">Bouwjaar</div>
        <div class="col-sm-6 knx-chat-message-content">{{ vehicle.year }}</div>
      </div>
      <div class="row" *ngIf="vehicle.acquisitionValue">
        <div class="col-sm-6">Aanschafwaarde</div>
        <div class="col-sm-6 knx-chat-message-content">{{ vehicle.acquisitionValue | currency }}</div>
      </div>
      <div class="row" *ngIf="vehicle.estimatedValue">
        <div class="col-sm-6">Geschatte waarde</div>
        <div class="col-sm-6 knx-chat-message-content">{{ vehicle.estimatedValue | currency }}</div>
      </div>
    </div>
  `
})
export class VehicleInfoComponent {
  @Input() vehicle: Car;
  @Input() comment: string;
  @Input() state: string;
}