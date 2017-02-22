import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ki-navbar',
  template: require('./navbar.component.html'),
})
export class NavbarComponent implements OnInit {
  private menuItems = [];

  ngOnInit() {
    this.menuItems.push(
      {
        'title': 'Overzicht',
        'url': '/',
        'id': 'menu-overview'
      },
      {
        'title': 'Mijn account',
        'url': '/',
        'id': 'menu-account'
      },
      {
        'title': 'FAQ',
        'url': '/',
        'id': 'menu-faq'
      },
      {
        'title': 'Over ons',
        'url': '/',
        'id': 'menu-about'
      },
    );
  }

}
