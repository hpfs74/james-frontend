import { Car } from './car';
import { Insurance } from './insurance';

export class InsuranceAdvice {
  fit: number;
  own_risk: number;
  price_quality: number;
  monthly_premium: number;
  reviews: number;
  reviews_amount: number;
  _embedded: {
    car: Car;
    insurance: Insurance;
  };
}
