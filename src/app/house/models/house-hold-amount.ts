export class HouseHoldAmountRequest {

  SurfaceArea: number;
  OwnedBuilding: string;
  FamilyComposition: string;
  AmountMoreThan12KAudioVisualComp: number;
  AmountMoreThan6KJewelry: number;
  AmountMoreThan15KSpecialPossesion: number;
  AmountMoreThan6KTenantsInterest?: number;
  BreadWinnerBirthdate: string;
  BreadWinnerMonthlyIncome: number;
}

export class HouseHoldAmountResponse {
  InsuredAmount: number;
}


