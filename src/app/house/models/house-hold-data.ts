export interface HouseHoldData {
  OwnedBuilding?: boolean;
  RoomCount?: number;
  SurfaceArea?: number;
  BuildingType?: string;
  BuildYear?: number;
  WallsTitle?: string;
  RoofMaterial?: string;
  SecondFloor?: string;
  Security?: string;

  Coverage?: number;
  OutsideCoverage?: string;
  NetIncomeRange?: number;
  DateOfBirth?: string;
  FamilySituation?: string;
  GlassCoverage?: string;
}

export interface PackagePremium {
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
  HouseHoldInsurances?: HouseHoldData[];
}
