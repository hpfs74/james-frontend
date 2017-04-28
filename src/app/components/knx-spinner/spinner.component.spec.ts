import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner.component';


describe('Component: Spinner', () => {
  let comp: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide the spinner by default', () => {
    de = fixture.debugElement.query(By.css('.knx-loader-icon'));
    expect(de).toBeNull();
  });

  it('should show the spinner', () => {
    comp.visible = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-loader-icon'));
    expect(de).not.toBeNull();
    el = de.nativeElement;
    expect(el).not.toBeNull();
  });
});
