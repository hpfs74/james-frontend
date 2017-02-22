import { Component, Input } from '@angular/core';

/**
 * @description
 * KnabFooterComponent handle to footer of the page
 */
@Component({
  selector: 'ki-footer',
  template: require('./footer.component.html'),
})
export class FooterComponent {
  @Input() SocialIcons: boolean = false;

}
