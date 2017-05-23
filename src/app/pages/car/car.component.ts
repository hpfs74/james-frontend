import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { KNXStepOptions } from '../../../../node_modules/@knx/wizard/src/knx-wizard.options';

import { ConfigService } from '../../config.service';
import { InsuranceService } from '../../services/insurance.service';
import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { CarService } from './car.service';
import { Car, Price, CarUser, User, Address } from '../../models';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageRecommendation } from './../../models/coverage';
import { CarInsurance } from '../../models/car-insurance';
import { CarInsuranceOptions } from './../../models/car-prefs';
import { CarExtrasForm } from './car-extras.form';

// TODO: remove mock data
import { mockInsurances } from '../../models/car-insurance.mock';

import { ChatMessage } from '../../components/knx-chat-stream/chat-message';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'knx-car-page',
  styleUrls: ['car.component.scss'],
  templateUrl: 'car.component.html'
})
export class CarComponent implements OnInit {
  @ViewChild(CarDetailComponent) detailComponent: CarDetailComponent;

  formSteps: Array<KNXStepOptions>;
  formControlOptions: any;
  formData: Array<any>;
  carDetailSubmitted: boolean = false;
  currentStep: number;

  coverages: Array<Price>;
  insurances: Observable<Array<CarInsurance>>;
  car: Car;
  profile: User;

  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  assistantMessages: any;

  isCoverageLoading: boolean = false;
  isInsuranceLoading: boolean = false;
  token: string = '';

  // Car extras
  carExtrasForm: CarExtrasForm;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private assistantService: AssistantService,
    private carService: CarService,
    private insuranceService: InsuranceService,
    private chatNotifierService: ChatStreamService,
    private authService: AuthService,
    private profileService: ProfileService) {
    this.token = localStorage.getItem('access_token');
  }

  //TODO: for testing
  refreshToken() {
    let token = JSON.parse(localStorage.getItem('token'));
      this.authService.refreshToken(token.refresh_token)
        .subscribe(newToken => {
            localStorage.setItem('access_token', newToken.access_token);
            localStorage.setItem('token', JSON.stringify(newToken));

            this.token = newToken.access_token;
        });
  }

  ngOnInit() {
    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [ message ];
      });

    this.chatConfig = this.assistantService.config;
    this.chatConfig.avatar.title = 'Expert autoverzekeringen';

    this.currentStep = 0;
    this.formSteps = [
      {
        label: 'Je gegevens',
        nextButtonLabel: 'Naar resultaten',
        hideBackButton: true,
        onShowStep: () => this.chatNotifierService.addTextMessage(this.chatConfig.car.welcome),
        onBeforeNext: () => {

          // this.carDetailSubmitted = true;

          // let detailForm = this.detailComponent.form.formGroup;
          // let address = this.detailComponent.form.addressForm;

          // this.validateForm(detailForm);
          // this.validateForm(address);

          // if (!detailForm.valid && !address.valid) {
          //   return new Observable(obs => {
          //     throw('cannot move to step');
          //   });
          // }

          // let options: CarInsuranceOptions = {
          //   active_loan: detailForm.value.loan,
          //   coverage: detailForm.value.coverage,
          //   claim_free_years: +detailForm.value.claimFreeYears,
          //   household_status: detailForm.value.houseHold
          // };
          // let requestObj = new CarUser(this.profile, this.car, address, options);

          let mockRequest: CarUser = {
            'license': 'GK906T',
            'first_name': null,
            'gender': 'm',
            'date_of_birth': '1991-10-26',
            'house_number': '234',
            'last_name': null,
            'title': 'Dhr.',
            'zipcode': '2512GH',
            'country': 'NL',
            'coverage': 'CL',
            'claim_free_years': 7,
            'household_status': 'CHMP',
            'active_loan': false
          };
          let requestObj = mockRequest;

          this.formData[0] = requestObj;

          this.carExtrasForm.formGroup.get('coverage').patchValue(requestObj.coverage);

          return this.insurances = this.carService.getInsurances(requestObj);
        }
      },
      {
        label: 'Resultaten',
        backButtonLabel: 'Terug',
        hideNextButton: true,
        onShowStep: () => this.chatNotifierService.addTextMessage(this.chatConfig.car.info.advice.result)
      },
      {
        label: 'Premies vergelijken',
        backButtonLabel: 'Terug'
      }
    ];
    this.formData = new Array(this.formSteps.length);

    this.carExtrasForm = new CarExtrasForm(new FormBuilder());
    this.carExtrasForm.formGroup.valueChanges
      .debounceTime(200)
      .subscribe(data => {
        if (this.formData[0]) {
          //console.log(data);
          this.insurances = this.carService.getInsurances(
            Object.assign(
              this.formData[0], {
                coverage: data.coverage,
                cover_occupants: data.extraOptions.cover_occupants || false,
                kilometers_per_year: data.kmPerYear,
                no_claim_protection: data.extraOptions.noclaim || false,
                own_risk: data.ownRisk,
            })
          );
        }
      });

    this.profileService.getUserProfile().subscribe(p => this.profile = p);
  }

  onSelectPremium(insurance) {
    // TODO: implement
  }

  onStepChange(stepIndex) {
    this.currentStep = stepIndex;
  }

  validateForm(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      form.get(key).markAsTouched();
    });
    form.updateValueAndValidity();
  }

  updateSelectedCoverage(coverage: Price) {
    this.detailComponent.form.formGroup.get('coverage').patchValue(coverage.id);
  }

  showHelperText(key) {
    this.chatNotifierService.addTextMessage(this.chatConfig.car.info[key]);
  }

  getCarInfo(licensePlate: string) {
    if (!licensePlate) {
      return;
    }

    this.carService.getByLicense(licensePlate)
      .subscribe(res => {
        if (res.license) {
          this.car = res;
          this.chatNotifierService.addCarMessage(this.car);
        } else {
          // Car not found in RDC
          let c = this.detailComponent.form.formGroup.get('licensePlate');
          this.chatNotifierService.addTextMessage(this.chatConfig.car.error.carNotFound);

          c.setErrors({ 'licensePlateRDC': true });
          c.markAsTouched();
        }
      }, err => {
        this.chatNotifierService.addTextMessage(this.chatConfig.car.error.carNotFound);
      });
  }

  updateAddress(address: Address) {
    if (address.street && address.city) {
      this.chatNotifierService.addTextMessage(this.chatConfig.generic.address(address));
    } else {
      this.chatNotifierService.addTextMessage(this.chatConfig.generic.addressNotFound);
    }
  }

  getCoverages(formData) {
    if (this.car && formData.loan) {
      this.isCoverageLoading = true;

      // get default coverage types
      this.coverages = this.carService.getCoverages();

      // fetch recommendation
      this.carService.getCoverageRecommendation(this.car.license, formData.loan)
        .subscribe(res => {
          this.isCoverageLoading = false;

          let coverage = this.coverages.find(price => price.id === res.recommended_value);
          if (coverage) {
            coverage.highlight = true;
            this.chatNotifierService.addTextMessage(this.chatConfig.car.info.coverage.advice(coverage));
          }

        }, error => {
          this.isCoverageLoading = false;
        });
    }
  }
}
