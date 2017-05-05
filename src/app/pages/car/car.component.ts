import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../config.service';
import { InsuranceService } from '../../services/insurance.service';
import { CarService } from './car.service';
import { Car } from '../../models/car';
import { Price } from '../../models/price';
import { CarCoverageRecommendation } from './../../models/coverage';

import { ChatMessage } from '../../models/chat-message';
import { ChatStreamComponent } from '../../components/knx-chat-stream/';
import { ChatStreamService } from '../../components/knx-chat-stream/chat-stream.service';
import { AuthService } from '../../services/auth.service';

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
  token: string = '';

  constructor(private configService: ConfigService,
              private carService: CarService,
              private insuranceService: InsuranceService,
              private chatNotifierService: ChatStreamService,
              private auth: AuthService) {
    this.token = localStorage.getItem('access_token');
  }


  refreshToken() {
    let token = JSON.parse(localStorage.getItem('token'));
      this.auth.refreshToken(token.refresh_token)
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
        this.chatMessages = [];
        this.chatMessages.push(message);
      });

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

    this.auth.getUserProfile()
      .subscribe(res => {

        let user : string = (res.firstname || res.lastname) ?
          res.emailaddress : `${res.firstname} ${res.infix} ${res.lastname}`;

        this.assistantMessages = {
          welcome: `Hoi <i>${res.emailaddress}</i>! Ik ben Anupama.
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
          coverageAdvice: `Op basis van je situatie adviseer ik een ...`
        };


        this.addTextMessage(this.assistantMessages.welcome);
      });
  }

  addCarMessage(car: Car) {
    this.chatMessages = [];
    this.chatNotifierService.addMessage({type: 'car', content: car});
  }

  addTextMessage(message) {
    this.chatMessages = [];
    this.chatNotifierService.addMessage({type: 'text', content: message});
  }

  goToPreviousStep(event) {
    ;
  }

  goToNextStep(event) {
    this.currentFormStep = 'carCoverages';
  }

  getCarInfo(licensePlate: string) {
    if (!licensePlate) {
      return;
    }

    this.carService.getByLicense(licensePlate)
      .subscribe(res => {
        this.myCar = res;

        this.addCarMessage(this.myCar);

      }, err => {
        this.addTextMessage(this.assistantMessages.error.carInfo);
      });
  }

  getCoverages(formData) {
    // TODO: just for testing
    this.coverages = this.carService.getCoverages();
    return;

    // if (this.myCar && formData.loan) {
    //   this.isCoverageLoading = true;
    //
    //   // get default coverage types
    //   this.coverages = this.carService.getCoverages();
    //
    //   // fetch recommendation
    //   this.carService.getCoverageRecommendation(this.myCar.license, formData.loan)
    //     .subscribe(res => {
    //       this.isCoverageLoading = false;
    //
    //       let coverage = this.coverages.find(price => price.id === res.recommended_value);
    //       if (coverage) {
    //         coverage.highlight = true;
    //       }
    //
    //     }, error => {
    //       this.isCoverageLoading = true;
    //     });
    // }
  }

}
