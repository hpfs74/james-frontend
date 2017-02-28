import { TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CookiewallComponent } from './cookiewall.component';
import { CookieService } from '../../shared/cookie.service';

describe('Test the Cookiewall Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[BrowserModule, FormsModule, RouterModule],
      declarations: [CookiewallComponent],
      providers: [
        CookieService,
        CookiewallComponent
      ]
    });
  });

  it('should have a visible property', inject([CookiewallComponent, CookieService], (cmp) => {
    cmp.ngOnInit();
    expect(cmp.visible).toBeDefined();
  }));

  // TODO: Figure out why below test is not working
  it('should set a cookie with the name `knabprivacy`', inject([CookiewallComponent, CookieService], (cmp, s) => {
      spyOn(s, 'set');

      cmp.name = 'knabprivacy';
      cmp.setCookie();


      expect(document.cookie).toBe('ciao');
      expect(s.set).toHaveBeenCalled();
      expect(s.check('knabprivacy')).toBeTruthy();
  }));
});
