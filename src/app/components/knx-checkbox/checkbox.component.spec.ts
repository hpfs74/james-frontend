import { NO_ERRORS_SCHEMA, Component, DebugElement, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { KNXCheckboxComponent } from './checkbox.component';
import { KNXCheckboxOptions } from './checkbox.options';


@Component({
  template: `
    <knx-checkbox [options]="options"></knx-checkbox>`
})
export class TestHostComponent {
  @ViewChild(KNXCheckboxComponent)
  targetComponent: KNXCheckboxComponent;
  public options: KNXCheckboxOptions = {
    label: 'Test string'
  };
}

@Component({
  template: `
    <knx-checkbox [options]="options"><i>Test</i></knx-checkbox>`
})
export class CheckBoxWithContentTestHostComponent {
  @ViewChild(KNXCheckboxComponent)
  targetComponent: KNXCheckboxComponent;
  options: null;
}


describe('Component: KNXCheckBoxComponent', () => {

  describe('Test without inner content', () => {
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
    });

    it('should be initialized', () => {
      expect(comp).toBeDefined();
    });

    it('should display label content', () => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('span.cx-checkbox__label'));
      el = de.nativeElement;

      expect(el.innerHTML).toContain('Test string');
    });
  });

  describe('Test with inner content', () => {
    let comp: CheckBoxWithContentTestHostComponent;
    let fixture: ComponentFixture<CheckBoxWithContentTestHostComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let moduleDef: TestModuleMetadata = {
      imports: [BrowserAnimationsModule],
      declarations: [CheckBoxWithContentTestHostComponent, KNXCheckboxComponent],
      schemas: [NO_ERRORS_SCHEMA]
    };

    setUpTestBed(moduleDef);

    beforeEach(() => {
      fixture = TestBed.createComponent(CheckBoxWithContentTestHostComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be initialized', () => {
      expect(comp).toBeDefined();
    });

    it('should display label content', () => {
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('span.cx-checkbox__label'));
      el = de.nativeElement;

      expect(el.innerHTML).toContain('Test');
    });
  });
});

