import { Component, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// core
import { TagsService } from '@app/core/services/tags.service';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import * as FormUtils from '@app/utils/base-form.utils';

// models
import { HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';
import { HouseHoldAmountRequest, HouseHoldAmountResponse } from '@app/house/models/house-hold-amount';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { Price } from '@app/shared/models';

// actions
import * as wizardActions from '@app/core/actions/wizard';
import * as router from '@app/core/actions/router';
import * as assistant from '@app/core/actions/assistant';
import * as householdinsuranceamount from '@app/house/actions/house-hold-insurance-amount';
import * as houseHoldData from '@app/house/actions/house-hold-data';

// reducers
import * as fromRoot from '@app/reducers';
import * as fromCore from '@app/core/reducers';
import * as fromHouse from '@app/house/reducers';

import { HouseHoldDekkingForm } from './house-hold-dekking.form';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'knx-house-hold-dekking-form',
  styleUrls: ['./house-hold-dekking.component.scss'],
  templateUrl: 'house-hold-dekking.component.html'
})
export class HouseHoldDekkingComponent implements OnInit, AfterViewInit, OnDestroy {
  qaRootId = QaIdentifiers.houseHoldDekking;

  form: HouseHoldDekkingForm;

  advice$: Observable<any>;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  coverages: Price[];

  isAmountLoaded$: Observable<boolean>;
  isAmountLoading$: Observable<boolean>;
  isAmountError$: Observable<boolean>;
  amount$: Observable<HouseHoldAmountResponse>;
  insuredAmount: number = null;

  houseHoldData$: Observable<HouseHoldPremiumRequest>;
  houseHoldData: HouseHoldPremiumRequest;

