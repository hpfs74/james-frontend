import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

import { collapseInOutAnimation } from '../../animations';
import { Nav, NavItemType } from '../../models';
import { NavUserComponent } from './../knx-nav-user/nav-user.component';
import { AuthService } from '../../services/auth.service';
import { Init } from 'awesome-typescript-loader/dist/checker/protocol';

@Component({
  selector: 'knx-navbar',
  templateUrl: './navbar.component.html',
  animations: [collapseInOutAnimation]
})
export class NavbarComponent {
  @Input() menuItems: Array<Nav>;
  @Output() onLogOut = new EventEmitter();

  isCollapsed: boolean = true;

  public getMenuItemClasses(menuItem: any) {
    return {
      'float-right': this.isCollapsed && menuItem.menuType === NavItemType.RIGHT
    };
  }

  public logOut() {
    this.onLogOut.emit();
  }
}
