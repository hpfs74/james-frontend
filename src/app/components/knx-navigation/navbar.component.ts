import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Nav, NavItemType } from '../../models';
import { UserDetailComponent } from './../knx-user-detail/user-detail.component';
import { AuthService } from '../../services/auth.service';
import { Init } from 'awesome-typescript-loader/dist/checker/protocol';

@Component({
  selector: 'knx-navbar',
  template: `
  <nav class="knx-navbar navbar navbar-toggleable-md bg-faded">
    <div class="container">
      <div class="clearfix">
        <button (click)="isCollapsed = !isCollapsed"
          class="navbar-toggler navbar-toggler-right" type="button"
          aria-controls="bd-main-nav"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" [class.knx-icon-bars]="isCollapsed" [class.knx-icon-times]="!isCollapsed"></span>
        </button>

        <a (click)="isCollapsed = true"
          class="navbar-brand hidden-sm-up"
          routerLink="">
          <img class="knx-logo" src="/assets/images/knab-logo.svg?la=nl" alt="Logo Knab">
        </a>
      </div>

      <div class="navbar-collapse navbar-toggleable-xs" id="navbarNavDropdown"
        [attr.aria-expanded]="!isCollapsed" [ngClass]="{collapse: isCollapsed}">
        <ul class="navbar-nav mr-auto">
          <li (click)="isCollapsed = true" class="nav-item" routerLinkActive="active">
            <a class="navbar-brand hidden-xs-down" routerLink="">
              <img class="knx-logo" src="/assets/images/knab-logo.svg?la=nl" alt="Logo Knab">
            </a>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li (click)="isCollapsed = true"
            class="nav-item active"
            *ngFor="let item of menuItems; let i = index"
            routerLinkActive="active"
            [ngClass]="getMenuItemClasses(item)">
            <a *ngIf="item.routePath" id="{{ item.id }}"
              routerLink="{{ item.routePath }}"
              class="nav-link" href="#">{{ item.title }}</a>

              <a *ngIf="!item.routePath" id="{{ item.id }}"
                href="{{ item.url }}" target="_blank"
                class="nav-link"><span *ngIf="item.icon" [ngClass]="item.icon"></span> {{ item.title }}</a>
          </li>
          <!-- TODO: implemement dropdown component
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com"
            id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          -->
          <li class="nav-item hidden-xs"><ng-content select="knx-user-detail"></ng-content></li>
        </ul>
      </div>
    </div>
  </nav>
  `,
})
export class NavbarComponent {
  @Input() menuItems: Array<Nav>;

  isCollapsed: boolean = false;

  public getMenuItemClasses(menuItem: any) {
    return {
      'float-right': this.isCollapsed && menuItem.menuType === NavItemType.RIGHT
    };
  }
}
