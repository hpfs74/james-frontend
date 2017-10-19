import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarExtrasForm } from './car-extras.form';

@Component({
  selector: 'knx-car-extras',
  templateUrl: 'car-extras.component.html',
  styles: [`
    .own-risk {
      padding-bottom: 45px;
    }

    .knx-message {
      font-size: 14px;
    }

    h4.knx-collapse-message__title {
      font-size: 16px;
    }

    .knx-message__content ul {
      margin-top: 10px;
    }

    .knx-message__content ul > li {
      font-size: 14px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarExtrasComponent {
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