  subscriptions$: Subscription[] = [];
  copies: any = {};

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              private translateService: TranslateService) {

    this.translateService.get([
      'household.common.step.options.backButtonLabel',
      'household.dekking.step.options.nextButtonLabel',
      'house_hold_flow_coverages.5018.header',
      'house_hold_flow_coverages.5018.description',
      'house_hold_flow_coverages.5018.features',
      'house_hold_flow_coverages.5016.header',
      'house_hold_flow_coverages.5016.description',
      'house_hold_flow_coverages.5016.features',
      'household.dekking.error.dateofbirth'
    ]).subscribe(res => {
      this.copies = res;

      this.initializeForms();
    });

    this.coverages = tagsService
      .getByKey('house_hold_flow_coverages')
      .map((el) => {
        // (JSON.parse(el.tag) as Price)
        return {
          id: el.tag,
          header: this.copies[`house_hold_flow_coverages.${el.tag}.header`],
          description: this.copies[`house_hold_flow_coverages.${el.tag}.description`],
          features: (this.copies[`house_hold_flow_coverages.${el.tag}.features`] || '').split('|')
        } as Price;
      });

    this.currentStepOptions = {
      label: this.copies['general.dekking'],
      backButtonLabel: this.copies['household.common.step.options.backButtonLabel'],
      nextButtonLabel: this.copies['household.dekking.step.options.nextButtonLabel'],
      hideBackButton: false,
      hideNextButton: false
    };
  }

  selectInitialStates(): void {
    this.error$ = this.store$.select(fromCore.getWizardError);
  }

  initializeForms(): void {
    const formBuilder = new FormBuilder();
    this.form = new HouseHoldDekkingForm(formBuilder,
      this.tagsService.getAsLabelValue('house_hold_flow_net_income_range'),
      this.tagsService.getAsLabelValue('house_hold_flow_family_situation'),
      this.copies);
  }

  setIntialSubscription() {
    this.isAmountError$ = this.store$.select(fromHouse.getHouseHoldAmountError);
    this.isAmountLoading$ = this.store$.select(fromHouse.getHouseHoldAmountLoading);
    this.isAmountLoaded$ = this.store$.select(fromHouse.getHouseHoldAmountLoaded);
    this.amount$ = this.store$.select(fromHouse.getHouseHoldAmountResult);
    this.houseHoldData$ = this.store$.select(fromHouse.getHouseHoldDataInfo);

    this.subscriptions$.push(
      this.isAmountError$
        .filter(error => error)
        .subscribe(() => {
          this.store$.dispatch(new wizardActions.Error({message: this.translateService.instant('household.error_message_insured_amount')}));
          this.insuredAmount = null;
        }),
      this.amount$
        .filter(data => data !== null)
        .subscribe((data) => {
          this.insuredAmount = data.InsuredAmount;
        }),
      this.houseHoldData$
        .filter(data => data !== null)
        .subscribe(data => this.setFormValue(data)),

      this.houseHoldData$
        .filter(data => data !== null && !data.CoverageCode)
        .subscribe(() => this.store$.dispatch(new houseHoldData.Update({CoverageCode: 5018})))
    );
  }

  /**
   * update the form value
   *
   * @param value
   */
  setFormValue(value: HouseHoldPremiumRequest) {

    this.houseHoldData = value;

    if (value.IncludeOutdoorsValuable !== null) {
      this.form.formGroup.patchValue({outsideCoverage: value.IncludeOutdoorsValuable});
    }
    if (value.BreadWinnerMonthlyIncome !== null) {
      this.form.formGroup.patchValue({netIncomeRange: value.BreadWinnerMonthlyIncome});
    }
    if (value.BreadWinnerBirthdate !== null) {
      this.form.formGroup.patchValue({dateOfBirth: value.BreadWinnerBirthdate});
    }
    if (value.FamilyComposition !== null) {
      this.form.formGroup.patchValue({familySituation: value.FamilyComposition});
    }
    if (value.CommencingDate !== null) {
      this.form.formGroup.patchValue({commencingDate: value.CommencingDate});
    }
    if (value.InsuredAmount !== null) {
      this.form.formGroup.patchValue({insuredAmount: value.InsuredAmount});
    }
  }

  ngOnInit() {
    this.selectInitialStates();
    this.setIntialSubscription();
  }

  ngAfterViewInit(): void {
    // set form validators after the view has been fully loaded, otherwise it is getting an error
    this.setFormAsyncValidators();
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'household.welcome', clear: true}));
  }

  getInsuredAmount() {
    const detailForm = this.form.formGroup;

    if (detailForm.value.dateOfBirth && detailForm.value.familySituation && detailForm.value.netIncomeRange) {
      // shift the hour to convert in the correct format for RISK
      detailForm.value.dateOfBirth.setHours(12);

      const payload = {
        SurfaceArea: this.houseHoldData.SurfaceArea,
        OwnedBuilding: this.houseHoldData.OwnedBuilding,
        FamilyComposition: detailForm.value.familySituation,
        AmountMoreThan12KAudioVisualComp: 0,
        AmountMoreThan6KJewelry: 0,
        AmountMoreThan6KTenantsInterest: 0,
        AmountMoreThan15KSpecialPossesion: 0,
        BreadWinnerBirthdate: detailForm.value.dateOfBirth,
        BreadWinnerMonthlyIncome: detailForm.value.netIncomeRange
      } as HouseHoldAmountRequest;

      this.store$.dispatch(new householdinsuranceamount.GetInfo(payload));
    }
  }

  setFormAsyncValidators(): void {
    this.subscriptions$.push(
      this.form.formGroup.get('dateOfBirth').valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(() => this.getInsuredAmount()),
      this.form.formGroup.get('familySituation').valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(() => this.getInsuredAmount()),
      this.form.formGroup.get('netIncomeRange').valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(() => this.getInsuredAmount()));
  }


  /**
   * close all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  /**
   * update the form field related to the coverage
   * @param event
   */
  updateSelectedCoverage(event: Price) {
    this.form.formGroup.patchValue({
      coverage: event.id
    });
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  /**
   * check if the form is valid and move to the next step
   * @param event
   */
  goToNextStep(event ?: any) {
    const detailForm = this.form.formGroup;

    FormUtils.validateForm(detailForm);

    if (!detailForm.valid || this.insuredAmount === null) {
      return this.store$.dispatch(new wizardActions.Error({message: this.form.validationSummaryError}));
    }

    // shift the hour to convert in the correct format for RISK
    detailForm.value.dateOfBirth.setHours(12);
    detailForm.value.commencingDate.setHours(12);

    this.store$.dispatch(new houseHoldData.Update({
      CoverageCode: detailForm.value.coverage,
      IncludeOutdoorsValuable: detailForm.value.outsideCoverage,
      BreadWinnerMonthlyIncome: detailForm.value.netIncomeRange,
      BreadWinnerBirthdate: detailForm.value.dateOfBirth,
      FamilyComposition: detailForm.value.familySituation,
      InsuredAmount: this.insuredAmount,
      CommencingDate: detailForm.value.commencingDate
    }));

    this.store$.dispatch(new router.Go({path: ['/inboedel/advies']}));
  }
}
