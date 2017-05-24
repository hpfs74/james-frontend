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
import { Car, Price, CarCompareRequest, Profile, Address } from '../../models';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageRecommendation } from './../../models/coverage';
import { CarInsurance } from '../../models/car-insurance';
import { CarInsuranceOptions } from './../../models/car-compare-request';
import { CarDetailForm } from './car-detail.form';
import { CarExtrasForm } from './car-extras.form';
import { scrollToForm } from '../../utils/base-form.utils';

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
  @ViewChild(CarDetailComponent) detailComponent: CarDetailComponent;

<<<<<<< HEAD
>>>>>>> 2357330... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 55c1574... refactor(app): clean up car component
  formSteps: Array<KNXStepOptions>;
  formControlOptions: any;
  formData: Array<any>;
  carDetailSubmitted: boolean = false;
  currentStep: number;

  coverages: Array<Price>;
  insurances: Observable<Array<CarInsurance>>;
  car: Car;
<<<<<<< HEAD
<<<<<<< HEAD
  profile: Profile;
  address: Address;
<<<<<<< HEAD
=======
  profile: User;
<<<<<<< HEAD
>>>>>>> 2357330... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
=======
  profile: Profile;
>>>>>>> 55c1574... refactor(app): clean up car component
=======
>>>>>>> 08c5ccb... fix(car): fix car detail form issues

  chatConfig: AssistantConfig;
  chatMessages: Array<ChatMessage> = [];
  assistantMessages: any;

  isCoverageLoading: boolean = false;
  isInsuranceLoading: boolean = false;
  token: string = '';

  // Forms
  carDetailForm: CarDetailForm;
  carExtrasForm: CarExtrasForm;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private assistantService: AssistantService,
    private carService: CarService,
    private insuranceService: InsuranceService,
    private chatNotifierService: ChatStreamService,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getUserProfile().subscribe(p => this.profile = p);

    this.chatNotifierService.addMessage$.subscribe(
      message => {
        // replace messages instead of pushing
        this.chatMessages = [message];
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        onBeforeNext: this.submitDetailForm.bind(this)
=======
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
        onBeforeNext: () => {

          this.carDetailSubmitted = true;

          let detailForm = this.detailComponent.form.formGroup;
          let address = this.detailComponent.form.addressForm;

          this.validateForm(detailForm);
          this.validateForm(address);

          if (!detailForm.valid && !address.valid) {
            return new Observable(obs => {
              throw('cannot move to step');
            });
          }

          let options: CarInsuranceOptions = {
            active_loan: detailForm.value.loan,
            coverage: detailForm.value.coverage,
            claim_free_years: +detailForm.value.claimFreeYears,
            household_status: detailForm.value.houseHold
          };
          let requestObj = new CarUser(this.profile, this.car, address, options);

          // let mockRequest: CarUser = {
          //   'license': 'GK906T',
          //   'first_name': null,
          //   'gender': 'm',
          //   'date_of_birth': '1991-10-26',
          //   'house_number': '234',
          //   'last_name': null,
          //   'title': 'Dhr.',
          //   'zipcode': '2512GH',
          //   'country': 'NL',
          //   'coverage': 'CL',
          //   'claim_free_years': 7,
          //   'household_status': 'CHMP',
          //   'active_loan': false
          // };
          // let requestObj = mockRequest;

          this.formData[0] = requestObj;

          this.carExtrasForm.formGroup.get('coverage').patchValue(requestObj.coverage);

          return this.insurances = this.carService.getInsurances(requestObj);
        }
<<<<<<< HEAD
>>>>>>> 2357330... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
=======
        onBeforeNext: this.submitDetailForm.bind(this)
>>>>>>> 55c1574... refactor(app): clean up car component
      },
      {
        label: 'Premies vergelijken',
        backButtonLabel: 'Terug',
        hideNextButton: true,
        onShowStep: () => this.chatNotifierService.addTextMessage(this.chatConfig.car.info.advice.result)
      },
      {
        label: 'Besparen',
        backButtonLabel: 'Terug'
      }
    ];
    this.formData = new Array(this.formSteps.length);
<<<<<<< HEAD
<<<<<<< HEAD

    let formBuilder = new FormBuilder();
    this.carDetailForm = new CarDetailForm(formBuilder);
