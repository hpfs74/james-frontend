import { Component } from '@angular/core';

@Component({
  selector: 'knab-navbar',
  templateUrl: require('./navbar.component.html'),
})
export class NavbarComponent {
  project: string = 'KNAB';
}
