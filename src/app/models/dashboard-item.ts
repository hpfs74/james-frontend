export interface DashboardItem {
  documents?: Array<any>;
  count?: number;
  limit?: number;
  offset?: number;
  type: string;
}

export const insuranceTypes = ['car', 'travel', 'home', 'content', 'liability'];

