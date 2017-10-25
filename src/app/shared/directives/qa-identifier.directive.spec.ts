import { NO_ERRORS_SCHEMA, Component, ViewChild, DebugElement } from '@angular/core';
import { TestModuleMetadata, async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { QaIdentifierDirective } from './qa-identifier.directive';

@Component({
  template: `<div knxQaIdentifier qaRoot="myTestRoot"></div>`
})
export class TestHostComponent {}

describe('Directive: QaIdentifierDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let comp: TestHostComponent;
  let de: DebugElement;
  let el: HTMLElement;

  // let moduleDef: TestModuleMetadata = {
  //   declarations: [
  //     QaIdentifierDirective,
  //     TestHostComponent
  //   ],
  //   schemas: [NO_ERRORS_SCHEMA]
  // };
  // setUpTestBed(moduleDef);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [
      QaIdentifierDirective,
      TestHostComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
    });
  }));

  it('should not add an attribute if not all input parameters are specified', () => {
    TestBed.overrideComponent(TestHostComponent, {
      set: {
        template: '<div knxQaIdentifier qaRoot="myTestRoot"></div>'
      }
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      const directiveEl = fixture.debugElement.query(By.directive(QaIdentifierDirective));
      expect(directiveEl).not.toBeNull();

      const directiveInstance = directiveEl.injector.get(QaIdentifierDirective);
      directiveInstance.ngOnInit();
      fixture.detectChanges();

      expect(directiveInstance.qaRoot).toBe('myTestRoot');

      const hostElement = fixture.debugElement.query(By.css('div'));
      expect(hostElement).toBeDefined();
      const attributeKeys = Object.keys(hostElement.attributes);

      expect(attributeKeys).toBeDefined();
      expect(attributeKeys.indexOf('data-qa-id')).toEqual(-1);

    });
  });

  it('should add a data attribute', () => {
    TestBed.overrideComponent(TestHostComponent, {
      set: {
        template: '<div knxQaIdentifier qaRoot="myTestRoot" qaIdentifier="myTestId"></div>'
      }
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
      const directiveEl = fixture.debugElement.query(By.directive(QaIdentifierDirective));
      expect(directiveEl).not.toBeNull();

      const directiveInstance = directiveEl.injector.get(QaIdentifierDirective);
      directiveInstance.ngOnInit();
      fixture.detectChanges();

      expect(directiveInstance.qaRoot).toBe('myTestRoot');

      const hostElement = fixture.debugElement.query(By.css('div'));
      expect(hostElement).toBeDefined();
      const attributeKeys = Object.keys(hostElement.attributes);

      const attributeName = 'data-qa-id';

      expect(attributeKeys).toBeDefined();
      expect(attributeKeys.indexOf(attributeName)).toBeGreaterThanOrEqual(0);

      const nativeEl = hostElement.nativeElement as HTMLElement;
      expect(nativeEl.getAttribute(attributeName)).toBeDefined();
      expect(nativeEl.getAttribute(attributeName)).toEqual('knx-qa-myTestRoot-myTestId');
    });
  });
});
