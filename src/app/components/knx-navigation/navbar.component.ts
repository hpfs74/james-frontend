import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { collapseInOutAnimation } from '../../animations';
import { Nav, NavItemType } from '../../models';
import { NavUserComponent } from './../knx-nav-user/nav-user.component';
import { AuthService } from '../../services/auth.service';
import { Init } from 'awesome-typescript-loader/dist/checker/protocol';

@Component({
  selector: 'knx-navbar',
  template: `
  <nav class="knx-navbar navbar navbar-toggleable-md bg-faded">
    <div class="container">
      <div class="knx-navbar-mobile">
        <button (click)="isCollapsed = !isCollapsed"
          class="navbar-toggler" [ngClass]="{collapsed: isCollapsed}" type="button"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="knx-icon-bars navbar-toggler-icon"></span>
        </button>

        <ul class="navbar-nav ml-auto p-2 hidden-md-up">
          <li class="nav-item"><span class="knx-icon-user-o"></span></li>
        </ul>
      </div>

      <div class="navbar-collapse navbar-toggleable-xs"
        id="navbarNavDropdown" [@collapseInOutAnimation]="!isCollapsed"
        [attr.aria-expanded]="!isCollapsed">
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
              class="nav-link"><span class="nav-link__icon" *ngIf="item.icon" [ngClass]="item.icon"></span> {{ item.title }}</a>
          </li>

          <li class="nav-item hidden-xs"><ng-content select="knx-opening-hours"></ng-content></li>
          <li class="nav-item hidden-xs"><ng-content select="knx-nav-user"></ng-content></li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  animations: [collapseInOutAnimation]
})
export class NavbarComponent {
  @Input() menuItems: Array<Nav>;

  isCollapsed: boolean = true;

  public getMenuItemClasses(menuItem: any) {
    return {
      'float-right': this.isCollapsed && menuItem.menuType === NavItemType.RIGHT
    };
  }
}
