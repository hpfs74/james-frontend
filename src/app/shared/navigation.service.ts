import { Injectable } from '@angular/core';
import { Nav } from '../models';

@Injectable()
export class NavigationService {

  getFooter(): Array<Nav> {

    return [
      {id: 'menu-overview', title: 'Overzicht'},
      {id: 'menu-account', title: 'Mijn account'},
      {id: 'menu-faq', title: 'FAQ'},
      {id: 'menu-about', title: 'Over ons'},
    ];
  }
}
