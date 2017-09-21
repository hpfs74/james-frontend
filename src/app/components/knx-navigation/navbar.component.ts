import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

import { collapseInOutAnimation } from '../../shared/animations';
import { Nav, NavItemType } from '../../core/models/nav';
import { NavUserComponent } from './../knx-nav-user/nav-user.component';
@Component({
  selector: 'knx-navbar',
  templateUrl: './navbar.component.html',
  animations: [collapseInOutAnimation]
})
export class NavbarComponent {
  @Input() menuItems: Array<Nav>;
  @Output() onLogOut = new EventEmitter();

  isCollapsed = true;

  public getMenuItemClasses(menuItem: any) {
    return {
      'float-right': this.isCollapsed && menuItem.menuType === NavItemType.RIGHT
    };
  }

  public logOut() {
    this.onLogOut.emit();
  }
}
