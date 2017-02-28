import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesComponent } from './features.component';
import { Feature } from '../../models/feature';


describe('Component: FeaturesComponent', () => {
  let comp: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let items: Array<Feature>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesComponent],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesComponent);
    comp = fixture.componentInstance;
    comp.items = [
      { title: 'Feat1', description: 'This is feature 1' },
      { title: 'Feat2', description: 'This is feature 2' },
      { title: 'Feat3', description: 'This is feature 3' },
      { title: 'Feat4', description: 'This is feature 4' }
    ];

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div.container-features'));
    el = de.nativeElement;
  });

  it('should display list of features', () => {
    let containerEl = fixture.debugElement.query(By.css('div.container-features-inner'));
    let el = containerEl.nativeElement;
    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.feature').length).toBe(4);
  });

  it('should display list of features change adding one more', () => {
    let inputDe = fixture.debugElement.query(By.css('div.container-features-inner'));
    let el = inputDe.nativeElement;

    comp.items.push({ title: 'Feat 5', description: 'This is feature 5' });
    fixture.detectChanges();

    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.feature').length).toBe(5);
  });
});