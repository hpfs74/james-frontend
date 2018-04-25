import { HouseHoldData } from '@app/house/models/house-hold-data';
import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';

/**
 * this is the object that returns from risk when we call
 * calculate, offer and request of package insurance
 */
export interface PackagePremiumResponse {
  AcceptanceResult?: string;
  PackageDescription?: string;
  OfferNumber?: string;
  PackageNumber?: string;
  PolicyCount?: number;
  CommencingDate?: Date;
  NettoPremium?: number;
  TotalCosts?: number;
  Taxes?: number;
  PackageDiscount?: number;
  Premium: number;

  CarInsurances?: any;
  HomeInsurances?: any;
  HouseholdInsurances?: CalculatedPremium[];
}

/** this is the object that is needed for the buy of a package insurance */
export interface PackagePremiumRequest {
  Name?: string;
  NameInfix?: string;
  Initials?: string;
  Gender?: string;
  Birthday?: string;
  Email?: string;
  ZipCode?: string;
  HouseNumber?: string;
  HouseNumberAddition?: string;
  IBAN?: string;
  AgreeToFinalQuestions?: string;
  HouseholdInsurances?: any;
  HomeInsurances?: any;
  CarInsurances?: any;
}


