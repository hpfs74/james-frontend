import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared.module';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { AppComponent } from './app.component';
import { NavbarComponent } from './../../components/knx-navigation/navbar.component';
import { NavigationService } from '../services/navigation.service';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { ContentService } from '../../core/services/content.service';

import * as fromRoot from '../../reducers';
import * as auth from '../../auth/actions/auth';

@Component({
  template: `<div><knx-app></knx-app></div>`
})
export class TestHostComponent {
  @ViewChild(AppComponent)
  public targetComponent: AppComponent;
  public topMenu = [];
}

describe('Component: AppComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot({
        ...fromRoot.reducers
      })],
      declarations: [AppComponent, TestHostComponent, NavbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        NavigationService,
        {
          provide: ContentService,
          useValue: jasmine.createSpyObj('ContentService', {
            'getContentObject': {
              layout: {
                footer: []
              }
            }
          })
        },
        {
          provide: UserDialogService,
          useValue: {}
        }
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    comp.targetComponent.topMenu = [];
    fixture.detectChanges();
  });

  it('should logout the user', () => {
    const action = new auth.Logout;
    comp.targetComponent.logOut();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
