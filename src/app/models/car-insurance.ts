import { Insurance } from './insurance';
import { Car } from './car';

export class CarInsurance {
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
  bonus_malus_step_wa: number;
  bonus_malus_discount_percentage_wa: number;
  kilometers_per_year: number;
  details: string;
  price: number;
  main_coverage: string;
  one_off_premium: number;
  car_current_value: number;
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
  product_id: string;
  terms_conditions_pdf_url: string;
  reviews: number;
  reviews_amount: number;
  supported: boolean;
}

// {
//   id: 2521561,
//   insurance_id: anwb-ledentarief-veilig-rijden-autoverzekering,
//   moneyview_id: ANWB-ledentarief:Veilig Rijden autoverzekering,
//   type: car,
//   insurance_name: Auto,
//   fit: 75.66,
//   price_quality: 10,
//   own_risk: 0,
//   monthly_premium: 36.08,
//   wa_nett: 155.96,
//   bonus_malus_step_wa: 16,
//   bonus_malus_discount_percentage_wa: 80.00,
//   kilometers_per_year: 10000,
//   details: WAVC,
//   price: 36.08,
//   main_coverage: CAR,
//   one_off_premium: 10.29,
//   car_current_value: 6545,
//   claim_free_years: 10,
//   road_assistance: RANO,
//   cover_occupants: false,
//   legal_aid: LAN,
//   household_status: CHMK,
//   no_claim_protection: false,
//   own_risk_theft: 0,
//   own_risk_freechoice: 0,
//   additional_products: null,
//   _embedded: {
//     car: {
//       license: 59LDK7,
//       vin: WF0JXXGAJJAS54010,
//       reporting_code: 4010,
//       year: 2010,
//       fuel: Benzine,
//       fuel_code: B,
//       secondary_fuel: null,
//       color: Grijs,
//       color_code: 07,
//       secondary_color: Onbekend,
//       secondary_color_code: 99,
//       weight_empty_vehicle: 954,
//       price_consumer_excl_vat: 11485,
//       price_consumer_incl_vat: 13300,
//       make: FORD,
//       model: FIESTA,
//       technical_type: 1.25 44KW 5DR,
//       wheels: 4,
//       top_speed: 152,
//       engine_capacity: 1242,
//       power_kw: 44,
//       edition: 1.25 44KW LIMITED 5D,
//       doors: 5,
//       slug: [
//         nicci_cartransmission_manual_transmission
//       ],
//       current_value: 6545
//     },
//     insurance: {
//       id: 11,
//       insurance_brand: ANWB,
//       insurance_logo: https://james-a.nicci.io/cdn/logos/insurance/colour/anwb.png,
//       url: http://www.anwb.nl/verzekeringen
//     }
//   },
//   product_id: anwb-autoverzekering,
//   terms_conditions_pdf_url:
//   http://www.polisvoorwaardenonline.nl/frames/content.aspx?nodeId=52286
//     & title=Polisvoorwaarden + ANWB,
//   reviews: 3,
//   reviews_amount: 1,
//   supported: false
// }
