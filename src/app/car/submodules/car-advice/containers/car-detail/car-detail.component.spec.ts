import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { CarDetailComponent } from '@app/car/submodules/car-advice/containers/car-detail/car-detail.component';
import { CarDataAnaylitcsEvent } from '@app/core/models/analytics';
import { Car } from '@app/car/models';

import { setUpTestModule } from 'test.common.spec';

import * as wizardActions from '@app/core/actions/wizard';
import * as analyitcsActions from '@app/core/actions/analytics';
import * as carActions from '@app/car/actions/car';
import * as fromRoot from '@app/reducers';

describe('Component: CarDetailComponent', () => {
  let comp: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
    setUpTestModule();
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CarDetailComponent);
    comp = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callThrough();

    comp.ngAfterViewInit();
    fixture.detectChanges();
  });

  describe('Should go to next step', () => {
    it('should throw an error if nothing is selected', () => {
      const wizardAction = new wizardActions.Error({message: comp.form.validationSummaryError});
      comp.goToNextStep();
      expect(store.dispatch).toHaveBeenCalledWith(wizardAction);
    });
    it('should dispatch analyitcs event when licenceplate is entered', () => {
      const carDataAvailableEvent: CarDataAnaylitcsEvent = {
        event: 'carDataAvailable',
        error: '',
        car: {
            brand: 'Audi',
            model: 'A4',
            color: 'grijs',
            fuel: 'benzine',
            transmission: 'automaat',
            constructionYear: '1998',
            purchaseValue: '15240',
            dayValue: '10000'
        }
      };

      let carMock: Car = {
        _id: 'asdasdasdas',
        license: '01xlxl',
        vin: '2',
        reporting_code: 'string',
        year: '1998',
        fuel: 'benzine',
        fuel_code: 'string',
        secondary_fuel: 'string',
        color: 'grijs',
        color_code: 'string',
        secondary_color: 'string',
        secondary_color_code: 'string',
        weight_empty_vehicle: 0,
        price_consumer_excl_vat: 0,
        price_consumer_incl_vat: 15240,
        make: 'Audi',
        model: 'A4',
        technical_type: 'string',
        wheels: 0,
        top_speed: 0,
        engine_capacity: 0,
        power_kw: 0,
        transmission: 'automaat',
        transmission_nl: 'string',
        edition: 'string',
        doors: 0,
        slug: [],
        current_value: 10000,
        meldcode: 0,
        nicci_cartransmission_manual_transmission: 'automaat',
        nicci_cartransmission_automatic_transmission: 'automaat',
      };

      const carInfoSuccessAction = new carActions.GetInfoComplete(carMock);
      store.dispatch(carInfoSuccessAction);
      comp.dispatchCarDataAvailableAction();
      const analyticsAction = new analyitcsActions.CarDataAvailableAction(carDataAvailableEvent);
      expect(store.dispatch).toHaveBeenCalledWith(analyticsAction);
    });

    it('should dispatch analyitcs event when licenceplate is entered and has an error', () => {
      const carDataAvailableEvent = {
        event: 'carDataAvailable',
        error: comp.form.validationErrors['licensePlateRDC'](),
        car: {}
      } as CarDataAnaylitcsEvent;

      const carInfoFailure = new carActions.GetInfoFailure({});
      store.dispatch(carInfoFailure);
      comp.dispatchCarDataAvailableAction();
      const analyticsAction = new analyitcsActions.CarDataAvailableAction(carDataAvailableEvent);
      expect(store.dispatch).toHaveBeenCalledWith(analyticsAction);
    });

    // TODO complete tests for this component as a seperate ticket
    it('should dispatch analyitcs event when all data is filled', () => {
      pending();
    });

  });
});
