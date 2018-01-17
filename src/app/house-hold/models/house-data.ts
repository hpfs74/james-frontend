export class HouseDataRequest {
  Zipcode: string;
  HouseNumber: number;
  HouseNumberAddition?: string;
}

/**
 * result of getHouseData
 */
export class HouseDataResponse {
  Zipcode: string;
  HouseNumber: number;
  HouseNumberAddition: string;
  Street: string;
  Place: string;
  HouseType: string;
  BuildYear: number;
  Volume: number;
  SurfaceArea: number;
}
