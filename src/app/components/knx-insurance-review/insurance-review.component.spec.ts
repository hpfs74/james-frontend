import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceReviewComponent } from './insurance-review.component';
import { CarInsurance } from '../../models/car-insurance';
import { SectionsItem, SectionFields } from '../../components/knx-insurance-review/insurance-review.component.ts';
// import { SectionsItem } from '../../components/knx-insurance-review/insurance-review.component.ts';


describe('Component: Insurance Review', () => {
  let comp: InsuranceReviewComponent;
  let fixture: ComponentFixture<InsuranceReviewComponent>;
  let selectedInsurance: CarInsurance;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceReviewComponent],
      imports: []
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceReviewComponent);
    comp = fixture.componentInstance;

    comp.sections = [
      {
        label: 'label 1',
        fields: [
          {
            label: 'label 2',
            value: 150
          },
          {
            label: 'label 3',
            value: '€ 160',
            info: 'info 3'
          },
          {
            label: 'label 4',
            value: '€ 170',
            info: 'info 4'
          },
          {
            label: 'label 5',
            value: '€ 180'
          }
        ]
      }
    ];

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-collapsible-panel'));
    el = de.nativeElement;
  });

  it('should display panel with results', () => {
    let containerEl = fixture.debugElement.query(By.css('.knx-features'));
    let el = containerEl.nativeElement;
    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.knx-collapsible-panel__content').length).toBe(4);
  });

  it('should display info message', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('.knx-info')).not.toBeNull();
  });
});
