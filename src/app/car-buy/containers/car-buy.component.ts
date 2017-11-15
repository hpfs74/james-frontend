import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { KNXStepOptions } from '@knx/wizard';

import * as fromRoot from '../../reducers';
import * as fromInsurance from '../../insurance/reducers';
import * as fromCar from '../../car/reducers';
import * as fromCore from '../../core/reducers';
import * as fromProfile from '../../profile/reducers';

import * as assistant from '../../core/actions/assistant';
import * as router from '../../core/actions/router';

import * as car from '../../car/actions/car';
import * as advice from '../../insurance/actions/advice';
import * as compare from '../../car/actions/compare';

import { AssistantConfig } from '../../core/models/assistant';
import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { Profile } from './../../profile/models';

import { ContactDetailForm } from '../../shared/forms/contact-detail.form';
import { Proposal, CarProposalHelper } from '../../car/models/proposal';

import { CarReportingCodeForm } from '../components/car-reporting-code.form';
import { CarCheckForm } from '../components/car-check.form';
import { TagsService } from '../../core/services/tags.service';

import { QaIdentifier } from './../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../shared/models/qa-identifiers';

import { IbanForm } from '../../shared/forms/iban.form';
import { BaseForm } from '../../shared/forms/base-form';
import * as FormUtils from '../../utils/base-form.utils';
import { scrollToY } from '../../utils/scroll-to-element.utils';

