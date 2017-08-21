import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarExtrasForm } from './car-extras.form';

@Component({
  selector: 'knx-car-extras',
  template: `
    <div class="knx-car-extras" [formGroup]="form.formGroup" *ngIf="show">
      <knx-collapse-message [ngClass]="optionModifierClass" title="Dekking" [isOpen]="true">
        <cx-form-group
          [options]="form.formConfig.coverage"
          [formControlName]="form.formConfig.coverage.formControlName">
        </cx-form-group>
      </knx-collapse-message>

      <knx-collapse-message [ngClass]="optionModifierClass" title="Pechhulp" [isOpen]="true">
        <cx-form-group
          [options]="form.formConfig.roadAssistance"
          [formControlName]="form.formConfig.roadAssistance.formControlName">
        </cx-form-group>
      </knx-collapse-message>

      <knx-collapse-message [ngClass]="optionModifierClass" title="Aanvullende dekkingen" [isOpen]="true">
        <cx-form-group
          [options]="form.formConfig.extraOptions"
          [formControlName]="form.formConfig.extraOptions.formControlName">
        </cx-form-group>
      </knx-collapse-message>

      <knx-collapse-message [ngClass]="optionModifierClass" title="Aantal KM per jaar" [isOpen]="true">
        <cx-form-group
          [options]="form.formConfig.kmPerYear"
          [formControlName]="form.formConfig.kmPerYear.formControlName">
        </cx-form-group>
      </knx-collapse-message>

      <knx-collapse-message [ngClass]="optionModifierClass" title="Eigen risico" [isOpen]="true">
        <cx-form-group class="own-risk"
          [options]="form.formConfig.ownRisk"
          [formControlName]="form.formConfig.ownRisk.formControlName">
        </cx-form-group>
      </knx-collapse-message>
    </div>
  `,
  styles: [`
    .own-risk {
      padding-bottom: 45px;
    }

    h4.knx-collapse-message__title {
      font-size: 16px;
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
      this.form.formGroup.patchValue({
        coverage: value.coverage,
        extraOptions: {
          legal: (value.legal_aid === 'LAY' || value.legal_aid === 'LAE'),
          noclaim: value.no_claim_protection,
          occupants: value.cover_occupants
        },
        roadAssistance: value.road_assistance,
        ownRisk: value.own_risk,
        kmPerYear: value.kilometers_per_year
      }, { emitEvent: false }); // prevent infinite loop; valueChanges subscription CarAdviceComponent
    }
  }
}

