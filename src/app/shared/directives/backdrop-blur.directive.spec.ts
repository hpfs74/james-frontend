import { Component, DebugElement } from '@angular/core';
import { TestModuleMetadata, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { BackdropBlurDirective } from './backdrop-blur.directive';

@Component({
  selector: 'knx-test-component',
  template: '<div knxBackdropBlur [enableBlur]="blur"></div>'
})
class TestHostComponent {
  blur = false;
}

describe('Directive: BackdropBlurDirective', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let moduleDef: TestModuleMetadata = {
    declarations: [
      BackdropBlurDirective,
      TestHostComponent
    ]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a backdrop class', () => {
    comp.blur = true;
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.css('div'));
    expect(directiveEl).not.toBeNull();
    expect(directiveEl.nativeElement.classList).toContain('backdrop-blur');
  });

  it('should remove a backdrop class', () => {
    comp.blur = false;
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.css('div'));
    expect(directiveEl).not.toBeNull();
    expect(directiveEl.nativeElement.classList).not.toContain('backdrop-blur');
  });
});
