import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ConfigInterface } from './config.interface';
import { ConfigService } from './config.service';
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
export class AppComponent implements OnInit {
  isLoading = true;

  constructor(private configService: ConfigService, private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = false;
    // console.log('Configuration loaded: ' + JSON.stringify(this.configService.config));
  }
}
