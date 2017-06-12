import { InsuranceAdvice, InsuranceCompareResult } from './insurance-compare-result';
import { Car } from './car';

export class CarInsurance extends InsuranceAdvice {
  id: string;
  insurance_id: string;
  moneyview_id: string;
  type: string;
  insurance_name: string;
  fit: number;
  price_quality: number;
  own_risk: number;
  monthly_premium: number;
  wa_nett: number;
  bonus_malus_step_wa: string;
  bonus_malus_discount_percentage_wa: string;
  kilometers_per_year: string;
  details: string;
  price: number;
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
    insurance: InsuranceCompareResult
  };
  product_id: string;
  terms_conditions_pdf_url: string;
  reviews: number;
  reviews_amount: number;
  supported: boolean;
}
