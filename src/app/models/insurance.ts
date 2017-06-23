export interface Insurance {
  _id: string;
  type: string;
  status: string;
  reference: string;
  label: string;
}

// Optional props
export interface Insurance {
  insurance?: string;
  insurance_logo?: string;
  insurance_brand?: string;
  insurance_name?: string;
  details?: string;
  policy_number?: string;
  filled_data_percentage?: number;
  outdated_data_percentage?: number;
  start_date?: string;
  end_date?: string;
  price?: string;
  own_risk?: string;
  reviews?: string
  insurance_phone_number?: string;
  adviser_phone_number?: string;
  damage_free?: string;
  coverage?: string;
  insured_amount?: number;
  editable?: boolean;
  display_alert?: boolean;
  manually_added?: boolean;
  bought_through_app?: boolean;
  request_status?: boolean;
}
