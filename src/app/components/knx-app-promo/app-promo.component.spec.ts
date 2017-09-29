import { NO_ERRORS_SCHEMA, DebugElement, LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppPromoBlockComponent } from './app-promo.component';

describe('Component: AppPromoBlockComponent', () => {
  let comp: AppPromoBlockComponent;
  let fixture: ComponentFixture<AppPromoBlockComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppPromoBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPromoBlockComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize template links', () => {
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.iOSLink).toContain('itunes.apple.com');
    expect(comp.androidLink).toContain('play.google.com');
  });
});

