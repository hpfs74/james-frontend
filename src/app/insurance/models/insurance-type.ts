export interface InsuranceMap {
  label: string;  // 'Auto', 'Reis', ...
  type: string;   // 'car', 'travel', ...
}

export const insuranceTypes: Array<InsuranceMap> = [
  {
    label: 'Auto',
    type: 'car',
  },
  {
    label: 'Reis',
    type: 'travel',
  },
  {
    label: 'Inboedel',
    type: 'content',
  },
  {
    label: 'Aansprakelijkheid',
    type: 'liability',
  },
  {
    label: 'Opstal',
    type: 'home',
  }
];
