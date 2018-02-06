import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HouseHoldPremiumsFilterForm } from './house-hold-premiums-filter.form';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';

/**
 * Handle the filters over the premiums, gives the user the ability to change the coverage and
 * outside and glass.
 *
 */
@Component({
  selector: 'knx-house-hold-premiums-filter',
  styleUrls: ['house-hold-premiums-filter.component.scss'],
  templateUrl: './house-hold-premiums-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseHoldPremiumsFilterComponent  {
  qaRootId = QaIdentifiers.houseHoldPremiumsRoot;

  @Input() form: HouseHoldPremiumsFilterForm;
  @Input() show: boolean;
  /**
   * define a modifier
   */
  @Input() optionModifierClass: string;

  /**
   * the the value of the form
   * @param value
   */
  @Input() set advice(value: any) {
    if (value) {
      // setting checkbox values
      this.form.formGroup.patchValue({
        mainCoverage: value.mainCoverage,
        glassCoverage: value.GlassCoverage,
        outsideCoverage: value.OutsideCoverage
      }, { emitEvent: false }); // prevent infinite loop; valueChanges subscription
    }
  }
}
