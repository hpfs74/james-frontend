import { Component, OnInit, Input } from '@angular/core';

import { InsuranceBase, Insurance } from '../../models/insurance';

@Component({
  selector: 'knx-insurance-result',
  template: `
    <div class="knx-insurance-result">
      <div class="row">
        <div class="col-sm-4">
          <img class="knx-insurance-result__logo" src="{{ insurance._embedded.insurance_logo}}">
        </div>
        <div class="col-sm-4">
          Eigen risico: {{ insurance.own_risk }}
          Reviews
          Profielscore

        </div>
        <div class="col-sm-4">
          {{ insurance.monthly_premium }} per maand

          <button role="button" class="knx-button knx-button--primary">Dit wil ik</button>
        </div>
      </div>
    </div>
  `
})

export class InsuranceResultComponent {
  @Input() insurance: InsuranceBase;
}
