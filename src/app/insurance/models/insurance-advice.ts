import { Car } from '../../car/models';
import { Insurance } from './insurance';
import { InsuranceDocument } from './insurance-document';

export class InsuranceAdvice {
  id: string;
  advice_expires_at: number;
  insurance_id: string;
  moneyview_id?: string;
  type?: string;
  car?: Car;
  insurance_name: string;
  fit?: number;
  price_quality?: number;
  own_risk: number;
  monthly_premium: number;
  documents?: Array<InsuranceDocument>;
  details?: string;
  price?: number;
  product_id?: string;
  terms_conditions_pdf_url?: string;
  reviews?: number;
  reviews_amount?: number;
  supported: boolean;
  logo: string;

  _embedded?: {
    car: Car;
    insurance: Insurance;
  };
}
