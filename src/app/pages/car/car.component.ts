import { CarInsuranceOptions } from './../../models/car-prefs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { ConfigService } from '../../config.service';
import { InsuranceService } from '../../services/insurance.service';
import { CarService } from './car.service';
import { Car, Price, CarUser, User, Address } from '../../models';
import { CarDetailComponent } from './car-detail.component';
import { CarCoverageRecommendation } from './../../models/coverage';
import { CarInsurance } from '../../models/car-insurance';
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
  chatConfig: any;
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

  constructor(private router: Router,
              private configService: ConfigService,
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

    this.chatConfig = {
      showAvatar: true,
      avatarName: 'Marjolein',
      avatarTitle: 'Expert autoverzekeringen'
    };

    this.profileService.getUserProfile()
      .subscribe(res => {

        let user : string = (res.firstname || res.lastname) ?
          res.emailaddress : `${res.firstname} ${res.infix} ${res.lastname}`;

        this.assistantMessages = {
          welcome: `Hoi <i>${res.emailaddress}</i>! Ik ben ${this.chatConfig.avatarName}.
            Ik ga je vandaag helpen <strong>besparen</strong> op je auto-verzekering.
            Ben je er klaar voor? Let\'s do this!`,
          info: {
            damageFreeYears: `De <strong>schadevrije jaren</strong> vind je op je meest recente polis.<br>
              Je bouwt schadevrije jaren op als een auto op jouw naam is verzekerd. Schadevrije jaren geven je
              korting op de premie. Elk jaar dat je geen schade claimt, bouw je 1 schadevrij jaar op. Elke keer
              dat je wel een schade claimt die jouw schuld is, verlies je 5 of meer jaren.`
          },
          error: {
            carInfo: 'Ik kan je auto niet vinden. Heb je het juiste kenteken ingevoerd?'
          },
          coverageAdvice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header} dekking</strong>`
        };
        this.chatNotifierService.addTextMessage(this.assistantMessages.welcome);
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
        let detailForm = this.detailComponent.form.formGroup;
        let address = this.detailComponent.form.addressForm;

        this.validateForm(detailForm);
        this.validateForm(address);

        if (!detailForm.valid && !address.valid) {
          return;
        }

        // build the payload in Nicci format
        let options: CarInsuranceOptions = {
          active_loan:detailForm.value.active_loan,
          coverage: detailForm.value.coverage,
          claim_free_years: detailForm.value.damageFreeYears,
          household_status: detailForm.value.houseHold
        };
        let requestObj = new CarUser(this.profile, this.car, this.profile.address, options);

        //console.log(requestObj);
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
          this.chatNotifierService.addTextMessage(this.assistantMessages.error.carInfo);

          c.setErrors({ 'licensePlateRDC': true });
          c.markAsTouched();
        }
      }, err => {
        this.chatNotifierService.addTextMessage(this.assistantMessages.error.carInfo);
      });
  }

  updateAddress(address: Address) {
    this.profile.address = address;
    this.chatNotifierService.addTextMessage(`Ik heb je adres gevonden. Woon je op <strong>${address.street} in ${address.city}</strong>?`);
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
            this.chatNotifierService.addTextMessage(this.assistantMessages.coverageAdvice(coverage));
          }

        }, error => {
          this.isCoverageLoading = true;
        });
    }
  }
}
