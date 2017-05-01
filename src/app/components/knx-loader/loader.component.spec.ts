import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { LoaderComponent } from './loader.component';


describe('Component: Loader', () => {
  let comp: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hide the spinner by default', () => {
    de = fixture.debugElement.query(By.css('.knx-loader-message'));
    expect(de).toBeNull();
  });

  it('should show the spinner', () => {
    comp.visible = true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.knx-loader-message'));
    expect(de).not.toBeNull();
    el = de.nativeElement;
    expect(el).not.toBeNull();
  });
});
