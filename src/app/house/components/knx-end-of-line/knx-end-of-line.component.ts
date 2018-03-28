import { Component, ComponentRef } from '@angular/core';
import { KNXModalDialog, KNXModalDialogOptions } from '@knx/modal';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';
import * as layout from '@app/core/actions/layout';
import * as fromRoot from '@app/reducers';

@Component({
  selector: 'knx-end-of-line',
  templateUrl: './knx-end-of-line.component.html',
  styleUrls: ['./knx-end-of-line.component.scss']
})

export class KNXEndOfLineComponent implements KNXModalDialog {

  constructor(private store$: Store<fromRoot.State>) {}

  dialogInit(reference: ComponentRef<KNXModalDialog>, options?: KNXModalDialogOptions) {}

  cancel() {
    this.store$.dispatch(new layout.CloseModal());
  }

  giveFeedback() {
    window.open('https://lab.knab.nl/vergelijk-je-inboedelverzekering-26', '_self');
  }
}
