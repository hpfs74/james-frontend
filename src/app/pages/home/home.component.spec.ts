import { NO_ERRORS_SCHEMA, DebugElement, ViewChild, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CXFormsModule } from '../../../../node_modules/@cx/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { SharedModule } from '../../shared.module';
import { NavbarComponent } from '../../components/knx-navigation';

import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterTestingModule, CXFormsModule, SharedModule],
      declarations: [HomeComponent, TestHostComponent, NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    comp.targetComponent.topMenu = [];
    fixture.detectChanges();
  });

  xit('should initialize the component', () => {
    // console.log(comp.targetComponent);
    expect(comp.targetComponent).toBeDefined();
  });

  // xit('should logout the user', () => {
  //   console.log(comp.targetComponent.logOut);
  //   expect(comp.targetComponent.logOut).toBeDefined();
  // });
});
