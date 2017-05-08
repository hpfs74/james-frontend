export class Insurance {
  id: number;
  insurance_brand: string;
  insurance_logo: string;
  url: string;
}

export class InsuranceBase {
  fit: number;
  own_risk: number;
  price_quality: number;
  monthly_premium: number;
  reviews: number;
  reviews_amount: number;
  _embedded: {
    insurance: Insurance;
  };
}
