import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions } from '@knx/wizard';
import { KNXWizardStepRxOptions } from '../../../../../components/knx-wizard-rx/knx-wizard-rx.options';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CarDetailComponent } from './../../components/car-detail/car-detail.component';
import { QaIdentifier } from '../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';
import { AssistantConfig } from '../../../../../core/models/assistant';
import { TagsService } from '../../../../../core/services/tags.service';
import { Car, CarCompare, CarCoverageRecommendation, CarInsurance } from '../../../../models';
import { Price } from '../../../../../shared/models/price';
import { CarDetailForm } from '../../components/car-detail/car-detail.form';
import { CarExtrasForm } from '../../components/car-extras/car-extras.form';
import { createCarCoverages } from '../../../../utils/coverage.utils';
import { ChatMessage } from '../../../../../components/knx-chat-stream/chat-message';
import { scrollToY } from '../../../../../utils/scroll-to-element.utils';
import { InsuranceTopListComponent } from '../../components/insurance-toplist/insurance-toplist.component';
import { KNXWizardRxComponent } from '../../../../../components/knx-wizard-rx/knx-wizard-rx.component';
import { CarReviewComponent } from '../../components/car-review/car-review.component';

import * as FormUtils from '../../../../../utils/base-form.utils';
import * as cuid from 'cuid';
import * as fromRoot from '../../../../reducers';
import * as fromAuth from '../../../../../auth/reducers';
import * as fromCore from '../../../../../core/reducers';
import * as fromInsurance from '../../../../../insurance/reducers';
import * as fromCar from '../../../../reducers';

// Core actions
import * as router from '../../../../../core/actions/router';
import * as layout from '../../../../../core/actions/layout';
import * as assistant from '../../../../../core/actions/assistant';

// Car actions
import * as car from '../../../../actions/car';
import * as compare from '../../../../actions/compare';
import * as coverage from '../../../../actions/coverage';

// Other actions
import * as advice from '../../../../../insurance/actions/advice';
import * as profile from '../../../../../profile/actions/profile';
import * as wizardActions from '@app/core/actions/wizard';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';
declare var window: any;
enum carFormSteps {
  carDetails,
  compareResults
}
declare var window: any;
@Component({
  templateUrl: 'car-advice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.carAdviceRoot;

  formSteps: Array<KNXWizardStepRxOptions>;
  currentStep: number;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  // State of the advice forms data
  isLoggedIn$: Observable<boolean>;
  purchasedInsurances$: Observable<any>;
  purchasedInsurancesLoading$: Observable<any>;
  wizardCurrentStep$: Observable<any>;

  subscription$: Array<any>;

  // Forms
  carExtrasForm: CarExtrasForm;

  @ViewChild(KNXWizardRxComponent) knxWizardRx: KNXWizardRxComponent;

  constructor(private store$: Store<fromRoot.State>, private tagsService: TagsService, public router: Router) {
    window.advice = this;
    window.router = router;
    // this.store$.dispatch(new router.Forward);
    this.formSteps = [
      {
        label: 'Je gegevens',
      },
      {
        label: 'Premies vergelijken',
      },
      {
        label: 'Aanvragen',
      }
    ];
  }


  ngOnInit() {
    window.routes = this;
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert autoverzekeringen'
      }
    }));
    // bind observables
    this.subscription$ = [];
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.purchasedInsurances$ = this.store$.select(fromInsurance.getPurchasedInsurance);
    this.purchasedInsurancesLoading$ = this.store$.select(fromInsurance.getPurchasedInsuranceLoading);
    this.wizardCurrentStep$ = this.store$.select(fromCore.getWizardCurrentStep);
    // initialize forms
    const formBuilder = new FormBuilder();

    this.carExtrasForm = new CarExtrasForm(formBuilder,
      this.tagsService.getAsLabelValue('car_flow_coverage'),
      this.tagsService.getAsLabelValue('car_flow_km_per_year'),
      this.tagsService.getAsLabelValue('car_flow_legal_aid'),
      this.tagsService.getAsLabelValue('car_flow_road_assistance'),
      this.tagsService.getAsLabelValue('car_own_risk'));

    this.subscription$.push(
      this.purchasedInsurances$
        .filter(purchasedInsurances => purchasedInsurances !== null)
        .take(1)
        .subscribe(purchasedInsurances => {
          const insurances = purchasedInsurances.car.insurance;
          const advices = purchasedInsurances.car.insurance_advice;

          if (insurances.length && insurances.filter(insurance =>
            (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
            // redirect to purchased overview if there are any manually added insurances
            this.store$.dispatch(new router.Go({ path: ['/car/purchased'] }));
          } else if (insurances.length && insurances.filter(insurance => (insurance.status === 'draft')).length) {
            // Proceed to the buy flow for anonymous with advice
            this.proceedAnonymous(advices, insurances);
          }
      })
    );
    this.subscription$.push(
      this.carExtrasForm.formGroup.valueChanges
        .debounceTime(200)
        .filter(() => this.currentStep === carFormSteps.compareResults)
        .subscribe(data => {
          let compareExtraOptions = {
            coverage: data.coverage,
            cover_occupants: data.extraOptionsOccupants || false,
            no_claim_protection: data.extraOptionsNoClaim || false,
            legal_aid: data.extraOptionsLegal ? 'LAY' : 'LAN',
            road_assistance: data.roadAssistance || 'RANO',
            kilometers_per_year: data.kmPerYear || 'KMR3',
            own_risk: data.ownRisk === null || data.ownRisk === undefined ? 135 : +data.ownRisk,
            insurance_id: ''
          };
          this.store$.dispatch(new advice.Update(compareExtraOptions));
        })
    );
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }

  updateActiveLoan(activeLoan: boolean) {
    this.store$.dispatch(new coverage.CarCoverageSetActiveLoan(activeLoan));
  }

  toggleSideNavState(event) {
    event ? this.store$.dispatch(new layout.OpenLeftSideNav) : this.store$.dispatch(new layout.CloseLeftSideNav);
  }

  getStepClass(step) {
    return {
      ['knx-car-advice--step-' + (step + 1)]: true
    };
  }

  private onShowResults() {
    this.store$.dispatch(new assistant.AddCannedMessage({key: 'car.info.advice.option', clear: true}));
  }

  private proceedAnonymous(advices, insurances) {
    this.store$.dispatch(new advice.Get(insurances[0].advice_item_id));
    this.store$.dispatch(new advice.Update(Object.assign({}, advices[0])));

    this.store$.select(fromCar.getCompareResult)
      .map(obs => {
        return obs.map(v => JSON.parse(JSON.stringify(v)));
      })
      .subscribe(insurance => {
        if (insurance) {
          this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdviceId).subscribe(
            id => {
              this.store$.dispatch(new router.Go({
                path: ['/car/insurance/contact-detail'],
              }));
            }));
        }
    });
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }
}
