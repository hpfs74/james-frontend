import { SecurityClasses } from '../models/security-classes';
import { KilometersPerYear } from '../models/kilometers';

export class CarUtils {
  static securityClasses = SecurityClasses;
  static kilometersPerYear = KilometersPerYear;

  static getCoverage(coverage: string) {
    let value = '';

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
        break;
    }
    return value;
  }

  static getSecurityClassName(securityClass: string) {
    return securityClass ? this.securityClasses.filter(item => item.value === securityClass)[0].title : '';
  }

  static getKilometerPerYear(kmrClass: string) {
    let item = this.kilometersPerYear.filter(item => item.value === kmrClass)[0];
    return item ? item.label : '';
  }

  static getRoadAssistance(roadAssistance: string) {
    let value = '';
    switch (roadAssistance) {
      case 'RACO':
        value = 'Binnen Nederland';
        break;
      case 'RAE':
        value = 'Binnen Europa';
        break;
      default:
        value = 'Nee';
        break;
    }
    return value;
  }

  static getLegalAid(value: string) {
    if (value === 'LAN') {
      return 'Nee';
    } else if (value === 'LAY' || value === 'LAE') {
      return 'Ja';
    }
    return 'Nee';
  }
}
