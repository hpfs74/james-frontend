import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ConfigInterface } from './config.interface';
import { ConfigService } from './config.service';
import {
  AuthService,
  FeatureService,
  NavigationService,
  InsuranceService,
  CookieService,
  ContentService,
} from './services';

import { LoginComponent } from './pages/login/login.component';


@Component({
  selector: 'ki-app',
  template: `<router-outlet></router-outlet>`,
  providers: [FeatureService, NavigationService, InsuranceService, CookieService, ContentService],
  //changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private configService: ConfigService, private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = false;
    console.log('Configurations: ' + JSON.stringify(this.configService.config));
  }
}
