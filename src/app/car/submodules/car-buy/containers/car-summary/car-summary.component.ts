import { Component, OnInit, OnDestroy } from '@angular/core';
import { QaIdentifier } from '@app/shared/models/qa-identifier';
import { QaIdentifiers } from '@app/shared/models/qa-identifiers';
import { Profile } from '@app/profile/models';
import { CarInsurance, CarProposalHelper } from '@app/car/models';
import { Proposal } from '@app/insurance/models/proposal';
import { TagsService } from '@app/core/services/tags.service';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { InsuranceAdvice } from '@app/insurance/models/index';
import { ContactDetailForm } from '@app/shared/forms/contact-detail.form';
import { InsuranceReviewRegistrationForm } from '@app/components/knx-insurance-review/insuatance-review-registration.form';
import { registrationError } from '@app/registration/models/registration-error';

import * as router from '@app/core/actions/router';
import * as fromRoot from '../../../../reducers';
import * as fromProfile from '@app/profile/reducers';
import * as fromInsurance from '@app/insurance/reducers';
import * as assistant from '@app/core/actions/assistant';
import * as advice from '@app/insurance/actions/advice';
import * as fromCar from '@app/car/reducers';
import * as car from '@app/car/actions/car';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromAuth from '@app/auth/reducers';
import * as insurance from '@app/insurance/actions/insurance';
import * as carActions from '@app/car/actions/car';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import { ContentConfig, Content } from '@app/content.config';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'knx-car-summary-form',
  styleUrls: ['./car-summary.component.scss'],
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements QaIdentifier, OnInit, OnDestroy {
  qaRootId = QaIdentifiers.carSummary;

  subscription$: Subscription[] = [];
  insurance$: Observable<CarInsurance | InsuranceAdvice>;
  error$: Observable<KNXStepError>;
  profile$: Observable<Profile>;
  isAnonymous$: Observable<any>;
  advice$: Observable<any>;
  car$: Observable<any>;

  acceptInsuranceTerms: boolean;
  acceptKnabTerms: boolean;
  registrationForm: InsuranceReviewRegistrationForm;
  form: ContactDetailForm;
  currentStepOptions: KNXWizardStepRxOptions;
  content: Content;
  isLoggedIn: boolean;

  formSummaryError = 'Je hebt de gebruikersvoorwaarden nog niet geaccepteerd.';
  submiting = false;

  constructor(private tagsService: TagsService,
              private store$: Store<fromRoot.State>,
              public asyncPipe: AsyncPipe,
              public contentConfig: ContentConfig) {
    this.isAnonymous$ = this.store$.select(fromAuth.getLoggedIn).map(isLoggedIn => !isLoggedIn);
    this.isAnonymous$.take(1).subscribe(isAnonymous => this.isLoggedIn = !isAnonymous);
    this.content = contentConfig.getContent();
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.insurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.car$ = this.store$.select(fromCar.getCarInfo);
    this.error$ = this.store$.select(fromCore.getWizardError);
    this.currentStepOptions = {
      label: 'Overzicht',
      nextButtonLabel: 'Verzekering aanvragen',
      backButtonLabel: 'Terug',
      nextButtonClass: 'knx-button knx-button--cta knx-button--extended knx-button--3d',
    };
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.summary', clear: true}));
    this.store$.dispatch(new insurance.GetInsurances());
    this.subscription$ = [
      this.store$.select(fromCar.getCarBuyError).subscribe(this.handleBuyError),
      this.store$.select(fromCar.getCarBuyComplete).subscribe(this.handleBuyComplete)
    ];
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * handle buy complete subscription
   */
  handleBuyComplete(complete) {
    if (complete) {
      this.deleteAdvice();
      this.store$.dispatch(new router.Go({path: ['/car/thank-you']}));
      this.submiting = false;
    }
  }

  /**
   * handle buy error subscription
   */
  handleBuyError(errorData: any) {
    if (errorData[0]) {
      const errorCode = errorData[1];
      this.submiting = false;
      return this.store$.dispatch(new wizardActions.Error({
        message: registrationError[errorCode] || 'Er is helaas iets mis gegaan. Probeer het later opnieuw.'
      }));
    }
  }

  /**
   * handle the buy completation subscription
   *
   * @param value
   */
  handleBuyFinal(value) {
    this.submiting = true;
    const proposalData = this.getProposalData(value);
    this.store$.dispatch(new car.Buy(proposalData));
  }

  isValidInsurance(obj: any) {
    return (obj &&
      !this.isEmpty(obj) &&
      !this.isEmpty(obj._embedded) &&
      !this.isEmpty(obj._embedded.car));
  }

  isValidAdvice(obj: any) {
    return (obj &&
      !this.isEmpty(obj) &&
      !this.isEmpty(obj.address));
  }

  private isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }

  getDekkingText(coverage) {
    return this.tagsService.getTranslationText('car_flow_coverage', coverage)
      + '. '
      + this.tagsService.getTranslationDescription('car_flow_coverage', coverage);
  }

  getProposalData(value: any) {
    // convert anonymous flow email property to expected property
    if (value.adviceInfo.email) {
      value.adviceInfo.emailaddress = value.adviceInfo.email;
    }

    const flatData = Object.assign({},
      value.profileInfo,
      value.adviceInfo,
      value.adviceInfo.address,
      value.insuranceInfo,
      value.insuranceInfo._embedded.insurance,
      {car: value.carInfo},
      {dekking: this.getDekkingText(value.adviceInfo.coverage)}
    );

    // use the data from saved advice if profile is empty
    if (!flatData.number_extended) {
      flatData.number_extended = value.adviceInfo.location_info.number_extended;
    }

    const proposalRequest = new CarProposalHelper();
    const proposalData: Proposal = {
      advice_item_id: value.insuranceInfo.advice_item_id,
      proposal: value.insuranceInfo,
      items: proposalRequest.getItems(flatData).concat(
        proposalRequest.getFinalQuestionsItems(proposalRequest.getFinalQuestions(flatData))
      )
    };
    proposalData.proposal.car = proposalRequest.getCarInfo(value.carInfo, value.adviceInfo);
    return proposalData;
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    this.store$.dispatch(new carActions.ClearErrors());
    this.store$.dispatch(new wizardActions.ResetError());
    if (!this.summaryValid()) {
      return this.store$.dispatch(new wizardActions.Error({message: this.formSummaryError}));
    }

    if (!this.isLoggedIn) {
      this.store$.dispatch(new advice.Update(this.registrationForm.formGroup.value));
    }

    Observable.combineLatest(this.profile$, this.advice$, this.insurance$, this.car$,
      (profile, advice, insurance, car) => {
        return {profileInfo: profile, adviceInfo: advice, insuranceInfo: insurance, carInfo: car};
      }).filter(value =>
      value.adviceInfo != null
      && value.carInfo != null
      && value.insuranceInfo != null)
    // && value.profileInfo != null)
      .take(1)
      .subscribe(this.handleBuyFinal);
  }

  private deleteAdvice() {
    this.store$.dispatch(new advice.RemoveLatestInsuranceAdvice());
  }

  private summaryValid() {
    return this.isLoggedIn ? this.acceptInsuranceTerms :
      this.acceptInsuranceTerms && this.acceptKnabTerms && this.registrationForm.formGroup.valid;
  }

  public login() {
    this.store$.dispatch(new router.Go({path: ['/login']}));
  }
}