@Component({
  selector: 'knx-car-buy',
  templateUrl: 'car-buy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CarBuyComponent implements OnInit, QaIdentifier {
  qaRootId = QaIdentifiers.carBuyRoot;
  formSteps: Array<KNXStepOptions>;
  currentStep: number;

  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  profile$: Observable<Profile>;
  advice$: Observable<any>;
  insurance$: Observable<any>;
  car$: Observable<any>;

  // Forms
  contactDetailForm: ContactDetailForm;
  reportingCodeForm: CarReportingCodeForm;
  checkForm: CarCheckForm;
  paymentForm: IbanForm;
  acceptFinalTerms: boolean;

  constructor(private store$: Store<fromRoot.State>, private tagsService: TagsService) {}

  ngOnInit() {
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert autoverzekeringen'
      }
    }));
    scrollToY();
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.insurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.car$ = this.store$.select(fromCar.getCarInfo);

    const formBuilder = new FormBuilder();
    this.contactDetailForm = new ContactDetailForm(formBuilder);
    this.reportingCodeForm = new CarReportingCodeForm(formBuilder, this.tagsService.getAsLabelValue('buyflow_carsecurity'));
    this.checkForm = new CarCheckForm(formBuilder);
    this.paymentForm = new IbanForm(formBuilder);

    this.currentStep = 0;
    this.formSteps = [
      {
        label: 'Contactgegevens',
        nextButtonLabel: 'Naar autogegevens',
        backButtonLabel: 'Terug',
        hideBackButton: true,
        onShowStep: () => this.initFormWithProfile(),
        onBeforeNext: this.submitForm.bind(this, this.contactDetailForm)
      },
      {
        label: 'Autogegevens',
        nextButtonLabel: 'Naar check',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initFormWithProfile(),
        onBeforeNext: this.submitForm.bind(this, this.reportingCodeForm)
      },
      {
        label: 'Check',
        nextButtonLabel: 'Naar betalingsgegevens',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initCheckForm('car.buy.check'),
        onBeforeNext: this.submitForm.bind(this, this.checkForm)
      },
      {
        label: 'Betaling',
        nextButtonLabel: 'Naar overzicht',
        backButtonLabel: 'Terug',
        onShowStep: () => this.initForm('car.buy.payment'),
        onBeforeNext: this.submitForm.bind(this, this.paymentForm)
      },
      {
        label: 'Overzicht',
        nextButtonLabel: 'Verzekering aanvragen',
        backButtonLabel: 'Terug',
        nextButtonClass: 'knx-button knx-button--cta knx-button--extended knx-button--3d',
        onShowStep: () => this.initSummaryForm('car.buy.summary'),
        onBeforeNext: this.submitInsurance.bind(this)
      }
    ];
  }

  initFormWithProfile() {
    scrollToY();

    this.profile$ = this.store$.select(fromProfile.getProfile);

    this.store$.dispatch(new assistant.ClearAction);
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.fill'}));
  }

  initForm(messageKey: string) {
    scrollToY();
    this.store$.dispatch(new assistant.AddCannedMessage({key: messageKey, clear: true}));
  }

  initCheckForm(messageKey: string) {
    scrollToY();
    this.store$.select(fromInsurance.getSelectedInsurance)
      .subscribe((insurance) => {
        const insuranceName = insurance._embedded.insurance.insurance_brand || null;
        if (insuranceName) {
          this.store$.dispatch(new assistant.AddCannedMessage({
            key: messageKey,
            value: insuranceName,
            clear: true
          }));
        }
      });
  }

  initSummaryForm(message: string) {
    this.initForm(message);
  }

  submitForm(form: BaseForm) {
    FormUtils.validateControls(form.formGroup, Object.keys(form.formGroup.controls));
    if (!form.formGroup.valid) {
      return Observable.throw(new Error(form.validationSummaryError));
    }

    this.store$.dispatch(new advice.UpdateAction(form.formGroup.value));

    return new Observable(obs => {
      obs.next();
      obs.complete();
    });
  }

  submitInsurance(): Observable<any> {
    if (!this.acceptFinalTerms) {
      return Observable.throw(new Error('Je hebt de gebruikersvoorwaarden nog niet geaccepteerd.'));
    }

    Observable.combineLatest(this.profile$, this.advice$, this.insurance$, this.car$,
      (profile, advice, insurance, car) => {
        return {profileInfo: profile, adviceInfo: advice, insuranceInfo: insurance, carInfo: car};
      })
      .subscribe((value) => {
        const proposalData = this.getProposalData(value, this.contactDetailForm.formGroup);
        this.store$.dispatch(new car.BuyAction(proposalData));
      });

    return Observable.combineLatest(
      this.store$.select(fromCar.getCarBuyComplete),
      this.store$.select(fromCar.getCarBuyError),
      (complete, error) => ({complete: complete, error: error}))
      .take(1)
      .map(combined => {
        if (combined.error) {
          throw new Error('Er is helaas iets mis gegaan. Probeer het later opnieuw.');
        }

        // Navigate to thank you page
        return this.store$.select(fromProfile.getProfile)
          .filter(profile => !!profile.emailaddress)
          .subscribe((profile) => {
            return this.store$.dispatch(new router.Go({path: ['/car/thank-you', profile.emailaddress]}));
          });
      });
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  getUpdatedProfile(form: FormGroup) {
    return {
      firstName: form.value.firstName,
      infix: form.value.middleName,
      lastName: form.value.lastName,
      initials: form.value.initials,
      mobileNumber: form.value.mobileNumber,
      phoneNumber: form.value.phoneNumber
    };
  }

  getProposalData(value: any, contactForm: FormGroup) {
    const flatData = Object.assign({},
      value.profileInfo,
      value.adviceInfo,
      value.adviceInfo.address,
      value.insuranceInfo,
      value.insuranceInfo._embedded.insurance,
      {car: value.carInfo},
      {dekking: this.tagsService.getTranslationText('car_flow_coverage', value.coverage)},
      this.getUpdatedProfile(contactForm));

    const proposalRequest = new CarProposalHelper();
    const proposalData: Proposal = {
      advice_item_id: value.insuranceInfo.advice_item_id,
      proposal: value.insuranceInfo,
      items: proposalRequest.getItems(flatData).concat(
        proposalRequest.getFinalQuestionsItems(proposalRequest.getFinalQuestions(flatData))
      )
    };
    proposalData.proposal.car = value.carInfo;

    return proposalData;
  }

  // TODO: group in an effect
  resetFlow() {
    this.store$.dispatch(new advice.ResetAction());
    this.store$.dispatch(new compare.CarCompareResetStateAction());
    this.store$.dispatch(new car.CarResetStateAction());
    this.store$.dispatch(new router.Go({path: ['car']}));
  }
}
