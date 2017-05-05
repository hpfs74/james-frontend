import { Component, OnInit, Input } from '@angular/core';
import { Insurance } from '../../models/insurance';

@Component({
  selector: 'knx-car-result-form',
  templateUrl: 'car-result.component.html'
})

export class CarResultComponent {
  @Input() insurancesLoading: boolean;
  @Input() insurances: Array<Insurance>;
}
