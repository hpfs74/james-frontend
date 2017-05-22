import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CarUser } from '../../models/car-prefs';
import { CarExtrasForm } from './car-extras.form';

@Component({
  selector: 'knx-car-extras',
  template: `
    <div class="knx-car-extras" [formGroup]="form.formGroup">
      <knx-collapse-message title="Dekking" [isOpen]="!collapsed">
      <cx-form-group
        [formControlName]="form.formConfig.coverage.formControlName"
        [options]="form.formConfig.coverage">
      </cx-form-group>
    </knx-collapse-message>

    <knx-collapse-message title="Aanvullende dekkingen" [isOpen]="!collapsed">
      <cx-form-group
        [formControlName]="form.formConfig.extraOptions.formControlName"
        [options]="form.formConfig.extraOptions">
      </cx-form-group>
    </knx-collapse-message>

    <knx-collapse-message title="Aantal KM per jaar" [isOpen]="!collapsed">
      <cx-form-group
        [formControlName]="form.formConfig.kmPerYear.formControlName"
        [options]="form.formConfig.kmPerYear">
      </cx-form-group>
    </knx-collapse-message>

    <knx-collapse-message title="Eigen risico" [isOpen]="!collapsed">
      <cx-form-group
        class="own-risk"
        [formControlName]="form.formConfig.ownRisk.formControlName"
        [options]="form.formConfig.ownRisk">
      </cx-form-group>
    </knx-collapse-message>
  </div>
  `
})

export class CarExtrasComponent implements OnInit {
  @Input() form: CarExtrasForm;
  @Input() collapsed: boolean;
  @Output() extrasChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.form.formGroup.valueChanges
      .debounceTime(200)
      .subscribe(data => {
        console.log(data);

        this.extrasChange.emit({
          coverage: data.coverage,
          cover_occupants: data.extraOptions.cover_occupants || false,
          kilometers_per_year: data.kmPerYear,
          no_claim_protection: data.extraOptions.noclaim || false,
          own_risk: data.ownRisk,
        });
    });
  }

}
