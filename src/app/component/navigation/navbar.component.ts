import { Component } from '@angular/core';

@Component({
  selector: 'knab-navbar',
  template: require('./navbar.component.html'),
})
export class NavbarComponent {
  project: string = 'KNAB';
}
