import { TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CookiebarComponent } from './cookiebar.component';
import { CookieService } from '../../services/cookie.service';

describe('Component: Cookiebarl', () => {
  let component;
  let cookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, RouterModule],
      declarations: [CookiebarComponent],
      providers: [
        CookieService,
        CookiebarComponent
      ]
    });
  });

  beforeEach(inject([CookiebarComponent, CookieService], (cmp, s) => {
    component = cmp;
    cookieService = s;
  }));


  it('should have a visible property', () => {
    component.ngOnInit();
    expect(component.visible).toBeDefined();
  });

  // TODO: Figure out why below test is not working
  it('should set a cookie with the name `knabprivacy`', () => {
    spyOn(cookieService, 'set')
      .and.callThrough();

    component.name = 'knabprivacy';
    component.setCookie();

    expect(cookieService.set).toHaveBeenCalled();
    expect(cookieService.check('knabprivacy')).toBeTruthy();
  });
});
