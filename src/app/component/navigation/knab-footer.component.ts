import { Component, Input } from '@angular/core';

/**
 * @description
 * KnabFooterComponent handle to footer of the page
 */
@Component({
  selector: 'knab-footer',
  templateUrl: 'knab-footer.component.html',
})
export class KnabFooterComponent {
  @Input() SocialIcons: boolean = false;

}
