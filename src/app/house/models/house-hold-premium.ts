/**
 * Criteria by which we've found this selection
 */
export class HouseHoldSearchCriteria {
  Birthdate: number;
  CommencingDate: number;
  Zipcode: string;
  HouseNumber: number;
  HouseNumberAddition?: string;
  HouseType: string;
  BuildYear?: number;
  Volume?: number;
  RoomCount: number;
  SurfaceArea?: number;
  ConstructionNature: string;
  ConstructionNatureRoof: string;
  ConstructionNatureFloor: string;
  StrawRoofing?: string;
  SparkCatcher?: string;
  FireResistentRoof?: string;
  ImpregnatedStraw?: string;
  SecurityMeasures: string;
  OwnedBuilding: string;
  AdjoiningBuildings?: string;
  BORGSecurityClass?: string;
  CoverageCode: number;
  FamilyComposition: string;
  InsuredAmount?: number;
  IncludeGlass: string;
  GuaranteeAgainstUnderinsurance: string;
  AmountMoreThan12KAudioVisualComp?: number;
  AmountMoreThan6KJewelry?: number;
  AmountMoreThan15KSpecialPossesion?: number;
  AmountMoreThan6KTenantsInterest?: number;
  BreadWinnerBirthdate?: number;
  BreadWinnerMonthlyIncome?: number;
  InsuredAmountValuables: number;
  IncludeOutdoorsValuable?: string;
}

export class HouseHoldPremiumRequest extends HouseHoldSearchCriteria {
}

export interface ConditionUrl {
  URL: string;
  Description: string;
  Number: string;
}

export interface Clause {
  ClauseTitle: string;
  ClauseNumber: string;
  ClauseText: string;
}

export interface CalculatedPremium {
  CommencingDate: number;
  NettoPremium: number;
  TotalCosts: number;
  Taxes: number;
  Premium: number;
  PaymentMethod: number;
  PackageDescription: string;
  ProductDescription: string;
  CompanyName: string;
  CompanyLogoUrl: string;
  Identifier: string;
  ConditionUrls?: ConditionUrl[];
  Clauses?: Clause[];
  HouseholdCoverageDescription: string;
  InsuredAmount: number;
  Deductables: number;
  TenantsInterestCoverageDescription: string;
  GlassCoverageDescription: string;
  ValuablesCoverageDescription: string;
  ValuablesInsuredAmount: number;
}

export interface HouseHoldPremiumResponse {
  CalculatedPremiums: Array<CalculatedPremium>;
}
