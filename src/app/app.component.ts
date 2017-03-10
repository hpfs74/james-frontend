import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService } from './services';

@Component({
  selector: 'ki-app',
  template: `<router-outlet></router-outlet>`,
  providers: [AuthService, FeatureService, NavigationService, InsuranceService, CookieService, ContentService],
  //changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoading = false;
  }
}
