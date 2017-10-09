import { DebugElement } from '@angular/core';
import { TestModuleMetadata, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';

import { setUpTestBed } from './../../../test.common.spec';
import { FeaturesComponent } from './features.component';
import { Feature } from '../../shared/models/feature';

describe('Component: Features', () => {
  let comp: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let items: Array<Feature>;

  let moduleDef: TestModuleMetadata = {
    declarations: [FeaturesComponent],
    imports: [BrowserModule]
  };
  setUpTestBed(moduleDef);

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
    de = fixture.debugElement.query(By.css('div.knx-features '));
    el = de.nativeElement;
  });

  it('should display list of features', () => {
    const containerEl = fixture.debugElement.query(By.css('div.knx-features'));
    const el = containerEl.nativeElement;
    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.knx-features__item').length).toBe(4);
  });

  it('should display list of features change adding one more', () => {
    const inputDe = fixture.debugElement.query(By.css('div.knx-features'));
    const el = inputDe.nativeElement;

    comp.items.push({ title: 'Feat 5', description: 'This is feature 5' });
    fixture.detectChanges();

    expect(el).not.toBeNull();
    expect(fixture.debugElement.nativeElement.querySelectorAll('.knx-features__item').length).toBe(5);
  });
});
