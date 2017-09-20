import { Car } from './car';
import { Insurance } from '../../models/insurance';
import { InsuranceAdvice } from '../../models/insurance-advice';

interface Document {
  name: string;
  url: string;
}

export class CarInsurance extends InsuranceAdvice {
  constructor() {
    super();
  }

  wa_nett: number;
  bonus_malus_step_wa: string;
  bonus_malus_discount_percentage_wa: string;
  kilometers_per_year: string;

  main_coverage: string;
  one_off_premium: number;
  car_current_value: string | number;
  claim_free_years: number;
  road_assistance: string;
  cover_occupants: boolean;
  legal_aid: string;
  household_status: string;
  no_claim_protection: boolean;
  own_risk_theft: number;
  own_risk_freechoice: number;
  additional_products: any;
  _embedded: {
    car: Car,
    insurance: Insurance
  };
}
