import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { collapseInOutAnimation } from '@app/shared/animations';
import { Nav, NavItemType } from '@app/core/models/nav';
import * as AuthUtils from '@app/utils/auth.utils';

import * as authActions from '@app/auth/actions/auth';
import * as routerActions from '@app/core/actions/router';
import * as authReducers from '@app/auth/reducers';
import * as insuranceReducers from '@app/insurance/reducers';
import * as rootReducers from '@app/reducers';

@Component({
  providers: [AsyncPipe],
  selector: 'knx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [collapseInOutAnimation]
})
export class NavbarComponent implements OnInit {
  @Input() menuItems: Array<Nav>;
  @Input() animationState: any;
  @Output() onLogOut = new EventEmitter();
  @Output() onHamburgerClick: EventEmitter<any> = new EventEmitter<any>();
  isCollapsed = true;
  loggedIn$: Observable<boolean>;
  anonymous$: Observable<any>;

  constructor(private store$: Store<rootReducers.State>,
              private asyncPipe: AsyncPipe) {
  }

  ngOnInit() {
    this.loggedIn$ = this.store$.select(authReducers.getLoggedIn);
    this.anonymous$ = this.store$.select(authReducers.getAnonymousState);
  }

  public getMenuItemClasses(menuItem: any) {
    return {
      'float-right': this.isCollapsed && menuItem.menuType === NavItemType.RIGHT
    };
  }

  public logOut() {
    this.onLogOut.emit();
  }

  public logIn() {
    this.store$.dispatch(new routerActions.Go({ path: ['/login'] }));
    // this.store$.dispatch(new auth.ResetStates());
  }

  public register() {
    this.store$.dispatch(new routerActions.Go({ path: ['/register'] }));
  }
  /**
   * goes on start of advice flow or on purchased page,
   * depending on weather we are anonymous, and logged in
  */
  resetFlow() {
    if (AuthUtils.tokenIsAnonymous()) {
      this.goToAdvice();
    } else {
      let savedInsurances = this.asyncPipe.transform(this.store$.select(insuranceReducers.getSavedInsurances));
      if ( savedInsurances ) {
        let insurances = savedInsurances.car.insurance;
        if (insurances.length && insurances.filter(insurance =>
          (!insurance.manually_added && insurance.request_status !== 'rejected')).length) {
          this.goToPurchased();
        } else {
          this.goToAdvice();
        }
      } else {
        this.goToAdvice();
      }
    }
  }

  goToAdvice() {
    this.store$.dispatch(new authActions.ResetStates());
    this.store$.dispatch(new routerActions.Go({ path: [''] }));
  }

  goToPurchased() {
    this.store$.dispatch(new routerActions.Go({ path: ['/car/purchased'] }));
  }
}
