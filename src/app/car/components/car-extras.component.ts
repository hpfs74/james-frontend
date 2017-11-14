import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CarExtrasForm } from './car-extras.form';

import { QaIdentifier } from './../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../shared/models/qa-identifiers';

@Component({
  selector: 'knx-car-extras',
  styleUrls: ['./car-extras.component.scss'],
  templateUrl: 'car-extras.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarExtrasComponent implements QaIdentifier {
  qaRootId = QaIdentifiers.carInsurances;

  @Input() form: CarExtrasForm;
  @Input() show: boolean;
  @Input() optionModifierClass: string;

  @Input() set advice(value: any) {
    if (value /*&& value.insurance*/) {
      // setting checkbox values
      this.form.formGroup.patchValue({
        coverage: value.coverage,
        extraOptionsLegal: (value.legal_aid === 'LAY' || value.legal_aid === 'LAE'),
        extraOptionsNoClaim: value.no_claim_protection,
        extraOptionsOccupants: value.cover_occupants,
        roadAssistance: value.road_assistance,
        ownRisk: value.own_risk,
        kmPerYear: value.kilometers_per_year
      }, { emitEvent: false }); // prevent infinite loop; valueChanges subscription CarAdviceComponent
    }
  }
}

