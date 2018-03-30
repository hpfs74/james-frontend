import { HouseHoldSearchCriteria, CalculatedPremium } from './house-hold-premium';

/** Used to transmit which selection has been made. */
export class HouseHoldSelectionRequest {
  /** Criteria used to find the available premiums */
  SearchCriteria: HouseHoldSearchCriteria;

  /** These are the premiums that were available and from which the user had to choose. */
  AvailablePremiums: Array<CalculatedPremium>;

  /** This is what the user selected, referencing the premium by its 'Identifier' */
  SelectedPremiumId: string;

  /** Contact details of the user */
  ContactDetails: ContactDetails;
}

/** Contact details the customer provided when submitting his selection */
export class ContactDetails {
  /** User-provided name */
  FullName: string;

  PhoneNumber: string;

  EmailAddress: string;

  HasAcceptedTermsAndConditions: boolean;

  HasOptInForServiceUpdated: boolean;
}

/** Generic model for errors. Based on http://jsonapi.org/examples/#error-objects
 * and http://jsonapi.org/format/#errors
 */
export class InsuranceApiErrors {
  Errors: Array<InsuranceApiError>;
}

/** Single error description */
export class InsuranceApiError {
  /** HTTP status code, expressed as string */
  Status: string;
  /** Short, human-readable summary that should not change from occurrence to occurrence */
  Title: string;
  /** Human-readable explanation */
  Details: string;
  /** Unique ID to this particular occurrence */
  Id: string;
}
