import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HouseHoldPremiumsFilterForm } from './house-hold-premiums-filter.form';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { TagsService } from '@core/services';

// models
import { Price } from '@app/shared/models';
import { HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';

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
export class HouseHoldPremiumsFilterComponent {
  qaRootId = QaIdentifiers.houseHoldPremiumsRoot;
  coverages: Price[];

  constructor(tagsService: TagsService) {
    this.coverages = tagsService
      .getByKey('house_hold_flow_coverages')
      .map((el) => (JSON.parse(el.tag) as Price));
  }

  @Input() form: HouseHoldPremiumsFilterForm;
  @Input() show: boolean;
  /**
   * define a modifier
   */
  @Input() optionModifierClass: string;

  @Input() set glassDisabled(value: boolean) {
    this.form.formConfig.glassCoverage.inputOptions.disabled = value;
  }

  /**
   * the the value of the form
   * @param value
   */
  @Input() set advice(value: HouseHoldPremiumRequest) {
    if (value) {
      // setting checkbox values
      this.form.formGroup.patchValue({
        mainCoverage: value.CoverageCode,
        glassCoverage: value.IncludeGlass === 'J',
        outsideCoverage: value.IncludeOutdoorsValuable
      }, {
        emitEvent: false
      }); // prevent infinite loop; valueChanges subscription
    }
  }
}
