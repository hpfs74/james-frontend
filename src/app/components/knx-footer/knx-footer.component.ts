import { Component } from '@angular/core';
import { ContentConfig, Content } from '../../content.config';

@Component({
  selector: 'knx-footer',
  templateUrl: './knx-footer.component.html',
  styleUrls: ['./knx-footer.component.scss']
})
export class KNXFooterComponent {
  content: Content;
  constructor(private contentConfig: ContentConfig) {
    this.content = this.contentConfig.getContent();
  }
}
