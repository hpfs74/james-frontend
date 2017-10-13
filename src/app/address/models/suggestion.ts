export interface AddressSuggestionParams {
  zipcode: string;
  house_number: string;
}

export interface AddressSuggestion {
  additions: string[];
  house_number: string;
}
