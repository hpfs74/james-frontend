import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
// import { CXFormsModule } from '../../../../node_modules/@cx/forms';
import { RouterTestingModule } from '@angular/router/testing';
// import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared.module';
// import { NavbarComponent } from '../../components/knx-navigation';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { HomeComponent } from './home.component';
import { NavbarComponent } from './../../components/knx-navigation/navbar.component';
import { NavigationService } from '../../services/navigation.service';
import { UserDialogService } from '../../components/knx-modal/user-dialog.service';
import { ContentService } from '../../content.service';

import * as fromRoot from '../../reducers';
import * as auth from '../../auth/actions/auth';
@Component({
  template: `
    <div>
      <knx-home></knx-home>
    </div>`
})
export class TestHostComponent {
  @ViewChild(HomeComponent)
  public targetComponent: HomeComponent;
  public topMenu = [];
}

describe('Component: Home', () => {
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
      declarations: [HomeComponent, TestHostComponent, NavbarComponent],
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
