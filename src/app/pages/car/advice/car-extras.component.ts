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

      <knx-collapse-message [ngClass]="optionModifierClass" title="Aanvullende dekkingen" [isOpen]="true">
        <cx-form-group
          [options]="form.formConfig.extraOptions"
          [formControlName]="form.formConfig.extraOptions.formControlName">
        </cx-form-group>
      </knx-collapse-message>

      <knx-collapse-message [ngClass]="optionModifierClass" title="Pechhulp" [isOpen]="true">
        <cx-form-group
          [options]="form.formConfig.roadAssistance"
          [formControlName]="form.formConfig.roadAssistance.formControlName">
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
      letter-spacing: 0.05em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarExtrasComponent {
  @Input() form: CarExtrasForm;
  @Input() show: boolean;
  @Input() optionModifierClass: string;

  @Input() set advice(value: any) {
    if (value && value.insurance) {
      this.form.formGroup.patchValue({
        coverage: value.insurance.coverage,
        extraOptions: {
          legal: value.insurance.legal_aid,
          noclaim: value.insurance.no_claim_protection,
          occupants: value.insurance.cover_occupants
        },
        roadAssistance: value.insurance.road_assistance,
        ownRisk: value.insurance.own_risk,
        kmPerYear: value.insurance.kilometers_per_year
      }, { emitEvent: false }); // prevent infinite loop; valueChanges subscription CarAdviceComponent
    }
  }
}

