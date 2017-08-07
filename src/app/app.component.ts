import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import {
  AuthService,
  NavigationService,
  InsuranceService,
  CookieService
} from './services';

@Component({
  selector: 'knx-app',
  template: `<router-outlet></router-outlet>`,
  providers: [
    NavigationService,
    InsuranceService,
    CookieService,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  isLoading = true;

  constructor(private authService: AuthService) {
  }
}
