import { Component, OnInit, OnDestroy } from '@angular/core';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { Profile } from '../../../../../profile/models';
import { CarInsurance, CarProposalHelper } from '@app/car/models';
import { Proposal } from '@app/insurance/models/proposal';
import { TagsService } from '../../../../../core/services/tags.service';
import { KNXWizardStepRxOptions, KNXStepError } from '@app/components/knx-wizard-rx/knx-wizard-rx.options';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { InsuranceAdvice } from '../../../../../insurance/models/index';
import { ContactDetailForm } from '../../../../../shared/forms/contact-detail.form';

import * as router from '../../../../../core/actions/router';
import * as fromRoot from '../../../../reducers';
import * as fromProfile from '../../../../../profile/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as assistant from '../../../../../core/actions/assistant';
import * as advice from '../../../../../insurance/actions/advice';
import * as fromCar from '../../../../../car/reducers';
import * as car from '../../../../../car/actions/car';
import * as fromCore from '@app/core/reducers';
import * as wizardActions from '@app/core/actions/wizard';
import * as fromAuth from '@app/auth/reducers';

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
  profile$: Observable<Profile>;
  insurance$: Observable<CarInsurance | InsuranceAdvice>;
  advice$: Observable<any>;
  car$: Observable<any>;
  acceptInsuranceTerms: boolean;
  acceptKnabTerms: boolean;
  form: ContactDetailForm;
  currentStepOptions: KNXWizardStepRxOptions;
  error$: Observable<KNXStepError>;
  content: Content;
  isAnonymous$: Observable<any>;
  isLoggedIn: boolean;
  subscription$: Subscription[] = [];

  formSummaryError = 'Je hebt de gebruikersvoorwaarden nog niet geaccepteerd.';

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
  }

  ngOnDestroy() {
    this.subscription$.forEach(subscription => subscription.unsubscribe());
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
    const flatData = Object.assign({},
      value.profileInfo,
      value.adviceInfo,
      value.adviceInfo.address,
      value.insuranceInfo,
      value.insuranceInfo._embedded.insurance,
      {car: value.carInfo},
      {dekking: this.getDekkingText(value.adviceInfo.coverage)},
      this.getUpdatedProfile());

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

  getUpdatedProfile() {
    let advice: any = this.asyncPipe.transform(this.advice$);
    return {
      firstName: advice.firstName,
      infix: advice.middleName,
      lastName: advice.lastName,
      initials: advice.initials,
      mobileNumber: advice.mobileNumber,
      phoneNumber: advice.phoneNumber
    };
  }

  goToPreviousStep() {
    this.store$.dispatch(new wizardActions.Back());
  }

  goToNextStep() {
    if (!this.summaryValid()) {
      return this.store$.dispatch(new wizardActions.Error({message: this.formSummaryError}));
    }

    Observable.combineLatest(this.profile$, this.advice$, this.insurance$, this.car$,
      (profile, advice, insurance, car) => {
        return {profileInfo: profile, adviceInfo: advice, insuranceInfo: insurance, carInfo: car};
      }).filter( value =>
        value.adviceInfo != null
        && value.carInfo != null
        && value.insuranceInfo != null)
        // && value.profileInfo != null)
        .subscribe((value) => {
          const proposalData = this.getProposalData(value);
          this.store$.dispatch(new car.Buy(proposalData));
        });

    Observable.combineLatest(
      this.store$.select(fromCar.getCarBuyComplete),
      this.store$.select(fromCar.getCarBuyError),
      (complete, error) => ({complete: complete, error: error}))
      .take(1)
      .subscribe(combined => {
        if (combined.error) {
          return this.store$.dispatch(new wizardActions.Error({
            message: 'Er is helaas iets mis gegaan. Probeer het later opnieuw.'
          }));
        }

        let subscription = this.store$.select(fromProfile.getProfile)
          .filter(profile => !!profile.emailaddress)
          .subscribe((profile) => {
            this.store$.select(fromInsurance.getSavedCarAdvices).take(1)
              .subscribe(SavedCarAdvices => {
                this.store$.dispatch(new advice.Remove(SavedCarAdvices[0]._id));
              });
            return this.store$.dispatch(new router.Go({path: ['/car/thank-you']}));
          });

        this.subscription$.push(subscription);
        // Navigate to thank you page
      });
  }

  private summaryValid() {
    return this.isLoggedIn ? this.acceptInsuranceTerms : this.acceptInsuranceTerms && this.acceptKnabTerms;
  }

}
