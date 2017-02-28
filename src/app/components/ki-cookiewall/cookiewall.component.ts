import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from '../../shared/cookie.service';

@Component({
  selector: 'ki-cookiewall',
  template: `
        <div *ngIf="!visible" id="cookie-wall" class="cookie-wall blocking-popup">
            <div class="popup-container">
                <div class="popup-content cookiewall-basic popup-show"> 
                    <h1>COOKIE TITLE</h1>
                    <h4>COOKIE SUBTITLE</h4>
                    <p class="popup-action">
                      <button class="button orange icon-right arrow" id="accept-cookie" (click)="setCookie()">
                        Akkoord en doorgaan
                      </button>
                    </p>
                    <p>Lorem ipsum .... <a href="https://www.knab.nl/privacy" target="_blank">privacybeleid</a> en 
                    <a href="https://www.knab.nl/cookiebeleid" target="_blank">cookiebeleid</a>.
                    </p> 
                </div>
            </div>  
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
    this.visible = this.cookieService.check(this.name);
    if(!this.visible) {
      document.body.classList.add('no-scroll');
    }
  }

  setCookie() {
    this.cookieService.set(this.name, 'true', 3650);
    this.visible = this.cookieService.check(this.name);
    document.body.classList.remove('no-scroll');
  }
}
