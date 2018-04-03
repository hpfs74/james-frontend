describe('HouseHoldPaymentDetailsForm', () => {

  it('should init component');

  describe('iban handling', () => {
    it('should show invalid form with incorrect iban');
    it('should show valid if iban is correct');
  });

  describe('flags handling', () => {
    it('should be invalid if check knab is unchecked');
    it('should be invalid if check risk is unchecked');
    it('should be valid if all checks are checked');
  });
});
