import * as moment from 'moment';
import { Insurance } from '../../insurance/models/insurance';
import { InsuranceAdvice } from '../../insurance/models/insurance-advice';
import { TagsService } from '../../core/services/tags.service';
import { dateDecode } from '../../utils/base-form.utils';

/**
 * Buy Flow Request
 *
 * @export
 * @interface Proposal
 */
export interface Proposal {
  advice_item_id: string;
  proposal: InsuranceAdvice;
  items: Array<Object>;
}

/**
 * Buy Flow Request Data Transformer
 */
export class CarProposalHelper {

  constructor() {}

  /* tslint:disable:max-line-length */
  propMapping = [
    { key: 'Verzekeraar', value: 'moneyview_id', transform: (val) => val.split(':')[0] },
    { key: 'Product', value: 'moneyview_id', transform: (val) => val.split(':')[1] },
    { key: 'Geslacht', value: 'gender', transform: (val) => val === 'M' ? 'Man' : 'Vrouw' },
    { key: 'Voorletters', value: 'initials' },
    { key: 'Voornaam', value: 'firstName' },
    { key: 'Voorvoegsels', value: 'infix' },
    { key: 'Achternaam', value: 'lastName' },
    { key: 'Straat', value: 'street' },
    { key: 'Huisnummer', value: 'house_number' },
    { key: 'Huisnummer toevoeging', value: 'number_extended', transform: this.getHouseNumberAddition },
    { key: 'Postcode', value: 'zipcode' },
    { key: 'Woonplaats', value: 'city' },
    { key: 'Geboortedatum', value: 'date_of_birth' },
    { key: 'Mobiel telefoonnummer', value: 'mobileNumber' },
    { key: 'Vast telefoonnummer', value: 'phoneNumber' },
    { key: 'Rekeningnummer', value: 'iban', transform: this.removeWhiteSpace },
    { key: 'Betalingstermijn', value: '' },
    { key: 'Emailadres', value: 'emailaddress' },
    { key: 'Facebook account', value: '' },
    { key: 'Twitter account', value: '' },
    { key: 'Startdatum', value: 'startDate', transform: this.formatDate },
    { key: 'Ingangsdatum', value: 'startDate', transform: this.formatDate },
    // Car
    { key: 'Kenteken', value: 'car.license' },
    { key: 'Merk', value: 'car.make' },
    { key: 'Model', value: 'car.model' },
    { key: 'Type', value: 'car.technical_type' },
    { key: 'Bouwjaar', value: 'car.year' },
    { key: 'Cataloguswaarde', value: 'car.price_consumer_incl_vat' },
    { key: 'Waarde accessoires', value: 'accessoryValue' },
    { key: 'Dagwaarde', value: 'car.current_value' },
    { key: 'Gewicht', value: 'car.weight_empty_vehicle' },
    { key: 'Kilometrage', value: 'kilometers_per_year' },
    { key: 'Beveiliging', value: 'securityClass', transform: (value) => 'SCM klasse ' + value.slice(-1) },
    { key: 'Hoofddekking', value: 'dekking' },
    { key: 'Rechtsbijstand meeverzekeren', value: 'legal', transform: this.getBoolean },
    { key: 'Inzittendenverzekering', value: 'cover_occupants', transform: this.getBoolean },
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

      itemArr.push({[el.key]: el['transform'] ? el['transform'](value) : (this.isPresented(value) ? value.toString() : '')});
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

  mergeData(items: Array<Object>, values: Array<Object>) {
    values.forEach( (el) => {
      let key = Object.keys(el)[0];
      let item = this.getItem(items, key);
      if (item) {
        item[key] = el[key];
      } else {
        items.push(el);
      }
    });
  }

  getCarInfo(carInfo: any, adviceInfo: any) {
    carInfo.reporting_code = adviceInfo.reportingCode;
    return carInfo;
  }

  private getItem(items: Array<Object>, property: string): Object {
    let ret = null;
    items.forEach( (el) => {
      if (el.hasOwnProperty(property)) {
        ret = el;
      }
    });
    return null;
  }

  private getBoolean(value: boolean) {
    return value ? 'Ja' : 'Nee';
  }

  private isPresented(value: any) {
    return value !== undefined && value !== null;
  }

  private formatDate(value: Date) {
    return moment(dateDecode(value)).format('DD-MM-YYYY');
  }

  private getHouseNumberAddition(value) {
    return value.number_letter;
  }

  private removeWhiteSpace(value: string) {
    return value.replace(/[ _]/gim, '');
  }

}
