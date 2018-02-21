export interface PageViewAnalyticsEvent {
  hitType: string;
  event: string;
  page: string;
  loggedIn_Verzekeren: string;
  product_id?: string;
  product_name?: string;
  external?: string;
}

export interface ClickoutAnalyticsEvent {
  event: string;
  event_label: string;
  page: string;
  loggedIn_Verzekeren: string;
  product_id: string;
  product_name: string;
}

interface CarAnalytics {
  brand: string;
  model: string;
  color: string;
  fuel: string;
  transmission: string;
  constructionYear: string;
  purchaseValue: string;
  dayValue: string;
}

interface UserAnayltics {
  damageFreeYears: string;
  loan: string;
  gender: string;
  birthyear: string;
  zipcode: string;
  familySituation: string;
}

interface EcommerceDetailActionFieldAnalytics {
  list?: string;
}

interface EcommerceDetailProductsAnalytics {
  name: string;
  category: string;
  variant: string;
}

interface EcommerceDetailAnalytics {
  actionField: EcommerceDetailActionFieldAnalytics;
  products: EcommerceDetailProductsAnalytics[];
}

interface EcommerceAnalytics {
  detail: EcommerceDetailAnalytics;
}

export interface CoverageAdviceAnalyticsEvent {
  event: string;
  car: CarAnalytics;
  user: UserAnayltics;
  ecommerce: EcommerceAnalytics;
  error?: string;
}

export interface CarDataAnaylitcsEvent {
  event: string;
  car: CarAnalytics;
  error?: string;
}
