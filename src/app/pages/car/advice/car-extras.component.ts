import { Component, OnInit, Input } from '@angular/core';
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
  `]
})

export class CarExtrasComponent {
  @Input() form: CarExtrasForm;
  @Input() show: boolean;
  @Input() optionModifierClass: string;
}

