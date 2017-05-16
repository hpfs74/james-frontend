import { CarInsuranceOptions } from './../../models/car-prefs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ConfigService } from '../../config.service';
import { InsuranceService } from '../../services/insurance.service';
import { AssistantService } from './../../services/assistant.service';
import { AssistantConfig } from '../../models/assistant';
import { CarService } from './car.service';
import { Car, Price, CarUser, User, Address } from '../../models';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageRecommendation } from './../../models/coverage';
import { CarInsurance } from '../../models/car-insurance';

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

  formControlOptions: any;
  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  coverages: Array<Price>;

  formSteps: Array<any>;
  currentFormStep: string;
  isPendingNext: boolean;

  insurances: Observable<Array<CarInsurance>>;

  assistantMessages: any;
  car: Car;
  profile: User;
  isCoverageLoading: boolean = false;
  isInsuranceLoading: boolean = false;
  token: string = '';

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

    this.profileService.getUserProfile()
      .subscribe(p => this.profile = p);

    this.currentFormStep = 'carDetails';
    this.formSteps = [
      {
        id: 'carDetails',
        title: 'Je gegevens'
      },
      {
        id: 'carResults',
        title: 'Resultaten'
      },
      {
        id: 'carComparison',
        title: 'Premies vergelijken'
      }
    ];
    this.isPendingNext = true;

    this.chatConfig = this.assistantService.config;
    this.chatConfig.avatar.title = 'Expert autoverzekeringen';

    this.profileService.getUserProfile()
      .subscribe(res => {

        let user: string = (res.firstname || res.lastname) ?
          `${res.firstname} ${res.infix} ${res.lastname}` : res.emailaddress;

        this.chatNotifierService.addTextMessage(this.chatConfig.car.welcome(user));
      });
  }

  getCurrentStepIndex(index: number) {
    return this.formSteps[index].id === this.currentFormStep;
  }

  goToPreviousStep() {
    // TODO: refactor step navigation in generic/reusable way
    let index = this.formSteps.findIndex(step => step.id === this.currentFormStep);
    if (index === 0) {
      // to home
      this.router.navigate(['/overview']);
    }
    if (index > 0 && index <= this.formSteps.length) {
      this.currentFormStep = this.formSteps[index - 1].id;
    }
  }

  goToNextStep() {
    // TODO: only supports one step currently, migrate to knx-wizard

    switch (this.currentFormStep) {
      case 'carDetails':
        // let detailForm = this.detailComponent.form.formGroup;
        // let address = this.detailComponent.form.addressForm;

        // this.validateForm(detailForm);
        // this.validateForm(address);

        // if (!detailForm.valid && !address.valid) {
        //   return;
        // }

        // // build the payload in Nicci format
        // let options: CarInsuranceOptions = {
        //   active_loan: detailForm.value.loan,
        //   coverage: detailForm.value.coverage,
        //   claim_free_years: +detailForm.value.damageFreeYears,
        //   household_status: detailForm.value.houseHold
        // };
        // let requestObj = new CarUser(this.profile, this.car, this.profile.address, options);

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

        this.insurances = this.carService.getInsurances(requestObj);
        this.currentFormStep = 'carResults';
        break;
      case 'carResults':
        //console.log('Premie gekozen: ' + event);
        break;
      default:
        break;
    }
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
    this.profile.address = address;
    this.chatNotifierService.addTextMessage(this.chatConfig.generic.address(address));
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
            this.chatNotifierService.addTextMessage(this.chatConfig.car.coverageAdvice(coverage));
          }

        }, error => {
          this.isCoverageLoading = true;
        });
    }
  }
}
