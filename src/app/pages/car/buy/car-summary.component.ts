import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Profile, Car } from '../../../models';
import { isMobileNumber } from '../../../utils/base-form.utils';
import { SectionItem, SectionGroup, SectionFields } from '../../../components/knx-data-summary/data-summary';

@Component({
  selector: 'knx-car-summary-form',
  templateUrl: 'car-summary.component.html'
})
export class CarSummaryComponent implements OnChanges {
  @Input() confirm: boolean;
  @Input() profile: Profile;
  @Input() advice: any;

  sections: Array<SectionItem>;

  ngOnChanges() {
    // if (this.profile && this.isProfileValid(this.profile)) {
    //   const carInsurance: SectionItem = {
    //     label: 'Je autoverzekering',
    //     groups: [
    //       {
    //         fields: [
    //           {
    //             label: 'Ingangsdatum',
    //             value: this.advice.startDate
    //           },
    //           {
    //             label: 'Gekozen dekking',
    //             value: this.advice.coverage
    //           },
    //           {
    //             label: 'Eigen risico',
    //             value: this.advice.ownRisk
    //           }
    //         ]
    //       },
    //       {
    //         fields: [
    //           {
    //             label: 'Rechtsbijstand',
    //             value: '' //this.advice.extraOptions
    //           },
    //           {
    //             label: 'No-claim beschermer',
    //             value: '' //this.advice.extraOptions
    //           },
    //           {
    //             label: 'Inzittendenverzekering',
    //             value: '' //this.advice.extraOptions
    //           }
    //         ]
    //       }
    //     ]
    //   };

    //   const carDetails: SectionItem = {
    //     label: 'Details van je auto',
    //     groups: [
    //       {
    //         fields: [
    //           {
    //             label: 'Kenteken',
    //             value: this.advice._embedded.car.license
    //           },
    //           {
    //             label: 'Merk',
    //             value: this.advice._embedded.car.make
    //           },
    //           {
    //             label: 'Model',
    //             value: this.advice._embedded.car.model
    //           },
    //           {
    //             label: 'Type',
    //             value: this.advice._embedded.car.edition
    //           },
    //           {
    //             label: 'Bouwjaar',
    //             value: this.advice._embedded.car.year
    //           }
    //         ]
    //       },
    //       {
    //         fields: [
    //           {
    //             label: 'Cataloguswaarde',
    //             value: this.advice._embedded.car.price_consumer_incl_vat
    //           },
    //           {
    //             label: 'Waarde accessoires',
    //             value: this.advice.accessoryValue
    //           },
    //           {
    //             label: 'Dagwaarde',
    //             value: this.advice._embedded.car.current_value
    //           },
    //           {
    //             label: 'Gewicht',
    //             value: this.advice._embedded.car.weight_empty_vehicle
    //           },
    //           {
    //             label: 'KM per jaar',
    //             value: this.advice.kmPerYear
    //           },
    //           {
    //             label: 'Beveiliging',
    //             value: this.advice.securityClass
    //           }
    //         ]
    //       }
    //     ]
    //   };

    //   const personalDetails: SectionItem = {
    //     label: 'Persoonlijke gegevens',
    //     groups: [
    //       {
    //         fields: [
    //           {
    //             label: 'Geslacht',
    //             value: this.advice.gender.toLowerCase() === 'm' ? 'Man' : 'Vrouw'
    //           },
    //           {
    //             label: 'Voorletters',
    //             value: this.advice.initials
    //           },
    //           {
    //             label: 'Voornaam',
    //             value: this.advice.firstname
    //           },
    //           {
    //             label: 'Achternaam',
    //             value: this.advice.lastname
    //           },
    //           {
    //             label: 'Geboortedatum',
    //             value: this.advice.date_of_birth
    //           }
    //         ]
    //       },
    //       {
    //         fields: [
    //           {
    //             label: 'Postcode',
    //             value: this.advice.address.postcode
    //           },
    //           {
    //             label: 'Huisnummer',
    //             value: this.advice.address.number
    //           },
    //           {
    //             label: 'Mobiel nummer',
    //             value: .address.mobileNumber
    //           },
    //           {
    //             label: 'Vast nummer',
    //             value: .address.phoneNumber
    //           },
    //           {
    //             label: 'E-mailadres',
    //             value: .address.emailaddress
    //           }
    //         ]
    //       }
    //     ]
    //   };

    //   this.sections = [
    //     carInsurance,
    //     carDetails,
    //     personalDetails
    //   ];
    // }
  }

  private isProfileValid(profile: Profile) {
    //TODO: make (address) data from first advice step available here
    // console.log(this.isEmpty(profile));
    // console.log(this.isEmpty(profile.address));
    // console.log(this.isEmpty(profile._embedded.car));
    return !(this.isEmpty(profile) || this.isEmpty(profile.address) || this.isEmpty(profile._embedded.car));
  }

  private isEmpty(obj: any) {
    return !obj || Object.keys(obj).length <= 0;
  }
}
