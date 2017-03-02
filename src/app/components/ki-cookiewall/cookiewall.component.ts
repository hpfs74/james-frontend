import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from '../../shared/cookie.service';

@Component({
  selector: 'ki-cookiewall',
  template: `
    <div *ngIf="!visible" id="cookie-wall" class="cookie-wall blocking-popup">
      <div>
        Knab gebruikt cookies voor een goede werking van de site en het bieden van gepersonaliseerde
        informatie en aanbiedingen. Daarvoor analyseren we je online gedrag en de gegevens die bij ons
        van je bekend zijn. <p>Ga je verder op de site? Dan stem je erin toe dat wij cookies plaatsen.
        Lees meer: <a target="_blank" href="/cookies">cookiebeleid &amp; instellingen wijzigen</a></p>
      </div>
      <a href="#" class="cookie-wall-close" (click)="setCookie()">Close</a>
    </div>
`
})
export class CookiewallComponent implements OnInit {
  @Input() title: string;
  @Input() name: string;

  visible: boolean;
  constructor(private cookieService: CookieService) {
    this.name = 'knab.cookie.optin';
  }

  ngOnInit() {
    console.log('Cookiewall: ' + this.visible);
    this.visible = this.cookieService.check(this.name);
    if (!this.visible) {
      document.body.classList.add('no-scroll');
    }
  }

  setCookie() {
    this.cookieService.set(this.name, 'true', 3650);
    this.visible = this.cookieService.check(this.name);
    document.body.classList.remove('no-scroll');
  }
}
