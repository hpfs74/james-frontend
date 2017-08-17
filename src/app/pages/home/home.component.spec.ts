import { CarCheckForm } from './car-check.form';
import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, OnChanges, Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../node_modules/@cx/forms';

import { SharedModule } from '../../shared.module';
import { HomeComponent } from './home.component';

@Component({
  template: `
    <div>
      <knx-cookiebar></knx-cookiebar>
      <header class="header">
        <knx-navbar [menuItems]="topMenu" (onLogOut)="logOut()">
          <knx-opening-hours></knx-opening-hours>
          <knx-nav-user [isLoggedIn]="isLoggedIn" (onLogOut)="logOut()" [profile]="profile$ | async"></knx-nav-user>
        </knx-navbar>
      </header>

      <div class="main-container">
        <knx-loader *shellRender></knx-loader>
        <router-outlet></router-outlet>
      </div>

      <!-- footer is a features block -->
      <div class="container-fluid knx-container--fullwidth knx-container--gray">
        <knx-features [items]="footerItems"></knx-features>
      </div>
    </div>`
})
export class TestHostComponent {
  @ViewChild(HomeComponent)
  public targetComponent: HomeComponent;
  public formFromHost: CarCheckForm = new CarCheckForm(new FormBuilder());
}

describe('Component: HomeComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, CXFormsModule, SharedModule],
      declarations: [HomeComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    comp.formFromHost.infoMessages = {
      reportingCode: 'Example explanation icon text'
    };
    fixture.detectChanges();
  });

  it('should init the form', () => {
    const element = fixture.debugElement.query(By.css('form'));
    expect(element).toBeDefined();
    expect(comp.targetComponent).toBeDefined();
    expect(comp.targetComponent.form).toBeDefined();
  });

  it('should have invalid form controls on init', () => {
    expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();
  });

  it('should check for all questions to be answered', () => {
    const formFields = ['crime', 'debt', 'refuse', 'driver', 'cause'];
    const lastField = 'register';

    formFields.forEach(( formField ) => {
      comp.targetComponent.form.formGroup.get(formField).setValue(true);
    });
    fixture.detectChanges();
    expect(comp.targetComponent.form.formGroup.valid).toBeFalsy();

    comp.targetComponent.form.formGroup.get(lastField).setValue(true);
    fixture.detectChanges();
    expect(comp.targetComponent.form.formGroup.valid).toBeTruthy();
  });
});
