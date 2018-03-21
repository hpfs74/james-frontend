import { Component, OnInit } from '@angular/core';
import {
  CalculatedPremium, HouseHoldPremiumRequest,
  HouseHoldPremiumResponse
} from '@app/house/models/house-hold-premium';
import * as assistant from '@core/actions/assistant';
import { Store } from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';


import * as fromHouseHold from '@app/house/reducers';
import { HouseHoldPremiumsBuyForm } from './house-hold-premiums-buy.form';
import { FormBuilder } from '@angular/forms';
import * as FormUtils from '@utils/base-form.utils';
import * as houseHoldData from '@app/house/actions/house-hold-data';
import * as wizardActions from '@core/actions/wizard';
import { KNXStepError, KNXWizardStepRxOptions } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';


@Component({
  selector: 'knx-house-hold-premiums-buy',
  templateUrl: './house-hold-premiums-buy.component.html',
  styleUrls: ['./house-hold-premiums-buy.component.scss']
})
export class HouseHoldPremiumsBuyComponent implements OnInit {

  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;

  selectedInsurance$: Observable<CalculatedPremium>;
  insurance: CalculatedPremium;
  form: HouseHoldPremiumsBuyForm;
  copies: any = {};
  insurer = '';
  constructor(private store$: Store<fromRoot.State>, private translateService: TranslateService) {
    const formBuilder = new FormBuilder();
    this.translateService.get([
      'household.common.step.options.backButtonLabel',
      'household.premium.buy.step.options.nextButtonLabel',
      'household.premium.buy.your_name.label',
      'household.premium.buy.your_name.placeholder',
      'household.premium.buy.your_email.label',
      'household.premium.buy.your_email.placeholder',
      'household.premium.buy.your_phone.label',
      'household.premium.buy.your_phone.placeholder',
      'household.premium.buy.checkbox.label'
    ]).subscribe(res => {
      this.copies = res;
      this.form = new HouseHoldPremiumsBuyForm(formBuilder, this.copies);

      this.currentStepOptions = {
        backButtonLabel: this.copies['household.common.step.options.backButtonLabel'],
        nextButtonLabel: this.copies['household.premium.buy.step.options.nextButtonLabel'],
        hideBackButton: false,
        hideNextButton: false,
        nextButtonClass: 'knx-button knx-button--3d knx-button--primary'
      };
    });
  }

  ngOnInit() {

    this.store$.dispatch(new assistant.AddCannedMessage({
      key: 'household.buy',
      clear: true
    }));


    this.selectedInsurance$ = this.store$.select(fromHouseHold.getHouseHoldSelectedAdvice);
  }

  goToPrevStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep(event?: any) {
    const detailForm = this.form.formGroup;
    FormUtils.validateForm(detailForm);

    if (!detailForm.valid) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    // add code to save in store with the package
    this.store$.dispatch(new houseHoldData.Update({
      customerName: detailForm.value.name,
      customerEmail: detailForm.value.email,
      customerPhone: detailForm.value.phone
    }));

    // TODO: call the store advice here

    // go to the next step
    this.store$.dispatch(new wizardActions.Forward());

  }
}
