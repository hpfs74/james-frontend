import { Component, OnInit, OnDestroy } from '@angular/core';
import { QaIdentifier } from './../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from './../../../../../shared/models/qa-identifiers';
import { Profile } from '../../../../../profile/models';
import { CarInsurance, CarProposalHelper, Proposal } from '../../../../../car/models';
import { TagsService } from '../../../../../core/services/tags.service';
import { KNXStepRxComponent } from '../../../../../components/knx-wizard-rx/knx-step-rx.component';
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

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'knx-car-summary-form',
  styleUrls: ['./car-summary.component.scss'],
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements QaIdentifier, OnInit, KNXStepRxComponent {
  qaRootId = QaIdentifiers.carSummary;
  profile$: Observable<Profile>;
  insurance$: Observable<CarInsurance | InsuranceAdvice>;
  advice$: Observable<any>;
  car$: Observable<any>;
  acceptFinalTerms: boolean;
  form: ContactDetailForm;

  constructor(private tagsService: TagsService,
              private store$: Store<fromRoot.State>,
              public asyncPipe: AsyncPipe) {
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.insurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    this.profile$ = this.store$.select(fromProfile.getProfile);
    this.car$ = this.store$.select(fromCar.getCarInfo);
  }

  ngOnInit() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.buy.summary', clear: true}));
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

  submitInsurance(): Observable<any> {
    if (!this.acceptFinalTerms) {
      return Observable.throw(new Error('Je hebt de gebruikersvoorwaarden nog niet geaccepteerd.'));
    }

    Observable.combineLatest(this.profile$, this.advice$, this.insurance$, this.car$,
      (profile, advice, insurance, car) => {
        return {profileInfo: profile, adviceInfo: advice, insuranceInfo: insurance, carInfo: car};
      }).filter( value =>
            value.adviceInfo != null
            && value.carInfo != null
            && value.insuranceInfo != null
            && value.profileInfo != null)
      .subscribe((value) => {
        const proposalData = this.getProposalData(value);
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
            return this.store$.dispatch(new router.Go({path: ['/car/thank-you']}));
          });
      });
  }

  getProposalData(value: any) {
    const flatData = Object.assign({},
      value.profileInfo,
      value.adviceInfo,
      value.adviceInfo.address,
      value.insuranceInfo,
      value.insuranceInfo._embedded.insurance,
      {car: value.carInfo},
      {dekking: this.tagsService.getTranslationText('car_flow_coverage', value.coverage)},
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

  onShow() {
    return Observable.empty();
  }
  onBack() {
    return Observable.empty();
  }
  onNext() {
    return this.submitInsurance();
  }

}
