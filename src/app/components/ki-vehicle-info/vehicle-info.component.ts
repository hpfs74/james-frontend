import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'ki-vehicle-info',
  template: `
  <div class="ki-chat-message ki-vehicle-info" [@flyInOut]="'in'">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">Molto bello! Mooie auto die <b>{{ vehicle.manufacturer }} {{ vehicle.name }} {{ vehicle.model }}</b></div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <img class="ki-vehicle-info-car-preview" alt="vehicle image"
               src="/assets/images/cars/{{ vehicle.manufacturer | lowercase }}/{{ vehicle.name | lowercase }}.jpg" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">Merk</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.manufacturer }} {{ vehicle.name }}</div>
      </div>
      <div class="row">
        <div class="col-sm-6">Model</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.model }}</div>
      </div>
      <div class="row" *ngIf="vehicle.engine">
        <div class="col-sm-6">Brandstof</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.engine }}</div>
      </div>
      <div class="row" *ngIf="vehicle.transmission">
        <div class="col-sm-6">Transmissie</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.transmission }}</div>
      </div>
      <div class="row" *ngIf="vehicle.year">
        <div class="col-sm-6">Bouwjaar</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.year }}</div>
      </div>
      <div class="row" *ngIf="vehicle.acquisitionValue">
        <div class="col-sm-6">Aanschafwaarde</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.acquisitionValue | currency }}</div>
      </div>
      <div class="row" *ngIf="vehicle.estimatedValue">
        <div class="col-sm-6">Geschatte waarde</div>
        <div class="col-sm-6 ki-chat-message-content">{{ vehicle.estimatedValue | currency }}</div>
      </div>
      </div>
  </div>`,
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.4s ease-in')
      ]),
      transition('* => void', [
        animate('0.4s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class VehicleInfoComponent {

  @Input() vehicle: Vehicle;
  @Input() comment: string;
  @Input() state: string;
}
