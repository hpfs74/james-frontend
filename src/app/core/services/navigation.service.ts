import { Injectable } from '@angular/core';
import { Nav, NavItemType } from '../models/nav';

@Injectable()
export class NavigationService {

  getMenu(): Array<Nav> {
    return [
      // {
      //   id: 'menu-dashboard',
      //   title: 'Dashboard',
      //   routePath: '/',
      //   menuType: NavItemType.RIGHT
      // },
      // {
      //   id: 'menu-faq',
      //   title: 'FAQ',
      //   routePath: '/faq',
      //   menuType: NavItemType.RIGHT
      // },
      {
        id: 'menu-phone',
        icon: 'knx-icon-phone',
        title: '020-3031600',
        routePath: '',
        menuType: NavItemType.RIGHT,
        url: 'tel:0203031600',
        rel: 'noopener'
      }
    ];
  }
}