<<<<<<< HEAD
=======
>>>>>>> 2357330... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 55c1574... refactor(app): clean up car component

    this.carExtrasForm = new CarExtrasForm(formBuilder);
    this.carExtrasForm.formGroup.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(data => {
        if (this.formData[0]) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          //console.log(data);
=======
>>>>>>> 2357330... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
=======
          //console.log(data);
>>>>>>> 0cda736... fix(car-options): change slider to dropdown
          this.insurances = this.carService.getInsurances(
            Object.assign(
              this.formData[0], {
                coverage: data.coverage,
                cover_occupants: data.extraOptions.cover_occupants || false,
                kilometers_per_year: data.kmPerYear,
                no_claim_protection: data.extraOptions.noclaim || false,
                own_risk: data.ownRisk,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
              })
          );
        }
      });
  }

  submitDetailForm(): Observable<any> {
    let detailForm = this.carDetailForm.formGroup;
    let address = this.carDetailForm.addressForm;

    this.validateForm(detailForm);
    this.validateForm(address);

    if (!detailForm.valid && !address.valid) {
      this.carDetailSubmitted = true;
      return new Observable(obs => {
        throw ('cannot move to step');
      });
    }

    // Hide error summary
    this.carDetailSubmitted = false;

    // Update profile
    this.profile.gender = detailForm.value.gender;
    this.profile.dateOfBirth = detailForm.value.birthDate;
    this.profile.gender = detailForm.value.gender;

<<<<<<< HEAD
    let options: CarInsuranceOptions = {
      active_loan: detailForm.value.loan,
      coverage: detailForm.value.coverage,
      claim_free_years: +detailForm.value.claimFreeYears,
      household_status: detailForm.value.houseHold
    };
    let requestObj = new CarCompareRequest(this.profile, this.car, this.address, options);

    this.formData[0] = requestObj;
    this.carExtrasForm.formGroup.get('coverage').patchValue(requestObj.coverage);

    return this.insurances = this.carService.getInsurances(requestObj);
=======
            })
          );
        }
    });
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
  }

  onSelectPremium(insurance) {
    // TODO: implement
  }

<<<<<<< HEAD
=======
            })
=======
              })
>>>>>>> 55c1574... refactor(app): clean up car component
          );
        }
      });
  }

  submitDetailForm(): Observable<any> {
    this.carDetailSubmitted = true;

    let detailForm = this.carDetailForm.formGroup;
    let address = this.carDetailForm.addressForm;

    this.validateForm(detailForm);
    this.validateForm(address);

    if (!detailForm.valid && !address.valid) {
      return new Observable(obs => {
        throw ('cannot move to step');
      });
    }

=======
>>>>>>> 08c5ccb... fix(car): fix car detail form issues
    let options: CarInsuranceOptions = {
      active_loan: detailForm.value.loan,
      coverage: detailForm.value.coverage,
      claim_free_years: +detailForm.value.claimFreeYears,
      household_status: detailForm.value.houseHold
    };
    let requestObj = new CarUser(this.profile, this.car, this.address, options);
    //console.log(requestObj);

    // let mockRequest: CarUser = {
    //   'license': 'GK906T',
    //   'first_name': null,
    //   'gender': 'm',
    //   'date_of_birth': '1991-10-26',
    //   'house_number': '234',
    //   'last_name': null,
    //   'title': 'Dhr.',
    //   'zipcode': '2512GH',
    //   'country': 'NL',
    //   'coverage': 'CL',
    //   'claim_free_years': 7,
    //   'household_status': 'CHMP',
    //   'active_loan': false
    // };
    // let requestObj = mockRequest;

    this.formData[0] = requestObj;
    this.carExtrasForm.formGroup.get('coverage').patchValue(requestObj.coverage);

    return this.insurances = this.carService.getInsurances(requestObj);
  }

  onSelectPremium(insurance) {
    // TODO: implement
  }

>>>>>>> 2357330... feat(car-options): use knx-wizard component for car flow
=======
>>>>>>> 7ba7811... feat(car-options): use knx-wizard component for car flow
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
    this.carDetailForm.formGroup.get('coverage').patchValue(coverage.id);
  }

  showHelperText(key) {
    this.chatNotifierService.addTextMessage(this.chatConfig.car.info[key]);
  }

  toggleExtrasPanel() {
    // TODO: implement
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
          let c = this.carDetailForm.formGroup.get('licensePlate');
          this.triggerLicenseInValid();
        }
      }, err => {
        // Treat server error as invalid to prevent continuing flow
        this.triggerLicenseInValid();
      });
  }

  triggerLicenseInValid() {
    let c = this.carDetailForm.formGroup.get('licensePlate');
    c.setErrors({ 'licensePlateRDC': true });
    c.markAsTouched();
    this.chatNotifierService.addTextMessage(this.chatConfig.car.error.carNotFound);
  }

  updateAddress(address: Address) {
    if (address.street && address.city) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 08c5ccb... fix(car): fix car detail form issues
      this.address = address;
      if (this.profile) {
        // TODO: do actual call to backend to patch profile address
        this.profile.address = address;
      }
<<<<<<< HEAD
=======
>>>>>>> de2c44c... fix(config): change to correct mock api and small mobile fixes
=======
>>>>>>> 08c5ccb... fix(car): fix car detail form issues
      this.chatNotifierService.addTextMessage(this.chatConfig.generic.address(address));
    } else {
      this.chatNotifierService.addTextMessage(this.chatConfig.generic.addressNotFound);
    }
  }

  getCoverages({ loan }) {
<<<<<<< HEAD
<<<<<<< HEAD
    if (this.car) {
=======
    if (this.car && loan) {
>>>>>>> 55c1574... refactor(app): clean up car component
=======
    if (this.car) {
>>>>>>> 08c5ccb... fix(car): fix car detail form issues
      this.isCoverageLoading = true;

      // get default coverage types
      this.coverages = this.carService.getCoverages();

      // fetch recommendation
      this.carService.getCoverageRecommendation(this.car.license, loan)
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
