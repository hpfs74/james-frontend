import { NO_ERRORS_SCHEMA, DebugElement, LOCALE_ID } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { setUpTestBed } from './../../../test.common.spec';
import { NavUserComponent } from './nav-user.component';
import { Car } from '../../car/models';

describe('Component: NavUserComponent', () => {
  let comp: NavUserComponent;
  let fixture: ComponentFixture<NavUserComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    declarations: [NavUserComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule],
    providers: [
      {
        provide: LOCALE_ID,
        useValue: 'nl-NL'
      }
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(NavUserComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return the email name', () => {
    expect(comp.getShortEmail('test@mail.com')).toEqual('test');
  });

});

