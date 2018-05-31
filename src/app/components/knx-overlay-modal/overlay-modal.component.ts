import { Component, Input } from '@angular/core';
import { environment } from '@env/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromOverlay from '@app/core/reducers/overlay-modal';
import * as overlayActions from '@app/core/actions/overlay-modal';
import * as fromCore from '@core/reducers';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'knx-overlay-modal',
  styleUrls: ['./overlay-modal.component.scss'],
  templateUrl: './overlay-modal.component.html'
})
export class KnxOverlayModalComponent {
  iframeUrl: any;
  iframeClass: string;
  openModal$: Observable<any>;
  constructor(private sanitizer: DomSanitizer,
              private store$: Store<fromOverlay.State>) {
    this.setIframeUrl();
    this.setObservable();
  }

  setObservable() {
    this.openModal$ = this.store$.select(fromCore.getOpenModal);
    this.store$.select(fromCore.getData)
      .filter(data => !!data)
      .subscribe(data => {
        this.setIframeUrl();
        this.iframeUrl = this.iframeUrl + `&data=${data}`;
      });
  }

  setIframeUrl() {
    let iframeUrl = environment.external.iframeWebappMailAdviceDesktop;
    if (window.innerWidth < 580) {
      iframeUrl = environment.external.iframeWebappMailAdviceMobile;
    }
    this.iframeUrl = iframeUrl;
    switch (true) {
      case (window.innerWidth < 580):
        this.iframeClass = 'iframe-xs';
        break;
      default:
        this.iframeClass = 'iframe-xl';
    }
  }

  closeModal() {
    this.store$.dispatch(new overlayActions.Close());
  }
}
