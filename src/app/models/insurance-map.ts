export interface InsuranceMap {
  apiType: string;
  type: string;
}

export const insuranceTypes: Array<InsuranceMap> = [
  { apiType: 'Auto', type: 'car', },
  { apiType: 'Reis', type: 'travel', },
  { apiType: 'Inboedel', type: 'content', },
  { apiType: 'Aansprakelijkheid', type: 'liability', },
  { apiType: 'Opstal', type: 'home', }
];
