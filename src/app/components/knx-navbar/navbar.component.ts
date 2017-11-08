import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ContentConfig, Content } from '../../content.config';
import { collapseInOutAnimation } from '../../shared/animations';
import { Nav, NavItemType } from '../../core/models/nav';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as router from '../../core/actions/router';
@Component({
  selector: 'knx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [collapseInOutAnimation]
})
export class NavbarComponent implements OnInit {
  @Input() menuItems: Array<Nav>;
  @Output() onLogOut = new EventEmitter();

  isCollapsed = true;
  loggedIn$: Observable<boolean>;
  anonymous$: Observable<any>;
  content: Content;

  constructor(private store$: Store<fromRoot.State>, private contentConfig: ContentConfig) {
    this.content = contentConfig.getContent();
  }

  ngOnInit() {
    this.loggedIn$ = this.store$.select(fromAuth.getLoggedIn);
    this.anonymous$ = this.store$.select(fromAuth.getAnonymousState);
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
    this.store$.dispatch(new router.Go({ path: ['/login'] }));
  }

  public register() {
    this.store$.dispatch(new router.Go({ path: ['/register'] }));
  }
}
