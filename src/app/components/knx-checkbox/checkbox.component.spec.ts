import { NO_ERRORS_SCHEMA, Component, DebugElement, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { KNXCheckboxComponent } from './checkbox.component';

@Component({
  template: `
    <knx-checkbox ></knx-checkbox>`
})
export class TestHostComponent {
  @ViewChild(KNXCheckboxComponent)
  targetComponent: KNXCheckboxComponent;
}

describe('Component: CircleProgressComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule],
    declarations: [TestHostComponent, KNXCheckboxComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.knx-collapse-message'));
    el = de.nativeElement;
  });

  xit('should be initialized');
  xit('should display inner content if no lables');
  xit('should display lables if present');
});

