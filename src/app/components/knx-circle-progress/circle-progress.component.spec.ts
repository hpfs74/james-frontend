import { NO_ERRORS_SCHEMA, Component, DebugElement, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { CircleProgressComponent } from './circle-progress.component';

@Component({
  template: `
    <knx-circle-progress #circleProg1
                         [uniqueId]="uniqueId"
                         [imageConfig]="imageConfig"
                         [percent]="percent"
                         [animateOnLoad]="true"
                         [boxSize]="140"
                         [radius]="65"
                         [color]="'#eeebe5'"
                         [backgroundColor]="'#eeebe5'"
                         [lowColor]="'#00a4a7'"
                         [middleColor]="'#00a4a7'"
                         [interColor]="'#00a4a7'"
                         [highColor]="'#00a4a7'"
                         [border]="9"
                         [time]="0.4">
    </knx-circle-progress>`
})
export class TestHostComponent {
  @ViewChild(CircleProgressComponent)
  targetComponent: CircleProgressComponent;
  percent = 0;
  imageConfig: {
    url: 'test.jpg';
    width: 100;
    height: 100;
    x: 0;
    y: 0;
  };
  uniqueId: 'test123';
}

describe('Component: CircleProgressComponent', () => {
  let comp: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let moduleDef: TestModuleMetadata = {
    imports: [BrowserAnimationsModule],
    declarations: [TestHostComponent, CircleProgressComponent],
    schemas: [NO_ERRORS_SCHEMA]
  };
  setUpTestBed(moduleDef);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.knx-collapse-message'));
    // el = de.nativeElement;
  });

  it('should animate component', () => {
    fixture.componentInstance.percent = 10;
    fixture.detectChanges();
    expect(fixture.componentInstance.targetComponent.canAnimate).toBeTruthy();
  });
});

