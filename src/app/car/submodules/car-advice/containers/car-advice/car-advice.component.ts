import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { KNXStepOptions } from '@knx/wizard';
import { KNXWizardStepRxOptions } from '../../../../../components/knx-wizard-rx/knx-wizard-rx.options';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CarDetailComponent } from './../../containers/car-detail/car-detail.component';
import { QaIdentifier } from '../../../../../shared/models/qa-identifier';
import { QaIdentifiers } from '../../../../../shared/models/qa-identifiers';
import { AssistantConfig } from '../../../../../core/models/assistant';
import { TagsService } from '../../../../../core/services/tags.service';
import { Car, CarCompare, CarCoverageRecommendation, CarInsurance } from '../../../../models';
import { Price } from '../../../../../shared/models/price';
import { CarDetailForm } from '../../containers/car-detail/car-detail.form';
import { CarExtrasForm } from '../../containers/car-extras/car-extras.form';
import { createCarCoverages } from '../../../../utils/coverage.utils';
import { ChatMessage } from '../../../../../components/knx-chat-stream/chat-message';
import { scrollToY } from '../../../../../utils/scroll-to-element.utils';
import { InsuranceTopListComponent } from '../insurance-toplist/insurance-toplist.component';
import { KNXWizardRxComponent } from '../../../../../components/knx-wizard-rx/knx-wizard-rx.component';
import { CarReviewComponent } from '../../containers/car-review/car-review.component';

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
import 'rxjs/add/operator/take';
import { Router } from '@angular/router';
import { KNXWizardRxService } from '@app/core/services/wizard.service';
enum carFormSteps {
  carDetails,
  compareResults
}
@Component({
  templateUrl: 'car-advice.component.html',
  styleUrls: ['./car-advice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarAdviceComponent implements OnInit, OnDestroy, QaIdentifier {
  qaRootId = QaIdentifiers.carAdviceRoot;

  formSteps: Array<KNXWizardStepRxOptions>;
  chatConfig$: Observable<AssistantConfig>;
  chatMessages$: Observable<Array<ChatMessage>>;
  // State of the advice forms data
  isLoggedIn$: Observable<boolean>;
  insurance$: Observable<any>;
  savedInsurances$: Observable<any>;
  savedInsurancesLoading$: Observable<any>;
  subscription$: Array<any> = [];
  advice$: Observable<any>;
  // Forms
  carExtrasForm: CarExtrasForm;

  constructor(private store$: Store<fromRoot.State>,
              private tagsService: TagsService,
              public router: Router,
              public knxWizardService: KNXWizardRxService) {
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
    this.store$.dispatch(new assistant.UpdateConfigAction({
      avatar: {
        title: 'Expert autoverzekeringen'
      }
    }));
    // bind observables
    this.subscription$ = [];
    this.advice$ = this.store$.select(fromInsurance.getSelectedAdvice);
    this.chatConfig$ = this.store$.select(fromCore.getAssistantConfig);
    this.chatMessages$ = this.store$.select(fromCore.getAssistantMessageState);
    this.isLoggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.savedInsurances$ = this.store$.select(fromInsurance.getSavedInsurance);
    this.savedInsurancesLoading$ = this.store$.select(fromInsurance.getSavedInsuranceLoading);
    this.insurance$ = this.store$.select(fromInsurance.getSelectedInsurance);
    // initialize forms
    const formBuilder = new FormBuilder();

    this.carExtrasForm = new CarExtrasForm(formBuilder,
      this.tagsService.getAsLabelValue('car_flow_coverage'),
      this.tagsService.getAsLabelValue('car_flow_km_per_year'),
      this.tagsService.getAsLabelValue('car_flow_legal_aid'),
      this.tagsService.getAsLabelValue('car_flow_road_assistance'),
      this.tagsService.getAsLabelValue('car_own_risk'));

    this.subscription$.push(
      this.savedInsurances$
        .filter(purchasedInsurances => purchasedInsurances !== null)
        .take(1)
        .subscribe(purchasedInsurances => {
          const insurances = purchasedInsurances.car.insurance;
          const advices = purchasedInsurances.car.insurance_advice;

          if (advices.length && insurances.length && insurances.filter(insurance => (insurance.status === 'draft')).length) {
            // Proceed to the buy flow for anonymous with advice
            this.proceedWithAdvice(advices, insurances);
          } else if (insurances.length && insurances.filter(insurance =>
              (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
            // redirect to purchased overview if there are any manually added insurances
            this.store$.dispatch(new router.Go({ path: ['/car/purchased'] }));
          }
        })
    );

    this.subscription$.push(
      this.insurance$.take(1).subscribe(selectedInsurance => {
        this.subscription$.push(
          this.advice$.take(1).subscribe(selectedAdvice => {
            if (selectedInsurance && selectedAdvice) {
              this.proceedToBuyResults();
            }
          })
        );
      })
    );

    this.subscription$.push(
      this.carExtrasForm.formGroup.valueChanges
        .debounceTime(200)
        .filter(() => this.knxWizardService.currentStepIndex === carFormSteps.compareResults)
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

  private proceedWithAdvice(advices, insurances) {
    this.store$.dispatch(new advice.Get(insurances[insurances.length - 1].advice_item_id));
    this.store$.dispatch(new advice.Update(Object.assign({}, advices[advices.length - 1])));

    this.subscription$.push(
      this.insurance$.subscribe(insurance => {
        if (insurance) {
          this.subscription$.push(this.store$.select(fromInsurance.getSelectedInsurance)
            .filter(selectedInsurance => selectedInsurance !== null).subscribe(
              selectedInsurance => {
                if (selectedInsurance.advice_expires_at * 1000 > new Date().getTime()) {
                  this.proceedToBuy();
                } else {
                  this.store$.dispatch(new router.Go({ path: ['/car/extras'] }));
                  this.store$.dispatch(new advice.RemoveLatestInsuranceAdvice());
                }
              }));
        }
      })
    );
  }

  private proceedToBuy() {
    this.subscription$.push(this.store$.select(fromInsurance.getSelectedAdvice).take(1).subscribe(
      advice => {
        if (advice && advice.id) {
          this.store$.dispatch(new router.Go({
            path: ['/car/insurance/contact-detail', { adviceId: advice.id }],
          }));
        }
      }));
  }

  private proceedToBuyResults() {
    this.store$.dispatch(new router.Go({
      path: ['/car/insurance/summary'],
    }));
  }

  goToStep(stepIndex: number) {
    this.store$.dispatch(new wizardActions.Go({stepIndex: stepIndex}));
  }
}
