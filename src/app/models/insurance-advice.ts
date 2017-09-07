import { Car } from './car';
import { Insurance } from './insurance';

export class InsuranceAdvice {
  id: string;
  insurance_id: string;
  moneyview_id: string;
  type: string;
  insurance_name: string;
  fit: number;
  price_quality: number;
  own_risk: number;
  monthly_premium: number;
  documents: Array<Document>;
  details: string;
  price: number;
  product_id: string;
  terms_conditions_pdf_url: string;
  reviews: number;
  reviews_amount: number;
  supported: boolean;

  _embedded: {
    car: Car;
    insurance: Insurance;
  };
}
