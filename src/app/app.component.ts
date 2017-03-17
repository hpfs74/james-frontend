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
  providers: [AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService],
  //changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  config: ConfigInterface;
  isLoading: boolean = true;

  constructor(private configService: ConfigService, private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = false;
    this.config = this.configService.config;

    console.log('Configurations: ' + JSON.stringify(this.config));
  }

}
