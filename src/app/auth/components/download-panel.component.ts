import { Component, Input } from '@angular/core';

/**
 * Show the download panel
 *
 * @export
 * @class DownloadPanelComponent
 */
@Component({
  selector: 'knx-download-panel',
  templateUrl: './download-panel.component.html'
})
export class DownloadPanelComponent {
  @Input() iosUrl: string;
  @Input() androidUrl: string;
}
