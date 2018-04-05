import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { KnabLabButtonComponent } from '@app/house/components/knx-knab-lab/knab-lab.component';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FeatureConfigServiceMock } from '@app/core/services/feature-config.service.mock';
import { By } from '@angular/platform-browser';

describe('Component: HouseHoldDetailComponent', () => {
  let comp: KnabLabButtonComponent;
  let fixture: ComponentFixture<KnabLabButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KnabLabButtonComponent
      ],
      providers: [
        {
          provide: FeatureConfigService,
          useClass: FeatureConfigServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(KnabLabButtonComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should display component based if env var is there', () => {
    comp.featureConfig.featureConfig.knabLab = 'testurl';
    fixture.detectChanges();
    expect(comp.featureConfig.isOn('knabLab')).toBeTruthy();
  });

  it('should hide componentif env var is not there', () => {
    comp.featureConfig.featureConfig.knabLab = 'false';
    fixture.detectChanges();
    expect(comp.featureConfig.isOn('knabLab')).toBeFalsy();
  });

  it('should go to knab lab url on click', () => {
    spyOn( window, 'open' ).and.callFake(() => true);
    comp.goToKnabLab();
    fixture.detectChanges();
    expect(window.open).toHaveBeenCalled();
  });
});
