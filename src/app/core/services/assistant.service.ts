import { Injectable } from '@angular/core';

import { AssistantConfig } from '../models/assistant';
import { Price } from '@app/shared/models';
import { Car } from '@app/car/models';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AssistantService {
  private _config: AssistantConfig = undefined;

  constructor(public translateService: TranslateService) {
    this.translateService.get('lisa.car_welcome').subscribe(v => {
      this.setConfig();
    });
  }

  setConfig() {
    let lisa = {
      avatar: {
        name: this.translateService.instant('lisa.avatar_name'),
        title: this.translateService.instant('lisa.avatar_title')
      }
    };
    this.config = {
      avatar: lisa.avatar,
      dashboard: {
        start: this.translateService.instant('lisa.dashboard_start'),
        welcome: (firstName: string) =>
          (firstName ? this.translateService.instant('lisa.dashboard_welcome_helo_before_name') +
          ` <strong>${firstName}</strong>,` : this.translateService.instant('lisa.dashboard_welcome_helo_without_name')) +
            this.translateService.instant('lisa.dashboard_welcome_after_name'),
        detail: (insuranceType: string) => `Wat wil je doen met je ${insuranceType} verzekering?`,
        addInsurance: 'Voeg verzekeringen toe aan het overzicht en  ik zoek uit het beter kan.'
      },

      profile: {
        hello: this.translateService.instant('lisa.profile_hello')
      },

      household: {
        welcome: this.translateService.instant('lisa.household_welcome'),
        premiums: this.translateService.instant('lisa.household_premiums'),
        detail: this.translateService.instant('lisa.household_detail'),
        buy: this.translateService.instant('lisa.household_buy'),
        thankYou: this.translateService.instant('lisa.household_thankYou')
      },

      car: {
        welcome: `${this.translateService.instant('lisa.car_welcome_I_am')} ${lisa.avatar.name}.
          ${this.translateService.instant('lisa.car_welcome_after_name')}`,
        info: {
          houseHold: this.translateService.instant('lisa.car_info_household'),
          niceCar: (car: Car) => this.translateService.instant('lisa.car_info_niceCar') + ` <strong>${car.make} ${car.model}`,
          coverage: {
            advice: (coverage: Price) => this.translateService.instant('lisa.car_info_coverage_advice') +
            ` <strong>${coverage.header}-dekking</strong>`
          },
          loan: this.translateService.instant('lisa.car_info_loan'),
          CL: this.translateService.instant('lisa.car_info_CL'),
          CLC: this.translateService.instant('lisa.car_info_CLC'),
          CAR: this.translateService.instant('lisa.car_info_CAR'),
          noClaimProtection: this.translateService.instant('lisa.car_info_noClaimProtection'),
          legalAid: this.translateService.instant('lisa.car_info_legalAid'),
          coverOccupants: this.translateService.instant('lisa.car_info_coverOccupants'),
          advice: {
            result: this.translateService.instant('lisa.car_info_advice_result'),
            option: this.translateService.instant('lisa.car_info_advice_option'),
            next: this.translateService.instant('lisa.car_info_advice_next')
          },
          review: {
            unsupported: this.translateService.instant('lisa.car_info_review_unsupported'),
            title: this.translateService.instant('lisa.car_info_review_title'),
            steps: this.translateService.instant('lisa.car_info_review_steps')
          }
        },
        error: {
          carNotFound: this.translateService.instant('lisa.car_error')
        },
        buy: {
          fill: this.translateService.instant('lisa.car_buy_fill'),
          check: (insurer: string) => this.translateService.instant('lisa.car_buy_check_before_insurer') +
          ` ${insurer}. ${insurer} ` + this.translateService.instant('lisa.car_buy_check_after_insurer'),
          payment: this.translateService.instant('lisa.car_buy_payment'),
          summary: this.translateService.instant('lisa.car_buy_summary'),
          thankyou: this.translateService.instant('lisa.car_buy_thankYou'),
          finalEmail: (email: string) => this.translateService.instant('lisa.car_buy_finalEmail_before_email') + ` ${email}`
        },
        purchased: {
          with: {
            insurances: (firstName: string) => this.translateService.instant('lisa.car_purchased_with_hello_before') +
            ` ${firstName}` + this.translateService.instant('lisa.car_purchased_with_message_after')
          },
          without: {
            insurances: (firstName: string) => this.translateService.instant('lisa.car_purchased_with_hello_before') +
            ` ${firstName}` + this.translateService.instant('lisa.car_purchased_with_message_after')
          }
        }
      }
    };
  }

  public get config(): AssistantConfig {
    return this._config;
  }

  public set config(value: AssistantConfig) {
    this._config = value;
  }
}
