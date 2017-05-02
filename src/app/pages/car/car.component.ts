import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../config.service';
import { InsuranceService } from '../../services/insurance.service';
import { CarService } from './car.service';

import { Car } from '../../models/car';
import { ChatMessage } from '../../models/chat-message';
import { Price } from '../../models/price';
import { ChatStreamComponent } from '../../components/knx-chat-stream/';

@Component({
  selector: 'knx-car-page',
  styleUrls: ['car.component.scss'],
  templateUrl: 'car.component.html'
})
export class CarComponent implements OnInit {
  formControlOptions: any;
  chatConfig: any;
  chatMessages: Array<ChatMessage> = [];
  coverages: Array<Price>;

  formSteps: Array<any>;
  currentFormStep: string;
  isPendingNext: boolean;

  assistantMessages: any;
  myCar: Car;
  isCoverageLoading: boolean = false;

  constructor(
    private configService: ConfigService,
    private carService: CarService,
    private insuranceService: InsuranceService) {
  }

  ngOnInit() {
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

    this.assistantMessages = {
      welcome: `Hoi! Ik ben Anupama.
        Ik ga je vandaag helpen <strong>besparen</strong> op je auto-verzekering.
        Ben je er klaar voor? Let\'s do this!`,
      info: {
        damageFreeYears: `De <strong>schadevrije jaren</strong> vind je op je meest recente polis.<br>
        Je bouwt schadevrije jaren op als een auto op jouw naam is verzekerd. Schadevrije jaren geven je
        korting op de premie. Elk jaar dat je geen schade claimt, bouw je 1 schadevrij jaar op. Elke keer
        dat je wel een schade claimt die jouw schuld is, verlies je 5 of meer jaren.`
      },
      coverageAdvice: `Op basis van je situatie adviseer ik een ...`
    };

    this.addTextMessage(this.assistantMessages.welcome);
  }

  addCarMessage(car: Car) {
    this.chatMessages = [];
    this.chatMessages.push({ type: 'car', content: car});
  }

  addTextMessage(message) {
    this.chatMessages = [];
    this.chatMessages.push({ type: 'text', content: message });
  }

  goToPreviousStep(event) {
    ;
  }

  goToNextStep(event) {
    this.currentFormStep = 'carCoverages';
  }

  getCarInfo(licensePlate: string) {
    //TEST
    this.myCar = {
      'license': licensePlate,
      'vin': 'VF1BA0F0G17869206',
      'reporting_code': '9206',
      'year': 2016,
      'fuel': 'Gasoline',
      'secondary_fuel': null,
      'color': 'Blauw',
      'color_code': '04',
      'secondary_color': 'Onbekend',
      'secondary_color_code': '99',
      'weight_empty_vehicle': 1030,
      'price_consumer_excl_vat': 14841,
      'price_consumer_incl_vat': 16976,
      'make': 'RENAULT',
      'model': 'MEGANE',
      'technical_type': '1.6 E HB RT',
      'wheels': 4,
      'top_speed': 184,
      'engine_capacity': 1598,
      'power_kw': 66,
      'transmission': 'Manual',
      'transmission_nl': 'Handgeschakeld',
      'edition': null,
      'doors': 5,
    };

    this.addCarMessage(this.myCar);

    //TODO: test with backend
    // this.carService.getByLicense(licensePlate)
    //   .subscribe(res => {
    //     this.myCar = res;

    //     // show assistant message
    //     this.addCarMessage(this.myCar);

    //   }, err => {
    //     //console.log();
    //   });
  }

  getCoverages(formData) {
    if (this.myCar && formData.loan) {
      this.isCoverageLoading = true;
      this.coverages = this.carService.getCoverages(this.myCar, formData);
      this.isCoverageLoading = false;
    }
  }

}
