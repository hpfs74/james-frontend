import { HouseHoldSearchCriteria, CalculatedPremium } from './house-hold-premium';
import { Address } from '@app/address/models';

export interface InsuranceStore {

  /** insurance for house hold */
  houseHoldInsurance: InsuranceChoice;

  /** insurance for house */
  houseInsurance: InsuranceChoice;

  /** customer information */
  contacts: ContactDetails;

  /** legal questions */
  questions: LegalQuestions;

  /** customer payment details */
  paymentDetails: PaymentDetails;
}

/** this interface will contain the payment method from customer */
export interface PaymentDetails {
  /** contains the customer iban number */
  iban: string;
}

export interface InsuranceChoice {
  /** Criteria used to find the available premiums */
  searchCriteria: HouseHoldSearchCriteria;

  /** These are the premiums that were available and from which the user had to choose. */
  availablePremiums: Array<CalculatedPremium>;

  /** This is what the user selected, referencing the premium by its 'Identifier' */
  selectedPremium: CalculatedPremium;
}

/** Contact details the customer provided when submitting his selection */
export interface ContactDetails {
  /** customer first name */
  firstName: string;

  /** infix typical dutch */
  infix: string;

  /** prefix like Mr, Mrs, Dr, Ms, Hr, Vr, etc. */
  prefix: string;

  /** customer last name */
  lastName: string;

  /** customer email address */
  email: string;

  /** M: male, F: female */
  gender?: string;

  /** date of birth */
  dateOfBirth: Date;

  /** family situation with values */
  familySituation: string;

  /** Location address */
  address: Address;

  /** Address for sending paper mail, this would be null in case is the same from the normal address */
  addressForComminications?: Address;

  /** true if the user accepted knab terms and conditions */
  hasAcceptedTermsAndConditionsFromKnab?: boolean;

  /** true if the user accepted risk terms and conditions */
  hasAcceptedTermsAndConditionsFromRisk?: boolean;
}


export interface LegalQuestions {
  question1: boolean;
  question2: boolean;
  question3: boolean;
  question4: boolean;
  question5: boolean;
  question6: boolean;
  question7: boolean;
}
