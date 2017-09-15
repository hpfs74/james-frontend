import * as moment from 'moment';
import { Insurance } from './insurance';
import { InsuranceAdvice } from './insurance-advice';

/**
 * Buy Flow Request
 *
 * @export
 * @interface Proposal
 */
export interface Proposal {
  proposal: InsuranceAdvice;
  items: Array<Object>;
}


/**
 * Buy Flow Request Helper
 */
export class CarProposalHelper {
  /* tslint:disable:max-line-length */
  propMapping = [
    { key: 'Verzekeraar', value: 'moneyview_id', transform: (val) => val.split(':')[0] },
    { key: 'Product', value: 'moneyview_id', transform: (val) => val.split(':')[1] },
    { key: 'Geslacht', value: 'gender', transform: (val) => val === 'm' ? 'Man' : 'Vrouw' },
    { key: 'Voorletters', value: 'initials' },
    { key: 'Voornaam', value: 'firstName' },
    { key: 'Voorvoegsels', value: 'infix' },
    { key: 'Achternaam', value: 'lastName' },
    { key: 'Straat', value: 'street' },
    { key: 'Huisnummer', value: 'number' },
    { key: 'Huisnummer toevoeging', value: 'number_extended' },
    { key: 'Postcode', value: 'postcode' },
    { key: 'Woonplaats', value: 'city' },
    { key: 'Geboortedatum', value: 'birthDate' },
    { key: 'Mobiel telefoonnummer', value: 'mobileNumber' },
    { key: 'Vast telefoonnummer', value: 'phoneNumber' },
    { key: 'Rekeningnummer', value: 'iban', transform: this.removeWhiteSpace },
    { key: 'Betalingstermijn', value: '' },
    { key: 'Emailadres', value: 'email' },
    { key: 'Facebook account', value: '' },
    { key: 'Twitter account', value: '' },
    { key: 'Startdatum', value: 'startDate', transform: this.formatDate },
    { key: 'Ingangsdatum', value: 'startDate', transform: this.formatDate },
    // Car
    { key: 'Kenteken', value: 'car.license' },
    { key: 'Merk', value: 'car.make' },
    { key: 'Model', value: 'car.model' },
    { key: 'Type', value: 'car.type' },
    { key: 'Bouwjaar', value: 'car.year' },
    { key: 'Cataloguswaarde', value: 'car.price_consumer_incl_vat' },
    { key: 'Waarde accessoires', value: 'accessoryValue' },
    { key: 'Dagwaarde', value: 'car.current_value' },
    { key: 'Gewicht', value: 'car.weight_empty_vehicle' },
    { key: 'Kilometrage', value: 'kilometers_per_year' },
    { key: 'Beveiliging', value: 'securityClass', transform: (value) => 'SCM klasse ' + value.slice(-1) },
    { key: 'Hoofddekking', value: 'coverage', transform: this.getCoverage },
    { key: 'Rechtsbijstand meeverzekeren', value: 'legal', transform: this.getBoolean },
    { key: 'Inzittenden meeverzekeren', value: 'cover_occupants', transform: this.getBoolean },
    { key: 'Slotvragen', value: '' },
    // FirstName is a mandatory field to buy an insurance
    { key: 'Voornaam', value: 'name'}
  ];
  /* tslint:enable */

  getItems(data: any): Array<Object> {
    if (!data) {
      return;
    }

    const itemArr = [];
    this.propMapping.forEach((el) => {
      let value;
      if (el.value.indexOf('.') > -1) {
        value = el.value.split('.').reduce((o, i) => o[i], data);
      } else if (data.hasOwnProperty(el.value)) {
        value = data[el.value];
      }

      itemArr.push({[el.key]: el['transform'] ? el['transform'](value) : (value ? value.toString() : '')});
    });
    return itemArr;
  }

  getFinalQuestions(data: any) {
    /* tslint:disable */
    return [
      {
        key: 'Ben jij in de laatste 8 jaar, in aanraking geweest met politie of justitie?',
        value: this.getCheckAnswer(data.crime, data.crimeComment || null)
      },
      {
        key: `Ben jij in de laatste 8 jaar geweigerd of opgezegd door een verzekeraar of betrokken (geweest) bij verzekeringsfraude?`,
        value: this.getCheckAnswer(data.refuse, data.refuseComment || null)
      },
      {
        key: `Ben jij in de laatste 5 jaar failliet verklaard of in een schuldsanering betrokken geweest, of heeft een deurwaarder momenteel beslag gelegd op jouw inkomsten of bezittingen?`,
        value: this.getCheckAnswer(data.debt, data.debtComment || null)
      },
      {
        key: `Is jou, de regelmatige bestuurder of kentekenhouder in de laatste 8 jaar de rijbevoegdheid (geheel of voorwaardelijk) ontzegd?`,
        value: this.getCheckAnswer(data.driver, data.driverComment || null)
      },
      {
        key: `Heb jij de laatste 5 jaar schade geleden of veroorzaakt, die gedekt werd door een soortgelijke verzekering als je nu aanvraagt?`,
        value: this.getCheckAnswer(data.cause, data.causeComment || null)
      },
      {
        key: `Is de auto vanaf de datum dat deze op naam van de kentekenhouder staat, langer dan 10 dagen onverzekerd?`,
        value: this.getCheckAnswer(data.register, data.registerComment || null)
      }
    ];
    /* tslint:enable */
  }

  getFinalQuestionsItems(data: Array<{key: string, value: string}>): Array<Object> {
    if (!data) {
      return;
    }

    const itemObj = [];
    data.forEach((el) => {
      itemObj.push({[el.key]: el.value.toString()});
    });

    return itemObj;
  }

  getCheckAnswer(value: boolean, comment: string) {
    let yesNo = this.getBoolean(value);
    return comment ? yesNo + ', ' + comment : yesNo;
  }

  private getBoolean(value: boolean) {
    return value ? 'Ja' : 'Nee';
  }

  private getCoverage(coverage: string) {
    let value: string;

    switch (coverage) {
      case 'CL':
        value = 'Aansprakelijkheid';
        break;
      case 'CLC':
        value = 'Aansprakelijkheid + Beperkt casco';
        break;
      case 'CAR':
        value = 'Aansprakelijkheid + Volledig casco';
        break;
      default:
        value = null;
        break;
    }

    return value;
  }

  private formatDate(value: Date) {
    return moment(value).format('DD-MM-YYYY');
  }

  private removeWhiteSpace(value: string) {
    return value.replace(/[ _]/gim, '');
  }
}
