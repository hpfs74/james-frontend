import { Injectable } from '@angular/core';
import { Nav, NavItemType } from '../models/nav';

@Injectable()
export class NavigationService {

  getMenu(): Array<Nav> {
    return [
      {
        id: 'menu-dashboard',
        title: 'Verzekeringen',
        routePath: '/',
        menuType: NavItemType.RIGHT
      },
      {
        id: 'menu-faq',
        title: 'FAQ',
        routePath: 'faq',
        menuType: NavItemType.RIGHT
      },
      {
        id: 'menu-phone',
        icon: 'knx-icon-whatsapp',
        title: '020-303 1680',
        routePath: '',
        menuType: NavItemType.RIGHT,
        url: 'tel:0203031680'
      }
    ];
  }
}
