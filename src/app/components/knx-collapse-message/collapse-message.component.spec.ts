import { NO_ERRORS_SCHEMA, Component, DebugElement, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { CollapseMessageComponent } from './collapse-message.component';

@Component({
  template: `
    <knx-collapse-message [title]="title" [isOpen]="isOpen">
      <p class="myTestContent">Test</p>
    </knx-collapse-message>`
})
export class TestHostComponent {
  @ViewChild(CollapseMessageComponent)
  targetComponent: CollapseMessageComponent;
  title = 'myTestComponent';
  isOpen = false;
}

describe('Component: CollapseMessage', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    imports: [NoopAnimationsModule],
    declarations: [TestHostComponent, CollapseMessageComponent],
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

  it('should be invisible on isOpen false', () => {
    const element = de.query(By.css('myTestContent'));
    expect(element).toBeNull();
  });

  it('should be visible on toggle', () => {
    expect(comp.targetComponent.isOpen).toBeFalsy();
    const contentElement = de.query(By.css('myTestContent'));
    expect(contentElement).toBeNull();

    el.click();
    fixture.detectChanges();

    expect(comp.targetComponent.isOpen).toBeTruthy();
    expect(contentElement).toBeDefined();
  });

  it('should display the title', () => {
    // make sure it's open
    el.click();
    fixture.detectChanges();
    expect(comp.targetComponent.isOpen).toBeTruthy();

    const titleEl = de.query(By.css('h4.knx-collapse-message__title'));
    expect(titleEl.nativeElement.textContent).toContain('myTestComponent');
  });

});

