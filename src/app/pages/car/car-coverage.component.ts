import { Component, OnInit, Input } from '@angular/core';

import { Price } from '../../models/price';

@Component({
  selector: 'knx-car-coverage-form',
  templateUrl: './car-coverage.component.html'
})

export class CarCoverageComponent {
  public isCoverageLoading: boolean = true;

  @Input() coverages: Price[];
}
