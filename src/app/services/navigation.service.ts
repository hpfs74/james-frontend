import { Injectable } from '@angular/core';
import { Nav } from '../models';

@Injectable()
export class NavigationService {

  getMenu(): Array<Nav> {
    return [
      { id: 'menu-overview', title: 'Overzicht', routePath: 'overview' },
      { id: 'menu-account', title: 'Mijn account', routePath: 'profile' },
      { id: 'menu-faq', title: 'FAQ', routePath: 'faq' },
      { id: 'menu-about', title: 'Over ons', routePath: 'about' }
    ];
  }

  getPhone() {
    return { id: 'menu-phone', title: '020-303 1680', link: 'tel:0203031680'};
  }
}
