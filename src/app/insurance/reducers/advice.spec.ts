import { Add, Update, Remove, Select, SetInsurance, RemoveInsurance } from '../actions/advice';
import * as fromAdvice from './advice';

describe('Advice reducer', () => {
  describe('undefined action', () => {
    it('should handle initial state', () => {
      const action = {} as any;
      const result = fromAdvice.reducer(undefined, action);
      expect(result).toEqual(fromAdvice.initialState);
    });
  });

  describe('ADD_ADVICE', () => {
    it('should add an advice', () => {
      const addAction = new Add({
        id: '20304',
        test: 'value'
      });

      const expectedResult = {
        selectedId: '20304',
        ids: ['20304'],
        advice: {
          '20304': {
            id: '20304', test: 'value'
          }
        },
        selectedInsurance: null
      };

      const result = fromAdvice.reducer(fromAdvice.initialState, addAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_ADVICE', () => {
    it('should do nothing if no advice selected', () => {
      const payload = {
        id: '2516227',
        insurance_id: 'ohra-autoverzekering-aanvullend',
        moneyview_id: 'ohra-autoverzekering-aanvullend',
        type: 'car',
        car: null,
        insurance_name: 'Auto',
        fit: 78.09,
        price_quality: 10,
        own_risk: 0,
        monthly_premium: 121.99,
        documents: [],
        details: 'WAVC',
        price: 121.99,
        product_id: '2516227',
        terms_conditions_pdf_url: '',
        reviews: 2,
        reviews_amount: 4,
        supported: true,
        _embedded: null
      };

      const expectedResult = fromAdvice.initialState;

      const updateAction = new Update(payload);
      const result = fromAdvice.reducer(fromAdvice.initialState, updateAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SELECT_ADVICE', () => {
    it('should set a selectedId', () => {
      const testInitialState = {
        selectedId: '999',
        ids: ['22', '999'],
        advice: {
          '22': {
            name: 'John Doe',
            email: 'test@mail.nl'
          },
          '999': {
            email: 'test@mail.nl'
          }
        },
        selectedInsurance: null
      };

      const selectAction = new Select('22');

      const expectedResult = {
        selectedId: '22',
        ids: ['22', '999'],
        advice: {
          '22': {
            name: 'John Doe',
            email: 'test@mail.nl'
          },
          '999': {
            email: 'test@mail.nl'
          }
        },
        selectedInsurance: null
      };

      const result = fromAdvice.reducer(testInitialState, selectAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('REMOVE_ADVICE', () => {
    it('should remove an advice that is selected', () => {
      const testInitialState = {
        selectedId: '22',
        ids: ['22', '999'],
        advice: {
          '22': {
            name: 'John Doe',
            email: 'test@mail.nl'
          },
          '999': {
            email: 'test@mail.nl'
          }
        },
        selectedInsurance: null
      };

      const removeAction = new Remove({
        id: '22'
      });

      const expectedResult = {
        selectedId: null,
        ids: ['999'],
        advice: {
          '999': {
            email: 'test@mail.nl'
          }
        },
        selectedInsurance: null
      };

      const result = fromAdvice.reducer(testInitialState, removeAction);
      expect(result).toEqual(expectedResult);
    });

    it('should remove an advice', () => {
      const testInitialState = {
        selectedId: '999',
        ids: ['22', '999'],
        advice: {
          '22': {
            name: 'John Doe',
            email: 'test@mail.nl'
          },
          '999': {
            email: 'test@mail.nl'
          }
        },
        selectedInsurance: null
      };

      const removeAction = new Remove({
        id: '22'
      });

      const expectedResult = {
        selectedId: '999',
        ids: ['999'],
        advice: {
          '999': {
            email: 'test@mail.nl'
          }
        },
        selectedInsurance: null
      };

      const result = fromAdvice.reducer(testInitialState, removeAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SET_INSURANCE', () => {
    it('should set an insurance as selected', () => {
      const payload = {
        id: '2516227',
        insurance_id: 'ohra-autoverzekering-aanvullend',
        moneyview_id: 'ohra-autoverzekering-aanvullend',
        type: 'car',
        car: null,
        advice_expires_at: 312323123,
        insurance_name: 'Auto',
        fit: 78.09,
        price_quality: 10,
        own_risk: 0,
        monthly_premium: 121.99,
        documents: [],
        details: 'WAVC',
        price: 121.99,
        product_id: '2516227',
        terms_conditions_pdf_url: '',
        reviews: 2,
        reviews_amount: 4,
        supported: true,
        _embedded: null
      };

      const expectedResult = {
        selectedId: null,
        ids: [],
        advice: {},
        selectedInsurance: payload
      };

      const selectAction = new SetInsurance(payload);
      const result = fromAdvice.reducer(fromAdvice.initialState, selectAction);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('REMOVE_INSURANCE', () => {
    it('should set selectedInsurance as null', () => {
      const testInitialState = {
        selectedId: null,
        ids: [],
        advice: {},
        selectedInsurance: {
          id: '2516227',
          advice_expires_at: 312323123,
          insurance_id: 'ohra-autoverzekering-aanvullend',
          moneyview_id: 'ohra-autoverzekering-aanvullend',
          type: 'car',
          car: null,
          insurance_name: 'Auto',
          fit: 78.09,
          price_quality: 10,
          own_risk: 0,
          monthly_premium: 121.99,
          documents: [],
          details: 'WAVC',
          price: 121.99,
          product_id: '2516227',
          terms_conditions_pdf_url: '',
          reviews: 2,
          reviews_amount: 4,
          supported: true,
          _embedded: null
        }
      };

      const removeAction = new RemoveInsurance();
      const result = fromAdvice.reducer(testInitialState, removeAction);
      expect(result).toEqual(fromAdvice.initialState);
    });
  });

  describe('Selections', () => {
    const advice1 = {
      id: '22',
      name: 'John Doe',
      email: 'test@mail.nl'
    };
    const advice2 = {
      id: '999',
      email: 'test@mail.nl'
    };
    const state = {
      selectedId: advice1.id,
      ids: [advice1.id, advice2.id],
      advice: {
        '22': advice1,
        '999': advice2
      },
      selectedInsurance: {
        id: '2516227',
        advice_expires_at: 312323123,
        insurance_id: 'ohra-autoverzekering-aanvullend',
        moneyview_id: 'ohra-autoverzekering-aanvullend',
        type: 'car',
        car: null,
        insurance_name: 'Auto',
        fit: 78.09,
        price_quality: 10,
        own_risk: 0,
        monthly_premium: 121.99,
        documents: [],
        details: 'WAVC',
        price: 121.99,
        product_id: '2516227',
        terms_conditions_pdf_url: '',
        reviews: 2,
        reviews_amount: 4,
        supported: true,
        _embedded: null
      }
    };

    describe('getAdvice', () => {
      it('should return the advice', () => {
        const result = fromAdvice.getAdvice(state);
        expect(result).toEqual(state.advice);
      });
    });

    describe('getIds', () => {
      it('should return all advice ids', () => {
        const result = fromAdvice.getIds(state);
        expect(result).toEqual([advice1.id, advice2.id]);
      });
    });

    describe('getSelectedId', () => {
      it('should return the selected advice id', () => {
        const result = fromAdvice.getSelectedId(state);
        expect(result).toEqual(advice1.id);
      });
    });

    describe('getSelected', () => {
      it('should return the selected advice', () => {
        const result = fromAdvice.getSelected(state);
        expect(result).toEqual(advice1);
      });
    });

    describe('getSelectedInsurance', () => {
      it('should return the selected insurance', () => {
        const result = fromAdvice.getSelectedInsurance(state);
        expect(result).toEqual(state.selectedInsurance);
      });
    });
  });

});
