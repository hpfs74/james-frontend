import { CalculatedPremium, HouseHoldPremiumRequest } from '@app/house/models/house-hold-premium';

export interface ContactInformation {
  FullName: string;
  PhoneNumber: string;
  EmailAddress: string;
  HasAcceptedTermsAndConditions: boolean;
  HasOptInForServiceUpdated: boolean;
}

export interface  HouseHoldStoredAdviceRequest {
  SearchCriteria: HouseHoldPremiumRequest;
  ContactDetails: ContactInformation;
  SelectedPremium: string;
  AvailablePremiums: CalculatedPremium[];
}

export interface HouseHoldStoredAdviceResponse {
  referenceNumber: string;
}
